"""Job search module - searches for jobs on multiple platforms."""

import re
import time
import logging
from dataclasses import dataclass, field, asdict
from urllib.parse import quote_plus

import requests
from bs4 import BeautifulSoup

logger = logging.getLogger(__name__)

try:
    import lxml  # noqa: F401
    HTML_PARSER = "lxml"
except ImportError:
    HTML_PARSER = "html.parser"

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/120.0.0.0 Safari/537.36"
    ),
    "Accept-Language": "fr-FR,fr;q=0.9,en;q=0.8",
}


@dataclass
class JobOffer:
    title: str
    company: str
    location: str
    description: str
    url: str
    source: str
    date: str = ""
    contract_type: str = ""
    salary: str = ""
    tags: list = field(default_factory=list)

    def to_dict(self):
        return asdict(self)


def search_france_travail(keywords: str, location: str = "Île-de-France") -> list[JobOffer]:
    """Search jobs on France Travail (ex Pôle Emploi) API."""
    offers = []
    try:
        encoded_kw = quote_plus(keywords)
        encoded_loc = quote_plus(location)
        url = (
            f"https://candidat.francetravail.fr/offres/recherche?"
            f"motsCles={encoded_kw}&offresPartenaires=true"
            f"&range=0-19&rayon=30&lieu={encoded_loc}"
        )
        resp = requests.get(url, headers=HEADERS, timeout=15)
        if resp.status_code != 200:
            logger.warning("France Travail returned status %d", resp.status_code)
            return offers

        soup = BeautifulSoup(resp.text, HTML_PARSER)
        results = soup.select("li.result")

        for item in results[:10]:
            title_el = item.select_one("h2.t4, h2.media-heading, .subtext a, a[data-id-offre]")
            link_el = item.select_one("a[href*='/offres/']")

            title = title_el.get_text(strip=True) if title_el else "Poste non spécifié"
            company_el = item.select_one(".subtext, .enterprise, p.t4")
            company = company_el.get_text(strip=True) if company_el else "Entreprise non précisée"
            loc_el = item.select_one(".location, .subtext + p")
            loc = loc_el.get_text(strip=True) if loc_el else location

            offer_url = ""
            if link_el and link_el.get("href"):
                href = link_el["href"]
                offer_url = href if href.startswith("http") else f"https://candidat.francetravail.fr{href}"

            desc_el = item.select_one(".description, p.description")
            desc = desc_el.get_text(strip=True) if desc_el else ""

            contract_el = item.select_one(".contract, .contrat")
            contract = contract_el.get_text(strip=True) if contract_el else ""

            offers.append(JobOffer(
                title=title,
                company=company,
                location=loc,
                description=desc[:500],
                url=offer_url,
                source="France Travail",
                contract_type=contract,
            ))
    except Exception as e:
        logger.error("Error searching France Travail: %s", e)

    return offers


def search_indeed(keywords: str, location: str = "Île-de-France") -> list[JobOffer]:
    """Search jobs on Indeed France."""
    offers = []
    try:
        encoded_kw = quote_plus(keywords)
        encoded_loc = quote_plus(location)
        url = f"https://fr.indeed.com/jobs?q={encoded_kw}&l={encoded_loc}&lang=fr"
        resp = requests.get(url, headers=HEADERS, timeout=15)
        if resp.status_code != 200:
            logger.warning("Indeed returned status %d", resp.status_code)
            return offers

        soup = BeautifulSoup(resp.text, HTML_PARSER)
        cards = soup.select(".job_seen_beacon, .jobsearch-ResultsList > li, .result")

        for card in cards[:10]:
            title_el = card.select_one("h2.jobTitle span, .jobTitle a, a.jcs-JobTitle")
            title = title_el.get_text(strip=True) if title_el else "Poste non spécifié"

            company_el = card.select_one("[data-testid='company-name'], .companyName, .company")
            company = company_el.get_text(strip=True) if company_el else "Entreprise non précisée"

            loc_el = card.select_one("[data-testid='text-location'], .companyLocation, .location")
            loc = loc_el.get_text(strip=True) if loc_el else location

            link_el = card.select_one("a[href*='/rc/clk'], a.jcs-JobTitle, h2 a")
            offer_url = ""
            if link_el and link_el.get("href"):
                href = link_el["href"]
                offer_url = href if href.startswith("http") else f"https://fr.indeed.com{href}"

            desc_el = card.select_one(".job-snippet, .summary, [class*='snippet']")
            desc = desc_el.get_text(strip=True) if desc_el else ""

            offers.append(JobOffer(
                title=title,
                company=company,
                location=loc,
                description=desc[:500],
                url=offer_url,
                source="Indeed",
            ))
    except Exception as e:
        logger.error("Error searching Indeed: %s", e)

    return offers


def build_search_queries(cv_analysis: dict) -> list[str]:
    """Build search queries from CV analysis results."""
    queries = []
    if cv_analysis.get("job_title"):
        queries.append(cv_analysis["job_title"])
    if cv_analysis.get("key_skills"):
        skills = cv_analysis["key_skills"]
        if isinstance(skills, list):
            queries.append(" ".join(skills[:3]))
        else:
            queries.append(str(skills))
    if cv_analysis.get("domain"):
        queries.append(cv_analysis["domain"])
    if not queries:
        queries.append("développeur informatique")
    return queries


def search_jobs(cv_analysis: dict, location: str = "Île-de-France") -> list[dict]:
    """Main search function - searches across multiple platforms."""
    queries = build_search_queries(cv_analysis)
    all_offers = []
    seen_titles = set()

    for query in queries:
        for search_fn in [search_france_travail, search_indeed]:
            results = search_fn(query, location)
            for offer in results:
                key = f"{offer.title.lower()}_{offer.company.lower()}"
                if key not in seen_titles:
                    seen_titles.add(key)
                    all_offers.append(offer.to_dict())
            time.sleep(1)  # Rate limiting

    # If scraping returned nothing, provide constructed search URLs
    if not all_offers:
        for query in queries:
            encoded = quote_plus(query)
            all_offers.append({
                "title": f"Recherche: {query}",
                "company": "France Travail",
                "location": location,
                "description": f"Cliquez pour voir les résultats de recherche pour '{query}' en {location}",
                "url": f"https://candidat.francetravail.fr/offres/recherche?motsCles={encoded}&lieu=75D&rayon=30",
                "source": "France Travail",
                "date": "",
                "contract_type": "",
                "salary": "",
                "tags": [],
            })
            all_offers.append({
                "title": f"Recherche: {query}",
                "company": "Indeed",
                "location": location,
                "description": f"Cliquez pour voir les résultats de recherche pour '{query}' en {location}",
                "url": f"https://fr.indeed.com/jobs?q={encoded}&l=%C3%8Ele-de-France",
                "source": "Indeed",
                "date": "",
                "contract_type": "",
                "salary": "",
                "tags": [],
            })

    return all_offers[:20]
