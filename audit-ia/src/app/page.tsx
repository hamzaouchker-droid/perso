"use client";

import AppShell from "@/components/layout/AppShell";
import StatCard from "@/components/ui/StatCard";
import Card, { CardHeader, CardTitle } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import ProgressBar from "@/components/ui/ProgressBar";
import StatusBadge from "@/components/ui/StatusBadge";
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
  LineChart,
  Line,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import {
  ClipboardCheck,
  AlertTriangle,
  Target,
  ShieldAlert,
  Globe,
  Clock,
  FileText,
  CheckCircle2,
  MessageSquare,
  UserCheck,
  Send,
  Eye,
  PenLine,
  Calendar,
  Building2,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

// ─── Mock Data ────────────────────────────────────────────────────────────

const missionsParStatut = [
  { statut: "Planifiée", count: 5, fill: "#C9A84C" },
  { statut: "En cours", count: 8, fill: "#263C6E" },
  { statut: "Contradictoire", count: 3, fill: "#4A5D88" },
  { statut: "Rapport validé", count: 6, fill: "#9DAABE" },
  { statut: "Clôturée", count: 12, fill: "#0A1628" },
];

const recoParPriorite = [
  { priorite: "Faible", ouverte: 4, enCours: 2, cloturee: 12, enRetard: 0 },
  { priorite: "Moyenne", ouverte: 8, enCours: 5, cloturee: 18, enRetard: 2 },
  { priorite: "Élevée", ouverte: 6, enCours: 4, cloturee: 10, enRetard: 3 },
  { priorite: "Critique", ouverte: 3, enCours: 2, cloturee: 5, enRetard: 4 },
];

const missionsRecentes = [
  {
    ref: "M-2026-001",
    libelle: "Audit du dispositif LCB-FT",
    statut: "en-cours" as const,
    opinion: "En cours",
    avancement: 72,
    chef: "A. Bennani",
  },
  {
    ref: "M-2026-002",
    libelle: "Revue des crédits immobiliers",
    statut: "en-cours" as const,
    opinion: "En cours",
    avancement: 45,
    chef: "S. El Amrani",
  },
  {
    ref: "M-2026-003",
    libelle: "Contrôle des opérations de change",
    statut: "planifie" as const,
    opinion: "—",
    avancement: 0,
    chef: "K. Tazi",
  },
  {
    ref: "M-2025-034",
    libelle: "Audit de la sécurité SI",
    statut: "valide" as const,
    opinion: "Acceptable",
    avancement: 100,
    chef: "M. Fassi",
  },
  {
    ref: "M-2025-033",
    libelle: "Revue du portefeuille titres",
    statut: "termine" as const,
    opinion: "Satisfaisant",
    avancement: 100,
    chef: "N. Chraibi",
  },
  {
    ref: "M-2025-032",
    libelle: "Audit des engagements PME",
    statut: "en-cours" as const,
    opinion: "En cours",
    avancement: 88,
    chef: "R. Alaoui",
  },
  {
    ref: "M-2025-031",
    libelle: "Contrôle des moyens de paiement",
    statut: "valide" as const,
    opinion: "Insuffisant",
    avancement: 100,
    chef: "H. Berrada",
  },
  {
    ref: "M-2025-030",
    libelle: "Audit de la conformité réglementaire",
    statut: "termine" as const,
    opinion: "Acceptable",
    avancement: 100,
    chef: "F. Sqalli",
  },
];

const recoCritiquesRetard = [
  {
    ref: "R-2025-087",
    libelle: "Mise en place du filtrage automatisé des listes de sanctions",
    entite: "Direction Conformité",
    echeance: "2026-03-15",
    joursRetard: 87,
    responsable: "Y. Lahlou",
  },
  {
    ref: "R-2025-062",
    libelle: "Renforcement des contrôles d'accès aux systèmes critiques",
    entite: "DSI - Sécurité",
    echeance: "2026-04-01",
    joursRetard: 70,
    responsable: "O. Bennani",
  },
  {
    ref: "R-2025-044",
    libelle: "Revue du dispositif de scoring crédit PME",
    entite: "Direction des Risques",
    echeance: "2026-05-01",
    joursRetard: 40,
    responsable: "L. Tazi",
  },
  {
    ref: "R-2026-003",
    libelle: "Ségrégation des fonctions sur les opérations de marché",
    entite: "Salle des Marchés",
    echeance: "2026-05-20",
    joursRetard: 21,
    responsable: "A. El Fassi",
  },
  {
    ref: "R-2025-091",
    libelle: "Documentation des procédures KYC pour les PPE",
    entite: "Réseau Agences",
    echeance: "2026-06-01",
    joursRetard: 9,
    responsable: "S. Moussaoui",
  },
];

const couvertureData = [
  { annee: "2022", couverture: 58, cible: 75 },
  { annee: "2023", couverture: 64, cible: 75 },
  { annee: "2024", couverture: 71, cible: 75 },
  { annee: "2025", couverture: 78, cible: 80 },
  { annee: "2026", couverture: 42, cible: 80 },
];

const activiteRecente = [
  {
    id: 1,
    action: "creation",
    texte: "Mission M-2026-003 « Contrôle des opérations de change » créée",
    date: "Aujourd'hui, 09:42",
    auteur: "K. Tazi",
  },
  {
    id: 2,
    action: "validation",
    texte: "Rapport de mission M-2025-034 validé par le Directeur de l'Audit",
    date: "Aujourd'hui, 08:15",
    auteur: "D. Alami",
  },
  {
    id: 3,
    action: "commentaire",
    texte: "Commentaire ajouté sur la recommandation R-2025-087",
    date: "Hier, 17:30",
    auteur: "Y. Lahlou",
  },
  {
    id: 4,
    action: "avancement",
    texte: "Avancement de M-2026-001 mis à jour : 72%",
    date: "Hier, 16:05",
    auteur: "A. Bennani",
  },
  {
    id: 5,
    action: "envoi",
    texte: "Lettre de mission M-2026-002 envoyée à la Direction des Crédits",
    date: "Hier, 14:20",
    auteur: "S. El Amrani",
  },
  {
    id: 6,
    action: "cloture",
    texte: "Recommandation R-2025-055 clôturée après vérification",
    date: "09 juin, 11:45",
    auteur: "H. Berrada",
  },
  {
    id: 7,
    action: "relance",
    texte: "Relance automatique envoyée pour R-2025-062 (retard 70j)",
    date: "09 juin, 09:00",
    auteur: "Système",
  },
  {
    id: 8,
    action: "planification",
    texte: "Plan d'audit S2-2026 soumis pour approbation au Comité d'Audit",
    date: "08 juin, 15:30",
    auteur: "D. Alami",
  },
  {
    id: 9,
    action: "revue",
    texte: "Revue qualité effectuée sur les dossiers de travail M-2025-033",
    date: "08 juin, 10:00",
    auteur: "N. Chraibi",
  },
  {
    id: 10,
    action: "creation",
    texte: "3 nouvelles recommandations issues de M-2025-032 enregistrées",
    date: "07 juin, 16:40",
    auteur: "R. Alaoui",
  },
];

const actionIcons: Record<string, React.ReactNode> = {
  creation: <FileText className="h-4 w-4 text-gold-600" />,
  validation: <CheckCircle2 className="h-4 w-4 text-emerald-600" />,
  commentaire: <MessageSquare className="h-4 w-4 text-sky-600" />,
  avancement: <TrendingUp className="h-4 w-4 text-navy-500" />,
  envoi: <Send className="h-4 w-4 text-violet-600" />,
  cloture: <CheckCircle2 className="h-4 w-4 text-emerald-600" />,
  relance: <AlertTriangle className="h-4 w-4 text-amber-600" />,
  planification: <Calendar className="h-4 w-4 text-gold-600" />,
  revue: <Eye className="h-4 w-4 text-navy-400" />,
};

const actionColors: Record<string, string> = {
  creation: "bg-gold-50 border-gold-200",
  validation: "bg-emerald-50 border-emerald-200",
  commentaire: "bg-sky-50 border-sky-200",
  avancement: "bg-navy-50 border-navy-200",
  envoi: "bg-violet-50 border-violet-200",
  cloture: "bg-emerald-50 border-emerald-200",
  relance: "bg-amber-50 border-amber-200",
  planification: "bg-gold-50 border-gold-200",
  revue: "bg-navy-50 border-navy-200",
};

// ─── Custom Tooltip ─────────────────────────────────────────────────────

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-navy-100 bg-white px-4 py-3 shadow-lg">
      <p className="mb-1.5 text-sm font-semibold text-navy-800">{label}</p>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2 text-xs text-navy-600">
          <span
            className="inline-block h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span>
            {entry.name}: <strong>{entry.value}</strong>
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Opinion color helper ───────────────────────────────────────────────

function getOpinionStyle(opinion: string) {
  switch (opinion) {
    case "Satisfaisant":
      return "success" as const;
    case "Acceptable":
      return "warning" as const;
    case "Insuffisant":
      return "danger" as const;
    default:
      return "neutral" as const;
  }
}

// ─── Dashboard Page ─────────────────────────────────────────────────────

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        {/* Page header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-navy-900">
            Tableau de bord
          </h1>
          <p className="mt-1 text-sm text-navy-400">
            Vue d&apos;ensemble de l&apos;activité d&apos;audit interne au 10
            juin 2026
          </p>
        </div>

        {/* ───── Row 1: KPI StatCards ───── */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <StatCard
            label="Missions en cours"
            value={8}
            icon={
              <ClipboardCheck className="h-6 w-6 text-gold-600" />
            }
            iconBgColor="bg-gold-50"
            trend={{
              value: 12,
              direction: "up",
              label: "+2 vs période préc.",
            }}
          />
          <StatCard
            label="Recommandations ouvertes"
            value={21}
            icon={
              <AlertTriangle className="h-6 w-6 text-amber-600" />
            }
            iconBgColor="bg-amber-50"
            trend={{
              value: 8,
              direction: "down",
              label: "vs mois dernier",
            }}
          />
          <StatCard
            label="Taux de réalisation"
            value="68%"
            icon={<Target className="h-6 w-6 text-navy-500" />}
            iconBgColor="bg-navy-50"
            trend={{
              value: 5,
              direction: "up",
              label: "du plan annuel",
            }}
          />
          <StatCard
            label="Critiques en retard"
            value={5}
            icon={
              <ShieldAlert className="h-6 w-6 text-rose-600" />
            }
            iconBgColor="bg-rose-50"
            trend={{
              value: 25,
              direction: "up",
              label: "à traiter",
            }}
            className="ring-1 ring-rose-200/60"
          />
          <StatCard
            label="Couverture univers"
            value="78%"
            icon={<Globe className="h-6 w-6 text-sky-600" />}
            iconBgColor="bg-sky-50"
            trend={{
              value: 7,
              direction: "up",
              label: "cycle en cours",
            }}
          />
          <StatCard
            label="Jours / Budget"
            value="842 / 1 200"
            icon={<Clock className="h-6 w-6 text-gold-600" />}
            iconBgColor="bg-gold-50"
            trend={{
              value: 70,
              direction: "neutral",
              label: "consommé",
            }}
          />
        </div>

        {/* Progress bar under "Taux de réalisation" area */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <div className="xl:col-start-3">
            <ProgressBar value={68} variant="gold" size="sm" />
          </div>
          <div className="xl:col-start-6">
            <ProgressBar value={70} variant="gold" size="sm" />
          </div>
        </div>

        {/* ───── Row 2: Charts ───── */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Missions by status - Horizontal bar chart */}
          <Card>
            <CardHeader>
              <CardTitle>État des missions</CardTitle>
              <Badge variant="neutral" size="sm">
                34 missions
              </Badge>
            </CardHeader>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={missionsParStatut}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  barCategoryGap="20%"
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#E8EBF0"
                    horizontal={false}
                  />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 12, fill: "#6E7FA0" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    dataKey="statut"
                    type="category"
                    width={120}
                    tick={{ fontSize: 12, fill: "#4A5D88" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    content={<ChartTooltip />}
                    cursor={{ fill: "rgba(201,168,76,0.06)" }}
                  />
                  <Bar
                    dataKey="count"
                    name="Missions"
                    radius={[0, 6, 6, 0]}
                    maxBarSize={32}
                  >
                    {missionsParStatut.map((entry, index) => (
                      <Cell key={index} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Recommendations by priority - Stacked bar chart */}
          <Card>
            <CardHeader>
              <CardTitle>Recommandations par priorité et statut</CardTitle>
              <Badge variant="neutral" size="sm">
                79 recommandations
              </Badge>
            </CardHeader>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={recoParPriorite}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  barCategoryGap="25%"
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#E8EBF0"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="priorite"
                    tick={{ fontSize: 12, fill: "#4A5D88" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "#6E7FA0" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    content={<ChartTooltip />}
                    cursor={{ fill: "rgba(201,168,76,0.06)" }}
                  />
                  <Legend
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ fontSize: 12, color: "#4A5D88" }}
                  />
                  <Bar
                    dataKey="ouverte"
                    name="Ouverte"
                    stackId="a"
                    fill="#C9A84C"
                    radius={[0, 0, 0, 0]}
                  />
                  <Bar
                    dataKey="enCours"
                    name="En cours"
                    stackId="a"
                    fill="#263C6E"
                  />
                  <Bar
                    dataKey="enRetard"
                    name="En retard"
                    stackId="a"
                    fill="#E11D48"
                  />
                  <Bar
                    dataKey="cloturee"
                    name="Clôturée"
                    stackId="a"
                    fill="#9DAABE"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* ───── Row 3: Missions table + Critical recommendations ───── */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* Recent missions table */}
          <Card className="lg:col-span-3" padding="none">
            <div className="p-6 pb-0">
              <CardHeader>
                <CardTitle>Missions récentes</CardTitle>
                <button className="flex items-center gap-1 text-xs font-medium text-gold-600 hover:text-gold-700 transition-colors">
                  Voir tout
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </CardHeader>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-navy-100/50">
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-navy-400">
                      Réf
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-navy-400">
                      Libellé
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-navy-400">
                      Statut
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-navy-400">
                      Opinion
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-navy-400">
                      Avancement
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-navy-400">
                      Chef de mission
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-50">
                  {missionsRecentes.map((m) => (
                    <tr
                      key={m.ref}
                      className="transition-colors hover:bg-navy-50/40"
                    >
                      <td className="whitespace-nowrap px-6 py-3.5 font-mono text-xs font-medium text-navy-600">
                        {m.ref}
                      </td>
                      <td className="px-6 py-3.5 text-navy-800 font-medium max-w-[260px] truncate">
                        {m.libelle}
                      </td>
                      <td className="px-6 py-3.5">
                        <StatusBadge status={m.statut} />
                      </td>
                      <td className="px-6 py-3.5">
                        <Badge variant={getOpinionStyle(m.opinion)} size="sm">
                          {m.opinion}
                        </Badge>
                      </td>
                      <td className="px-6 py-3.5 min-w-[120px]">
                        <div className="flex items-center gap-2">
                          <ProgressBar
                            value={m.avancement}
                            size="sm"
                            variant={
                              m.avancement === 100
                                ? "success"
                                : m.avancement >= 60
                                  ? "gold"
                                  : "info"
                            }
                            className="flex-1"
                          />
                          <span className="text-xs font-medium tabular-nums text-navy-500">
                            {m.avancement}%
                          </span>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-3.5 text-navy-600">
                        <div className="flex items-center gap-2">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-navy-100 text-[10px] font-bold text-navy-600">
                            {m.chef
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          {m.chef}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Critical overdue recommendations */}
          <Card className="lg:col-span-2" padding="none">
            <div className="p-6 pb-0">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CardTitle>Recommandations critiques en retard</CardTitle>
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-100 text-[10px] font-bold text-rose-700">
                    {recoCritiquesRetard.length}
                  </span>
                </div>
              </CardHeader>
            </div>
            <div className="divide-y divide-navy-50 px-6 pb-4">
              {recoCritiquesRetard.map((r) => (
                <div
                  key={r.ref}
                  className="py-4 first:pt-0 last:pb-0 group cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-[11px] font-semibold text-navy-400">
                          {r.ref}
                        </span>
                        <Badge variant="danger" size="sm">
                          -{r.joursRetard}j
                        </Badge>
                      </div>
                      <p className="text-sm font-medium text-navy-800 leading-snug group-hover:text-gold-700 transition-colors">
                        {r.libelle}
                      </p>
                      <div className="mt-2 flex items-center gap-3 text-xs text-navy-400">
                        <span className="flex items-center gap-1">
                          <Building2 className="h-3 w-3" />
                          {r.entite}
                        </span>
                        <span className="flex items-center gap-1">
                          <UserCheck className="h-3 w-3" />
                          {r.responsable}
                        </span>
                      </div>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-[11px] text-navy-300">Échéance</p>
                      <p className="text-xs font-semibold text-rose-600">
                        {new Date(r.echeance).toLocaleDateString("fr-FR", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* ───── Row 4: Coverage chart + Activity timeline ───── */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Audit coverage over 5 years */}
          <Card>
            <CardHeader>
              <CardTitle>Couverture du cycle d&apos;audit</CardTitle>
              <Badge variant="gold" size="sm">
                Cycle triennal
              </Badge>
            </CardHeader>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={couvertureData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                >
                  <defs>
                    <linearGradient
                      id="coverageGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#C9A84C"
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="100%"
                        stopColor="#C9A84C"
                        stopOpacity={0.02}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#E8EBF0"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="annee"
                    tick={{ fontSize: 12, fill: "#4A5D88" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "#6E7FA0" }}
                    domain={[0, 100]}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v: number) => `${v}%`}
                  />
                  <Tooltip
                    content={<ChartTooltip />}
                    cursor={{ stroke: "#C9A84C", strokeWidth: 1 }}
                  />
                  <Legend
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ fontSize: 12, color: "#4A5D88" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="couverture"
                    name="Couverture réelle"
                    stroke="#C9A84C"
                    strokeWidth={2.5}
                    fill="url(#coverageGradient)"
                    dot={{
                      r: 4,
                      fill: "#C9A84C",
                      stroke: "#fff",
                      strokeWidth: 2,
                    }}
                    activeDot={{ r: 6, fill: "#C9A84C" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="cible"
                    name="Cible"
                    stroke="#0A1628"
                    strokeWidth={2}
                    strokeDasharray="6 3"
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Activity timeline */}
          <Card padding="none">
            <div className="p-6 pb-0">
              <CardHeader>
                <CardTitle>Activité récente</CardTitle>
                <button className="flex items-center gap-1 text-xs font-medium text-gold-600 hover:text-gold-700 transition-colors">
                  Journal complet
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </CardHeader>
            </div>
            <div className="px-6 pb-6 max-h-[340px] overflow-y-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-[15px] top-2 bottom-2 w-px bg-navy-100" />

                <div className="space-y-0">
                  {activiteRecente.map((entry, idx) => (
                    <div
                      key={entry.id}
                      className="relative flex gap-4 py-3 group"
                    >
                      {/* Icon bubble */}
                      <div
                        className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${
                          actionColors[entry.action] ||
                          "bg-navy-50 border-navy-200"
                        } shadow-sm transition-transform group-hover:scale-110`}
                      >
                        {actionIcons[entry.action] || (
                          <PenLine className="h-4 w-4 text-navy-400" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="min-w-0 flex-1 pt-0.5">
                        <p className="text-sm text-navy-700 leading-snug">
                          {entry.texte}
                        </p>
                        <div className="mt-1 flex items-center gap-2 text-xs text-navy-400">
                          <span>{entry.date}</span>
                          <span className="text-navy-200">·</span>
                          <span className="font-medium text-navy-500">
                            {entry.auteur}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
