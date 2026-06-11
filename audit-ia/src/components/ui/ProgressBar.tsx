"use client";

import clsx from "clsx";

type ProgressVariant = "gold" | "success" | "danger" | "info";

interface ProgressBarProps {
  value: number;
  max?: number;
  variant?: ProgressVariant;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

const variantGradients: Record<ProgressVariant, string> = {
  gold: "bg-gradient-to-r from-gold-400 to-gold-600",
  success: "bg-gradient-to-r from-emerald-400 to-emerald-600",
  danger: "bg-gradient-to-r from-rose-400 to-rose-600",
  info: "bg-gradient-to-r from-sky-400 to-sky-600",
};

const trackColors: Record<ProgressVariant, string> = {
  gold: "bg-gold-100/50",
  success: "bg-emerald-100/50",
  danger: "bg-rose-100/50",
  info: "bg-sky-100/50",
};

const sizeStyles: Record<"sm" | "md" | "lg", string> = {
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-3.5",
};

export default function ProgressBar({
  value,
  max = 100,
  variant = "gold",
  size = "md",
  showLabel = false,
  className,
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={clsx("flex items-center gap-3", className)}>
      <div
        className={clsx(
          "flex-1 overflow-hidden rounded-full",
          trackColors[variant],
          sizeStyles[size]
        )}
      >
        <div
          className={clsx(
            "h-full rounded-full transition-all duration-700 ease-out",
            variantGradients[variant]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <span className="shrink-0 text-xs font-semibold text-navy-600 tabular-nums">
          {Math.round(percentage)}%
        </span>
      )}
    </div>
  );
}
