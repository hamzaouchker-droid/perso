"use client";

import clsx from "clsx";

type StatusType =
  | "en-cours"
  | "termine"
  | "en-attente"
  | "annule"
  | "planifie"
  | "brouillon"
  | "valide"
  | "critique"
  | "majeur"
  | "mineur";

interface StatusBadgeProps {
  status: StatusType;
  label?: string;
  className?: string;
}

const statusConfig: Record<
  StatusType,
  { label: string; dotColor: string; bgColor: string; textColor: string }
> = {
  "en-cours": {
    label: "En cours",
    dotColor: "bg-sky-500",
    bgColor: "bg-sky-50",
    textColor: "text-sky-700",
  },
  termine: {
    label: "Terminé",
    dotColor: "bg-emerald-500",
    bgColor: "bg-emerald-50",
    textColor: "text-emerald-700",
  },
  "en-attente": {
    label: "En attente",
    dotColor: "bg-amber-500",
    bgColor: "bg-amber-50",
    textColor: "text-amber-700",
  },
  annule: {
    label: "Annulé",
    dotColor: "bg-navy-400",
    bgColor: "bg-navy-50",
    textColor: "text-navy-600",
  },
  planifie: {
    label: "Planifié",
    dotColor: "bg-gold-500",
    bgColor: "bg-gold-50",
    textColor: "text-gold-700",
  },
  brouillon: {
    label: "Brouillon",
    dotColor: "bg-navy-300",
    bgColor: "bg-navy-50",
    textColor: "text-navy-500",
  },
  valide: {
    label: "Validé",
    dotColor: "bg-emerald-500",
    bgColor: "bg-emerald-50",
    textColor: "text-emerald-700",
  },
  critique: {
    label: "Critique",
    dotColor: "bg-rose-500",
    bgColor: "bg-rose-50",
    textColor: "text-rose-700",
  },
  majeur: {
    label: "Majeur",
    dotColor: "bg-amber-500",
    bgColor: "bg-amber-50",
    textColor: "text-amber-700",
  },
  mineur: {
    label: "Mineur",
    dotColor: "bg-sky-400",
    bgColor: "bg-sky-50",
    textColor: "text-sky-600",
  },
};

export default function StatusBadge({
  status,
  label,
  className,
}: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        config.bgColor,
        config.textColor,
        className
      )}
    >
      <span
        className={clsx(
          "h-1.5 w-1.5 rounded-full",
          config.dotColor
        )}
      />
      {label || config.label}
    </span>
  );
}
