"""CV parsing module - extracts text from PDF and DOCX files."""

import os
import re

from PyPDF2 import PdfReader
from docx import Document


def extract_text_from_pdf(file_path: str) -> str:
    reader = PdfReader(file_path)
    text = ""
    for page in reader.pages:
        page_text = page.extract_text()
        if page_text:
            text += page_text + "\n"
    return text.strip()


def extract_text_from_docx(file_path: str) -> str:
    doc = Document(file_path)
    text = "\n".join(paragraph.text for paragraph in doc.paragraphs if paragraph.text.strip())
    return text.strip()


def parse_cv(file_path: str) -> str:
    ext = os.path.splitext(file_path)[1].lower()
    if ext == ".pdf":
        return extract_text_from_pdf(file_path)
    elif ext in (".docx", ".doc"):
        return extract_text_from_docx(file_path)
    else:
        raise ValueError(f"Format non supporté: {ext}. Utilisez PDF ou DOCX.")


def extract_profile_summary(cv_text: str) -> dict:
    """Extract basic info from CV text using patterns."""
    email_pattern = r"[\w.+-]+@[\w-]+\.[\w.-]+"
    phone_pattern = r"(?:\+33|0)\s*[1-9](?:[\s.-]*\d{2}){4}"

    emails = re.findall(email_pattern, cv_text)
    phones = re.findall(phone_pattern, cv_text)

    lines = cv_text.split("\n")
    name = lines[0].strip() if lines else "Non détecté"

    return {
        "name": name,
        "email": emails[0] if emails else "Non détecté",
        "phone": phones[0] if phones else "Non détecté",
        "raw_text": cv_text,
    }
