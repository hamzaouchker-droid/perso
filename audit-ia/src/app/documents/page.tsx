"use client";

import { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import {
  FolderArchive,
  FileText,
  Search,
  Filter,
  Download,
  Eye,
  Lock,
  Clock,
  Shield,
  Hash,
  AlertTriangle,
  Folder,
} from "lucide-react";

const documents = [
  { id: "DOC-001", nom: "Rapport - Audit externalisations essentielles", type: "rapport", mission: "M-2026-007", version: 3, classification: "confidentiel", auteur: "S. Martin", date: "2026-03-20", taille: "1.2 Mo", hash: "a3f8c1d4e2", scelle: true, legalHold: false },
  { id: "DOC-002", nom: "Rapport - Opérations de marché", type: "rapport", mission: "M-2026-004", version: 2, classification: "confidentiel", auteur: "S. Martin", date: "2026-06-28", taille: "2.1 Mo", hash: "b7d2e5f1a3", scelle: true, legalHold: false },
  { id: "DOC-003", nom: "Lettre de mission - Audit LCB-FT", type: "lettre_mission", mission: "M-2026-001", version: 1, classification: "confidentiel", auteur: "N. Fontaine", date: "2026-01-10", taille: "245 Ko", hash: "c5e1a9b3d7", scelle: true, legalHold: false },
  { id: "DOC-004", nom: "Lettre de mission - Audit DORA", type: "lettre_mission", mission: "M-2026-003", version: 1, classification: "confidentiel", auteur: "N. Fontaine", date: "2026-02-28", taille: "230 Ko", hash: "d8f3c7e2a1", scelle: true, legalHold: false },
  { id: "DOC-005", nom: "FT - Vérification procédures KYC", type: "feuille_travail", mission: "M-2026-001", version: 2, classification: "interne", auteur: "A. Dubois", date: "2026-02-15", taille: "380 Ko", hash: "e2b4d6f8a0", scelle: false, legalHold: false },
  { id: "DOC-006", nom: "FT - Test alertes filtrage LCB-FT", type: "feuille_travail", mission: "M-2026-001", version: 1, classification: "interne", auteur: "L. Bernard", date: "2026-02-20", taille: "520 Ko", hash: "f1a3c5d7e9", scelle: false, legalHold: false },
  { id: "DOC-007", nom: "Extraction alertes LCB-FT T1 2026", type: "preuve", mission: "M-2026-001", version: 1, classification: "secret", auteur: "A. Dubois", date: "2026-02-15", taille: "2.4 Mo", hash: "a7b9c1d3e5", scelle: false, legalHold: true },
  { id: "DOC-008", nom: "PV réunion d'ouverture - LCB-FT", type: "pv", mission: "M-2026-001", version: 1, classification: "interne", auteur: "S. Martin", date: "2026-01-15", taille: "120 Ko", hash: "b2c4d6e8f0", scelle: false, legalHold: false },
  { id: "DOC-009", nom: "Support Comité d'audit mars 2026", type: "support_comite", mission: null, version: 1, classification: "confidentiel", auteur: "N. Fontaine", date: "2026-03-12", taille: "3.5 Mo", hash: "c3d5e7f9a1", scelle: false, legalHold: false },
  { id: "DOC-010", nom: "Charte d'audit interne v3.1", type: "support_comite", mission: null, version: 4, classification: "interne", auteur: "N. Fontaine", date: "2026-01-15", taille: "450 Ko", hash: "d4e6f8a0b2", scelle: true, legalHold: false },
  { id: "DOC-011", nom: "FT - Valorisation dérivés portefeuille A", type: "feuille_travail", mission: "M-2026-004", version: 1, classification: "confidentiel", auteur: "F. Roux", date: "2026-05-10", taille: "890 Ko", hash: "e5f7a9b1c3", scelle: false, legalHold: false },
  { id: "DOC-012", nom: "Rapport - Audit SSI (projet)", type: "rapport", mission: "M-2026-008", version: 1, classification: "confidentiel", auteur: "C. Moreau", date: "2026-05-20", taille: "1.8 Mo", hash: "f6a8b0c2d4", scelle: false, legalHold: false },
];

function getTypeIcon(type: string) {
  const map: Record<string, string> = {
    rapport: "bg-purple-50 text-purple-600",
    lettre_mission: "bg-blue-50 text-blue-600",
    feuille_travail: "bg-indigo-50 text-indigo-600",
    preuve: "bg-amber-50 text-amber-600",
    pv: "bg-gray-50 text-gray-600",
    support_comite: "bg-emerald-50 text-emerald-600",
  };
  return map[type] || map.pv;
}

function getTypeLabel(type: string) {
  const map: Record<string, string> = {
    rapport: "Rapport",
    lettre_mission: "Lettre de mission",
    feuille_travail: "Feuille de travail",
    preuve: "Preuve",
    pv: "Procès-verbal",
    support_comite: "Support comité",
  };
  return map[type] || type;
}

function getClassStyle(c: string) {
  const map: Record<string, string> = {
    interne: "bg-green-50 text-green-700",
    confidentiel: "bg-amber-50 text-amber-700",
    secret: "bg-red-50 text-red-700",
  };
  return map[c] || map.interne;
}

export default function DocumentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterClass, setFilterClass] = useState("all");

  const filtered = documents.filter((d) => {
    if (filterType !== "all" && d.type !== filterType) return false;
    if (filterClass !== "all" && d.classification !== filterClass) return false;
    if (searchTerm && !d.nom.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const stats = {
    total: documents.length,
    scelles: documents.filter((d) => d.scelle).length,
    legalHold: documents.filter((d) => d.legalHold).length,
    confidentiel: documents.filter((d) => d.classification === "confidentiel" || d.classification === "secret").length,
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gestion documentaire</h1>
            <p className="text-sm text-gray-500 mt-1">Documents, piste d&apos;audit, archivage et conservation</p>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Documents", value: stats.total, icon: Folder, color: "bg-gray-50 text-gray-600" },
            { label: "Scellés (PDF/A)", value: stats.scelles, icon: Lock, color: "bg-emerald-50 text-emerald-600" },
            { label: "Gel juridique", value: stats.legalHold, icon: Shield, color: "bg-red-50 text-red-600" },
            { label: "Confidentiels / Secrets", value: stats.confidentiel, icon: AlertTriangle, color: "bg-amber-50 text-amber-600" },
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
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Recherche plein texte..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:ring-2 focus:ring-amber-300"
            />
          </div>
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm bg-white">
            <option value="all">Tous types</option>
            <option value="rapport">Rapports</option>
            <option value="lettre_mission">Lettres de mission</option>
            <option value="feuille_travail">Feuilles de travail</option>
            <option value="preuve">Preuves</option>
            <option value="pv">Procès-verbaux</option>
            <option value="support_comite">Supports comité</option>
          </select>
          <select value={filterClass} onChange={(e) => setFilterClass(e.target.value)} className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm bg-white">
            <option value="all">Toutes classifications</option>
            <option value="interne">Interne</option>
            <option value="confidentiel">Confidentiel</option>
            <option value="secret">Secret</option>
          </select>
        </div>

        {/* Document list */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50/80">
                <th className="text-left px-5 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Document</th>
                <th className="text-center px-3 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Type</th>
                <th className="text-center px-3 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Classification</th>
                <th className="text-left px-3 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Mission</th>
                <th className="text-center px-3 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Version</th>
                <th className="text-left px-3 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Auteur</th>
                <th className="text-center px-3 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Date</th>
                <th className="text-center px-3 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Taille</th>
                <th className="text-center px-3 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Statut</th>
                <th className="text-center px-3 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((d) => (
                <tr key={d.id} className="hover:bg-amber-50/30 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${getTypeIcon(d.type)}`}>
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{d.nom}</p>
                        <p className="text-xs text-gray-400 font-mono">{d.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <span className="text-xs text-gray-600">{getTypeLabel(d.type)}</span>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${getClassStyle(d.classification)}`}>
                      {d.classification.charAt(0).toUpperCase() + d.classification.slice(1)}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-xs text-gray-500">{d.mission || "—"}</td>
                  <td className="px-3 py-3 text-center text-xs text-gray-600">v{d.version}</td>
                  <td className="px-3 py-3 text-xs text-gray-700">{d.auteur}</td>
                  <td className="px-3 py-3 text-center text-xs text-gray-500">{new Date(d.date).toLocaleDateString("fr-FR")}</td>
                  <td className="px-3 py-3 text-center text-xs text-gray-500">{d.taille}</td>
                  <td className="px-3 py-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      {d.scelle && <span className="p-1 text-emerald-500" title="Scellé"><Lock className="w-3.5 h-3.5" /></span>}
                      {d.legalHold && <span className="p-1 text-red-500" title="Gel juridique"><Shield className="w-3.5 h-3.5" /></span>}
                      <span className="p-1 text-gray-300" title={`Hash: ${d.hash}`}><Hash className="w-3.5 h-3.5" /></span>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button className="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg"><Eye className="w-4 h-4" /></button>
                      <button className="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg"><Download className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Conservation info */}
        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
          <h3 className="font-semibold text-gray-900 text-sm mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-600" />
            Politique de conservation
          </h3>
          <div className="grid grid-cols-3 gap-4 text-xs text-gray-600">
            <div><span className="font-semibold">Rapports & dossiers d&apos;audit :</span> 10 ans</div>
            <div><span className="font-semibold">Pièces LCB-FT :</span> 5 ans minimum (CMF L.561-12)</div>
            <div><span className="font-semibold">Journaux de traçabilité :</span> selon PSSI (min. 1 an)</div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
