"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import clsx from "clsx";

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#FAFAF8]">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div
        className={clsx(
          "flex flex-1 flex-col transition-all duration-300",
          sidebarCollapsed ? "ml-[72px]" : "ml-[260px]"
        )}
      >
        <Header sidebarCollapsed={sidebarCollapsed} />

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
