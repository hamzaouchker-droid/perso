"use client";

import { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import {
  Calendar,
  Target,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  ChevronRight,
  Plus,
  Filter,
  Download,
  Eye,
  Clock,
  BarChart3,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

const NAVY = "#0A1628";
const GOLD = "#C9A84C";

const tabs = [
  { id: "risques", label: "Évaluation des risques", icon: Target },
  { id: "pluriannuel", label: "Plan pluriannuel", icon: Calendar },
  { id: "annuel", label: "Plan annuel 2026", icon: BarChart3 },
];

const riskEvaluations = [
  { id: 1, objet: "Octroi de crédit immobilier", entite: "Direction Crédit", scoreInherent: 85, scoreMaitrise: 60, scoreGlobal: 72, cote: 4, frequence: 1, override: false },
  { id: 2, objet: "Dispositif LCB-FT", entite: "Direction Conformité", scoreInherent: 90, scoreMaitrise: 70, scoreGlobal: 65, cote: 3, frequence: 2, override: false },
  { id: 3, objet: "Sécurité des SI", entite: "DSI", scoreInherent: 88, scoreMaitrise: 55, scoreGlobal: 78, cote: 4, frequence: 1, override: false },
  { id: 4, objet: "Opérations de marché", entite: "Direction Financière", scoreInherent: 82, scoreMaitrise: 65, scoreGlobal: 62, cote: 3, frequence: 2, override: true },
  { id: 5, objet: "Gestion de la trésorerie", entite: "Direction Financière", scoreInherent: 70, scoreMaitrise: 75, scoreGlobal: 45, cote: 2, frequence: 3, override: false },
  { id: 6, objet: "Conformité réglementaire", entite: "Direction Conformité", scoreInherent: 78, scoreMaitrise: 68, scoreGlobal: 55, cote: 3, frequence: 2, override: false },
  { id: 7, objet: "Dispositif Sapin II", entite: "Direction Conformité", scoreInherent: 72, scoreMaitrise: 60, scoreGlobal: 58, cote: 3, frequence: 2, override: false },
  { id: 8, objet: "Résilience opérationnelle (DORA)", entite: "DSI", scoreInherent: 92, scoreMaitrise: 50, scoreGlobal: 82, cote: 4, frequence: 1, override: false },
  { id: 9, objet: "Gestion des risques de crédit", entite: "Direction des Risques", scoreInherent: 80, scoreMaitrise: 72, scoreGlobal: 52, cote: 2, frequence: 2, override: false },
  { id: 10, objet: "Externalisations essentielles", entite: "Direction Générale", scoreInherent: 75, scoreMaitrise: 58, scoreGlobal: 65, cote: 3, frequence: 2, override: true },
  { id: 11, objet: "Banque en ligne & mobile", entite: "DSI", scoreInherent: 85, scoreMaitrise: 62, scoreGlobal: 68, cote: 3, frequence: 2, override: false },
  { id: 12, objet: "Gestion des réclamations", entite: "Réseau Particuliers", scoreInherent: 55, scoreMaitrise: 78, scoreGlobal: 32, cote: 1, frequence: 4, override: false },
  { id: 13, objet: "Protection des données (RGPD)", entite: "Direction Conformité", scoreInherent: 76, scoreMaitrise: 65, scoreGlobal: 58, cote: 3, frequence: 2, override: false },
  { id: 14, objet: "Continuité d'activité (PCA)", entite: "Direction Générale", scoreInherent: 88, scoreMaitrise: 60, scoreGlobal: 70, cote: 3, frequence: 2, override: false },
  { id: 15, objet: "Crédit à la consommation", entite: "Réseau Particuliers", scoreInherent: 68, scoreMaitrise: 72, scoreGlobal: 42, cote: 2, frequence: 3, override: false },
];

const heatMapData = [
  [1, 2, 3, 2],
  [0, 2, 2, 1],
  [1, 1, 1, 0],
  [0, 1, 0, 0],
];
const heatLabels = { x: ["Faible", "Modéré", "Élevé", "Critique"], y: ["Critique", "Élevé", "Modéré", "Faible"] };
const heatColors = [
  ["#22C55E", "#EAB308", "#F97316", "#EF4444"],
  ["#86EFAC", "#22C55E", "#EAB308", "#F97316"],
  ["#BBF7D0", "#86EFAC", "#22C55E", "#EAB308"],
  ["#DCFCE7", "#BBF7D0", "#86EFAC", "#22C55E"],
];

const pluriannuelData = [
  { objet: "Octroi crédit immobilier", entite: "Dir. Crédit", y2022: "done", y2023: null, y2024: "done", y2025: null, y2026: "planned" },
  { objet: "Dispositif LCB-FT", entite: "Dir. Conformité", y2022: null, y2023: "done", y2024: null, y2025: "done", y2026: null },
  { objet: "Sécurité des SI", entite: "DSI", y2022: "done", y2023: null, y2024: null, y2025: "done", y2026: null },
  { objet: "Opérations de marché", entite: "Dir. Financière", y2022: null, y2023: "done", y2024: null, y2025: null, y2026: "planned" },
  { objet: "Trésorerie", entite: "Dir. Financière", y2022: null, y2023: null, y2024: "done", y2025: null, y2026: null },
  { objet: "Conformité réglementaire", entite: "Dir. Conformité", y2022: "done", y2023: null, y2024: null, y2025: null, y2026: "planned" },
  { objet: "Dispositif Sapin II", entite: "Dir. Conformité", y2022: null, y2023: null, y2024: "done", y2025: null, y2026: null },
  { objet: "DORA / Résilience", entite: "DSI", y2022: null, y2023: null, y2024: null, y2025: "done", y2026: "planned" },
  { objet: "Risques de crédit", entite: "Dir. Risques", y2022: null, y2023: "done", y2024: null, y2025: null, y2026: "planned" },
  { objet: "Externalisations", entite: "Dir. Générale", y2022: null, y2023: null, y2024: null, y2025: "done", y2026: null },
  { objet: "Banque en ligne", entite: "DSI", y2022: null, y2023: null, y2024: "done", y2025: null, y2026: "planned" },
  { objet: "Réclamations clients", entite: "Réseau", y2022: "done", y2023: null, y2024: null, y2025: null, y2026: null },
  { objet: "Protection données", entite: "Dir. Conformité", y2022: null, y2023: null, y2024: null, y2025: null, y2026: "planned" },
  { objet: "PCA / Continuité", entite: "Dir. Générale", y2022: null, y2023: "done", y2024: null, y2025: null, y2026: "planned" },
];

const capaciteParAn = [
  { annee: "2024", planifie: 1380, disponible: 1500 },
  { annee: "2025", planifie: 1420, disponible: 1500 },
  { annee: "2026", planifie: 1450, disponible: 1500 },
  { annee: "2027", planifie: 1200, disponible: 1500 },
  { annee: "2028", planifie: 800, disponible: 1500 },
];

const missionsAnnuelles = [
  { ref: "M-2026-001", libelle: "Audit du dispositif LCB-FT", type: "obligation_reglementaire", periode: "Jan - Mar", budget: 80, etiquettes: ["LCB-FT"], statut: "travaux_en_cours" },
  { ref: "M-2026-002", libelle: "Revue crédit immobilier", type: "cycle", periode: "Fév - Avr", budget: 90, etiquettes: [], statut: "contradictoire" },
  { ref: "M-2026-003", libelle: "Audit DORA / Résilience numérique", type: "obligation_reglementaire", periode: "Mar - Mai", budget: 100, etiquettes: ["DORA"], statut: "preparation" },
  { ref: "M-2026-004", libelle: "Contrôle opérations de marché", type: "cycle", periode: "Avr - Juin", budget: 85, etiquettes: [], statut: "rapport_valide" },
  { ref: "M-2026-005", libelle: "Audit dispositif Sapin II", type: "obligation_reglementaire", periode: "Mai - Juil", budget: 70, etiquettes: ["Sapin II"], statut: "planifiee" },
  { ref: "M-2026-006", libelle: "Revue fonction conformité", type: "cycle", periode: "Juin - Août", budget: 75, etiquettes: [], statut: "travaux_en_cours" },
  { ref: "M-2026-007", libelle: "Audit externalisations essentielles", type: "cycle", periode: "Juil - Sep", budget: 80, etiquettes: [], statut: "cloturee" },
  { ref: "M-2026-008", libelle: "Audit SSI & cybersécurité", type: "cycle", periode: "Août - Oct", budget: 95, etiquettes: ["DORA"], statut: "projet_rapport" },
  { ref: "M-2026-009", libelle: "Risques de crédit consommation", type: "cycle", periode: "Sep - Nov", budget: 65, etiquettes: [], statut: "planifiee" },
  { ref: "M-2026-010", libelle: "Audit banque en ligne & mobile", type: "cycle", periode: "Sep - Nov", budget: 85, etiquettes: ["DORA"], statut: "planifiee" },
  { ref: "M-2026-011", libelle: "Protection des données (RGPD)", type: "obligation_reglementaire", periode: "Oct - Déc", budget: 70, etiquettes: ["RGPD"], statut: "planifiee" },
  { ref: "M-2026-012", libelle: "PCA / Continuité d'activité", type: "cycle", periode: "Oct - Déc", budget: 75, etiquettes: ["DORA"], statut: "planifiee" },
  { ref: "M-2026-013", libelle: "Gestion des risques de modèle", type: "demande_gouvernance", periode: "Nov - Déc", budget: 60, etiquettes: [], statut: "planifiee" },
  { ref: "M-2026-014", libelle: "Audit du dispositif de rémunération", type: "obligation_reglementaire", periode: "Nov - Déc", budget: 55, etiquettes: [], statut: "planifiee" },
  { ref: "M-2026-015", libelle: "Mission flash - Incident cyber", type: "suite_incident", periode: "Fév", budget: 20, etiquettes: ["DORA"], statut: "cloturee" },
  { ref: "M-2026-016", libelle: "Mission ACPR - Gouvernance", type: "demande_acpr", periode: "Avr - Mai", budget: 40, etiquettes: [], statut: "travaux_en_cours" },
  { ref: "M-2026-017", libelle: "Revue qualité données risques (BCBS 239)", type: "obligation_reglementaire", periode: "Jun - Aug", budget: 80, etiquettes: [], statut: "planifiee" },
  { ref: "M-2026-018", libelle: "Audit gestion réclamations clients", type: "cycle", periode: "Oct - Nov", budget: 50, etiquettes: [], statut: "planifiee" },
];

const workflowSteps = [
  { id: "elaboration", label: "Élaboration", done: true },
  { id: "avis_de", label: "Avis Dirigeant Effectif", done: true },
  { id: "approbation", label: "Approbation Comité d'audit", done: true },
];

function getCoteColor(cote: number) {
  if (cote === 4) return "bg-red-100 text-red-700 ring-red-200";
  if (cote === 3) return "bg-orange-100 text-orange-700 ring-orange-200";
  if (cote === 2) return "bg-amber-100 text-amber-700 ring-amber-200";
  return "bg-green-100 text-green-700 ring-green-200";
}

function getCoteLabel(cote: number) {
  if (cote === 4) return "Critique";
  if (cote === 3) return "Élevé";
  if (cote === 2) return "Modéré";
  return "Faible";
}

function getStatutStyle(s: string) {
  const map: Record<string, string> = {
    planifiee: "bg-gray-100 text-gray-700",
    preparation: "bg-blue-100 text-blue-700",
    travaux_en_cours: "bg-indigo-100 text-indigo-700",
    contradictoire: "bg-amber-100 text-amber-700",
    projet_rapport: "bg-purple-100 text-purple-700",
    rapport_valide: "bg-emerald-100 text-emerald-700",
    cloturee: "bg-green-100 text-green-700",
  };
  return map[s] || "bg-gray-100 text-gray-700";
}

function getStatutLabel(s: string) {
  const map: Record<string, string> = {
    planifiee: "Planifiée",
    preparation: "Préparation",
    travaux_en_cours: "Travaux en cours",
    contradictoire: "Contradictoire",
    projet_rapport: "Projet de rapport",
    rapport_valide: "Rapport validé",
    cloturee: "Clôturée",
  };
  return map[s] || s;
}

function getTypeLabel(t: string) {
  const map: Record<string, string> = {
    cycle: "Cycle",
    demande_gouvernance: "Gouvernance",
    obligation_reglementaire: "Réglementaire",
    suite_incident: "Suite incident",
    demande_acpr: "Demande ACPR",
  };
  return map[t] || t;
}

function getTypeBadge(t: string) {
  const map: Record<string, string> = {
    cycle: "bg-blue-50 text-blue-700",
    demande_gouvernance: "bg-purple-50 text-purple-700",
    obligation_reglementaire: "bg-amber-50 text-amber-800",
    suite_incident: "bg-red-50 text-red-700",
    demande_acpr: "bg-rose-50 text-rose-700",
  };
  return map[t] || "bg-gray-50 text-gray-700";
}

function ScoreBar({ value, max = 100 }: { value: number; max?: number }) {
  const pct = (value / max) * 100;
  const color = pct >= 75 ? "#EF4444" : pct >= 50 ? "#F97316" : pct >= 25 ? "#EAB308" : "#22C55E";
  return (
    <div className="flex items-center gap-2">
      <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
      <span className="text-xs font-medium text-gray-600 w-8">{value}</span>
    </div>
  );
}

export default function PlanificationPage() {
  const [activeTab, setActiveTab] = useState("risques");
  const [campagne, setCampagne] = useState("2026");
  const [filterType, setFilterType] = useState("all");

  const radarData = [
    { subject: "Crédit", score: 72, prev: 65 },
    { subject: "Marché", score: 62, prev: 58 },
    { subject: "Opérationnel", score: 78, prev: 70 },
    { subject: "Conformité", score: 65, prev: 55 },
    { subject: "TIC/Cyber", score: 82, prev: 60 },
    { subject: "LCB-FT", score: 65, prev: 68 },
    { subject: "ESG", score: 45, prev: 40 },
    { subject: "Modèle", score: 52, prev: 48 },
  ];

  const filteredMissions = filterType === "all" ? missionsAnnuelles : missionsAnnuelles.filter((m) => m.type === filterType);

  const missionsDone = missionsAnnuelles.filter((m) => m.statut === "cloturee" || m.statut === "rapport_valide").length;
  const totalBudget = missionsAnnuelles.reduce((s, m) => s + m.budget, 0);
  const budgetConsomme = 842;

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Planification</h1>
            <p className="text-sm text-gray-500 mt-1">Évaluation des risques et planification pluriannuelle & annuelle</p>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-xl font-semibold text-sm shadow-lg shadow-amber-200/50 hover:shadow-amber-300/50 transition-all">
            <Download className="w-4 h-4" />
            Exporter le plan
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-xl p-1 shadow-sm border border-gray-100">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-800 shadow-sm border border-amber-200/50"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab: Évaluation des risques */}
        {activeTab === "risques" && (
          <div className="space-y-6">
            {/* Campaign selector + stats */}
            <div className="flex items-center gap-4">
              <select
                value={campagne}
                onChange={(e) => setCampagne(e.target.value)}
                className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium bg-white shadow-sm focus:ring-2 focus:ring-amber-300 focus:border-amber-300"
              >
                <option value="2026">Campagne 2026</option>
                <option value="2025">Campagne 2025</option>
              </select>
              <div className="flex-1" />
              <div className="flex gap-3">
                {[
                  { label: "Objets évalués", value: "15", icon: Target },
                  { label: "Score moyen", value: "60", icon: TrendingUp },
                  { label: "Objets critiques", value: "3", icon: AlertTriangle },
                  { label: "À réévaluer", value: "2", icon: Clock },
                ].map((s) => (
                  <div key={s.label} className="bg-white rounded-xl px-4 py-3 border border-gray-100 shadow-sm flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center">
                      <s.icon className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-900">{s.value}</p>
                      <p className="text-xs text-gray-500">{s.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Risk table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Scoring des objets auditables</h3>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100">
                    <Filter className="w-3 h-3 inline mr-1" />Filtrer
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50/80">
                      <th className="text-left px-6 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Objet auditable</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Entité</th>
                      <th className="text-center px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Risque inhérent</th>
                      <th className="text-center px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Maîtrise</th>
                      <th className="text-center px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Score global</th>
                      <th className="text-center px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Cote</th>
                      <th className="text-center px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Fréq.</th>
                      <th className="text-center px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Override</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {riskEvaluations.map((r) => (
                      <tr key={r.id} className="hover:bg-amber-50/30 transition-colors">
                        <td className="px-6 py-3 font-medium text-gray-900">{r.objet}</td>
                        <td className="px-4 py-3 text-gray-600">{r.entite}</td>
                        <td className="px-4 py-3"><ScoreBar value={r.scoreInherent} /></td>
                        <td className="px-4 py-3"><ScoreBar value={r.scoreMaitrise} /></td>
                        <td className="px-4 py-3"><ScoreBar value={r.scoreGlobal} /></td>
                        <td className="px-4 py-3 text-center">
                          <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold ring-1 ${getCoteColor(r.cote)}`}>
                            {getCoteLabel(r.cote)}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center text-gray-700 font-medium">{r.frequence} an{r.frequence > 1 ? "s" : ""}</td>
                        <td className="px-4 py-3 text-center">
                          {r.override && <span className="text-amber-500 text-xs font-bold">⚑</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Charts row */}
            <div className="grid grid-cols-2 gap-6">
              {/* Heat map */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Matrice des risques (Impact × Probabilité)</h3>
                <div className="flex">
                  <div className="flex flex-col justify-around pr-2 text-xs text-gray-500 font-medium">
                    {heatLabels.y.map((l) => <span key={l}>{l}</span>)}
                  </div>
                  <div className="flex-1">
                    <div className="grid grid-cols-4 gap-1">
                      {heatMapData.flatMap((row, ri) =>
                        row.map((val, ci) => (
                          <div
                            key={`${ri}-${ci}`}
                            className="aspect-square rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-sm"
                            style={{ backgroundColor: heatColors[ri][ci], opacity: val > 0 ? 1 : 0.4 }}
                          >
                            {val > 0 ? val : ""}
                          </div>
                        ))
                      )}
                    </div>
                    <div className="flex justify-around mt-2 text-xs text-gray-500 font-medium">
                      {heatLabels.x.map((l) => <span key={l}>{l}</span>)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Radar */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Profil de risque par catégorie (N vs N-1)</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#E5E7EB" />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "#6B7280" }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
                    <Radar name="2026" dataKey="score" stroke={GOLD} fill={GOLD} fillOpacity={0.25} strokeWidth={2} />
                    <Radar name="2025" dataKey="prev" stroke={NAVY} fill={NAVY} fillOpacity={0.1} strokeWidth={1.5} strokeDasharray="4 4" />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Plan pluriannuel */}
        {activeTab === "pluriannuel" && (
          <div className="space-y-6">
            {/* Coverage KPI */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <p className="text-sm text-gray-500 mb-1">Couverture cycle 5 ans</p>
                <p className="text-3xl font-bold text-gray-900">87%</p>
                <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-yellow-500" style={{ width: "87%" }} />
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <p className="text-sm text-gray-500 mb-1">Objets non planifiés (&gt; 5 ans)</p>
                <p className="text-3xl font-bold text-red-600">2</p>
                <p className="text-xs text-red-500 mt-1">Réclamations clients, Crédit conso</p>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <p className="text-sm text-gray-500 mb-1">Objets auditables actifs</p>
                <p className="text-3xl font-bold text-gray-900">14</p>
                <p className="text-xs text-gray-500 mt-1">sur 15 dans l&apos;univers d&apos;audit</p>
              </div>
            </div>

            {/* Timeline grid */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900">Plan pluriannuel glissant (2022–2028)</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50/80">
                      <th className="text-left px-6 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider min-w-[200px]">Objet auditable</th>
                      <th className="text-left px-3 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Entité</th>
                      {["2022", "2023", "2024", "2025", "2026", "2027", "2028"].map((y) => (
                        <th key={y} className={`text-center px-3 py-3 font-semibold text-xs uppercase tracking-wider ${y === "2026" ? "text-amber-700 bg-amber-50/50" : "text-gray-600"}`}>{y}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {pluriannuelData.map((row) => (
                      <tr key={row.objet} className="hover:bg-amber-50/30 transition-colors">
                        <td className="px-6 py-3 font-medium text-gray-900">{row.objet}</td>
                        <td className="px-3 py-3 text-gray-500 text-xs">{row.entite}</td>
                        {(["y2022", "y2023", "y2024", "y2025", "y2026", "y2027", "y2028"] as const).map((k) => {
                          const val = (row as Record<string, unknown>)[k] as string | null;
                          return (
                            <td key={k} className={`text-center px-3 py-3 ${k === "y2026" ? "bg-amber-50/30" : ""}`}>
                              {val === "done" && <span className="inline-block w-4 h-4 rounded-full bg-emerald-500 shadow-sm" title="Réalisé" />}
                              {val === "planned" && <span className="inline-block w-4 h-4 rounded-full bg-blue-400 shadow-sm ring-2 ring-blue-200" title="Planifié" />}
                              {!val && <span className="inline-block w-4 h-4 rounded-full bg-gray-100" />}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-3 border-t border-gray-100 flex gap-6 text-xs text-gray-500">
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" /> Réalisé</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-blue-400 ring-2 ring-blue-200 inline-block" /> Planifié</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-gray-100 inline-block" /> Non planifié</span>
              </div>
            </div>

            {/* Capacity chart */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Capacité vs Charge planifiée (jours/homme)</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={capaciteParAn} barGap={8}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                  <XAxis dataKey="annee" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #E5E7EB", fontSize: "13px" }} />
                  <Legend />
                  <Bar dataKey="planifie" name="Jours planifiés" fill={GOLD} radius={[6, 6, 0, 0]} />
                  <Bar dataKey="disponible" name="Capacité disponible" fill="#CBD5E1" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Tab: Plan annuel 2026 */}
        {activeTab === "annuel" && (
          <div className="space-y-6">
            {/* Workflow */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Workflow de validation</h3>
                <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-3 py-1 rounded-full">Approuvé le 15/12/2025</span>
              </div>
              <div className="flex items-center gap-2">
                {workflowSteps.map((step, i) => (
                  <div key={step.id} className="flex items-center gap-2">
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium ${step.done ? "bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-800 border border-amber-200/50" : "bg-gray-50 text-gray-400 border border-gray-200"}`}>
                      {step.done && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                      {step.label}
                    </div>
                    {i < workflowSteps.length - 1 && <ChevronRight className="w-4 h-4 text-gray-300" />}
                  </div>
                ))}
              </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-5 gap-4">
              {[
                { label: "Missions planifiées", value: missionsAnnuelles.length.toString() },
                { label: "Jours budgétés", value: totalBudget.toLocaleString("fr-FR") },
                { label: "Taux de réalisation", value: `${Math.round((missionsDone / missionsAnnuelles.length) * 100)}%` },
                { label: "Missions ajoutées", value: "2" },
                { label: "Jours consommés", value: budgetConsomme.toLocaleString("fr-FR") },
              ].map((s) => (
                <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
                  <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Filters */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm font-medium text-gray-600">Filtrer :</span>
              {[
                { val: "all", label: "Toutes" },
                { val: "cycle", label: "Cycle" },
                { val: "obligation_reglementaire", label: "Réglementaire" },
                { val: "demande_gouvernance", label: "Gouvernance" },
                { val: "suite_incident", label: "Suite incident" },
                { val: "demande_acpr", label: "Demande ACPR" },
              ].map((f) => (
                <button
                  key={f.val}
                  onClick={() => setFilterType(f.val)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filterType === f.val ? "bg-amber-100 text-amber-800 ring-1 ring-amber-200" : "bg-gray-50 text-gray-600 hover:bg-gray-100"}`}
                >
                  {f.label}
                </button>
              ))}
              <div className="flex-1" />
              <button className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-xl text-sm font-semibold shadow-lg shadow-amber-200/50">
                <Plus className="w-4 h-4" />
                Ajouter une mission
              </button>
            </div>

            {/* Missions table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50/80">
                      <th className="text-left px-6 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Réf</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Libellé</th>
                      <th className="text-center px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Type</th>
                      <th className="text-center px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Période</th>
                      <th className="text-center px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Budget (j)</th>
                      <th className="text-center px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Étiquettes</th>
                      <th className="text-center px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Statut</th>
                      <th className="text-center px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredMissions.map((m) => (
                      <tr key={m.ref} className="hover:bg-amber-50/30 transition-colors">
                        <td className="px-6 py-3 font-mono text-xs text-gray-500">{m.ref}</td>
                        <td className="px-4 py-3 font-medium text-gray-900">{m.libelle}</td>
                        <td className="px-4 py-3 text-center">
                          <span className={`inline-flex px-2 py-0.5 rounded-md text-xs font-medium ${getTypeBadge(m.type)}`}>{getTypeLabel(m.type)}</span>
                        </td>
                        <td className="px-4 py-3 text-center text-gray-600 text-xs">{m.periode}</td>
                        <td className="px-4 py-3 text-center font-medium text-gray-700">{m.budget}</td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex justify-center gap-1">
                            {m.etiquettes.map((e) => (
                              <span key={e} className="px-1.5 py-0.5 bg-amber-50 text-amber-700 rounded text-[10px] font-bold">{e}</span>
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${getStatutStyle(m.statut)}`}>{getStatutLabel(m.statut)}</span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button className="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
