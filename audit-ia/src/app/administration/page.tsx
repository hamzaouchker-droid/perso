"use client";

import { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import {
  Settings,
  Users,
  Shield,
  Key,
  Clock,
  Bell,
  FileText,
  Database,
  Lock,
  AlertTriangle,
  CheckCircle2,
  Eye,
  RefreshCw,
} from "lucide-react";

const utilisateurs = [
  { nom: "Nicolas Fontaine", email: "n.fontaine@bankia.fr", role: "RAI (RA-01)", dernierAcces: "2026-06-11 09:15", statut: "actif", mfa: true },
  { nom: "Sophie Martin", email: "s.martin@bankia.fr", role: "Chef de mission (RA-02)", dernierAcces: "2026-06-11 08:45", statut: "actif", mfa: true },
  { nom: "Pierre Leroy", email: "p.leroy@bankia.fr", role: "Chef de mission (RA-02)", dernierAcces: "2026-06-10 17:30", statut: "actif", mfa: true },
  { nom: "Claire Moreau", email: "c.moreau@bankia.fr", role: "Chef de mission (RA-02)", dernierAcces: "2026-06-11 10:00", statut: "actif", mfa: true },
  { nom: "Alexandre Dubois", email: "a.dubois@bankia.fr", role: "Auditeur (RA-03)", dernierAcces: "2026-06-11 09:30", statut: "actif", mfa: true },
  { nom: "Lucie Bernard", email: "l.bernard@bankia.fr", role: "Auditeur (RA-03)", dernierAcces: "2026-06-10 16:00", statut: "actif", mfa: true },
  { nom: "José Garcia", email: "j.garcia@extern.fr", role: "Expert externe (RA-04)", dernierAcces: "2026-06-09 14:20", statut: "actif", mfa: true },
  { nom: "Marc Dupont", email: "m.dupont@bankia.fr", role: "Audité (RA-05)", dernierAcces: "2026-06-08 11:00", statut: "actif", mfa: true },
  { nom: "Admin Technique", email: "admin.tech@bankia.fr", role: "Admin technique (RA-10)", dernierAcces: "2026-06-11 07:00", statut: "actif", mfa: true },
];

const journalRecent = [
  { date: "2026-06-11 10:15", acteur: "C. Moreau", action: "Connexion", objet: "Session", detail: "Authentification SSO + MFA" },
  { date: "2026-06-11 10:12", acteur: "A. Dubois", action: "Modification", objet: "Feuille FT-004", detail: "Mise à jour de la conclusion" },
  { date: "2026-06-11 09:45", acteur: "S. Martin", action: "Validation", objet: "Constat C-005", detail: "Constat validé après contradictoire" },
  { date: "2026-06-11 09:30", acteur: "N. Fontaine", action: "Consultation", objet: "Mission M-2026-001 (sensible)", detail: "Accès mission sensible LCB-FT" },
  { date: "2026-06-11 09:15", acteur: "N. Fontaine", action: "Connexion", objet: "Session", detail: "Authentification SSO + MFA" },
  { date: "2026-06-10 17:30", acteur: "P. Leroy", action: "Export", objet: "Recommandations", detail: "Export XLSX recommandations crédit" },
  { date: "2026-06-10 16:00", acteur: "L. Bernard", action: "Dépôt", objet: "Document DOC-006", detail: "Feuille de travail alertes LCB-FT" },
  { date: "2026-06-10 14:20", acteur: "J. Garcia", action: "Consultation", objet: "Mission M-2026-003", detail: "Accès périmètre DORA" },
];

const matriceSoD = [
  { role1: "RA-03 (Auditeur)", role2: "RA-05 (Audité)", incompatible: true, regle: "Même périmètre" },
  { role1: "RA-09 (Admin fonc.)", role2: "RA-01 (RAI)", incompatible: true, regle: "Cumul interdit" },
  { role1: "RA-10 (Admin tech.)", role2: "RA-01 à RA-08", incompatible: true, regle: "Pas d'accès métier" },
  { role1: "RA-02 (Chef mission)", role2: "RA-05 (Audité)", incompatible: true, regle: "Même périmètre" },
];

export default function AdministrationPage() {
  const [activeTab, setActiveTab] = useState("utilisateurs");

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Administration</h1>
            <p className="text-sm text-gray-500 mt-1">Gestion des utilisateurs, habilitations, paramétrage et journal d&apos;audit</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-xl p-1 shadow-sm border border-gray-100">
          {[
            { id: "utilisateurs", label: "Utilisateurs & Habilitations", icon: Users },
            { id: "sod", label: "Séparation des tâches", icon: Shield },
            { id: "journal", label: "Journal d'audit", icon: Clock },
            { id: "parametrage", label: "Paramétrage", icon: Settings },
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

        {activeTab === "utilisateurs" && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 bg-blue-50 rounded-xl p-4 border border-blue-100">
              <Key className="w-5 h-5 text-blue-600 shrink-0" />
              <div className="text-sm text-blue-800">
                <strong>Habilitations nominatives</strong> — Revues au minimum annuellement (campagne de recertification). Prochaine campagne : <strong>15 septembre 2026</strong>.
                Authentification SSO (SAML/OIDC) avec MFA obligatoire. Comptes locaux interdits hors comptes de secours scellés.
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50/80">
                    <th className="text-left px-5 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Utilisateur</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Email</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Rôle</th>
                    <th className="text-center px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Dernier accès</th>
                    <th className="text-center px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">MFA</th>
                    <th className="text-center px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {utilisateurs.map((u, i) => (
                    <tr key={i} className="hover:bg-amber-50/30 transition-colors">
                      <td className="px-5 py-3 font-medium text-gray-900">{u.nom}</td>
                      <td className="px-4 py-3 text-gray-500 text-xs">{u.email}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 bg-gray-50 text-gray-700 rounded-md text-xs font-medium">{u.role}</span>
                      </td>
                      <td className="px-4 py-3 text-center text-xs text-gray-500">{u.dernierAcces}</td>
                      <td className="px-4 py-3 text-center">
                        {u.mfa ? <CheckCircle2 className="w-4 h-4 text-emerald-500 mx-auto" /> : <AlertTriangle className="w-4 h-4 text-red-500 mx-auto" />}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium">Actif</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "sod" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Matrice de séparation des tâches (RG-002)</h3>
              <p className="text-sm text-gray-500 mb-4">Cumuls de rôles incompatibles bloqués par le système</p>
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 rounded-lg">
                    <th className="text-left px-4 py-2 font-semibold text-gray-600 text-xs">Rôle 1</th>
                    <th className="text-left px-4 py-2 font-semibold text-gray-600 text-xs">Rôle 2</th>
                    <th className="text-center px-4 py-2 font-semibold text-gray-600 text-xs">Incompatible</th>
                    <th className="text-left px-4 py-2 font-semibold text-gray-600 text-xs">Règle</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {matriceSoD.map((m, i) => (
                    <tr key={i}>
                      <td className="px-4 py-3 font-medium text-gray-900">{m.role1}</td>
                      <td className="px-4 py-3 font-medium text-gray-900">{m.role2}</td>
                      <td className="px-4 py-3 text-center">
                        <span className="px-2 py-0.5 bg-red-50 text-red-700 rounded-full text-xs font-bold">Bloqué</span>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{m.regle}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-amber-50/50 rounded-2xl border border-amber-200/50 p-5">
              <h4 className="font-semibold text-amber-800 text-sm mb-2 flex items-center gap-2">
                <Shield className="w-4 h-4" /> Conflits d&apos;intérêts déclarés (RG-003)
              </h4>
              <div className="space-y-2 text-sm text-amber-900">
                <p>• <strong>P. Leroy</strong> — Ancien directeur crédit consommation (2022-2024) → bloqué sur missions crédit conso jusqu&apos;en 2027</p>
                <p>• <strong>L. Bernard</strong> — Conjoint en poste à la Direction Conformité → dérogation RAI pour missions conformité (tracée, 10/01/2026)</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "journal" && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4 border border-gray-200">
              <Lock className="w-5 h-5 text-gray-600 shrink-0" />
              <p className="text-sm text-gray-600">
                Journal append-only, horodaté, inaltérable. Conservé selon la PSSI et exportable vers le SIEM.
                Toute action significative est journalisée de façon non répudiable.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50/80">
                    <th className="text-left px-5 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Horodatage</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Acteur</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Action</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Objet</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Détail</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {journalRecent.map((j, i) => (
                    <tr key={i} className="hover:bg-amber-50/30 transition-colors">
                      <td className="px-5 py-3 font-mono text-xs text-gray-500">{j.date}</td>
                      <td className="px-4 py-3 text-gray-700 font-medium">{j.acteur}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${
                          j.action === "Connexion" ? "bg-blue-50 text-blue-700" :
                          j.action === "Validation" ? "bg-emerald-50 text-emerald-700" :
                          j.action === "Modification" ? "bg-amber-50 text-amber-700" :
                          j.action === "Consultation" ? "bg-gray-50 text-gray-600" :
                          j.action === "Export" ? "bg-purple-50 text-purple-700" :
                          "bg-indigo-50 text-indigo-700"
                        }`}>{j.action}</span>
                      </td>
                      <td className="px-4 py-3 text-gray-600 text-xs">{j.objet}</td>
                      <td className="px-4 py-3 text-gray-500 text-xs">{j.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "parametrage" && (
          <div className="grid grid-cols-2 gap-6">
            {[
              { titre: "Workflows", desc: "Configuration des circuits de validation (plan, rapport, clôture reco)", icon: RefreshCw, count: "4 workflows actifs" },
              { titre: "Modèles de documents", desc: "Lettre de mission, rapport, synthèse comité, feuille de travail", icon: FileText, count: "12 modèles" },
              { titre: "Grilles de cotation", desc: "Constats (4 niveaux), opinion mission (4 niveaux), risques (4 niveaux)", icon: Database, count: "3 grilles" },
              { titre: "Seuils d'alerte", desc: "Échéances recommandations, capacité, couverture cycle, délai rapport", icon: Bell, count: "8 seuils configurés" },
              { titre: "Notifications", desc: "Templates email (sans contenu confidentiel), fréquences, destinataires", icon: Bell, count: "15 templates" },
              { titre: "Référentiels réglementaires", desc: "Textes de référence, étiquettes, rattachements", icon: Shield, count: "10 textes" },
            ].map((p) => (
              <div key={p.titre} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-amber-200/50 transition-all cursor-pointer">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                    <p.icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{p.titre}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{p.desc}</p>
                    <p className="text-xs text-amber-600 font-medium mt-2">{p.count}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
