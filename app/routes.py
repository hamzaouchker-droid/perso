"""Flask routes for the job application assistant."""

import os
import json
import uuid
import logging
from datetime import datetime

from flask import (
    Blueprint,
    render_template,
    request,
    jsonify,
    current_app,
    session,
    send_file,
)
from werkzeug.utils import secure_filename

from app.cv_parser import parse_cv, extract_profile_summary
from app.ai_generator import analyze_cv, generate_adapted_cv, generate_cover_letter, generate_pdf
from app.job_search import search_jobs

logger = logging.getLogger(__name__)
main_bp = Blueprint("main", __name__)

ALLOWED_EXTENSIONS = {"pdf", "docx", "doc"}


def allowed_file(filename: str) -> bool:
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


@main_bp.route("/")
def index():
    return render_template("index.html")


@main_bp.route("/upload", methods=["POST"])
def upload_cv():
    """Upload and analyze a CV."""
    if "cv_file" not in request.files:
        return jsonify({"error": "Aucun fichier sélectionné"}), 400

    file = request.files["cv_file"]
    if file.filename == "":
        return jsonify({"error": "Aucun fichier sélectionné"}), 400

    if not allowed_file(file.filename):
        return jsonify({"error": "Format non supporté. Utilisez PDF ou DOCX."}), 400

    filename = secure_filename(file.filename)
    unique_name = f"{uuid.uuid4().hex}_{filename}"
    file_path = os.path.join(current_app.config["UPLOAD_FOLDER"], unique_name)
    file.save(file_path)

    try:
        cv_text = parse_cv(file_path)
        if not cv_text.strip():
            return jsonify({"error": "Impossible d'extraire le texte du CV. Vérifiez le fichier."}), 400

        profile = extract_profile_summary(cv_text)

        session["cv_text"] = cv_text
        session["cv_file_path"] = file_path
        session["profile"] = profile

        return jsonify({
            "success": True,
            "profile": profile,
            "text_preview": cv_text[:500] + ("..." if len(cv_text) > 500 else ""),
        })
    except Exception as e:
        logger.error("Error processing CV: %s", e)
        return jsonify({"error": f"Erreur lors du traitement: {str(e)}"}), 500


@main_bp.route("/analyze", methods=["POST"])
def analyze():
    """AI-powered CV analysis."""
    cv_text = session.get("cv_text")
    if not cv_text:
        return jsonify({"error": "Veuillez d'abord uploader votre CV"}), 400

    try:
        analysis = analyze_cv(cv_text)
        session["cv_analysis"] = analysis
        return jsonify({"success": True, "analysis": analysis})
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        logger.error("Error analyzing CV: %s", e)
        return jsonify({"error": f"Erreur d'analyse: {str(e)}"}), 500


@main_bp.route("/search-jobs", methods=["POST"])
def search():
    """Search for matching jobs."""
    analysis = session.get("cv_analysis")
    if not analysis:
        return jsonify({"error": "Veuillez d'abord analyser votre CV"}), 400

    location = request.json.get("location", "Île-de-France") if request.is_json else "Île-de-France"

    try:
        offers = search_jobs(analysis, location)
        session["job_offers"] = offers
        return jsonify({"success": True, "offers": offers, "count": len(offers)})
    except Exception as e:
        logger.error("Error searching jobs: %s", e)
        return jsonify({"error": f"Erreur de recherche: {str(e)}"}), 500


@main_bp.route("/generate", methods=["POST"])
def generate():
    """Generate adapted CV and cover letter for a selected job."""
    analysis = session.get("cv_analysis")
    if not analysis:
        return jsonify({"error": "Veuillez d'abord analyser votre CV"}), 400

    if not request.is_json:
        return jsonify({"error": "Requête invalide"}), 400

    job_offer = request.json.get("job_offer")
    if not job_offer:
        return jsonify({"error": "Veuillez sélectionner une offre d'emploi"}), 400

    try:
        adapted_cv = generate_adapted_cv(analysis, job_offer)
        cover_letter = generate_cover_letter(analysis, job_offer)

        # Generate PDFs
        gen_folder = current_app.config["GENERATED_FOLDER"]
        file_id = uuid.uuid4().hex[:8]

        cv_pdf_name = f"CV_adapte_{file_id}.pdf"
        letter_pdf_name = f"Lettre_motivation_{file_id}.pdf"

        cv_pdf_path = os.path.join(gen_folder, cv_pdf_name)
        letter_pdf_path = os.path.join(gen_folder, letter_pdf_name)

        generate_pdf(adapted_cv, "CV Adapté", cv_pdf_path)
        generate_pdf(cover_letter, "Lettre de Motivation", letter_pdf_path)

        return jsonify({
            "success": True,
            "adapted_cv": adapted_cv,
            "cover_letter": cover_letter,
            "cv_pdf": f"/download/{cv_pdf_name}",
            "letter_pdf": f"/download/{letter_pdf_name}",
            "job_url": job_offer.get("url", ""),
        })
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        logger.error("Error generating documents: %s", e)
        return jsonify({"error": f"Erreur de génération: {str(e)}"}), 500


@main_bp.route("/download/<path:filename>")
def download(filename):
    """Download a generated file."""
    file_path = os.path.join(current_app.config["GENERATED_FOLDER"], filename)
    if not os.path.isfile(file_path):
        return jsonify({"error": "Fichier non trouvé"}), 404
    return send_file(file_path, as_attachment=True)
