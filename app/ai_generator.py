"""AI-powered CV analysis, CV adaptation, and cover letter generation using Claude."""

import os
import json
import logging
from datetime import datetime

import anthropic
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.enums import TA_CENTER, TA_LEFT

logger = logging.getLogger(__name__)


def _get_client() -> anthropic.Anthropic:
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        raise ValueError(
            "ANTHROPIC_API_KEY non définie. Ajoutez-la dans votre fichier .env"
        )
    return anthropic.Anthropic(api_key=api_key)


def analyze_cv(cv_text: str) -> dict:
    """Analyze a CV and extract structured information."""
    client = _get_client()

    message = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=2000,
        messages=[
            {
                "role": "user",
                "content": f"""Analyse ce CV et extrais les informations suivantes en JSON.
Réponds UNIQUEMENT avec un objet JSON valide, sans texte avant ou après.

Champs attendus:
- "name": nom complet
- "email": email
- "phone": téléphone
- "job_title": titre du poste actuel ou recherché
- "experience_years": nombre d'années d'expérience (entier)
- "key_skills": liste des compétences clés (tableau de strings)
- "domain": domaine d'expertise principal
- "education": dernier diplôme obtenu
- "languages": langues parlées (tableau de strings)
- "summary": résumé du profil en 2-3 phrases
- "experiences": liste des expériences (tableau d'objets avec "title", "company", "duration", "description")

CV:
{cv_text}""",
            }
        ],
    )

    response_text = message.content[0].text.strip()

    # Try to extract JSON from the response
    if response_text.startswith("```"):
        lines = response_text.split("\n")
        json_lines = []
        in_block = False
        for line in lines:
            if line.startswith("```") and not in_block:
                in_block = True
                continue
            elif line.startswith("```") and in_block:
                break
            elif in_block:
                json_lines.append(line)
        response_text = "\n".join(json_lines)

    try:
        return json.loads(response_text)
    except json.JSONDecodeError:
        logger.error("Failed to parse AI response as JSON: %s", response_text[:200])
        return {
            "name": "Non détecté",
            "job_title": "Non détecté",
            "key_skills": [],
            "domain": "",
            "summary": response_text[:300],
            "experience_years": 0,
            "experiences": [],
        }


def generate_adapted_cv(cv_analysis: dict, job_offer: dict) -> str:
    """Generate an adapted CV for a specific job offer."""
    client = _get_client()

    message = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=3000,
        messages=[
            {
                "role": "user",
                "content": f"""Tu es un expert en recrutement et en rédaction de CV en France.

Génère un CV professionnel adapté à cette offre d'emploi, en te basant sur le profil du candidat.
Le CV doit être en français, bien structuré, et mettre en avant les compétences pertinentes pour le poste.

PROFIL DU CANDIDAT:
- Nom: {cv_analysis.get('name', 'Candidat')}
- Email: {cv_analysis.get('email', '')}
- Téléphone: {cv_analysis.get('phone', '')}
- Compétences: {', '.join(cv_analysis.get('key_skills', []))}
- Expérience: {cv_analysis.get('experience_years', 0)} ans
- Domaine: {cv_analysis.get('domain', '')}
- Formation: {cv_analysis.get('education', '')}
- Langues: {', '.join(cv_analysis.get('languages', []))}
- Résumé: {cv_analysis.get('summary', '')}
- Expériences: {json.dumps(cv_analysis.get('experiences', []), ensure_ascii=False)}

OFFRE D'EMPLOI:
- Titre: {job_offer.get('title', '')}
- Entreprise: {job_offer.get('company', '')}
- Lieu: {job_offer.get('location', '')}
- Description: {job_offer.get('description', '')}
- Type de contrat: {job_offer.get('contract_type', '')}

Génère le CV en format texte structuré avec des sections claires:
1. En-tête (nom, contact, titre professionnel adapté)
2. Profil / Résumé professionnel (adapté au poste)
3. Compétences clés (priorisées selon le poste)
4. Expériences professionnelles (avec mots-clés du poste)
5. Formation
6. Langues et compétences complémentaires

Adapte le vocabulaire et les mots-clés au poste visé. Sois honnête et ne fabrique pas d'expériences.""",
            }
        ],
    )

    return message.content[0].text


def generate_cover_letter(cv_analysis: dict, job_offer: dict) -> str:
    """Generate a cover letter for a specific job offer."""
    client = _get_client()

    today = datetime.now().strftime("%d/%m/%Y")

    message = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=2000,
        messages=[
            {
                "role": "user",
                "content": f"""Tu es un expert en recrutement et en rédaction de lettres de motivation en France.

Rédige une lettre de motivation professionnelle et personnalisée pour cette offre d'emploi.

PROFIL DU CANDIDAT:
- Nom: {cv_analysis.get('name', 'Candidat')}
- Compétences: {', '.join(cv_analysis.get('key_skills', []))}
- Expérience: {cv_analysis.get('experience_years', 0)} ans
- Domaine: {cv_analysis.get('domain', '')}
- Résumé: {cv_analysis.get('summary', '')}

OFFRE D'EMPLOI:
- Titre: {job_offer.get('title', '')}
- Entreprise: {job_offer.get('company', '')}
- Lieu: {job_offer.get('location', '')}
- Description: {job_offer.get('description', '')}

Date du jour: {today}

La lettre doit:
1. Être en français
2. Suivre le format standard français (lieu/date, objet, formule de politesse)
3. Montrer la motivation pour CE poste spécifique dans CETTE entreprise
4. Mettre en avant les compétences et expériences pertinentes
5. Être personnalisée et non générique
6. Faire environ 300-400 mots
7. Conclure avec une demande d'entretien

Ne fabrique pas d'informations. Base-toi uniquement sur le profil fourni.""",
            }
        ],
    )

    return message.content[0].text


def _escape_xml(text: str) -> str:
    """Escape XML special characters for ReportLab."""
    return text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def generate_pdf(content: str, title: str, output_path: str):
    """Generate a PDF from text content using ReportLab."""
    doc = SimpleDocTemplate(
        output_path, pagesize=A4,
        leftMargin=2 * cm, rightMargin=2 * cm,
        topMargin=2 * cm, bottomMargin=2 * cm,
    )

    styles = getSampleStyleSheet()
    title_style = ParagraphStyle("DocTitle", parent=styles["Title"], fontSize=16, alignment=TA_CENTER, spaceAfter=20)
    heading_style = ParagraphStyle("Heading", parent=styles["Heading2"], fontSize=13, spaceAfter=8, spaceBefore=14, textColor="#4361ee")
    body_style = ParagraphStyle("Body", parent=styles["Normal"], fontSize=10.5, leading=15, spaceAfter=4)
    bold_style = ParagraphStyle("Bold", parent=body_style, fontName="Helvetica-Bold")
    bullet_style = ParagraphStyle("Bullet", parent=body_style, leftIndent=20, bulletIndent=10)

    story = [Paragraph(_escape_xml(title), title_style), Spacer(1, 12)]

    for line in content.split("\n"):
        line = line.strip()
        if not line:
            story.append(Spacer(1, 6))
        elif line.startswith("##"):
            story.append(Paragraph(_escape_xml(line.replace("#", "").strip()), heading_style))
        elif line.startswith("**") and line.endswith("**"):
            story.append(Paragraph(_escape_xml(line.strip("* ")), bold_style))
        elif line.startswith("- ") or line.startswith("* "):
            story.append(Paragraph(_escape_xml(line[2:]), bullet_style, bulletText="\u2022"))
        else:
            story.append(Paragraph(_escape_xml(line), body_style))

    doc.build(story)
    return output_path
