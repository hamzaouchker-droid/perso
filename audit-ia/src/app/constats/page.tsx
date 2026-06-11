"use client";

import { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  MessageSquare,
  Filter,
  Search,
  Plus,
  ChevronDown,
  ChevronUp,
  FileText,
  ExternalLink,
} from "lucide-react";

const constats = [
  {
    id: "C-2026-001", mission: "M-2026-001", missionLib: "Audit LCB-FT",
    situation: "Dossiers KYC incomplets pour 15% des clients à risque élevé, absence de pièces justificatives d'identité et de domicile pour les entrées en relation depuis le T3 2025.",
    critere: "Arrêté du 3/11/2014 art. 11-7, Orientations conjointes ESA sur les facteurs de risque en matière de LCB-FT",
    cause: "Défaillance du contrôle de premier niveau à l'entrée en relation, absence de blocage système en cas de dossier incomplet",
    consequence: "Risque de non-conformité LCB-FT, exposition à des sanctions ACPR, risque d'entrée en relation avec des clients à risque non identifiés",
    cotation: "majeur", entite: "Réseau Particuliers", risques: ["LCB-FT", "Conformité"],
    statut: "valide", etiquettes: ["LCB-FT"],
    reponseAudite: "Nous reconnaissons ce constat. Un plan de remédiation est en cours de déploiement avec blocage système prévu au T3 2026.",
  },
  {
    id: "C-2026-002", mission: "M-2026-001", missionLib: "Audit LCB-FT",
    situation: "Retards significatifs dans le traitement des alertes LCB-FT : délai moyen de 12 jours ouvrés vs objectif interne de 5 jours, avec 45 alertes en stock dépassant 30 jours.",
    critere: "Art. L.561-6 CMF, Lignes directrices ACPR sur les systèmes de surveillance LCB-FT",
    cause: "Sous-dimensionnement de l'équipe d'analyse (3 ETP vs 5 nécessaires), absence de priorisation automatique des alertes",
    consequence: "Risque de non-déclaration de soupçon dans les délais, risque de sanctions pénales et administratives",
    cotation: "critique", entite: "Direction Conformité", risques: ["LCB-FT"],
    statut: "contradictoire", etiquettes: ["LCB-FT"],
    reponseAudite: null,
  },
  {
    id: "C-2026-003", mission: "M-2026-002", missionLib: "Revue crédit immobilier",
    situation: "Non-respect du ratio d'endettement maximal (35%) dans 8% des dossiers examinés, soit 12 dossiers sur l'échantillon de 150.",
    critere: "Recommandation HCSF du 27/01/2021 sur les conditions d'octroi de crédit immobilier",
    cause: "Dérogations accordées sans justification formalisée par le comité de crédit, absence de contrôle bloquant dans l'outil d'octroi",
    consequence: "Non-conformité aux recommandations du HCSF, risque de crédit accru, risque de sur-endettement des emprunteurs",
    cotation: "significatif", entite: "Direction Crédit", risques: ["Crédit", "Conformité"],
    statut: "valide", etiquettes: [],
    reponseAudite: "Nous partageons ce constat. Les dérogations seront désormais systématiquement documentées et soumises à un double regard.",
  },
  {
    id: "C-2026-004", mission: "M-2026-002", missionLib: "Revue crédit immobilier",
    situation: "Absence de revue annuelle des délégations de crédit depuis 2024, certaines délégations obsolètes suite aux réorganisations.",
    critere: "Politique de crédit interne, Arrêté du 3/11/2014 art. 26",
    cause: "Turnover au sein de la direction crédit, priorité donnée à la transformation digitale",
    consequence: "Risque d'octroi de crédit par des personnes non habilitées ou à des niveaux inadéquats",
    cotation: "significatif", entite: "Direction Crédit", risques: ["Opérationnel", "Crédit"],
    statut: "valide", etiquettes: [],
    reponseAudite: "Une revue complète des délégations sera réalisée au T2 2026.",
  },
  {
    id: "C-2026-005", mission: "M-2026-004", missionLib: "Opérations de marché",
    situation: "Valorisation indépendante des instruments dérivés non réalisée mensuellement pour 3 portefeuilles sur 8, écarts non investigués depuis 6 mois.",
    critere: "CRR art. 105, Politique de valorisation interne",
    cause: "Départ du responsable valorisation non remplacé, absence d'outil automatisé de rapprochement",
    consequence: "Risque de valorisation incorrecte, impact potentiel sur les fonds propres réglementaires, risque d'image auprès du superviseur",
    cotation: "critique", entite: "Direction Financière", risques: ["Marché", "Opérationnel"],
    statut: "valide", etiquettes: [],
    reponseAudite: "Un recrutement est en cours. L'outil de rapprochement automatique sera déployé au T4 2026.",
  },
  {
    id: "C-2026-006", mission: "M-2026-004", missionLib: "Opérations de marché",
    situation: "Dépassements de limites de marché non escaladés conformément à la procédure dans 25% des cas observés.",
    critere: "Arrêté du 3/11/2014, Politique de gestion des risques de marché",
    cause: "Méconnaissance de la procédure d'escalade révisée en 2025, absence de contrôle automatique d'escalade",
    consequence: "Prise de risque non maîtrisée, défaillance du dispositif de contrôle de 2e niveau",
    cotation: "majeur", entite: "Direction Financière", risques: ["Marché"],
    statut: "valide", etiquettes: [],
    reponseAudite: "Formation de l'ensemble des opérateurs prévue en juin 2026. Automatisation de l'escalade en cours de développement.",
  },
  {
    id: "C-2026-007", mission: "M-2026-008", missionLib: "Audit SSI",
    situation: "42 serveurs critiques fonctionnent avec des systèmes d'exploitation en fin de support (EOL), sans correctifs de sécurité depuis plus de 12 mois.",
    critere: "Guide d'hygiène ANSSI, DORA art. 9 (gestion des actifs TIC)",
    cause: "Contraintes de compatibilité applicative, budget de migration insuffisant sur les exercices précédents",
    consequence: "Vulnérabilités critiques exploitables, risque de compromission du SI, non-conformité DORA",
    cotation: "critique", entite: "DSI", risques: ["TIC/Cyber"],
    statut: "valide", etiquettes: ["DORA"],
    reponseAudite: "Programme de migration initié. 60% des serveurs seront migrés avant fin 2026, le reste au T1 2027.",
  },
  {
    id: "C-2026-008", mission: "M-2026-008", missionLib: "Audit SSI",
    situation: "Tests d'intrusion annuels non réalisés sur le périmètre des applications bancaires exposées sur Internet (banque en ligne, API partenaires).",
    critere: "DORA art. 26 (tests de pénétration fondés sur la menace), PSSI interne",
    cause: "Retard dans la contractualisation du prestataire de pentest, arbitrage budgétaire défavorable",
    consequence: "Vulnérabilités non détectées sur le périmètre le plus exposé, non-conformité aux exigences DORA sur les TLPT",
    cotation: "majeur", entite: "DSI", risques: ["TIC/Cyber"],
    statut: "contradictoire", etiquettes: ["DORA"],
    reponseAudite: null,
  },
];

