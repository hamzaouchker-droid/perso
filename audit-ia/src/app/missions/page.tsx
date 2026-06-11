"use client";

import { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import {
  Briefcase,
  Clock,
  Users,
  FileText,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Eye,
  X,
  Calendar,
  Target,
  Shield,
  Filter,
  Search,
} from "lucide-react";

const missions = [
  {
    ref: "M-2026-001",
    libelle: "Audit du dispositif LCB-FT",
    type: "obligation_reglementaire",
    sensibilite: "sensible",
    statut: "travaux_en_cours",
    etiquettes: ["LCB-FT"],
    budgetJours: 80,
    joursConsommes: 52,
    dateDebut: "2026-01-15",
    dateFin: "2026-03-31",
    equipe: [
      { nom: "S. Martin", role: "Chef de mission", initiales: "SM" },
      { nom: "A. Dubois", role: "Auditeur", initiales: "AD" },
      { nom: "L. Bernard", role: "Auditeur", initiales: "LB" },
    ],
    opinionGlobale: null,
    objectifs: "Évaluer la conformité et l'efficacité du dispositif de lutte contre le blanchiment de capitaux et le financement du terrorisme.",
    perimetre: "Direction Conformité, Réseau d'agences, Back-office opérations",
    constats: 5,
    recommandations: 4,
  },
  {
    ref: "M-2026-002",
    libelle: "Revue du processus d'octroi de crédit immobilier",
    type: "cycle",
    sensibilite: "standard",
    statut: "contradictoire",
    etiquettes: [],
    budgetJours: 90,
    joursConsommes: 78,
    dateDebut: "2026-02-01",
    dateFin: "2026-04-30",
    equipe: [
      { nom: "P. Leroy", role: "Chef de mission", initiales: "PL" },
      { nom: "M. Petit", role: "Auditeur", initiales: "MP" },
    ],
    opinionGlobale: "acceptable",
    objectifs: "Vérifier la conformité du processus d'octroi aux normes internes et réglementaires.",
    perimetre: "Direction Crédit, Comité de crédit, Réseau Particuliers",
    constats: 8,
    recommandations: 6,
  },
  {
    ref: "M-2026-003",
    libelle: "Audit de la résilience opérationnelle numérique (DORA)",
    type: "obligation_reglementaire",
    sensibilite: "standard",
    statut: "preparation",
    etiquettes: ["DORA"],
    budgetJours: 100,
    joursConsommes: 12,
    dateDebut: "2026-03-01",
    dateFin: "2026-05-31",
    equipe: [
      { nom: "C. Moreau", role: "Chef de mission", initiales: "CM" },
      { nom: "J. Garcia", role: "Expert TIC", initiales: "JG" },
      { nom: "A. Dubois", role: "Auditeur", initiales: "AD" },
    ],
    opinionGlobale: null,
    objectifs: "Évaluer le dispositif de résilience opérationnelle numérique au regard du règlement DORA.",
    perimetre: "DSI, Direction des Risques, Prestataires TIC critiques",
    constats: 0,
    recommandations: 0,
  },
  {
    ref: "M-2026-004",
    libelle: "Contrôle des opérations de marché",
    type: "cycle",
    sensibilite: "standard",
    statut: "rapport_valide",
    etiquettes: [],
    budgetJours: 85,
    joursConsommes: 83,
    dateDebut: "2026-04-01",
    dateFin: "2026-06-30",
    equipe: [
      { nom: "S. Martin", role: "Chef de mission", initiales: "SM" },
      { nom: "F. Roux", role: "Auditeur", initiales: "FR" },
    ],
    opinionGlobale: "insuffisant",
    objectifs: "Examiner les contrôles sur les opérations de marché et la valorisation des instruments.",
    perimetre: "Direction Financière, Salle des marchés, Middle-office",
    constats: 12,
    recommandations: 9,
  },
  {
    ref: "M-2026-005",
    libelle: "Audit du dispositif Sapin II",
    type: "obligation_reglementaire",
    sensibilite: "sensible",
    statut: "planifiee",
    etiquettes: ["Sapin II"],
    budgetJours: 70,
    joursConsommes: 0,
    dateDebut: "2026-05-15",
    dateFin: "2026-07-15",
    equipe: [
      { nom: "P. Leroy", role: "Chef de mission", initiales: "PL" },
    ],
    opinionGlobale: null,
    objectifs: "Évaluer l'efficacité du dispositif de prévention de la corruption.",
    perimetre: "Direction Générale, Direction Conformité, Achats",
    constats: 0,
    recommandations: 0,
  },
  {
    ref: "M-2026-006",
    libelle: "Revue de la fonction conformité",
    type: "cycle",
    sensibilite: "standard",
    statut: "travaux_en_cours",
    etiquettes: [],
    budgetJours: 75,
    joursConsommes: 35,
    dateDebut: "2026-06-01",
    dateFin: "2026-08-31",
    equipe: [
      { nom: "C. Moreau", role: "Chef de mission", initiales: "CM" },
      { nom: "M. Petit", role: "Auditeur", initiales: "MP" },
    ],
    opinionGlobale: null,
    objectifs: "Évaluer l'organisation, les moyens et l'efficacité de la fonction conformité.",
    perimetre: "Direction Conformité, Comité de conformité",
    constats: 3,
    recommandations: 2,
  },
  {
    ref: "M-2026-007",
    libelle: "Audit des externalisations essentielles",
    type: "cycle",
    sensibilite: "standard",
    statut: "cloturee",
    etiquettes: [],
    budgetJours: 80,
    joursConsommes: 76,
    dateDebut: "2026-01-10",
    dateFin: "2026-03-15",
    equipe: [
      { nom: "S. Martin", role: "Chef de mission", initiales: "SM" },
      { nom: "L. Bernard", role: "Auditeur", initiales: "LB" },
    ],
    opinionGlobale: "acceptable",
    objectifs: "Vérifier la maîtrise des prestations essentielles externalisées.",
    perimetre: "Direction Générale, DSI, Achats, Prestataires clés",
    constats: 6,
    recommandations: 5,
  },
  {
    ref: "M-2026-008",
    libelle: "Audit de la sécurité des systèmes d'information",
    type: "cycle",
    sensibilite: "standard",
    statut: "projet_rapport",
    etiquettes: ["DORA"],
    budgetJours: 95,
    joursConsommes: 89,
    dateDebut: "2026-02-15",
    dateFin: "2026-05-15",
    equipe: [
      { nom: "C. Moreau", role: "Chef de mission", initiales: "CM" },
      { nom: "J. Garcia", role: "Expert TIC", initiales: "JG" },
      { nom: "F. Roux", role: "Auditeur", initiales: "FR" },
    ],
    opinionGlobale: "insuffisant",
    objectifs: "Évaluer la sécurité du système d'information et les contrôles cyber.",
    perimetre: "DSI, RSSI, SOC, Infrastructure",
    constats: 14,
    recommandations: 11,
  },
];

const workflowSteps = [
  "Planifiée", "Préparation", "Lettre émise", "Travaux", "Contradictoire", "Projet rapport", "Rapport validé", "Clôturée",
];

function getStatutIndex(s: string): number {
  const map: Record<string, number> = {
    planifiee: 0, preparation: 1, lettre_emise: 2, travaux_en_cours: 3,
    contradictoire: 4, projet_rapport: 5, rapport_valide: 6, cloturee: 7,
  };
  return map[s] ?? 0;
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
    planifiee: "Planifiée", preparation: "Préparation", travaux_en_cours: "Travaux en cours",
    contradictoire: "Contradictoire", projet_rapport: "Projet de rapport", rapport_valide: "Rapport validé", cloturee: "Clôturée",
  };
  return map[s] || s;
}

