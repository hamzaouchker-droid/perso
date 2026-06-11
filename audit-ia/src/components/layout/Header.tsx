"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Search,
  Bell,
  ChevronDown,
  ChevronRight,
  User,
  Settings,
  LogOut,
  HelpCircle,
} from "lucide-react";
import clsx from "clsx";

const routeLabels: Record<string, string> = {
  "/": "Tableau de bord",
  "/referentiels": "Référentiels",
  "/planification": "Planification",
  "/missions": "Missions",
  "/constats": "Constats & Recommandations",
  "/rapports": "Rapports",
  "/suivi-recommandations": "Suivi Recommandations",
  "/reporting": "Reporting",
  "/documents": "Gestion Documentaire",
  "/ressources": "Ressources",
  "/qualite": "Qualité PAAQ",
  "/administration": "Administration",
};

function getBreadcrumbs(pathname: string): { label: string; href: string }[] {
  const crumbs = [{ label: "Accueil", href: "/" }];
  if (pathname !== "/") {
    const segments = pathname.split("/").filter(Boolean);
    let currentPath = "";
    for (const segment of segments) {
      currentPath += `/${segment}`;
      const label = routeLabels[currentPath] || segment;
      crumbs.push({ label, href: currentPath });
    }
  }
  return crumbs;
}

interface HeaderProps {
  sidebarCollapsed: boolean;
}

export default function Header({ sidebarCollapsed }: HeaderProps) {
  const pathname = usePathname();
  const breadcrumbs = getBreadcrumbs(pathname);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200/80 bg-white/80 px-6 backdrop-blur-md"
    >
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm">
        {breadcrumbs.map((crumb, index) => (
          <span key={crumb.href} className="flex items-center gap-1.5">
            {index > 0 && (
              <ChevronRight className="h-3.5 w-3.5 text-navy-300" />
            )}
            {index === breadcrumbs.length - 1 ? (
              <span className="font-semibold text-navy-800">
                {crumb.label}
              </span>
            ) : (
              <span className="text-navy-400 transition-colors hover:text-navy-600">
                {crumb.label}
              </span>
            )}
          </span>
        ))}
      </nav>

      {/* Right section */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative">
          {searchOpen ? (
            <div className="flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher..."
                className="w-64 rounded-xl border border-navy-100 bg-navy-50/50 px-4 py-2 pr-10 text-sm text-navy-800 placeholder-navy-300 outline-none transition-all duration-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20"
                autoFocus
                onBlur={() => {
                  if (!searchQuery) setSearchOpen(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    setSearchQuery("");
                    setSearchOpen(false);
                  }
                }}
              />
              <Search className="absolute right-3 h-4 w-4 text-navy-300" />
            </div>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-xl text-navy-400 transition-all duration-200 hover:bg-navy-50 hover:text-navy-600"
              aria-label="Rechercher"
            >
              <Search className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Notifications */}
        <button
          className="relative flex h-10 w-10 items-center justify-center rounded-xl text-navy-400 transition-all duration-200 hover:bg-navy-50 hover:text-navy-600"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
            3
          </span>
        </button>

        {/* Separator */}
        <div className="h-8 w-px bg-navy-100" />

        {/* User menu */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-2.5 rounded-xl px-2 py-1.5 transition-all duration-200 hover:bg-navy-50"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-xs font-bold text-navy-900">
              AK
            </div>
            <div className="hidden text-left md:block">
              <p className="text-sm font-medium text-navy-800">Ahmed Khalil</p>
              <p className="text-xs text-navy-400">Directeur d&apos;Audit</p>
            </div>
            <ChevronDown
              className={clsx(
                "hidden h-4 w-4 text-navy-400 transition-transform md:block",
                userMenuOpen && "rotate-180"
              )}
            />
          </button>

          {userMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-xl border border-navy-100 bg-white shadow-lg shadow-navy-900/5">
              <div className="border-b border-navy-100 px-4 py-3">
                <p className="text-sm font-semibold text-navy-800">
                  Ahmed Khalil
                </p>
                <p className="text-xs text-navy-400">
                  ahmed.khalil@banque.com
                </p>
              </div>
              <div className="py-1">
                <button className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-navy-600 transition-colors hover:bg-navy-50">
                  <User className="h-4 w-4" />
                  Mon profil
                </button>
                <button className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-navy-600 transition-colors hover:bg-navy-50">
                  <Settings className="h-4 w-4" />
                  Paramètres
                </button>
                <button className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-navy-600 transition-colors hover:bg-navy-50">
                  <HelpCircle className="h-4 w-4" />
                  Aide
                </button>
              </div>
              <div className="border-t border-navy-100 py-1">
                <button className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-rose-600 transition-colors hover:bg-rose-50">
                  <LogOut className="h-4 w-4" />
                  Se déconnecter
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
