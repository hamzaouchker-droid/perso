"use client";

import { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import {
  FileText,
  CheckCircle2,
  Clock,
  Eye,
  Download,
  Lock,
  ChevronRight,
  Send,
  PenTool,
  Search,
} from "lucide-react";

const rapports = [
  {
    id: "RPT-2026-001", mission: "M-2026-007", libelle: "Rapport - Audit des externalisations essentielles",
    statut: "diffuse", opinionGlobale: "acceptable", version: 3, dateCreation: "2026-03-10", dateDiffusion: "2026-03-20",
    redacteur: "S. Martin", valideur: "N. Fontaine",
    destinataires: ["Direction Générale", "DSI", "Direction Achats", "Comité d'audit"],
    constats: { critique: 0, majeur: 2, significatif: 3, mineur: 1 }, recommandations: 5,
    scelle: true, hashPdf: "a3f8c1...d4e2",
  },
  {
    id: "RPT-2026-002", mission: "M-2026-004", libelle: "Rapport - Contrôle des opérations de marché",
    statut: "diffuse", opinionGlobale: "insuffisant", version: 2, dateCreation: "2026-06-15", dateDiffusion: "2026-06-28",
    redacteur: "S. Martin", valideur: "N. Fontaine",
    destinataires: ["Direction Financière", "Direction des Risques", "Dirigeant effectif", "Comité d'audit"],
    constats: { critique: 1, majeur: 3, significatif: 5, mineur: 3 }, recommandations: 9,
    scelle: true, hashPdf: "b7d2e5...f1a3",
  },
  {
    id: "RPT-2026-003", mission: "M-2026-008", libelle: "Rapport - Audit SSI & cybersécurité",
    statut: "validation_rai", opinionGlobale: "insuffisant", version: 1, dateCreation: "2026-05-20", dateDiffusion: null,
    redacteur: "C. Moreau", valideur: null,
    destinataires: [],
    constats: { critique: 2, majeur: 3, significatif: 6, mineur: 3 }, recommandations: 11,
    scelle: false, hashPdf: null,
  },
  {
    id: "RPT-2026-004", mission: "M-2026-002", libelle: "Rapport - Revue crédit immobilier",
    statut: "revue_superviseur", opinionGlobale: "acceptable", version: 1, dateCreation: "2026-04-25", dateDiffusion: null,
    redacteur: "P. Leroy", valideur: null,
    destinataires: [],
    constats: { critique: 0, majeur: 2, significatif: 4, mineur: 2 }, recommandations: 6,
    scelle: false, hashPdf: null,
  },
  {
    id: "RPT-2026-005", mission: "M-2026-001", libelle: "Rapport - Audit du dispositif LCB-FT",
    statut: "redaction", opinionGlobale: null, version: 1, dateCreation: "2026-03-28", dateDiffusion: null,
    redacteur: "S. Martin", valideur: null,
    destinataires: [],
    constats: { critique: 1, majeur: 1, significatif: 2, mineur: 1 }, recommandations: 4,
    scelle: false, hashPdf: null,
  },
];

const workflowSteps = [
  { id: "redaction", label: "Rédaction", icon: PenTool },
  { id: "revue_superviseur", label: "Revue superviseur", icon: Eye },
  { id: "validation_rai", label: "Validation RAI", icon: CheckCircle2 },
  { id: "diffuse", label: "Diffusé", icon: Send },
];

function getStatutIndex(s: string) {
  return workflowSteps.findIndex((ws) => ws.id === s);
}

function getOpinionStyle(o: string | null) {
  if (!o) return "bg-gray-50 text-gray-500";
  const map: Record<string, string> = {
    satisfaisant: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
    acceptable: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
    insuffisant: "bg-orange-50 text-orange-700 ring-1 ring-orange-200",
    critique: "bg-red-50 text-red-700 ring-1 ring-red-200",
  };
  return map[o] || "bg-gray-50 text-gray-500";
}

export default function RapportsPage() {
  const [selectedRapport, setSelectedRapport] = useState<typeof rapports[0] | null>(null);

  const diffuses = rapports.filter((r) => r.statut === "diffuse").length;
  const enCours = rapports.filter((r) => r.statut !== "diffuse").length;

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Rapports</h1>
            <p className="text-sm text-gray-500 mt-1">Production, validation et diffusion des rapports d&apos;audit</p>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <p className="text-xs text-gray-500">Total rapports</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{rapports.length}</p>
          </div>
          <div className="bg-white rounded-2xl border border-emerald-100 shadow-sm p-4">
            <p className="text-xs text-gray-500">Diffusés</p>
            <p className="text-2xl font-bold text-emerald-600 mt-1">{diffuses}</p>
          </div>
          <div className="bg-white rounded-2xl border border-amber-100 shadow-sm p-4">
            <p className="text-xs text-gray-500">En cours de validation</p>
            <p className="text-2xl font-bold text-amber-600 mt-1">{enCours}</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <p className="text-xs text-gray-500">Délai moyen (terrain → diffusion)</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">18 <span className="text-sm font-normal text-gray-500">jours</span></p>
          </div>
        </div>

        {/* Reports list */}
        <div className="space-y-4">
          {rapports.map((r) => {
            const statutIdx = getStatutIndex(r.statut);
            return (
              <div key={r.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-amber-200/50 transition-all overflow-hidden">
                <div className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs text-gray-400">{r.id}</span>
                        {r.scelle && (
                          <span className="flex items-center gap-1 px-1.5 py-0.5 bg-emerald-50 text-emerald-600 rounded text-[10px] font-bold">
                            <Lock className="w-3 h-3" /> Scellé
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-gray-900">{r.libelle}</h3>
                      <p className="text-xs text-gray-500 mt-1">
                        Rédacteur : {r.redacteur} {r.valideur && `• Validé par : ${r.valideur}`}
                        {r.dateDiffusion && ` • Diffusé le ${new Date(r.dateDiffusion).toLocaleDateString("fr-FR")}`}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {r.opinionGlobale && (
                        <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${getOpinionStyle(r.opinionGlobale)}`}>
                          {r.opinionGlobale}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Workflow */}
                  <div className="flex items-center gap-1 mb-4">
                    {workflowSteps.map((step, i) => {
                      const done = i <= statutIdx;
                      const current = i === statutIdx;
                      return (
                        <div key={step.id} className="flex items-center gap-1">
                          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${current ? "bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-800 ring-1 ring-amber-200" : done ? "bg-emerald-50 text-emerald-700" : "bg-gray-50 text-gray-400"}`}>
                            {done && i < statutIdx ? <CheckCircle2 className="w-3 h-3" /> : <step.icon className="w-3 h-3" />}
                            {step.label}
                          </div>
                          {i < workflowSteps.length - 1 && <ChevronRight className="w-3 h-3 text-gray-300" />}
                        </div>
                      );
                    })}
                  </div>

                  {/* Stats row */}
                  <div className="flex items-center gap-6 text-xs">
                    <span className="text-gray-500">Constats :</span>
                    {r.constats.critique > 0 && <span className="px-2 py-0.5 bg-red-50 text-red-700 rounded-full font-bold">{r.constats.critique} critique{r.constats.critique > 1 ? "s" : ""}</span>}
                    {r.constats.majeur > 0 && <span className="px-2 py-0.5 bg-orange-50 text-orange-700 rounded-full font-bold">{r.constats.majeur} majeur{r.constats.majeur > 1 ? "s" : ""}</span>}
                    <span className="px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full font-medium">{r.constats.significatif} significatif{r.constats.significatif > 1 ? "s" : ""}</span>
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full font-medium">{r.constats.mineur} mineur{r.constats.mineur > 1 ? "s" : ""}</span>
                    <span className="text-gray-400">|</span>
                    <span className="text-gray-600 font-medium">{r.recommandations} recommandation{r.recommandations > 1 ? "s" : ""}</span>
                    <span className="text-gray-400">|</span>
                    <span className="text-gray-500">Version {r.version}</span>

                    <div className="flex-1" />
                    <div className="flex gap-2">
                      <button className="flex items-center gap-1 px-3 py-1.5 text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors text-xs font-medium">
                        <Eye className="w-3.5 h-3.5" /> Consulter
                      </button>
                      {r.scelle && (
                        <button className="flex items-center gap-1 px-3 py-1.5 text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors text-xs font-medium">
                          <Download className="w-3.5 h-3.5" /> PDF
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Destinataires */}
                  {r.destinataires.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-50">
                      <span className="text-xs text-gray-500">Diffusé à : </span>
                      {r.destinataires.map((d) => (
                        <span key={d} className="inline-flex px-2 py-0.5 bg-gray-50 text-gray-600 rounded-md text-xs mr-1">{d}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
