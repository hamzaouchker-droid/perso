"use client";

import clsx from "clsx";

type BadgeVariant = "success" | "warning" | "danger" | "info" | "gold" | "neutral";
type BadgeSize = "sm" | "md";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  success:
    "bg-emerald-50 text-emerald-700 border-emerald-200/60 ring-emerald-600/10",
  warning:
    "bg-amber-50 text-amber-700 border-amber-200/60 ring-amber-600/10",
  danger:
    "bg-rose-50 text-rose-700 border-rose-200/60 ring-rose-600/10",
  info:
    "bg-sky-50 text-sky-700 border-sky-200/60 ring-sky-600/10",
  gold:
    "bg-gold-50 text-gold-700 border-gold-200/60 ring-gold-600/10",
  neutral:
    "bg-navy-50 text-navy-600 border-navy-200/60 ring-navy-600/10",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-[10px]",
  md: "px-2.5 py-1 text-xs",
};

export default function Badge({
  children,
  variant = "neutral",
  size = "md",
  className,
}: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 rounded-full border font-medium ring-1 ring-inset",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  );
}
