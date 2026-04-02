# JobAssist - Assistant de Candidature Intelligent

Application web qui analyse votre CV, recherche des offres d'emploi correspondantes en Île-de-France, et génère un CV adapté et une lettre de motivation personnalisée pour chaque poste.

## Fonctionnalités

- **Upload & Analyse de CV** : Upload PDF/DOCX, extraction automatique des informations clés via IA
- **Recherche d'emploi** : Recherche sur France Travail et Indeed en Île-de-France
- **Génération de documents** : CV adapté et lettre de motivation personnalisés pour chaque offre
- **Export PDF** : Téléchargement des documents générés en PDF
- **Candidature directe** : Redirection vers le site de l'annonce pour postuler

## Installation

```bash
# Cloner le repo
git clone <repo-url>
cd perso

# Créer un environnement virtuel
python -m venv venv
source venv/bin/activate  # Linux/Mac
# venv\Scripts\activate   # Windows

# Installer les dépendances
pip install -r requirements.txt

# Configurer les variables d'environnement
cp .env.example .env
# Éditer .env et ajouter votre clé API Anthropic
```

## Configuration

Créez un fichier `.env` à la racine avec :

```
ANTHROPIC_API_KEY=votre_clé_api_anthropic
SECRET_KEY=une_clé_secrète_pour_flask
```

## Lancement

```bash
python run.py
```

L'application sera accessible sur `http://localhost:5000`

## Architecture

```
perso/
├── app/
│   ├── __init__.py          # Factory Flask
│   ├── routes.py            # Routes API
│   ├── cv_parser.py         # Extraction texte PDF/DOCX
│   ├── ai_generator.py      # Analyse IA et génération documents
│   ├── job_search.py        # Recherche d'offres d'emploi
│   ├── static/
│   │   ├── css/style.css    # Styles
│   │   ├── js/app.js        # Logique frontend
│   │   ├── uploads/         # CVs uploadés
│   │   └── generated/       # Documents générés
│   └── templates/
│       └── index.html       # Interface utilisateur
├── run.py                   # Point d'entrée
├── requirements.txt         # Dépendances Python
└── .env.example             # Template de configuration
```

## Technologies

- **Backend** : Flask, Python 3.10+
- **IA** : Claude (Anthropic API) pour l'analyse et la génération
- **Parsing** : PyPDF2, python-docx
- **Recherche** : BeautifulSoup4, Requests
- **Frontend** : Bootstrap 5, JavaScript vanilla
- **PDF** : fpdf2
