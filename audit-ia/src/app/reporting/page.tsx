"use client";

import { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import {
  BarChart3,
  FileText,
  Download,
  Calendar,
  Building2,
  Shield,
  Eye,
  Printer,
  Clock,
  CheckCircle2,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";

const GOLD = "#C9A84C";
const NAVY = "#0A1628";

const tabs = [
  { id: "raci", label: "RACI (Art. 258-266)", icon: FileText },
  { id: "comite", label: "Comité d'audit", icon: Building2 },
  { id: "dirigeant", label: "Dirigeant effectif", icon: Shield },
  { id: "acpr", label: "Espace ACPR/BCE", icon: Eye },
];

const comites = [
  { date: "2026-03-15", type: "Comité d'audit", sujets: "Plan annuel 2026 - Bilan T4 2025 - Point recommandations", statut: "realise", documents: 4 },
  { date: "2026-06-10", type: "Comité d'audit", sujets: "Avancement plan S1 - Rapports SSI & Marché - Reco critiques", statut: "realise", documents: 6 },
  { date: "2026-09-15", type: "Comité d'audit", sujets: "Avancement plan S2 - Rapports DORA & LCB-FT", statut: "planifie", documents: 0 },
  { date: "2026-12-10", type: "Comité d'audit", sujets: "Bilan annuel - Plan 2027 - RACI", statut: "planifie", documents: 0 },
  { date: "2026-04-20", type: "Comité des risques", sujets: "Constats audit crédit - Risques opérationnels", statut: "realise", documents: 3 },
];

const evolutionReco = [
  { mois: "Jan", ouvertes: 18, cloturees: 2, nouvelles: 4 },
  { mois: "Fév", ouvertes: 19, cloturees: 1, nouvelles: 2 },
  { mois: "Mar", ouvertes: 22, cloturees: 3, nouvelles: 6 },
  { mois: "Avr", ouvertes: 24, cloturees: 2, nouvelles: 4 },
  { mois: "Mai", ouvertes: 23, cloturees: 3, nouvelles: 2 },
  { mois: "Jun", ouvertes: 21, cloturees: 4, nouvelles: 2 },
];

export default function ReportingPage() {
  const [activeTab, setActiveTab] = useState("raci");

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reporting gouvernance & réglementaire</h1>
            <p className="text-sm text-gray-500 mt-1">RACI, comités, dirigeant effectif, espace ACPR/BCE</p>
          </div>
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

        {activeTab === "raci" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">Rapport Annuel de Contrôle Interne 2025</h3>
                  <p className="text-sm text-gray-500">Articles 258 à 266 de l&apos;arrêté du 3 novembre 2014 modifié — Volet contrôle périodique</p>
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-1.5 px-4 py-2 bg-gray-50 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-100">
                    <Printer className="w-4 h-4" /> Imprimer
                  </button>
                  <button className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-xl text-sm font-semibold shadow-lg shadow-amber-200/50">
                    <Download className="w-4 h-4" /> Exporter Word/PDF
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { section: "1. Présentation de la fonction d'audit interne", status: "complete", items: ["Rattachement hiérarchique", "Effectifs et compétences (10 auditeurs, 2 experts TIC)", "Charte d'audit (version 3.1, approuvée 15/01/2026)"] },
                  { section: "2. Plan d'audit et taux de réalisation", status: "complete", items: ["18 missions planifiées, 14 réalisées (78%)", "2 missions ajoutées (incident cyber, demande ACPR)", "1 mission reportée (audit rémunérations → 2027)"] },
                  { section: "3. Principales conclusions des missions", status: "complete", items: ["4 opinions « insuffisant » (SSI, Marché, LCB-FT)", "6 opinions « acceptable »", "Synthèse des constats critiques et majeurs"] },
                  { section: "4. Suivi des recommandations", status: "in_progress", items: ["32 recommandations ouvertes dont 4 critiques en retard", "Taux de mise en œuvre dans les délais : 62%", "Recommandations ACPR/BCE : 2 ouvertes, 1 en retard"] },
                  { section: "5. Couverture du cycle ≤ 5 ans", status: "in_progress", items: ["87% de l'univers d'audit couvert", "2 objets hors cycle (réclamations, crédit conso)", "Plan de rattrapage prévu en 2027"] },
                  { section: "6. Audits des externalisations essentielles", status: "complete", items: ["3 prestataires TIC critiques audités en 2025-2026", "Conformité EBA/GL/2019/02 vérifiée", "Registre d'information DORA mis à jour"] },
                  { section: "7. Adéquation des moyens", status: "draft", items: ["Capacité : 1 500 j/h disponibles vs 1 450 planifiés", "Besoin identifié : 1 ETP supplémentaire expertise DORA/TIC", "Budget formation : 98% consommé"] },
                ].map((s) => (
                  <div key={s.section} className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 text-sm">{s.section}</h4>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${s.status === "complete" ? "bg-emerald-50 text-emerald-700" : s.status === "in_progress" ? "bg-amber-50 text-amber-700" : "bg-gray-100 text-gray-500"}`}>
                        {s.status === "complete" ? "Finalisé" : s.status === "in_progress" ? "En cours" : "Brouillon"}
                      </span>
                    </div>
                    <ul className="space-y-1">
                      {s.items.map((item) => (
                        <li key={item} className="text-xs text-gray-600 flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "comite" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Calendrier des comités 2026</h3>
              <div className="space-y-3">
                {comites.map((c, i) => (
                  <div key={i} className={`flex items-center gap-4 p-4 rounded-xl border ${c.statut === "realise" ? "bg-emerald-50/30 border-emerald-100" : "bg-gray-50 border-gray-100"}`}>
                    <div className="text-center min-w-[60px]">
                      <p className="text-lg font-bold text-gray-900">{new Date(c.date).getDate()}</p>
                      <p className="text-xs text-gray-500">{new Date(c.date).toLocaleDateString("fr-FR", { month: "short", year: "numeric" })}</p>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-900 text-sm">{c.type}</h4>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${c.statut === "realise" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600"}`}>
                          {c.statut === "realise" ? "Réalisé" : "Planifié"}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600">{c.sujets}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-600">{c.documents} doc{c.documents > 1 ? "s" : ""}</p>
                      {c.statut === "realise" && (
                        <button className="text-xs text-amber-600 font-medium hover:underline mt-1">Voir dossier</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Évolution des recommandations (reporting comité)</h3>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={evolutionReco}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                  <XAxis dataKey="mois" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #E5E7EB", fontSize: "13px" }} />
                  <Legend />
                  <Line type="monotone" dataKey="ouvertes" name="Stock ouvertes" stroke={GOLD} strokeWidth={2.5} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="nouvelles" name="Nouvelles" stroke="#3B82F6" strokeWidth={2} strokeDasharray="5 5" />
                  <Line type="monotone" dataKey="cloturees" name="Clôturées" stroke="#10B981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === "dirigeant" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Tableau de bord — Dirigeant effectif en charge du contrôle périodique</h3>
              <p className="text-xs text-gray-500 mb-6">Données au 11 juin 2026 — Mise à jour automatique</p>

              <div className="grid grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Taux réalisation plan", value: "45%", sub: "8/18 missions terminées", color: "text-amber-600" },
                  { label: "Couverture univers", value: "87%", sub: "13/15 objets couverts ≤ 5 ans", color: "text-emerald-600" },
                  { label: "Reco critiques en retard", value: "1", sub: "R-ACPR-001 (+72 jours)", color: "text-red-600" },
                  { label: "Capacité restante", value: "658 j", sub: "sur 1 500 j disponibles", color: "text-blue-600" },
                ].map((s) => (
                  <div key={s.label} className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-500 mb-1">{s.label}</p>
                    <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                    <p className="text-xs text-gray-400 mt-1">{s.sub}</p>
                  </div>
                ))}
              </div>

              <div className="bg-amber-50/50 rounded-xl p-4 border border-amber-200/50">
                <h4 className="font-semibold text-amber-800 text-sm mb-2 flex items-center gap-2">
                  <Shield className="w-4 h-4" /> Points d&apos;attention
                </h4>
                <ul className="space-y-2 text-sm text-amber-900">
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5" />1 recommandation ACPR critique en retard de 72 jours — escalade direction générale recommandée</li>
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5" />Opinions « insuffisant » sur SSI et Opérations de marché — suivi rapproché requis</li>
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5" />2 objets auditables hors cycle 5 ans — missions de rattrapage à planifier</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === "acpr" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Espace d&apos;extraction — Contrôle ACPR/BCE</h3>
                  <p className="text-xs text-gray-500">Accès journalisé — Profil RA-12 (Superviseur externe)</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Plan d'audit pluriannuel et annuel", desc: "Plans 2024-2028, versions initiale et révisée, PV d'approbation", icon: Calendar },
                  { label: "Dossiers de mission complets", desc: "Fiches, programmes de travail, feuilles de travail, piste d'audit", icon: FileText },
                  { label: "Rapports d'audit finaux", desc: "Tous rapports validés et diffusés (PDF/A scellés)", icon: FileText },
                  { label: "État des recommandations", desc: "Stock consolidé interne + ACPR/BCE/CAC avec historique", icon: CheckCircle2 },
                  { label: "RACI — Volet contrôle périodique", desc: "Trames contributives des 3 derniers exercices", icon: Building2 },
                  { label: "Journaux d'audit applicatifs", desc: "Piste d'audit complète, exportable au format SIEM", icon: Clock },
                ].map((item) => (
                  <div key={item.label} className="bg-gray-50 rounded-xl p-4 flex items-start gap-3 hover:bg-blue-50/30 transition-colors cursor-pointer group">
                    <div className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center group-hover:border-blue-300 transition-colors">
                      <item.icon className="w-4 h-4 text-gray-500 group-hover:text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">{item.label}</h4>
                      <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                    </div>
                    <Download className="w-4 h-4 text-gray-300 group-hover:text-blue-500 mt-1" />
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-xs text-blue-700">
                  <strong>Note :</strong> Toute extraction est journalisée (utilisateur, date, périmètre) et conservée conformément à la PSSI.
                  Les données sont reproductibles à date (« as of date ») pour répondre aux demandes a posteriori.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
