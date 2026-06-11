"use client";

import { useState, useMemo } from "react";
import AppShell from "@/components/layout/AppShell";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  ChevronDown,
  ChevronRight,
  Plus,
  Search,
  Download,
  Eye,
  Pencil,
  X,
  Building2,
  Network,
  ShieldAlert,
  ClipboardList,
  BarChart3,
  AlertTriangle,
  Filter,
} from "lucide-react";

/* ─────────────────────────── TYPES ─────────────────────────── */

interface Entite {
  id: string;
  code: string;
  libelle: string;
  type: "Groupe" | "Filiale" | "Direction" | "Service";
  statut: "Actif" | "Inactif";
  children?: Entite[];
}

interface Processus {
  id: string;
  code: string;
  libelle: string;
  niveau: "Macro-processus" | "Processus" | "Sous-processus";
  children?: Processus[];
}

interface RisqueCategorie {
  id: string;
  nom: string;
  couleur: string;
  count: number;
  icone: string;
}

interface ObjetAuditable {
  id: string;
  code: string;
  libelle: string;
  entite: string;
  processus: string;
  criticite: "faible" | "modéré" | "élevé" | "critique";
  frequenceCible: number;
  dernierAudit: string;
  prochainAuditMax: string;
  recoOuvertes: number;
  risques: string[];
}

/* ─────────────────────────── DATA ─────────────────────────── */

const entites: Entite[] = [
  {
    id: "e1",
    code: "GRP-001",
    libelle: "Groupe Banque Centrale Populaire",
    type: "Groupe",
    statut: "Actif",
    children: [
      {
        id: "e2",
        code: "FIL-001",
        libelle: "Banque Populaire Régionale Casablanca",
        type: "Filiale",
        statut: "Actif",
        children: [
          {
            id: "e3",
            code: "DIR-001",
            libelle: "Direction des Risques",
            type: "Direction",
            statut: "Actif",
            children: [
              { id: "e4", code: "SRV-001", libelle: "Service Risque de Crédit", type: "Service", statut: "Actif" },
              { id: "e5", code: "SRV-002", libelle: "Service Risque Opérationnel", type: "Service", statut: "Actif" },
            ],
          },
          {
            id: "e6",
            code: "DIR-002",
            libelle: "Direction de la Conformité",
            type: "Direction",
            statut: "Actif",
            children: [
              { id: "e7", code: "SRV-003", libelle: "Service LCB-FT", type: "Service", statut: "Actif" },
              { id: "e8", code: "SRV-004", libelle: "Service Contrôle Permanent", type: "Service", statut: "Actif" },
            ],
          },
          {
            id: "e9",
            code: "DIR-003",
            libelle: "Direction des Opérations",
            type: "Direction",
            statut: "Actif",
            children: [
              { id: "e10", code: "SRV-005", libelle: "Service Back-Office Titres", type: "Service", statut: "Actif" },
            ],
          },
        ],
      },
      {
        id: "e11",
        code: "FIL-002",
        libelle: "Chaabi International Bank (Offshore)",
        type: "Filiale",
        statut: "Actif",
        children: [
          {
            id: "e12",
            code: "DIR-004",
            libelle: "Direction Financière",
            type: "Direction",
            statut: "Actif",
          },
        ],
      },
      {
        id: "e13",
        code: "FIL-003",
        libelle: "Média Finance (Filiale Bourse)",
        type: "Filiale",
        statut: "Inactif",
      },
    ],
  },
];

