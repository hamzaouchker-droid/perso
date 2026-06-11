"use client";

import clsx from "clsx";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    direction: "up" | "down" | "neutral";
    label?: string;
  };
  iconBgColor?: string;
  className?: string;
}

export default function StatCard({
  label,
  value,
  icon,
  trend,
  iconBgColor = "bg-gold-50",
  className,
}: StatCardProps) {
  const trendColors = {
    up: "text-emerald-600",
    down: "text-rose-600",
    neutral: "text-navy-400",
  };

  const TrendIcon = {
    up: TrendingUp,
    down: TrendingDown,
    neutral: Minus,
  };

  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-xl border border-navy-100/60 bg-white p-6 shadow-sm shadow-navy-900/[0.03] transition-all duration-200 hover:shadow-md hover:shadow-navy-900/[0.06]",
        className
      )}
    >
      {/* Subtle decorative gradient */}
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-gold-100/30 to-transparent" />

      <div className="relative flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-navy-400">{label}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-navy-900">
            {value}
          </p>
          {trend && (
            <div className="mt-3 flex items-center gap-1.5">
              {(() => {
                const Icon = TrendIcon[trend.direction];
                return (
                  <Icon
                    className={clsx(
                      "h-3.5 w-3.5",
                      trendColors[trend.direction]
                    )}
                  />
                );
              })()}
              <span
                className={clsx(
                  "text-xs font-semibold tabular-nums",
                  trendColors[trend.direction]
                )}
              >
                {trend.direction === "up" ? "+" : ""}
                {trend.value}%
              </span>
              {trend.label && (
                <span className="text-xs text-navy-300">
                  {trend.label}
                </span>
              )}
            </div>
          )}
        </div>

        <div
          className={clsx(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
            iconBgColor
          )}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
