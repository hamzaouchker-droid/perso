"use client";

import { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowUpRight,
  Calendar,
  User,
  FileCheck,
  Search,
  Download,
  Bell,
  TrendingDown,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const GOLD = "#C9A84C";

const recommandations = [
  { id: "R-2026-001", libelle: "Mettre en place un blocage système pour les dossiers KYC incomplets", priorite: "critique", entite: "Réseau Particuliers", responsable: "M. Dupont", echeance: "2026-06-30", statut: "en_cours", avancement: 65, reports: 0, origine: "interne", mission: "M-2026-001", dateCreation: "2026-03-15" },
  { id: "R-2026-002", libelle: "Renforcer l'équipe d'analyse des alertes LCB-FT (2 ETP supplémentaires)", priorite: "critique", entite: "Direction Conformité", responsable: "F. Laurent", echeance: "2026-05-31", statut: "en_cours", avancement: 40, reports: 1, origine: "interne", mission: "M-2026-001", dateCreation: "2026-03-15" },
  { id: "R-2026-003", libelle: "Implémenter la priorisation automatique des alertes LCB-FT", priorite: "elevee", entite: "Direction Conformité", responsable: "F. Laurent", echeance: "2026-09-30", statut: "plan_accepte", avancement: 15, reports: 0, origine: "interne", mission: "M-2026-001", dateCreation: "2026-03-15" },
  { id: "R-2026-004", libelle: "Formaliser les dérogations crédit au-delà du ratio 35%", priorite: "elevee", entite: "Direction Crédit", responsable: "A. Bertrand", echeance: "2026-07-31", statut: "en_cours", avancement: 50, reports: 0, origine: "interne", mission: "M-2026-002", dateCreation: "2026-04-20" },
  { id: "R-2026-005", libelle: "Réaliser la revue annuelle des délégations de crédit", priorite: "moyenne", entite: "Direction Crédit", responsable: "A. Bertrand", echeance: "2026-06-30", statut: "declaree_mise_en_oeuvre", avancement: 100, reports: 0, origine: "interne", mission: "M-2026-002", dateCreation: "2026-04-20" },
  { id: "R-2026-006", libelle: "Recruter un responsable valorisation et déployer l'outil de rapprochement", priorite: "critique", entite: "Direction Financière", responsable: "J. Mercier", echeance: "2026-12-31", statut: "en_cours", avancement: 30, reports: 0, origine: "interne", mission: "M-2026-004", dateCreation: "2026-06-25" },
  { id: "R-2026-007", libelle: "Former les opérateurs marché à la procédure d'escalade révisée", priorite: "elevee", entite: "Direction Financière", responsable: "J. Mercier", echeance: "2026-07-15", statut: "en_cours", avancement: 70, reports: 0, origine: "interne", mission: "M-2026-004", dateCreation: "2026-06-25" },
  { id: "R-2026-008", libelle: "Migrer les 42 serveurs EOL vers des OS supportés", priorite: "critique", entite: "DSI", responsable: "T. Nguyen", echeance: "2027-03-31", statut: "en_cours", avancement: 25, reports: 0, origine: "interne", mission: "M-2026-008", dateCreation: "2026-05-20" },
  { id: "R-2026-009", libelle: "Réaliser les tests d'intrusion annuels sur le périmètre Internet", priorite: "elevee", entite: "DSI", responsable: "T. Nguyen", echeance: "2026-09-30", statut: "plan_accepte", avancement: 10, reports: 0, origine: "interne", mission: "M-2026-008", dateCreation: "2026-05-20" },
  { id: "R-ACPR-001", libelle: "Renforcer le dispositif de contrôle permanent de la filière crédit", priorite: "critique", entite: "Direction des Risques", responsable: "P. Garnier", echeance: "2026-03-31", statut: "reportee", avancement: 60, reports: 2, origine: "acpr", mission: "Contrôle ACPR 2024", dateCreation: "2025-01-15" },
  { id: "R-ACPR-002", libelle: "Mettre à jour la cartographie des risques opérationnels", priorite: "elevee", entite: "Direction des Risques", responsable: "P. Garnier", echeance: "2025-12-31", statut: "verifiee_cloturee", avancement: 100, reports: 0, origine: "acpr", mission: "Contrôle ACPR 2024", dateCreation: "2025-01-15" },
  { id: "R-CAC-001", libelle: "Améliorer la traçabilité des ajustements de valorisation", priorite: "moyenne", entite: "Direction Financière", responsable: "J. Mercier", echeance: "2026-06-30", statut: "en_cours", avancement: 80, reports: 1, origine: "cac", mission: "Mission CAC 2025", dateCreation: "2025-06-30" },
];

function getPrioriteStyle(p: string) {
  const map: Record<string, string> = {
    critique: "bg-red-50 text-red-700 ring-1 ring-red-200",
    elevee: "bg-orange-50 text-orange-700 ring-1 ring-orange-200",
    moyenne: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
    faible: "bg-blue-50 text-blue-600 ring-1 ring-blue-200",
  };
  return map[p] || map.faible;
}

function getStatutLabel(s: string) {
  const map: Record<string, string> = {
    emise: "Émise",
    plan_accepte: "Plan accepté",
    en_cours: "En cours",
    declaree_mise_en_oeuvre: "Déclarée mise en œuvre",
    verifiee_cloturee: "Vérifiée / Clôturée",
    reportee: "Reportée",
    caduque: "Caduque",
    risque_accepte: "Risque accepté",
  };
  return map[s] || s;
}

function getStatutStyle(s: string) {
  const map: Record<string, string> = {
    emise: "bg-gray-100 text-gray-700",
    plan_accepte: "bg-blue-50 text-blue-700",
    en_cours: "bg-indigo-50 text-indigo-700",
    declaree_mise_en_oeuvre: "bg-purple-50 text-purple-700",
    verifiee_cloturee: "bg-emerald-50 text-emerald-700",
    reportee: "bg-rose-50 text-rose-700",
    caduque: "bg-gray-50 text-gray-500",
    risque_accepte: "bg-red-50 text-red-600",
  };
  return map[s] || map.emise;
}

function getOrigineLabel(o: string) {
  const map: Record<string, string> = {
    interne: "Audit interne",
    acpr: "ACPR",
    bce: "BCE",
    cac: "CAC",
    afa: "AFA",
    cnil: "CNIL",
  };
  return map[o] || o;
}

function isOverdue(echeance: string, statut: string) {
  if (["verifiee_cloturee", "caduque", "risque_accepte"].includes(statut)) return false;
  return new Date(echeance) < new Date("2026-06-11");
}

function daysOverdue(echeance: string) {
  const diff = new Date("2026-06-11").getTime() - new Date(echeance).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export default function SuiviPage() {
  const [filterPriorite, setFilterPriorite] = useState("all");
  const [filterOrigine, setFilterOrigine] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const ouvertes = recommandations.filter((r) => !["verifiee_cloturee", "caduque", "risque_accepte"].includes(r.statut)).length;
  const critiquesEnRetard = recommandations.filter((r) => r.priorite === "critique" && isOverdue(r.echeance, r.statut)).length;
  const cloturees = recommandations.filter((r) => r.statut === "verifiee_cloturee").length;
  const tauxMEO = Math.round((cloturees / recommandations.length) * 100);

  const filtered = recommandations.filter((r) => {
    if (filterPriorite !== "all" && r.priorite !== filterPriorite) return false;
    if (filterOrigine !== "all" && r.origine !== filterOrigine) return false;
    if (searchTerm && !r.libelle.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const parStatut = [
    { name: "En cours", value: recommandations.filter((r) => r.statut === "en_cours").length },
    { name: "Plan accepté", value: recommandations.filter((r) => r.statut === "plan_accepte").length },
    { name: "Déclarée MEO", value: recommandations.filter((r) => r.statut === "declaree_mise_en_oeuvre").length },
    { name: "Clôturée", value: recommandations.filter((r) => r.statut === "verifiee_cloturee").length },
    { name: "Reportée", value: recommandations.filter((r) => r.statut === "reportee").length },
  ];
  const pieColors = ["#6366F1", "#3B82F6", "#A855F7", "#10B981", "#F43F5E"];

  const parEntite = [
    { entite: "Dir. Conformité", total: 3, cloturees: 0 },
    { entite: "Dir. Crédit", total: 2, cloturees: 0 },
    { entite: "Dir. Financière", total: 3, cloturees: 0 },
    { entite: "DSI", total: 2, cloturees: 0 },
    { entite: "Dir. Risques", total: 2, cloturees: 1 },
    { entite: "Réseau", total: 1, cloturees: 0 },
  ];

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Suivi des recommandations</h1>
            <p className="text-sm text-gray-500 mt-1">Vision consolidée interne, ACPR, BCE, CAC</p>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-xl font-semibold text-sm shadow-lg shadow-amber-200/50">
            <Download className="w-4 h-4" />
            Exporter
          </button>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-5 gap-4">
          {[
            { label: "Recommandations ouvertes", value: ouvertes, icon: FileCheck, color: "text-indigo-600 bg-indigo-50", border: "border-indigo-100" },
            { label: "Critiques en retard", value: critiquesEnRetard, icon: AlertTriangle, color: "text-red-600 bg-red-50", border: "border-red-100" },
            { label: "Taux de mise en œuvre", value: `${tauxMEO}%`, icon: TrendingDown, color: "text-emerald-600 bg-emerald-50", border: "border-emerald-100" },
            { label: "Clôturées", value: cloturees, icon: CheckCircle2, color: "text-emerald-600 bg-emerald-50", border: "border-emerald-100" },
            { label: "Avec reports", value: recommandations.filter((r) => r.reports > 0).length, icon: Clock, color: "text-amber-600 bg-amber-50", border: "border-amber-100" },
          ].map((s) => (
            <div key={s.label} className={`bg-white rounded-2xl border ${s.border} shadow-sm p-4 flex items-center gap-3`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>
                <s.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900">{s.value}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Répartition par statut</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={parStatut} cx="50%" cy="50%" outerRadius={90} innerRadius={55} dataKey="value" paddingAngle={3}>
                  {parStatut.map((_, i) => <Cell key={i} fill={pieColors[i]} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #E5E7EB", fontSize: "13px" }} />
                <Legend verticalAlign="bottom" formatter={(value: unknown) => <span className="text-xs text-gray-600">{String(value)}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Recommandations par entité</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={parEntite} layout="vertical" barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="entite" width={100} tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #E5E7EB", fontSize: "13px" }} />
                <Bar dataKey="total" name="Ouvertes" fill={GOLD} radius={[0, 6, 6, 0]} />
                <Bar dataKey="cloturees" name="Clôturées" fill="#10B981" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:ring-2 focus:ring-amber-300"
            />
          </div>
          <select value={filterPriorite} onChange={(e) => setFilterPriorite(e.target.value)} className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm bg-white">
            <option value="all">Toutes priorités</option>
            <option value="critique">Critique</option>
            <option value="elevee">Élevée</option>
            <option value="moyenne">Moyenne</option>
            <option value="faible">Faible</option>
          </select>
          <select value={filterOrigine} onChange={(e) => setFilterOrigine(e.target.value)} className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm bg-white">
            <option value="all">Toutes origines</option>
            <option value="interne">Audit interne</option>
            <option value="acpr">ACPR</option>
            <option value="cac">CAC</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50/80">
                  <th className="text-left px-5 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Réf</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Recommandation</th>
                  <th className="text-center px-3 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Priorité</th>
                  <th className="text-left px-3 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Entité</th>
                  <th className="text-left px-3 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Responsable</th>
                  <th className="text-center px-3 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Échéance</th>
                  <th className="text-center px-3 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Avancement</th>
                  <th className="text-center px-3 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Statut</th>
                  <th className="text-center px-3 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Origine</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((r) => {
                  const overdue = isOverdue(r.echeance, r.statut);
                  return (
                    <tr key={r.id} className={`hover:bg-amber-50/30 transition-colors ${overdue ? "bg-red-50/30" : ""}`}>
                      <td className="px-5 py-3 font-mono text-xs text-gray-500">{r.id}</td>
                      <td className="px-4 py-3 text-gray-900 font-medium max-w-xs">
                        <p className="truncate">{r.libelle}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{r.mission}</p>
                      </td>
                      <td className="px-3 py-3 text-center">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-bold ${getPrioriteStyle(r.priorite)}`}>
                          {r.priorite.charAt(0).toUpperCase() + r.priorite.slice(1)}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-gray-600 text-xs">{r.entite}</td>
                      <td className="px-3 py-3 text-gray-700 text-xs font-medium">{r.responsable}</td>
                      <td className="px-3 py-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <span className={`text-xs font-medium ${overdue ? "text-red-600" : "text-gray-600"}`}>
                            {new Date(r.echeance).toLocaleDateString("fr-FR")}
                          </span>
                          {overdue && <span className="text-[10px] font-bold text-red-600 bg-red-100 px-1.5 py-0.5 rounded-full">J+{daysOverdue(r.echeance)}</span>}
                          {r.reports > 0 && <span className="text-[10px] font-bold text-rose-500" title={`${r.reports} report(s)`}>↻{r.reports}</span>}
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-yellow-500" style={{ width: `${r.avancement}%` }} />
                          </div>
                          <span className="text-xs text-gray-500 w-8 text-right">{r.avancement}%</span>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-center">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium ${getStatutStyle(r.statut)}`}>
                          {getStatutLabel(r.statut)}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-center">
                        <span className={`inline-flex px-2 py-0.5 rounded-md text-[10px] font-bold ${r.origine === "interne" ? "bg-gray-50 text-gray-600" : r.origine === "acpr" ? "bg-blue-50 text-blue-700" : "bg-purple-50 text-purple-700"}`}>
                          {getOrigineLabel(r.origine)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