const processusData: Processus[] = [
  {
    id: "p1",
    code: "MP-01",
    libelle: "Gestion des Crédits",
    niveau: "Macro-processus",
    children: [
      {
        id: "p2",
        code: "PR-01",
        libelle: "Octroi de Crédit",
        niveau: "Processus",
        children: [
          { id: "p3", code: "SP-01", libelle: "Analyse financière emprunteur", niveau: "Sous-processus" },
          { id: "p4", code: "SP-02", libelle: "Évaluation des garanties", niveau: "Sous-processus" },
          { id: "p5", code: "SP-03", libelle: "Décision et notification", niveau: "Sous-processus" },
        ],
      },
      {
        id: "p6",
        code: "PR-02",
        libelle: "Suivi et Recouvrement",
        niveau: "Processus",
        children: [
          { id: "p7", code: "SP-04", libelle: "Suivi des impayés", niveau: "Sous-processus" },
          { id: "p8", code: "SP-05", libelle: "Provisionnement", niveau: "Sous-processus" },
        ],
      },
    ],
  },
  {
    id: "p9",
    code: "MP-02",
    libelle: "Conformité & Réglementaire",
    niveau: "Macro-processus",
    children: [
      {
        id: "p10",
        code: "PR-03",
        libelle: "Lutte Anti-Blanchiment (LCB-FT)",
        niveau: "Processus",
        children: [
          { id: "p11", code: "SP-06", libelle: "KYC / Due Diligence", niveau: "Sous-processus" },
          { id: "p12", code: "SP-07", libelle: "Déclarations de soupçon", niveau: "Sous-processus" },
        ],
      },
      {
        id: "p13",
        code: "PR-04",
        libelle: "Protection de la clientèle",
        niveau: "Processus",
      },
    ],
  },
  {
    id: "p14",
    code: "MP-03",
    libelle: "Systèmes d'Information",
    niveau: "Macro-processus",
    children: [
      {
        id: "p15",
        code: "PR-05",
        libelle: "Sécurité des SI",
        niveau: "Processus",
        children: [
          { id: "p16", code: "SP-08", libelle: "Gestion des accès logiques", niveau: "Sous-processus" },
          { id: "p17", code: "SP-09", libelle: "Plan de continuité IT", niveau: "Sous-processus" },
        ],
      },
    ],
  },
  {
    id: "p18",
    code: "MP-04",
    libelle: "Opérations Bancaires",
    niveau: "Macro-processus",
    children: [
      {
        id: "p19",
        code: "PR-06",
        libelle: "Moyens de paiement",
        niveau: "Processus",
      },
      {
        id: "p20",
        code: "PR-07",
        libelle: "Opérations de marché",
        niveau: "Processus",
      },
    ],
  },
];

const risqueCategories: RisqueCategorie[] = [
  { id: "r1", nom: "Crédit", couleur: "#DC2626", count: 18, icone: "💳" },
  { id: "r2", nom: "Marché", couleur: "#7C3AED", count: 9, icone: "📈" },
  { id: "r3", nom: "Liquidité", couleur: "#2563EB", count: 6, icone: "💧" },
  { id: "r4", nom: "Opérationnel", couleur: "#EA580C", count: 24, icone: "⚙️" },
  { id: "r5", nom: "Conformité", couleur: "#0891B2", count: 15, icone: "📋" },
  { id: "r6", nom: "LCB-FT", couleur: "#BE123C", count: 12, icone: "🔍" },
  { id: "r7", nom: "TIC / Cyber", couleur: "#4F46E5", count: 11, icone: "🛡️" },
  { id: "r8", nom: "ESG", couleur: "#059669", count: 5, icone: "🌱" },
  { id: "r9", nom: "Modèle", couleur: "#D97706", count: 7, icone: "🧮" },
  { id: "r10", nom: "Réputation", couleur: "#6D28D9", count: 4, icone: "⭐" },
];

