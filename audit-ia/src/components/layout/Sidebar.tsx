"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Database,
  Calendar,
  Briefcase,
  AlertTriangle,
  FileText,
  CheckCircle,
  BarChart3,
  FolderArchive,
  Users,
  Award,
  Settings,
  Shield,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
import clsx from "clsx";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { label: "Tableau de bord", href: "/", icon: LayoutDashboard },
  { label: "Référentiels", href: "/referentiels", icon: Database },
  { label: "Planification", href: "/planification", icon: Calendar },
  { label: "Missions", href: "/missions", icon: Briefcase },
  {
    label: "Constats & Recommandations",
    href: "/constats",
    icon: AlertTriangle,
  },
  { label: "Rapports", href: "/rapports", icon: FileText },
  {
    label: "Suivi Recommandations",
    href: "/suivi",
    icon: CheckCircle,
  },
  { label: "Reporting", href: "/reporting", icon: BarChart3 },
  {
    label: "Gestion Documentaire",
    href: "/documents",
    icon: FolderArchive,
  },
  { label: "Ressources", href: "/ressources", icon: Users },
  { label: "Qualité PAAQ", href: "/qualite", icon: Award },
  { label: "Administration", href: "/administration", icon: Settings },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={clsx(
        "fixed left-0 top-0 z-40 flex h-screen flex-col bg-navy-900 text-white transition-all duration-300 ease-in-out",
        collapsed ? "w-[72px]" : "w-[260px]"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-navy-700/50 px-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-gold-400 to-gold-600">
          <Shield className="h-5 w-5 text-navy-900" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <h1 className="text-lg font-bold tracking-wide text-white">
              Audit<span className="text-gold-400">IA</span>
            </h1>
            <p className="text-[10px] uppercase tracking-widest text-navy-300">
              Audit Interne
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <li key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className={clsx(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                    active
                      ? "bg-navy-700/60 text-gold-400"
                      : "text-navy-200 hover:bg-navy-800 hover:text-white"
                  )}
                >
                  {/* Active indicator bar */}
                  {active && (
                    <span className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r-full bg-gold-400" />
                  )}
                  <Icon
                    className={clsx(
                      "h-5 w-5 shrink-0",
                      active ? "text-gold-400" : "text-navy-300"
                    )}
                  />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </Link>

                {/* Tooltip when collapsed */}
                {collapsed && (
                  <div className="pointer-events-none absolute left-full top-1/2 z-50 ml-2 -translate-y-1/2 rounded-md bg-navy-800 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:pointer-events-auto group-hover:opacity-100">
                    {item.label}
                    <div className="absolute left-0 top-1/2 -ml-1 h-2 w-2 -translate-y-1/2 rotate-45 bg-navy-800" />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Collapse toggle */}
      <div className="border-t border-navy-700/50 px-3 py-2">
        <button
          onClick={onToggle}
          className="flex w-full items-center justify-center rounded-lg p-2 text-navy-300 transition-colors hover:bg-navy-800 hover:text-white"
          aria-label={collapsed ? "Développer le menu" : "Réduire le menu"}
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* User profile */}
      <div className="border-t border-navy-700/50 p-3">
        <div
          className={clsx(
            "flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-navy-800",
            collapsed && "justify-center"
          )}
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-sm font-bold text-navy-900">
            AK
          </div>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">
                Ahmed Khalil
              </p>
              <p className="truncate text-xs text-navy-300">
                Directeur d&apos;Audit
              </p>
            </div>
          )}
          {!collapsed && (
            <button
              className="shrink-0 rounded-md p-1.5 text-navy-400 transition-colors hover:bg-navy-700 hover:text-white"
              aria-label="Se déconnecter"
            >
              <LogOut className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