function getCotationStyle(c: string) {
  const map: Record<string, { bg: string; text: string; ring: string }> = {
    critique: { bg: "bg-red-50", text: "text-red-700", ring: "ring-red-200" },
    majeur: { bg: "bg-orange-50", text: "text-orange-700", ring: "ring-orange-200" },
    significatif: { bg: "bg-amber-50", text: "text-amber-700", ring: "ring-amber-200" },
    mineur: { bg: "bg-blue-50", text: "text-blue-700", ring: "ring-blue-200" },
  };
  return map[c] || map.mineur;
}

export default function ConstatsPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filterCotation, setFilterCotation] = useState("all");
  const [filterStatut, setFilterStatut] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = constats.filter((c) => {
    if (filterCotation !== "all" && c.cotation !== filterCotation) return false;
    if (filterStatut !== "all" && c.statut !== filterStatut) return false;
    if (searchTerm && !c.situation.toLowerCase().includes(searchTerm.toLowerCase()) && !c.id.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const critiques = constats.filter((c) => c.cotation === "critique").length;
  const majeurs = constats.filter((c) => c.cotation === "majeur").length;
  const enContradictoire = constats.filter((c) => c.statut === "contradictoire").length;

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Constats & Recommandations</h1>
            <p className="text-sm text-gray-500 mt-1">Gestion des constats d&apos;audit et phase contradictoire</p>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-xl font-semibold text-sm shadow-lg shadow-amber-200/50">
            <Plus className="w-4 h-4" />
            Nouveau constat
          </button>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center"><FileText className="w-5 h-5 text-gray-600" /></div>
            <div><p className="text-xl font-bold text-gray-900">{constats.length}</p><p className="text-xs text-gray-500">Total constats</p></div>
          </div>
          <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center"><AlertTriangle className="w-5 h-5 text-red-600" /></div>
            <div><p className="text-xl font-bold text-red-600">{critiques}</p><p className="text-xs text-gray-500">Critiques</p></div>
          </div>
          <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center"><AlertTriangle className="w-5 h-5 text-orange-600" /></div>
            <div><p className="text-xl font-bold text-orange-600">{majeurs}</p><p className="text-xs text-gray-500">Majeurs</p></div>
          </div>
          <div className="bg-white rounded-2xl border border-amber-100 shadow-sm p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center"><MessageSquare className="w-5 h-5 text-amber-600" /></div>
            <div><p className="text-xl font-bold text-amber-600">{enContradictoire}</p><p className="text-xs text-gray-500">En contradictoire</p></div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un constat..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:ring-2 focus:ring-amber-300"
            />
          </div>
          <select value={filterCotation} onChange={(e) => setFilterCotation(e.target.value)} className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm bg-white">
            <option value="all">Toutes cotations</option>
            <option value="critique">Critique</option>
            <option value="majeur">Majeur</option>
            <option value="significatif">Significatif</option>
            <option value="mineur">Mineur</option>
          </select>
          <select value={filterStatut} onChange={(e) => setFilterStatut(e.target.value)} className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm bg-white">
            <option value="all">Tous statuts</option>
            <option value="valide">Validé</option>
            <option value="contradictoire">En contradictoire</option>
            <option value="projet">Projet</option>
          </select>
        </div>

        {/* Constats list */}
        <div className="space-y-4">
          {filtered.map((c) => {
            const cs = getCotationStyle(c.cotation);
            const isExpanded = expandedId === c.id;
            return (
              <div key={c.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:border-amber-200/50 transition-all">
                <div
                  className="px-6 py-4 cursor-pointer"
                  onClick={() => setExpandedId(isExpanded ? null : c.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-mono text-xs text-gray-400">{c.id}</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ring-1 ${cs.bg} ${cs.text} ${cs.ring}`}>
                          {c.cotation.charAt(0).toUpperCase() + c.cotation.slice(1)}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${c.statut === "valide" ? "bg-emerald-50 text-emerald-700" : c.statut === "contradictoire" ? "bg-amber-50 text-amber-700" : "bg-gray-50 text-gray-600"}`}>
                          {c.statut === "valide" ? "Validé" : c.statut === "contradictoire" ? "En contradictoire" : "Projet"}
                        </span>
                        {c.etiquettes.map((e) => (
                          <span key={e} className="px-1.5 py-0.5 bg-amber-50 text-amber-700 rounded text-[10px] font-bold">{e}</span>
                        ))}
                      </div>
                      <p className="text-sm text-gray-900 font-medium">{c.situation}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        <span className="font-medium">{c.missionLib}</span> • {c.entite} • {c.risques.join(", ")}
                      </p>
                    </div>
                    <button className="p-1 text-gray-400">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-6 pb-5 border-t border-gray-50 pt-4">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Référentiel / Critère</label>
                          <p className="mt-1 text-sm text-gray-700">{c.critere}</p>
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Cause(s)</label>
                          <p className="mt-1 text-sm text-gray-700">{c.cause}</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Conséquence(s) / Risque(s)</label>
                          <p className="mt-1 text-sm text-gray-700">{c.consequence}</p>
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" /> Réponse de l&apos;audité
                          </label>
                          {c.reponseAudite ? (
                            <p className="mt-1 text-sm text-gray-700 bg-blue-50/50 rounded-lg p-3 border border-blue-100">{c.reponseAudite}</p>
                          ) : (
                            <p className="mt-1 text-sm text-gray-400 italic">En attente de réponse</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
