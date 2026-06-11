"use client";

import { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import {
  Users,
  Clock,
  Award,
  BookOpen,
  Calendar,
  AlertTriangle,
  TrendingUp,
  User,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const GOLD = "#C9A84C";

const auditeurs = [
  { id: 1, nom: "Nicolas Fontaine", role: "RAI", certifications: ["CIA", "CRMA"], competences: ["Gouvernance", "Stratégie", "Management"], disponibilite: 200, affectes: 40, formation: 24, avatar: "NF" },
  { id: 2, nom: "Sophie Martin", role: "Chef de mission", certifications: ["CIA", "CFSA"], competences: ["Crédit", "LCB-FT", "Marché"], disponibilite: 180, affectes: 165, formation: 18, avatar: "SM" },
  { id: 3, nom: "Pierre Leroy", role: "Chef de mission", certifications: ["CIA"], competences: ["Crédit", "Risques", "Conformité"], disponibilite: 180, affectes: 148, formation: 16, avatar: "PL" },
  { id: 4, nom: "Claire Moreau", role: "Chef de mission", certifications: ["CISA", "CISSP"], competences: ["TIC/Cyber", "DORA", "SSI"], disponibilite: 180, affectes: 172, formation: 20, avatar: "CM" },
  { id: 5, nom: "Alexandre Dubois", role: "Auditeur senior", certifications: ["CIA"], competences: ["LCB-FT", "Conformité", "KYC"], disponibilite: 200, affectes: 145, formation: 14, avatar: "AD" },
  { id: 6, nom: "Lucie Bernard", role: "Auditeur senior", certifications: [], competences: ["LCB-FT", "Opérationnel", "Process"], disponibilite: 200, affectes: 130, formation: 22, avatar: "LB" },
  { id: 7, nom: "François Roux", role: "Auditeur", certifications: [], competences: ["Marché", "Trésorerie", "Finance"], disponibilite: 200, affectes: 110, formation: 16, avatar: "FR" },
  { id: 8, nom: "Marine Petit", role: "Auditeur", certifications: [], competences: ["Crédit", "Conformité", "Process"], disponibilite: 200, affectes: 95, formation: 20, avatar: "MP" },
  { id: 9, nom: "José Garcia", role: "Expert TIC (externe)", certifications: ["CISA", "CEH"], competences: ["TIC/Cyber", "Pentest", "DORA"], disponibilite: 120, affectes: 95, formation: 0, avatar: "JG" },
  { id: 10, nom: "Thomas Nguyen", role: "Auditeur junior", certifications: [], competences: ["IT", "Data", "Process"], disponibilite: 200, affectes: 80, formation: 30, avatar: "TN" },
];

const tempsParMission = [
  { mission: "LCB-FT", budget: 80, consomme: 52 },
  { mission: "Crédit immo", budget: 90, consomme: 78 },
  { mission: "DORA", budget: 100, consomme: 12 },
  { mission: "Marché", budget: 85, consomme: 83 },
  { mission: "Sapin II", budget: 70, consomme: 0 },
  { mission: "Conformité", budget: 75, consomme: 35 },
  { mission: "External.", budget: 80, consomme: 76 },
  { mission: "SSI", budget: 95, consomme: 89 },
];

const formations = [
  { nom: "Certification CIA - Module 3", auditeur: "L. Bernard", date: "2026-07-15", heures: 40, statut: "planifie" },
  { nom: "DORA - Implications pour l'audit", auditeur: "S. Martin", date: "2026-05-20", heures: 8, statut: "realise" },
  { nom: "Techniques d'audit data analytics", auditeur: "T. Nguyen", date: "2026-04-10", heures: 16, statut: "realise" },
  { nom: "Mise à jour LCB-FT 2026", auditeur: "A. Dubois", date: "2026-06-05", heures: 8, statut: "realise" },
  { nom: "Cybersécurité avancée (CEH renewal)", auditeur: "J. Garcia", date: "2026-09-01", heures: 40, statut: "planifie" },
  { nom: "Normes IIA 2024 - Changements clés", auditeur: "Toute l'équipe", date: "2026-03-15", heures: 4, statut: "realise" },
  { nom: "ESG et audit interne", auditeur: "P. Leroy", date: "2026-10-01", heures: 8, statut: "planifie" },
];

const totalDispo = auditeurs.reduce((s, a) => s + a.disponibilite, 0);
const totalAffectes = auditeurs.reduce((s, a) => s + a.affectes, 0);

export default function RessourcesPage() {
  const [activeTab, setActiveTab] = useState("equipe");

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Ressources & Budget</h1>
            <p className="text-sm text-gray-500 mt-1">Équipe, temps, compétences et formation</p>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-5 gap-4">
          {[
            { label: "Auditeurs", value: auditeurs.length, sub: "dont 1 externe", icon: Users, color: "text-indigo-600 bg-indigo-50" },
            { label: "Capacité annuelle", value: `${totalDispo.toLocaleString("fr-FR")} j`, sub: "jours disponibles", icon: Calendar, color: "text-blue-600 bg-blue-50" },
            { label: "Jours affectés", value: `${totalAffectes.toLocaleString("fr-FR")} j`, sub: `${Math.round((totalAffectes/totalDispo)*100)}% capacité`, icon: Clock, color: "text-amber-600 bg-amber-50" },
            { label: "Certifications", value: "6", sub: "CIA, CISA, CISSP, CEH", icon: Award, color: "text-emerald-600 bg-emerald-50" },
            { label: "Formation 2026", value: "180 h", sub: "98% budget consommé", icon: BookOpen, color: "text-purple-600 bg-purple-50" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>
                <s.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900">{s.value}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
                <p className="text-[10px] text-gray-400">{s.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-xl p-1 shadow-sm border border-gray-100">
          {[
            { id: "equipe", label: "Équipe", icon: Users },
            { id: "temps", label: "Temps & Budget", icon: Clock },
            { id: "formation", label: "Formation", icon: GraduationCap },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id ? "bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-800 shadow-sm border border-amber-200/50" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              <tab.icon className="w-4 h-4" /> {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "equipe" && (
          <div className="grid grid-cols-2 gap-4">
            {auditeurs.map((a) => {
              const utilisation = Math.round((a.affectes / a.disponibilite) * 100);
              return (
                <div key={a.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-amber-200/50 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-sm font-bold text-white">
                      {a.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">{a.nom}</h3>
                          <p className="text-xs text-gray-500">{a.role}</p>
                        </div>
                        <div className="flex gap-1">
                          {a.certifications.map((c) => (
                            <span key={c} className="px-2 py-0.5 bg-amber-50 text-amber-700 rounded-md text-[10px] font-bold">{c}</span>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mt-2">
                        {a.competences.map((c) => (
                          <span key={c} className="px-2 py-0.5 bg-gray-50 text-gray-600 rounded-md text-[10px]">{c}</span>
                        ))}
                      </div>

                      <div className="mt-3">
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                          <span>Utilisation : {a.affectes}/{a.disponibilite} j</span>
                          <span className={`font-medium ${utilisation > 90 ? "text-red-600" : utilisation > 75 ? "text-amber-600" : "text-emerald-600"}`}>{utilisation}%</span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${utilisation > 90 ? "bg-red-500" : utilisation > 75 ? "bg-gradient-to-r from-amber-400 to-yellow-500" : "bg-emerald-500"}`}
                            style={{ width: `${Math.min(utilisation, 100)}%` }}
                          />
                        </div>
                      </div>

                      {a.formation > 0 && (
                        <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                          <BookOpen className="w-3 h-3" /> {a.formation}h de formation en 2026
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === "temps" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Budget vs Consommé par mission (jours)</h3>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={tempsParMission} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                  <XAxis dataKey="mission" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #E5E7EB", fontSize: "13px" }} />
                  <Legend />
                  <Bar dataKey="budget" name="Budget" fill="#CBD5E1" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="consomme" name="Consommé" fill={GOLD} radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Capacity alert */}
            <div className="bg-amber-50/50 rounded-2xl border border-amber-200/50 p-5">
              <h4 className="font-semibold text-amber-800 text-sm mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> Alerte capacité
              </h4>
              <p className="text-sm text-amber-900">
                Le taux d&apos;utilisation de l&apos;équipe atteint <strong>{Math.round((totalAffectes/totalDispo)*100)}%</strong> de la capacité disponible.
                Claire Moreau (95%) et Sophie Martin (92%) sont proches de la saturation.
                Couverture du cycle 5 ans à risque si aucun renfort n&apos;est prévu au S2 2026.
              </p>
            </div>
          </div>
        )}

        {activeTab === "formation" && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">Plan de formation 2026</h3>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50/80">
                  <th className="text-left px-6 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Formation</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Auditeur</th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Date</th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Durée (h)</th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {formations.map((f, i) => (
                  <tr key={i} className="hover:bg-amber-50/30 transition-colors">
                    <td className="px-6 py-3 font-medium text-gray-900">{f.nom}</td>
                    <td className="px-4 py-3 text-gray-600">{f.auditeur}</td>
                    <td className="px-4 py-3 text-center text-gray-500">{new Date(f.date).toLocaleDateString("fr-FR")}</td>
                    <td className="px-4 py-3 text-center font-medium text-gray-700">{f.heures}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${f.statut === "realise" ? "bg-emerald-50 text-emerald-700" : "bg-blue-50 text-blue-700"}`}>
                        {f.statut === "realise" ? "Réalisé" : "Planifié"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AppShell>
  );
}