const objetsAuditables: ObjetAuditable[] = [
  { id: "oa1", code: "OA-001", libelle: "Processus d'octroi de crédit immobilier", entite: "Direction des Risques", processus: "Octroi de Crédit", criticite: "critique", frequenceCible: 1, dernierAudit: "2025-03-15", prochainAuditMax: "2026-03-15", recoOuvertes: 5, risques: ["Crédit", "Conformité"] },
  { id: "oa2", code: "OA-002", libelle: "Dispositif KYC / Due Diligence", entite: "Direction de la Conformité", processus: "Lutte Anti-Blanchiment (LCB-FT)", criticite: "critique", frequenceCible: 1, dernierAudit: "2024-11-20", prochainAuditMax: "2025-11-20", recoOuvertes: 8, risques: ["LCB-FT", "Conformité"] },
  { id: "oa3", code: "OA-003", libelle: "Gestion des accès au système d'information", entite: "Direction des Opérations", processus: "Sécurité des SI", criticite: "élevé", frequenceCible: 2, dernierAudit: "2024-06-10", prochainAuditMax: "2026-06-10", recoOuvertes: 3, risques: ["TIC / Cyber", "Opérationnel"] },
  { id: "oa4", code: "OA-004", libelle: "Suivi des impayés et provisionnement", entite: "Direction des Risques", processus: "Suivi et Recouvrement", criticite: "élevé", frequenceCible: 2, dernierAudit: "2023-09-01", prochainAuditMax: "2025-09-01", recoOuvertes: 4, risques: ["Crédit"] },
  { id: "oa5", code: "OA-005", libelle: "Opérations de change et trésorerie", entite: "Direction Financière", processus: "Opérations de marché", criticite: "élevé", frequenceCible: 2, dernierAudit: "2025-01-22", prochainAuditMax: "2027-01-22", recoOuvertes: 2, risques: ["Marché", "Liquidité"] },
  { id: "oa6", code: "OA-006", libelle: "Plan de continuité d'activité (PCA)", entite: "Direction des Opérations", processus: "Sécurité des SI", criticite: "critique", frequenceCible: 1, dernierAudit: "2025-06-01", prochainAuditMax: "2026-06-01", recoOuvertes: 1, risques: ["Opérationnel", "TIC / Cyber"] },
  { id: "oa7", code: "OA-007", libelle: "Gestion des réclamations clients", entite: "Banque Populaire Régionale Casablanca", processus: "Protection de la clientèle", criticite: "modéré", frequenceCible: 3, dernierAudit: "2023-04-18", prochainAuditMax: "2026-04-18", recoOuvertes: 2, risques: ["Conformité", "Réputation"] },
  { id: "oa8", code: "OA-008", libelle: "Sécurité des moyens de paiement électroniques", entite: "Direction des Opérations", processus: "Moyens de paiement", criticite: "élevé", frequenceCible: 2, dernierAudit: "2024-02-28", prochainAuditMax: "2026-02-28", recoOuvertes: 6, risques: ["Opérationnel", "TIC / Cyber"] },
  { id: "oa9", code: "OA-009", libelle: "Reporting réglementaire BAM", entite: "Direction de la Conformité", processus: "Protection de la clientèle", criticite: "élevé", frequenceCible: 2, dernierAudit: "2024-08-14", prochainAuditMax: "2026-08-14", recoOuvertes: 1, risques: ["Conformité"] },
  { id: "oa10", code: "OA-010", libelle: "Évaluation des garanties hypothécaires", entite: "Direction des Risques", processus: "Octroi de Crédit", criticite: "modéré", frequenceCible: 3, dernierAudit: "2022-12-05", prochainAuditMax: "2025-12-05", recoOuvertes: 3, risques: ["Crédit", "Modèle"] },
  { id: "oa11", code: "OA-011", libelle: "Gestion du risque de taux d'intérêt", entite: "Direction Financière", processus: "Opérations de marché", criticite: "élevé", frequenceCible: 2, dernierAudit: "2024-05-20", prochainAuditMax: "2026-05-20", recoOuvertes: 0, risques: ["Marché", "Modèle"] },
  { id: "oa12", code: "OA-012", libelle: "Dispositif anti-fraude interne", entite: "Direction de la Conformité", processus: "Lutte Anti-Blanchiment (LCB-FT)", criticite: "critique", frequenceCible: 1, dernierAudit: "2025-04-10", prochainAuditMax: "2026-04-10", recoOuvertes: 7, risques: ["Opérationnel", "LCB-FT"] },
  { id: "oa13", code: "OA-013", libelle: "Externalisation et sous-traitance IT", entite: "Direction des Opérations", processus: "Sécurité des SI", criticite: "modéré", frequenceCible: 3, dernierAudit: "2021-07-15", prochainAuditMax: "2024-07-15", recoOuvertes: 4, risques: ["TIC / Cyber", "Opérationnel"] },
  { id: "oa14", code: "OA-014", libelle: "Crédit à la consommation", entite: "Banque Populaire Régionale Casablanca", processus: "Octroi de Crédit", criticite: "modéré", frequenceCible: 3, dernierAudit: "2023-11-30", prochainAuditMax: "2026-11-30", recoOuvertes: 1, risques: ["Crédit", "Conformité"] },
  { id: "oa15", code: "OA-015", libelle: "Risques ESG et finance durable", entite: "Groupe Banque Centrale Populaire", processus: "Protection de la clientèle", criticite: "faible", frequenceCible: 4, dernierAudit: "2024-01-10", prochainAuditMax: "2028-01-10", recoOuvertes: 0, risques: ["ESG", "Réputation"] },
  { id: "oa16", code: "OA-016", libelle: "Back-office titres et conservation", entite: "Service Back-Office Titres", processus: "Opérations de marché", criticite: "modéré", frequenceCible: 3, dernierAudit: "2020-03-22", prochainAuditMax: "2023-03-22", recoOuvertes: 2, risques: ["Opérationnel", "Marché"] },
];

const tabs = [
  { key: "entites", label: "Entités organisationnelles", icon: Building2 },
  { key: "processus", label: "Processus", icon: Network },
  { key: "risques", label: "Risques", icon: ShieldAlert },
  { key: "objets", label: "Objets auditables", icon: ClipboardList },
  { key: "couverture", label: "Couverture du cycle", icon: BarChart3 },
] as const;