function getOpinionStyle(o: string | null) {
  if (!o) return "";
  const map: Record<string, string> = {
    satisfaisant: "bg-emerald-100 text-emerald-700",
    acceptable: "bg-amber-100 text-amber-700",
    insuffisant: "bg-orange-100 text-orange-700",
    critique: "bg-red-100 text-red-700",
  };
  return map[o] || "";
}

function getTypeLabel(t: string) {
  const map: Record<string, string> = {
    cycle: "Cycle", demande_gouvernance: "Gouvernance", obligation_reglementaire: "Réglementaire",
    suite_incident: "Suite incident", demande_acpr: "Demande ACPR",
  };
  return map[t] || t;
}

type MissionType = typeof missions[0];

export default function MissionsPage() {
  const [selectedMission, setSelectedMission] = useState<MissionType | null>(null);
  const [detailTab, setDetailTab] = useState("fiche");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatut, setFilterStatut] = useState("all");

  const enCours = missions.filter((m) => m.statut === "travaux_en_cours").length;
  const enPrep = missions.filter((m) => m.statut === "preparation").length;
  const enContrad = missions.filter((m) => m.statut === "contradictoire").length;
  const enRapport = missions.filter((m) => m.statut === "projet_rapport" || m.statut === "rapport_valide").length;

  const filtered = missions.filter((m) => {
    if (filterStatut !== "all" && m.statut !== filterStatut) return false;
    if (searchTerm && !m.libelle.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const feuillesTravail = [
    { ref: "FT-001", objectif: "Vérification des procédures KYC", methode: "Échantillon aléatoire (n=50)", conclusion: "constat", statutRevue: "validee", reviseur: "S. Martin", temps: 5 },
    { ref: "FT-002", objectif: "Test des alertes de filtrage", methode: "Exhaustif sur période T1", conclusion: "constat", statutRevue: "validee", reviseur: "S. Martin", temps: 8 },
    { ref: "FT-003", objectif: "Revue des déclarations de soupçon", methode: "Échantillon raisonné (n=30)", conclusion: "satisfaisant", statutRevue: "validee", reviseur: "S. Martin", temps: 4 },
    { ref: "FT-004", objectif: "Évaluation de la formation LCB-FT", methode: "Entretiens + données RH", conclusion: "observation", statutRevue: "a_revoir", reviseur: "S. Martin", temps: 3 },
    { ref: "FT-005", objectif: "Contrôle du dispositif de gel des avoirs", methode: "Test de conformité", conclusion: "satisfaisant", statutRevue: "validee", reviseur: "S. Martin", temps: 6 },
  ];

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Missions d&apos;audit</h1>
            <p className="text-sm text-gray-500 mt-1">Gestion du cycle de vie des missions d&apos;audit interne</p>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-5 gap-4">
          {[
            { label: "En cours", value: enCours, icon: Briefcase, color: "text-indigo-600 bg-indigo-50" },
            { label: "En préparation", value: enPrep, icon: Clock, color: "text-blue-600 bg-blue-50" },
            { label: "En contradictoire", value: enContrad, icon: AlertTriangle, color: "text-amber-600 bg-amber-50" },
            { label: "Rapports", value: enRapport, icon: FileText, color: "text-purple-600 bg-purple-50" },
            { label: "Jours terrain restants", value: 245, icon: Calendar, color: "text-emerald-600 bg-emerald-50" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
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

        {/* Filters */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher une mission..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:ring-2 focus:ring-amber-300 focus:border-amber-300"
            />
          </div>
          <div className="flex gap-2">
            {[
              { val: "all", label: "Toutes" },
              { val: "travaux_en_cours", label: "En cours" },
              { val: "preparation", label: "Préparation" },
              { val: "contradictoire", label: "Contradictoire" },
              { val: "rapport_valide", label: "Rapport validé" },
              { val: "cloturee", label: "Clôturée" },
            ].map((f) => (
              <button
                key={f.val}
                onClick={() => setFilterStatut(f.val)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filterStatut === f.val ? "bg-amber-100 text-amber-800 ring-1 ring-amber-200" : "bg-gray-50 text-gray-600 hover:bg-gray-100"}`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mission cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filtered.map((m) => (
            <div
              key={m.ref}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-amber-200/50 transition-all p-5"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-gray-400">{m.ref}</span>
                    {m.sensibilite === "sensible" && (
                      <span className="flex items-center gap-1 px-1.5 py-0.5 bg-red-50 text-red-600 rounded text-[10px] font-bold">
                        <Shield className="w-3 h-3" /> SENSIBLE
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm">{m.libelle}</h3>
                </div>
                <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatutStyle(m.statut)}`}>
                  {getStatutLabel(m.statut)}
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-3">
                <span className="px-2 py-0.5 bg-gray-50 text-gray-600 rounded-md text-xs font-medium">{getTypeLabel(m.type)}</span>
                {m.etiquettes.map((e) => (
                  <span key={e} className="px-2 py-0.5 bg-amber-50 text-amber-700 rounded-md text-xs font-bold">{e}</span>
                ))}
                {m.opinionGlobale && (
                  <span className={`px-2 py-0.5 rounded-md text-xs font-medium capitalize ${getOpinionStyle(m.opinionGlobale)}`}>
                    {m.opinionGlobale}
                  </span>
                )}
              </div>

              <div className="mb-3">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span>Avancement</span>
                  <span className="font-medium">{m.budgetJours > 0 ? Math.round((m.joursConsommes / m.budgetJours) * 100) : 0}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 transition-all"
                    style={{ width: `${Math.min((m.joursConsommes / m.budgetJours) * 100, 100)}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(m.dateDebut).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" })} — {new Date(m.dateFin).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" })}
                  </div>
                  <span className="text-xs text-gray-400">|</span>
                  <span className="text-xs text-gray-500">{m.joursConsommes}/{m.budgetJours} j</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {m.equipe.slice(0, 3).map((e) => (
                      <div key={e.initiales} className="w-7 h-7 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-[10px] font-bold text-white ring-2 ring-white" title={`${e.nom} (${e.role})`}>
                        {e.initiales}
                      </div>
                    ))}
                    {m.equipe.length > 3 && <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600 ring-2 ring-white">+{m.equipe.length - 3}</div>}
                  </div>
                  <button
                    onClick={() => { setSelectedMission(m); setDetailTab("fiche"); }}
                    className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detail Modal */}
        {selectedMission && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedMission(null)} />
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
              {/* Modal header */}
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between shrink-0">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-gray-400">{selectedMission.ref}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatutStyle(selectedMission.statut)}`}>{getStatutLabel(selectedMission.statut)}</span>
                  </div>
                  <h2 className="text-lg font-bold text-gray-900 mt-1">{selectedMission.libelle}</h2>
                </div>
                <button onClick={() => setSelectedMission(null)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Workflow */}
              <div className="px-6 py-3 border-b border-gray-50 overflow-x-auto shrink-0">
                <div className="flex items-center gap-1 min-w-max">
                  {workflowSteps.map((step, i) => {
                    const current = getStatutIndex(selectedMission.statut);
                    const done = i <= current;
                    return (
                      <div key={step} className="flex items-center gap-1">
                        <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium ${done ? "bg-amber-50 text-amber-800" : "bg-gray-50 text-gray-400"}`}>
                          {done && <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
                          {step}
                        </div>
                        {i < workflowSteps.length - 1 && <ChevronRight className="w-3 h-3 text-gray-300" />}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Detail tabs */}
              <div className="px-6 py-2 border-b border-gray-100 flex gap-1 overflow-x-auto shrink-0">
                {[
                  { id: "fiche", label: "Fiche d'identité" },
                  { id: "programme", label: "Programme de travail" },
                  { id: "feuilles", label: "Feuilles de travail" },
                  { id: "constats", label: "Constats" },
                  { id: "documents", label: "Documents" },
                  { id: "piste", label: "Piste d'audit" },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setDetailTab(t.id)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${detailTab === t.id ? "bg-amber-50 text-amber-800 border border-amber-200/50" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto flex-1">
                {detailTab === "fiche" && (
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Objectifs</label>
                        <p className="mt-1 text-sm text-gray-700">{selectedMission.objectifs}</p>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Périmètre</label>
                        <p className="mt-1 text-sm text-gray-700">{selectedMission.perimetre}</p>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Type de mission</label>
                        <p className="mt-1 text-sm text-gray-700 capitalize">{getTypeLabel(selectedMission.type)}</p>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Rattachement réglementaire</label>
                        <div className="mt-1 flex gap-1">
                          {selectedMission.etiquettes.length > 0 ? selectedMission.etiquettes.map((e) => (
                            <span key={e} className="px-2 py-0.5 bg-amber-50 text-amber-700 rounded-md text-xs font-bold">{e}</span>
                          )) : <span className="text-sm text-gray-400">—</span>}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Équipe</label>
                        <div className="mt-2 space-y-2">
                          {selectedMission.equipe.map((e) => (
                            <div key={e.initiales} className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-xs font-bold text-white">{e.initiales}</div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">{e.nom}</p>
                                <p className="text-xs text-gray-500">{e.role}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Période</label>
                          <p className="mt-1 text-sm text-gray-700">
                            {new Date(selectedMission.dateDebut).toLocaleDateString("fr-FR")} — {new Date(selectedMission.dateFin).toLocaleDateString("fr-FR")}
                          </p>
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Budget</label>
                          <p className="mt-1 text-sm text-gray-700">{selectedMission.joursConsommes} / {selectedMission.budgetJours} jours</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Constats</label>
                          <p className="mt-1 text-2xl font-bold text-gray-900">{selectedMission.constats}</p>
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Recommandations</label>
                          <p className="mt-1 text-2xl font-bold text-gray-900">{selectedMission.recommandations}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {detailTab === "programme" && (
                  <div className="space-y-3">
                    {[
                      {
                        objectif: "Gouvernance et organisation du dispositif LCB-FT",
                        tests: [
                          { label: "Revue de la charte LCB-FT et des procédures", statut: "termine", auditeur: "A. Dubois" },
                          { label: "Évaluation du comité LCB-FT (fréquence, composition)", statut: "termine", auditeur: "L. Bernard" },
                          { label: "Adéquation des moyens humains et techniques", statut: "en_cours", auditeur: "A. Dubois" },
                        ],
                      },
                      {
                        objectif: "Connaissance client (KYC) et vigilance",
                        tests: [
                          { label: "Test des dossiers KYC sur échantillon (n=50)", statut: "termine", auditeur: "L. Bernard" },
                          { label: "Vérification des mesures de vigilance renforcée", statut: "en_cours", auditeur: "A. Dubois" },
                          { label: "Revue des PPE et gel des avoirs", statut: "termine", auditeur: "L. Bernard" },
                        ],
                      },
                      {
                        objectif: "Détection et déclaration",
                        tests: [
                          { label: "Évaluation du dispositif d'alertes automatiques", statut: "en_cours", auditeur: "A. Dubois" },
                          { label: "Revue des déclarations de soupçon (DS) à TRACFIN", statut: "a_faire", auditeur: "L. Bernard" },
                          { label: "Test du processus de traitement des alertes", statut: "a_faire", auditeur: "A. Dubois" },
                        ],
                      },
                    ].map((obj) => (
                      <div key={obj.objectif} className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Target className="w-4 h-4 text-amber-600" />
                          <h4 className="font-semibold text-gray-900 text-sm">{obj.objectif}</h4>
                        </div>
                        <div className="space-y-2 pl-6">
                          {obj.tests.map((t) => (
                            <div key={t.label} className="flex items-center justify-between bg-white rounded-lg px-3 py-2 border border-gray-100">
                              <div className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${t.statut === "termine" ? "bg-emerald-500" : t.statut === "en_cours" ? "bg-amber-500" : "bg-gray-300"}`} />
                                <span className="text-sm text-gray-700">{t.label}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="text-xs text-gray-500">{t.auditeur}</span>
                                <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${t.statut === "termine" ? "bg-emerald-50 text-emerald-700" : t.statut === "en_cours" ? "bg-amber-50 text-amber-700" : "bg-gray-50 text-gray-500"}`}>
                                  {t.statut === "termine" ? "Terminé" : t.statut === "en_cours" ? "En cours" : "À faire"}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {detailTab === "feuilles" && (
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 rounded-lg">
                        <th className="text-left px-4 py-2 font-semibold text-gray-600 text-xs">Réf</th>
                        <th className="text-left px-4 py-2 font-semibold text-gray-600 text-xs">Objectif</th>
                        <th className="text-left px-4 py-2 font-semibold text-gray-600 text-xs">Méthode</th>
                        <th className="text-center px-4 py-2 font-semibold text-gray-600 text-xs">Conclusion</th>
                        <th className="text-center px-4 py-2 font-semibold text-gray-600 text-xs">Revue</th>
                        <th className="text-center px-4 py-2 font-semibold text-gray-600 text-xs">Temps (j)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {feuillesTravail.map((ft) => (
                        <tr key={ft.ref} className="hover:bg-amber-50/30">
                          <td className="px-4 py-3 font-mono text-xs text-gray-500">{ft.ref}</td>
                          <td className="px-4 py-3 text-gray-700">{ft.objectif}</td>
                          <td className="px-4 py-3 text-gray-500 text-xs">{ft.methode}</td>
                          <td className="px-4 py-3 text-center">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${ft.conclusion === "satisfaisant" ? "bg-emerald-50 text-emerald-700" : ft.conclusion === "observation" ? "bg-amber-50 text-amber-700" : "bg-red-50 text-red-700"}`}>
                              {ft.conclusion === "satisfaisant" ? "Satisfaisant" : ft.conclusion === "observation" ? "Observation" : "Constat"}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${ft.statutRevue === "validee" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                              {ft.statutRevue === "validee" ? "Validée" : "À revoir"}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-center text-gray-600 font-medium">{ft.temps}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {detailTab === "constats" && (
                  <div className="space-y-3">
                    {[
                      { ref: "C-001", situation: "Dossiers KYC incomplets pour 15% des clients à risque élevé", cotation: "majeur", statut: "valide" },
                      { ref: "C-002", situation: "Retards significatifs dans le traitement des alertes LCB-FT (délai moyen 12 jours vs 5 jours cible)", cotation: "critique", statut: "contradictoire" },
                      { ref: "C-003", situation: "Absence de revue périodique des scénarios de détection automatique", cotation: "significatif", statut: "valide" },
                      { ref: "C-004", situation: "Formation LCB-FT non réalisée pour 20% du personnel du réseau", cotation: "significatif", statut: "valide" },
                      { ref: "C-005", situation: "Classification des risques clients non actualisée depuis 18 mois", cotation: "majeur", statut: "contradictoire" },
                    ].map((c) => (
                      <div key={c.ref} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs text-gray-500">{c.ref}</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${c.cotation === "critique" ? "bg-red-100 text-red-700" : c.cotation === "majeur" ? "bg-orange-100 text-orange-700" : "bg-amber-100 text-amber-700"}`}>
                              {c.cotation.charAt(0).toUpperCase() + c.cotation.slice(1)}
                            </span>
                          </div>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${c.statut === "valide" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                            {c.statut === "valide" ? "Validé" : "En contradictoire"}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">{c.situation}</p>
                      </div>
                    ))}
                  </div>
                )}

                {detailTab === "documents" && (
                  <div className="space-y-2">
                    {[
                      { nom: "Lettre de mission M-2026-001", type: "lettre_mission", date: "2026-01-10", taille: "245 Ko" },
                      { nom: "Note d'orientation", type: "feuille_travail", date: "2026-01-20", taille: "380 Ko" },
                      { nom: "Programme de travail v2", type: "feuille_travail", date: "2026-01-25", taille: "156 Ko" },
                      { nom: "Extraction alertes LCB-FT T1 2026", type: "preuve", date: "2026-02-15", taille: "2.4 Mo" },
                      { nom: "PV réunion d'ouverture", type: "pv", date: "2026-01-15", taille: "120 Ko" },
                    ].map((d) => (
                      <div key={d.nom} className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3 hover:bg-amber-50/30 transition-colors">
                        <FileText className="w-5 h-5 text-gray-400" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{d.nom}</p>
                          <p className="text-xs text-gray-500">{d.type.replace("_", " ")} • {d.date} • {d.taille}</p>
                        </div>
                        <button className="text-xs text-amber-600 font-medium hover:underline">Télécharger</button>
                      </div>
                    ))}
                  </div>
                )}

                {detailTab === "piste" && (
                  <div className="space-y-3">
                    {[
                      { date: "2026-03-05 14:30", acteur: "A. Dubois", action: "Feuille de travail FT-004 soumise à revue" },
                      { date: "2026-03-04 16:45", acteur: "S. Martin", action: "Validation de la feuille de travail FT-003" },
                      { date: "2026-03-03 10:15", acteur: "L. Bernard", action: "Constat C-005 créé — Cotation : Majeur" },
                      { date: "2026-03-01 09:00", acteur: "S. Martin", action: "Constat C-002 transmis en contradictoire" },
                      { date: "2026-02-25 11:30", acteur: "A. Dubois", action: "Feuille de travail FT-002 validée par S. Martin" },
                      { date: "2026-02-20 14:00", acteur: "L. Bernard", action: "Import population KYC — 1,250 dossiers — Hash: 3f8a...b2c1" },
                      { date: "2026-02-15 09:00", acteur: "S. Martin", action: "Programme de travail validé (v2)" },
                      { date: "2026-01-20 10:00", acteur: "S. Martin", action: "Note d'orientation soumise à validation RAI" },
                      { date: "2026-01-15 09:00", acteur: "S. Martin", action: "Réunion d'ouverture — PV déposé" },
                      { date: "2026-01-10 08:30", acteur: "N. Fontaine (RAI)", action: "Lettre de mission signée et notifiée" },
                    ].map((e, i) => (
                      <div key={i} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className="w-2 h-2 rounded-full bg-amber-400 ring-4 ring-amber-50 mt-1.5" />
                          {i < 9 && <div className="w-px flex-1 bg-gray-200 mt-1" />}
                        </div>
                        <div className="pb-3">
                          <p className="text-xs text-gray-400">{e.date} — {e.acteur}</p>
                          <p className="text-sm text-gray-700">{e.action}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
