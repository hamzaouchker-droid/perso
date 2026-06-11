"use client";

import { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import {
  Award,
  CheckCircle2,
  Star,
  TrendingUp,
  FileText,
  Clock,
  Target,
  BarChart3,
  MessageSquare,
  Users,
  Calendar,
} from "lucide-react";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const GOLD = "#C9A84C";
const NAVY = "#0A1628";

const kpiQualite = [
  { label: "Délai moyen terrain → rapport", value: "18 j", cible: "15 j", statut: "warning" },
  { label: "Taux feuilles de travail revues", value: "94%", cible: "100%", statut: "warning" },
  { label: "Taux recommandations acceptées", value: "96%", cible: "90%", statut: "ok" },
  { label: "Taux de réalisation du plan", value: "78%", cible: "90%", statut: "warning" },
  { label: "Ancienneté moyenne couverture univers", value: "2.8 ans", cible: "≤ 3 ans", statut: "ok" },
  { label: "Satisfaction audités (post-mission)", value: "3.8/5", cible: "≥ 3.5/5", statut: "ok" },
];

const evaluationsInternes = [
  { mission: "M-2026-007 - Externalisations", date: "2026-04-10", evaluateur: "N. Fontaine", scoreGlobal: 4.2, constats: "Programme de travail complet, bonne documentation. Amélioration : échantillonnage à mieux formaliser." },
  { mission: "M-2026-004 - Opérations marché", date: "2026-07-15", evaluateur: "N. Fontaine", scoreGlobal: 3.8, constats: "Analyse approfondie. Points à améliorer : délai de production du rapport, formalisation des réponses contradictoire." },
  { mission: "M-2025-012 - Crédit PME", date: "2025-11-20", evaluateur: "P. Leroy", scoreGlobal: 4.5, constats: "Excellente couverture des risques, programme de travail exemplaire. Modèle à diffuser." },
];

const radarQualite = [
  { critere: "Planification", score: 85, cible: 90 },
  { critere: "Programme travail", score: 90, cible: 90 },
  { critere: "Feuilles travail", score: 82, cible: 90 },
  { critere: "Supervision", score: 78, cible: 90 },
  { critere: "Rapport", score: 88, cible: 90 },
  { critere: "Suivi reco", score: 75, cible: 90 },
  { critere: "Documentation", score: 85, cible: 90 },
  { critere: "Communication", score: 80, cible: 90 },
];

const satisfactionData = [
  { mission: "External.", score: 4.0 },
  { mission: "Marché", score: 3.2 },
  { mission: "LCB-FT", score: 3.8 },
  { mission: "Crédit", score: 4.1 },
  { mission: "SSI", score: 3.5 },
  { mission: "Conformité", score: 4.2 },
];

const planAmelioration = [
  { action: "Réduire le délai terrain → rapport à 15 jours", responsable: "S. Martin", echeance: "2026-09-30", statut: "en_cours", avancement: 40 },
  { action: "Atteindre 100% des feuilles de travail revues avant conclusion", responsable: "Tous chefs de mission", echeance: "2026-12-31", statut: "en_cours", avancement: 60 },
  { action: "Mettre à jour le guide méthodologique (normes IIA 2024)", responsable: "N. Fontaine", echeance: "2026-06-30", statut: "termine", avancement: 100 },
  { action: "Déployer l'enquête de satisfaction audités systématique", responsable: "N. Fontaine", echeance: "2026-03-31", statut: "termine", avancement: 100 },
  { action: "Préparer l'évaluation externe quinquennale (2027)", responsable: "N. Fontaine", echeance: "2027-06-30", statut: "en_cours", avancement: 15 },
  { action: "Former l'équipe aux techniques d'audit data analytics", responsable: "C. Moreau", echeance: "2026-12-31", statut: "en_cours", avancement: 50 },
];

export default function QualitePage() {
  const [activeTab, setActiveTab] = useState("paaq");

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Qualité — PAAQ</h1>
            <p className="text-sm text-gray-500 mt-1">Programme d&apos;Assurance et d&apos;Amélioration Qualité (Normes IIA 2024)</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-xl p-1 shadow-sm border border-gray-100">
          {[
            { id: "paaq", label: "KPI Qualité", icon: BarChart3 },
            { id: "evaluations", label: "Évaluations internes", icon: Star },
            { id: "satisfaction", label: "Satisfaction audités", icon: MessageSquare },
            { id: "amelioration", label: "Plan d'amélioration", icon: Target },
            { id: "charte", label: "Charte d'audit", icon: FileText },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id ? "bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-800 shadow-sm border border-amber-200/50" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              <tab.icon className="w-4 h-4" /> {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "paaq" && (
          <div className="space-y-6">
            {/* KPI grid */}
            <div className="grid grid-cols-3 gap-4">
              {kpiQualite.map((k) => (
                <div key={k.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-600">{k.label}</p>
                    <span className={`w-2.5 h-2.5 rounded-full ${k.statut === "ok" ? "bg-emerald-500" : "bg-amber-500"}`} />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{k.value}</p>
                  <p className="text-xs text-gray-400 mt-1">Cible : {k.cible}</p>
                </div>
              ))}
            </div>

            {/* Radar chart */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Profil qualité de la fonction d&apos;audit</h3>
              <ResponsiveContainer width="100%" height={350}>
                <RadarChart data={radarQualite}>
                  <PolarGrid stroke="#E5E7EB" />
                  <PolarAngleAxis dataKey="critere" tick={{ fontSize: 11, fill: "#6B7280" }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
                  <Radar name="Score actuel" dataKey="score" stroke={GOLD} fill={GOLD} fillOpacity={0.25} strokeWidth={2} />
                  <Radar name="Cible" dataKey="cible" stroke={NAVY} fill="none" strokeWidth={1.5} strokeDasharray="4 4" />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === "evaluations" && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-2">
              <p className="text-sm text-gray-600">
                Évaluations internes réalisées par revue de dossiers de mission sur échantillon, conformément aux normes IIA 2024.
                Prochaine évaluation externe quinquennale prévue : <strong>S1 2027</strong>.
              </p>
            </div>
            {evaluationsInternes.map((e, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-amber-200/50 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">{e.mission}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Évalué par {e.evaluateur} le {new Date(e.date).toLocaleDateString("fr-FR")}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-xl">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="font-bold text-amber-800">{e.scoreGlobal}/5</span>
                  </div>
                </div>
                <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">{e.constats}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "satisfaction" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Score de satisfaction audités par mission</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={satisfactionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                  <XAxis dataKey="mission" tick={{ fontSize: 12 }} />
                  <YAxis domain={[0, 5]} tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #E5E7EB", fontSize: "13px" }} />
                  <Bar dataKey="score" name="Score (/5)" fill={GOLD} radius={[8, 8, 0, 0]}>
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
              <h4 className="font-semibold text-gray-900 text-sm mb-2">Retours fréquents des audités</h4>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <p className="font-medium text-emerald-700 mb-1">Points positifs</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Clarté des constats et recommandations</li>
                    <li>• Professionnalisme et rigueur de l&apos;équipe</li>
                    <li>• Bonne communication en cours de mission</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-amber-700 mb-1">Points d&apos;amélioration</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Délais de restitution du rapport jugés trop longs</li>
                    <li>• Demandes documentaires parfois tardives</li>
                    <li>• Manque de recommandations opérationnelles concrètes</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "amelioration" && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">Plan d&apos;amélioration continue</h3>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50/80">
                  <th className="text-left px-6 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Action</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Responsable</th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Échéance</th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Avancement</th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {planAmelioration.map((a, i) => (
                  <tr key={i} className="hover:bg-amber-50/30 transition-colors">
                    <td className="px-6 py-3 font-medium text-gray-900">{a.action}</td>
                    <td className="px-4 py-3 text-gray-600">{a.responsable}</td>
                    <td className="px-4 py-3 text-center text-gray-500">{new Date(a.echeance).toLocaleDateString("fr-FR")}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 justify-center">
                        <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-yellow-500" style={{ width: `${a.avancement}%` }} />
                        </div>
                        <span className="text-xs text-gray-500 w-8 text-right">{a.avancement}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${a.statut === "termine" ? "bg-emerald-50 text-emerald-700" : "bg-blue-50 text-blue-700"}`}>
                        {a.statut === "termine" ? "Terminé" : "En cours"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "charte" && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">Charte d&apos;audit interne</h3>
                <p className="text-sm text-gray-500">Version 3.1 — Approuvée par le Comité d&apos;audit le 15 janvier 2026</p>
              </div>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold">Active</span>
            </div>
            <div className="space-y-3">
              {[
                { section: "1. Mission et périmètre", content: "La fonction d'audit interne fournit une assurance indépendante et objective sur l'efficacité du dispositif de contrôle interne et de gestion des risques." },
                { section: "2. Indépendance et objectivité", content: "Le RAI est rattaché hiérarchiquement au Directeur Général et fonctionnellement au Comité d'audit. Les auditeurs sont indépendants des activités auditées." },
                { section: "3. Autorité et accès", content: "L'audit interne dispose d'un accès illimité aux personnes, données et systèmes nécessaires à l'exercice de ses missions." },
                { section: "4. Responsabilités", content: "Planification fondée sur les risques, conduite de missions conformes aux normes IIA, suivi des recommandations, reporting à la gouvernance." },
                { section: "5. Normes de référence", content: "Normes mondiales d'audit interne IIA 2024, cadre de référence IFACI, arrêté du 3 novembre 2014 modifié." },
              ].map((s) => (
                <div key={s.section} className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">{s.section}</h4>
                  <p className="text-sm text-gray-600">{s.content}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-3">
              <div className="text-xs text-gray-500">Versions antérieures : <button className="text-amber-600 hover:underline">v3.0</button> | <button className="text-amber-600 hover:underline">v2.1</button> | <button className="text-amber-600 hover:underline">v2.0</button></div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