type TabKey = (typeof tabs)[number]["key"];

const NAVY = "#0A1628";
const GOLD = "#C9A84C";

const criticiteConfig: Record<string, { bg: string; text: string; label: string }> = {
  faible: { bg: "bg-blue-100", text: "text-blue-800", label: "Faible" },
  modéré: { bg: "bg-amber-100", text: "text-amber-800", label: "Modéré" },
  élevé: { bg: "bg-orange-100", text: "text-orange-800", label: "Élevé" },
  critique: { bg: "bg-red-100", text: "text-red-800", label: "Critique" },
};

/* ─────────────────────────── HELPERS ─────────────────────────── */

function isOverdue(dateStr: string): boolean {
  return new Date(dateStr) < new Date("2026-06-10");
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

/* ─────────────────────────── TREE COMPONENT ─────────────────────────── */

function TreeNode({ node, renderCard }: { node: { children?: any[]; id: string }; renderCard: (n: any, depth: number) => React.ReactNode; depth?: number }) {
  const depth = arguments.length > 2 ? (arguments as any)[2] : 0;
  const [expanded, setExpanded] = useState(depth < 2);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className={depth > 0 ? "ml-6 border-l-2 border-[#C9A84C]/20 pl-4" : ""}>
      <div
        className="flex items-start gap-2 cursor-pointer group"
        onClick={() => hasChildren && setExpanded(!expanded)}
      >
        {hasChildren ? (
          <span className="mt-3 text-[#C9A84C] transition-transform">
            {expanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </span>
        ) : (
          <span className="mt-3 w-[18px]" />
        )}
        <div className="flex-1">{renderCard(node, depth)}</div>
      </div>
      {expanded && hasChildren && (
        <div className="mt-1">
          {node.children!.map((child: any) => (
            <TreeNode key={child.id} node={child} renderCard={renderCard} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────── MODAL ─────────────────────────── */

function AjouterObjetModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [form, setForm] = useState({
    libelle: "",
    entite: "",
    processus: "",
    risques: [] as string[],
    criticite: "modéré",
    frequenceCible: 3,
    rattachement: [] as string[],
  });

  if (!open) return null;

  const entiteOptions = ["Direction des Risques", "Direction de la Conformité", "Direction des Opérations", "Direction Financière", "Banque Populaire Régionale Casablanca", "Groupe Banque Centrale Populaire"];
  const processusOptions = ["Octroi de Crédit", "Suivi et Recouvrement", "Lutte Anti-Blanchiment (LCB-FT)", "Protection de la clientèle", "Sécurité des SI", "Moyens de paiement", "Opérations de marché"];
  const risqueOptions = ["Crédit", "Marché", "Liquidité", "Opérationnel", "Conformité", "LCB-FT", "TIC / Cyber", "ESG", "Modèle", "Réputation"];
  const rattachementOptions = ["Circulaire BAM 4/W/2014", "Directive DNSSI", "Bâle III / CRD V", "Loi 43-05 LCB-FT", "Circulaire AMMC", "Norme IFRS 9"];

  const toggleRisque = (r: string) => {
    setForm((f) => ({
      ...f,
      risques: f.risques.includes(r) ? f.risques.filter((x) => x !== r) : [...f.risques, r],
    }));
  };

  const toggleRattachement = (r: string) => {
    setForm((f) => ({
      ...f,
      rattachement: f.rattachement.includes(r) ? f.rattachement.filter((x) => x !== r) : [...f.rattachement, r],
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-[#C9A84C]/30">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100" style={{ background: `linear-gradient(135deg, ${NAVY}, #162240)` }}>
          <h2 className="text-lg font-semibold text-white">Ajouter un objet auditable</h2>
          <button onClick={onClose} className="text-white/70 hover:text-white transition"><X size={20} /></button>
        </div>

        <div className="p-6 space-y-5">
          {/* Libellé */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Libellé <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={form.libelle}
              onChange={(e) => setForm({ ...form, libelle: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 focus:border-[#C9A84C] transition"
              placeholder="Ex : Gestion du risque de crédit corporate"
            />
          </div>

          {/* Entité */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Entité <span className="text-red-500">*</span></label>
            <select
              value={form.entite}
              onChange={(e) => setForm({ ...form, entite: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 focus:border-[#C9A84C] transition bg-white"
            >
              <option value="">Sélectionner une entité...</option>
              {entiteOptions.map((e) => <option key={e} value={e}>{e}</option>)}
            </select>
          </div>

          {/* Processus */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Processus <span className="text-red-500">*</span></label>
            <select
              value={form.processus}
              onChange={(e) => setForm({ ...form, processus: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 focus:border-[#C9A84C] transition bg-white"
            >
              <option value="">Sélectionner un processus...</option>
              {processusOptions.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          {/* Risques */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Risques associés</label>
            <div className="grid grid-cols-2 gap-2">
              {risqueOptions.map((r) => (
                <label key={r} className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-100 hover:bg-gray-50 cursor-pointer transition">
                  <input
                    type="checkbox"
                    checked={form.risques.includes(r)}
                    onChange={() => toggleRisque(r)}
                    className="rounded border-gray-300 text-[#C9A84C] focus:ring-[#C9A84C]"
                  />
                  <span className="text-sm text-gray-700">{r}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Criticité */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Criticité <span className="text-red-500">*</span></label>
            <div className="flex gap-3">
              {(["faible", "modéré", "élevé", "critique"] as const).map((c) => (
                <label
                  key={c}
                  className={`flex-1 text-center py-2.5 rounded-xl border-2 cursor-pointer transition text-sm font-medium ${
                    form.criticite === c
                      ? `${criticiteConfig[c].bg} ${criticiteConfig[c].text} border-current`
                      : "border-gray-200 text-gray-500 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="criticite"
                    value={c}
                    checked={form.criticite === c}
                    onChange={() => setForm({ ...form, criticite: c })}
                    className="sr-only"
                  />
                  {criticiteConfig[c].label}
                </label>
              ))}
            </div>
          </div>

          {/* Fréquence cible */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fréquence cible (en années, max 5)</label>
            <input
              type="number"
              min={1}
              max={5}
              value={form.frequenceCible}
              onChange={(e) => setForm({ ...form, frequenceCible: Math.min(5, Math.max(1, Number(e.target.value))) })}
              className="w-32 px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 focus:border-[#C9A84C] transition"
            />
            <span className="ml-2 text-sm text-gray-500">an(s)</span>
          </div>

          {/* Rattachement réglementaire */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rattachement réglementaire</label>
            <div className="grid grid-cols-2 gap-2">
              {rattachementOptions.map((r) => (
                <label key={r} className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-100 hover:bg-gray-50 cursor-pointer transition">
                  <input
                    type="checkbox"
                    checked={form.rattachement.includes(r)}
                    onChange={() => toggleRattachement(r)}
                    className="rounded border-gray-300 text-[#C9A84C] focus:ring-[#C9A84C]"
                  />
                  <span className="text-sm text-gray-700">{r}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/50 rounded-b-2xl">
          <button onClick={onClose} className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition">
            Annuler
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-medium text-white rounded-xl transition shadow-lg"
            style={{ background: `linear-gradient(135deg, ${GOLD}, #B8943F)` }}
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── PAGE ─────────────────────────── */

export default function ReferentielsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("objets");
  const [search, setSearch] = useState("");
  const [filterCriticite, setFilterCriticite] = useState("");
  const [filterEntite, setFilterEntite] = useState("");
  const [filterOverdue, setFilterOverdue] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const filteredObjets = useMemo(() => {
    return objetsAuditables.filter((o) => {
      if (search && !o.libelle.toLowerCase().includes(search.toLowerCase()) && !o.code.toLowerCase().includes(search.toLowerCase())) return false;
      if (filterCriticite && o.criticite !== filterCriticite) return false;
      if (filterEntite && o.entite !== filterEntite) return false;
      if (filterOverdue && !isOverdue(o.prochainAuditMax)) return false;
      return true;
    });
  }, [search, filterCriticite, filterEntite, filterOverdue]);

  const entitesList = [...new Set(objetsAuditables.map((o) => o.entite))];

  // Couverture data
  const totalObjets = objetsAuditables.length;
  const couverts = objetsAuditables.filter((o) => !isOverdue(o.prochainAuditMax)).length;
  const aCouvrir = totalObjets - couverts;

  const donutData = [
    { name: "Couverts", value: couverts },
    { name: "À couvrir", value: aCouvrir },
  ];

  const anneeAuditData = useMemo(() => {
    const counts: Record<string, number> = {};
    objetsAuditables.forEach((o) => {
      const year = o.dernierAudit.split("-")[0];
      counts[year] = (counts[year] || 0) + 1;
    });
    return Object.entries(counts)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([year, count]) => ({ annee: year, objets: count }));
  }, []);

  const overdueObjets = objetsAuditables.filter((o) => {
    const diff = (new Date("2026-06-10").getTime() - new Date(o.dernierAudit).getTime()) / (1000 * 60 * 60 * 24 * 365);
    return diff >= 5;
  });

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: NAVY }}>
              Référentiels & Univers d&apos;audit
            </h1>
            <p className="text-sm text-gray-500 mt-1">Module M1 — Gestion des référentiels, entités, processus, risques et objets auditables</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="px-2.5 py-1 rounded-full bg-[#0A1628]/5 font-medium" style={{ color: NAVY }}>
              {totalObjets} objets auditables
            </span>
            <span className="px-2.5 py-1 rounded-full bg-red-50 text-red-600 font-medium">
              {aCouvrir} en retard
            </span>
          </div>
        </div>

        {/* Tab Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex overflow-x-auto border-b border-gray-100">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium whitespace-nowrap transition-all border-b-2 ${
                    active
                      ? "border-[#C9A84C] text-[#0A1628]"
                      : "border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-200"
                  }`}
                >
                  <Icon size={16} className={active ? "text-[#C9A84C]" : ""} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="p-6">
            {/* ─── TAB: Entités organisationnelles ─── */}
            {activeTab === "entites" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold" style={{ color: NAVY }}>Structure organisationnelle</h2>
                  <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-xl transition shadow" style={{ background: `linear-gradient(135deg, ${GOLD}, #B8943F)` }}>
                    <Plus size={16} /> Ajouter
                  </button>
                </div>
                {entites.map((e) => (
                  <TreeNode
                    key={e.id}
                    node={e}
                    renderCard={(node: Entite) => (
                      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-2 hover:shadow-md transition group">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-[#0A1628]/5" style={{ color: NAVY }}>{node.code}</span>
                            <span className="font-medium text-gray-800">{node.libelle}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                              node.type === "Groupe" ? "bg-[#C9A84C]/10 text-[#C9A84C]" :
                              node.type === "Filiale" ? "bg-blue-50 text-blue-700" :
                              node.type === "Direction" ? "bg-purple-50 text-purple-700" :
                              "bg-gray-50 text-gray-600"
                            }`}>
                              {node.type}
                            </span>
                            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                              node.statut === "Actif" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"
                            }`}>
                              {node.statut}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  />
                ))}
              </div>
            )}

            {/* ─── TAB: Processus ─── */}
            {activeTab === "processus" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold" style={{ color: NAVY }}>Cartographie des processus</h2>
                  <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-xl transition shadow" style={{ background: `linear-gradient(135deg, ${GOLD}, #B8943F)` }}>
                    <Plus size={16} /> Ajouter
                  </button>
                </div>
                {processusData.map((p) => (
                  <TreeNode
                    key={p.id}
                    node={p}
                    renderCard={(node: Processus) => (
                      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-2 hover:shadow-md transition">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-[#0A1628]/5" style={{ color: NAVY }}>{node.code}</span>
                            <span className="font-medium text-gray-800">{node.libelle}</span>
                          </div>
                          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                            node.niveau === "Macro-processus" ? "bg-[#C9A84C]/10 text-[#C9A84C]" :
                            node.niveau === "Processus" ? "bg-indigo-50 text-indigo-700" :
                            "bg-gray-50 text-gray-600"
                          }`}>
                            {node.niveau}
                          </span>
                        </div>
                      </div>
                    )}
                  />
                ))}
              </div>
            )}

            {/* ─── TAB: Risques ─── */}
            {activeTab === "risques" && (
              <div>
                <h2 className="text-lg font-semibold mb-6" style={{ color: NAVY }}>Catégories de risques</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {risqueCategories.map((r) => (
                    <div
                      key={r.id}
                      className="rounded-xl p-5 border-2 hover:shadow-lg transition cursor-pointer group"
                      style={{ borderColor: r.couleur + "30", background: r.couleur + "08" }}
                    >
                      <div className="text-3xl mb-3">{r.icone}</div>
                      <h3 className="font-semibold text-gray-800 text-sm mb-1">{r.nom}</h3>
                      <div className="flex items-center gap-1.5">
                        <span className="text-2xl font-bold" style={{ color: r.couleur }}>{r.count}</span>
                        <span className="text-xs text-gray-500">risques identifiés</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <ShieldAlert size={16} className="text-[#C9A84C]" />
                    Total : <span className="font-semibold text-gray-800">{risqueCategories.reduce((a, b) => a + b.count, 0)}</span> risques répartis sur {risqueCategories.length} catégories
                  </div>
                </div>
              </div>
            )}

            {/* ─── TAB: Objets auditables ─── */}
            {activeTab === "objets" && (
              <div>
                {/* Filters */}
                <div className="flex flex-wrap items-center gap-3 mb-5">
                  <div className="relative flex-1 min-w-[240px]">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Rechercher par code ou libellé..."
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40 focus:border-[#C9A84C] transition"
                    />
                  </div>
                  <select
                    value={filterEntite}
                    onChange={(e) => setFilterEntite(e.target.value)}
                    className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40 transition"
                  >
                    <option value="">Toutes les entités</option>
                    {entitesList.map((e) => <option key={e} value={e}>{e}</option>)}
                  </select>
                  <select
                    value={filterCriticite}
                    onChange={(e) => setFilterCriticite(e.target.value)}
                    className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40 transition"
                  >
                    <option value="">Toutes criticités</option>
                    <option value="faible">Faible</option>
                    <option value="modéré">Modéré</option>
                    <option value="élevé">Élevé</option>
                    <option value="critique">Critique</option>
                  </select>
                  <label className="flex items-center gap-2 px-3 py-2.5 border border-gray-200 rounded-xl text-sm cursor-pointer hover:bg-gray-50 transition">
                    <input
                      type="checkbox"
                      checked={filterOverdue}
                      onChange={(e) => setFilterOverdue(e.target.checked)}
                      className="rounded border-gray-300 text-red-500 focus:ring-red-400"
                    />
                    <AlertTriangle size={14} className="text-red-500" />
                    En retard
                  </label>
                  <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition">
                    <Download size={14} />
                    Exporter
                  </button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto rounded-xl border border-gray-100">
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ background: NAVY }}>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-white/80 uppercase tracking-wider">Code / Libellé</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-white/80 uppercase tracking-wider">Entité</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-white/80 uppercase tracking-wider">Processus</th>
                        <th className="text-center px-4 py-3 text-xs font-semibold text-white/80 uppercase tracking-wider">Criticité</th>
                        <th className="text-center px-4 py-3 text-xs font-semibold text-white/80 uppercase tracking-wider">Fréq.</th>
                        <th className="text-center px-4 py-3 text-xs font-semibold text-white/80 uppercase tracking-wider">Dernier audit</th>
                        <th className="text-center px-4 py-3 text-xs font-semibold text-white/80 uppercase tracking-wider">Prochain max</th>
                        <th className="text-center px-4 py-3 text-xs font-semibold text-white/80 uppercase tracking-wider">Reco.</th>
                        <th className="text-center px-4 py-3 text-xs font-semibold text-white/80 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredObjets.map((o, idx) => {
                        const overdue = isOverdue(o.prochainAuditMax);
                        const cc = criticiteConfig[o.criticite];
                        return (
                          <tr
                            key={o.id}
                            className={`border-b border-gray-50 hover:bg-[#C9A84C]/5 transition ${idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}
                          >
                            <td className="px-4 py-3">
                              <div className="font-mono text-xs text-gray-400 mb-0.5">{o.code}</div>
                              <div className="font-medium text-gray-800 leading-tight">{o.libelle}</div>
                            </td>
                            <td className="px-4 py-3 text-gray-600 text-xs">{o.entite}</td>
                            <td className="px-4 py-3 text-gray-600 text-xs">{o.processus}</td>
                            <td className="px-4 py-3 text-center">
                              <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${cc.bg} ${cc.text}`}>
                                {cc.label}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-center text-gray-600">{o.frequenceCible} an{o.frequenceCible > 1 ? "s" : ""}</td>
                            <td className="px-4 py-3 text-center text-gray-600 text-xs">{formatDate(o.dernierAudit)}</td>
                            <td className="px-4 py-3 text-center">
                              <span className={`text-xs font-medium ${overdue ? "text-red-600 bg-red-50 px-2 py-1 rounded-full" : "text-gray-600"}`}>
                                {formatDate(o.prochainAuditMax)}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-center">
                              {o.recoOuvertes > 0 ? (
                                <span className="inline-flex items-center justify-center min-w-[24px] h-6 px-1.5 text-xs font-bold rounded-full bg-orange-100 text-orange-700">
                                  {o.recoOuvertes}
                                </span>
                              ) : (
                                <span className="text-xs text-gray-300">—</span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-center">
                              <div className="flex items-center justify-center gap-1">
                                <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-[#0A1628] transition">
                                  <Eye size={15} />
                                </button>
                                <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-[#C9A84C] transition">
                                  <Pencil size={15} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                      {filteredObjets.length === 0 && (
                        <tr>
                          <td colSpan={9} className="px-4 py-12 text-center text-gray-400">
                            Aucun objet auditable ne correspond aux critères de recherche.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="mt-3 text-xs text-gray-400 text-right">
                  {filteredObjets.length} objet(s) affiché(s) sur {totalObjets}
                </div>
              </div>
            )}

            {/* ─── TAB: Couverture du cycle ─── */}
            {activeTab === "couverture" && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold" style={{ color: NAVY }}>Tableau de bord — Couverture du cycle d&apos;audit</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Donut Chart */}
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-4">Taux de couverture des objets auditables</h3>
                    <div className="flex items-center justify-center">
                      <ResponsiveContainer width="100%" height={280}>
                        <PieChart>
                          <Pie
                            data={donutData}
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={110}
                            paddingAngle={4}
                            dataKey="value"
                            strokeWidth={0}
                          >
                            <Cell fill={GOLD} />
                            <Cell fill="#EF4444" />
                          </Pie>
                          <Tooltip
                            formatter={(value: unknown, name: unknown) => [`${value} objets`, String(name)]}
                            contentStyle={{ borderRadius: "12px", border: "1px solid #e5e7eb", fontSize: "13px" }}
                          />
                          <Legend
                            verticalAlign="bottom"
                            formatter={(value: unknown) => <span className="text-sm text-gray-600">{String(value)}</span>}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="text-center mt-2">
                      <span className="text-3xl font-bold" style={{ color: NAVY }}>
                        {Math.round((couverts / totalObjets) * 100)}%
                      </span>
                      <span className="text-sm text-gray-500 ml-2">de couverture</span>
                    </div>
                  </div>

                  {/* Bar Chart */}
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-4">Objets par année de dernier audit</h3>
                    <ResponsiveContainer width="100%" height={320}>
                      <BarChart data={anneeAuditData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="annee" tick={{ fontSize: 12, fill: "#6b7280" }} />
                        <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} allowDecimals={false} />
                        <Tooltip
                          contentStyle={{ borderRadius: "12px", border: "1px solid #e5e7eb", fontSize: "13px" }}
                          formatter={(value: unknown) => [`${value} objet(s)`, "Nombre"]}
                        />
                        <Bar dataKey="objets" fill={NAVY} radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Overdue Alerts */}
                <div className="bg-white rounded-xl border border-red-100 shadow-sm">
                  <div className="flex items-center gap-2 px-6 py-4 border-b border-red-100 bg-red-50/50 rounded-t-xl">
                    <AlertTriangle size={18} className="text-red-500" />
                    <h3 className="text-sm font-semibold text-red-800">
                      Objets dont l&apos;échéance dépasse 5 ans depuis le dernier audit
                    </h3>
                    <span className="ml-auto px-2.5 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-bold">
                      {overdueObjets.length}
                    </span>
                  </div>
                  {overdueObjets.length > 0 ? (
                    <div className="divide-y divide-red-50">
                      {overdueObjets.map((o) => {
                        const years = Math.round((new Date("2026-06-10").getTime() - new Date(o.dernierAudit).getTime()) / (1000 * 60 * 60 * 24 * 365) * 10) / 10;
                        return (
                          <div key={o.id} className="flex items-center justify-between px-6 py-3 hover:bg-red-50/30 transition">
                            <div className="flex items-center gap-3">
                              <span className="text-xs font-mono text-gray-400">{o.code}</span>
                              <span className="text-sm font-medium text-gray-800">{o.libelle}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-xs text-gray-500">Dernier audit : {formatDate(o.dernierAudit)}</span>
                              <span className="text-xs font-bold text-red-600 bg-red-100 px-2.5 py-1 rounded-full">
                                {years} ans
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="px-6 py-8 text-center text-sm text-gray-400">
                      Aucun objet auditable ne dépasse le seuil de 5 ans.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Floating Add Button */}
        <button
          onClick={() => setModalOpen(true)}
          className="fixed bottom-8 right-8 flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all hover:scale-105 z-40"
          style={{ background: `linear-gradient(135deg, ${GOLD}, #B8943F)` }}
        >
          <Plus size={18} />
          Ajouter un objet auditable
        </button>

        {/* Modal */}
        <AjouterObjetModal open={modalOpen} onClose={() => setModalOpen(false)} />
      </div>
    </AppShell>
  );
}
