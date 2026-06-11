"use client";

import clsx from "clsx";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
  onClick?: () => void;
}

const paddingMap = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export default function Card({
  children,
  className,
  padding = "md",
  hover = false,
  onClick,
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        "rounded-xl border border-navy-100/60 bg-white shadow-sm shadow-navy-900/[0.03]",
        paddingMap[padding],
        hover &&
          "cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-navy-900/[0.06] hover:border-navy-200/80",
        onClick && "cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div
      className={clsx(
        "flex items-center justify-between border-b border-navy-100/50 pb-4 mb-4",
        className
      )}
    >
      {children}
    </div>
  );
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function CardTitle({ children, className }: CardTitleProps) {
  return (
    <h3
      className={clsx(
        "text-base font-semibold text-navy-800 tracking-tight",
        className
      )}
    >
      {children}
    </h3>
  );
}
