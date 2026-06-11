"use client";

import { useState } from "react";
import clsx from "clsx";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";

export interface Column<T> {
  key: string;
  label: string;
  sortable?: boolean;
  className?: string;
  render?: (row: T, index: number) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T, index: number) => string;
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
  className?: string;
  striped?: boolean;
}

type SortDirection = "asc" | "desc" | null;

export default function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  keyExtractor,
  onRowClick,
  emptyMessage = "Aucune donnée disponible",
  className,
  striped = true,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      if (sortDirection === "asc") setSortDirection("desc");
      else if (sortDirection === "desc") {
        setSortKey(null);
        setSortDirection(null);
      }
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortKey || !sortDirection) return 0;
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    if (aVal == null || bVal == null) return 0;
    const comparison = String(aVal).localeCompare(String(bVal), "fr", {
      numeric: true,
    });
    return sortDirection === "asc" ? comparison : -comparison;
  });

  const SortIcon = ({
    columnKey,
  }: {
    columnKey: string;
  }) => {
    if (sortKey !== columnKey) {
      return <ChevronsUpDown className="h-3.5 w-3.5 text-navy-300" />;
    }
    if (sortDirection === "asc") {
      return <ChevronUp className="h-3.5 w-3.5 text-gold-500" />;
    }
    return <ChevronDown className="h-3.5 w-3.5 text-gold-500" />;
  };

  return (
    <div
      className={clsx(
        "overflow-hidden rounded-xl border border-navy-100/60 bg-white shadow-sm shadow-navy-900/[0.03]",
        className
      )}
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-navy-100/80 bg-navy-50/40">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={clsx(
                    "px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-navy-500",
                    col.sortable && "cursor-pointer select-none hover:text-navy-700",
                    col.className
                  )}
                  onClick={col.sortable ? () => handleSort(col.key) : undefined}
                >
                  <div className="flex items-center gap-1.5">
                    {col.label}
                    {col.sortable && <SortIcon columnKey={col.key} />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-100/40">
            {sortedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-5 py-12 text-center text-sm text-navy-400"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              sortedData.map((row, index) => (
                <tr
                  key={keyExtractor(row, index)}
                  className={clsx(
                    "transition-colors duration-150",
                    onRowClick && "cursor-pointer",
                    striped && index % 2 === 1 && "bg-navy-50/20",
                    "hover:bg-gold-50/30"
                  )}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={clsx(
                        "whitespace-nowrap px-5 py-4 text-sm text-navy-700",
                        col.className
                      )}
                    >
                      {col.render
                        ? col.render(row, index)
                        : (row[col.key] as React.ReactNode)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
