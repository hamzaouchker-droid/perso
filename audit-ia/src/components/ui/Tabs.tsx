"use client";

import { useState } from "react";
import clsx from "clsx";

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  activeTab?: string;
  onChange?: (tabId: string) => void;
  children?: (activeTabId: string) => React.ReactNode;
  className?: string;
}

export default function Tabs({
  tabs,
  defaultTab,
  activeTab: controlledActive,
  onChange,
  children,
  className,
}: TabsProps) {
  const [internalActive, setInternalActive] = useState(
    defaultTab || tabs[0]?.id || ""
  );

  const activeTabId = controlledActive ?? internalActive;

  const handleTabClick = (tabId: string) => {
    if (!controlledActive) {
      setInternalActive(tabId);
    }
    onChange?.(tabId);
  };

  return (
    <div className={className}>
      <div className="border-b border-navy-100/60">
        <nav className="-mb-px flex gap-1" aria-label="Onglets">
          {tabs.map((tab) => {
            const isActive = activeTabId === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={clsx(
                  "relative flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "text-gold-600"
                    : "text-navy-400 hover:text-navy-600"
                )}
              >
                {tab.icon && (
                  <span
                    className={clsx(
                      "transition-colors",
                      isActive ? "text-gold-500" : "text-navy-300"
                    )}
                  >
                    {tab.icon}
                  </span>
                )}
                {tab.label}
                {tab.badge != null && (
                  <span
                    className={clsx(
                      "rounded-full px-1.5 py-0.5 text-[10px] font-bold",
                      isActive
                        ? "bg-gold-100 text-gold-700"
                        : "bg-navy-100 text-navy-500"
                    )}
                  >
                    {tab.badge}
                  </span>
                )}
                {/* Gold underline */}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t-full bg-gradient-to-r from-gold-400 to-gold-600" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {children && <div className="pt-4">{children(activeTabId)}</div>}
    </div>
  );
}
