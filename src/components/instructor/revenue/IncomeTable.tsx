import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { ColumnDef, SortingState } from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Search } from "lucide-react";
import { CustomDropdown } from "@/components/ui/custom-dropdown";
import {
  INCOME_TABLE_DATA,
  PAYMENT_FILTER_OPTIONS,
  type IncomeTableData,
} from "../../../data/incomeTableData";
import IncomeTableLoadingDesign from "./IncomeTableLoadingDesign";
import IncomeTableErrorDesign from "./IncomeTableErrorDesign";
import IncomeTableEmptyState from "./IncomeTableEmptyState";
export default function IncomeTable({
  isAdmin = false,
  apiData,
  isPending,
  isError,
  error,
}: {
  isAdmin?: boolean;
  apiData?: IncomeTableData[];
  isPending?: boolean;
  isError?: boolean;
  error?: Error | null;
}) {
  const { t, i18n } = useTranslation();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("all");

  // Detect RTL based on current language
  const isRTL = i18n.language === "ar";

  // Payment type color mapping
  const getPaymentTypeColor = (type: string) => {
    switch (type) {
      case "paypal":
        return "bg-green-100 text-green-800 border-green-200";
      case "stripe":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "bank":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Check if we have real API data vs empty data vs no data
  const hasApiData = apiData !== undefined && apiData !== null;
  const isDataEmpty = hasApiData && apiData.length === 0;

  const data = useMemo<IncomeTableData[]>(() => {
    if (hasApiData && apiData.length > 0) {
      return apiData;
    }
    // For development/demo purposes, fall back to static data if no API data is provided
    // In production, this should probably be removed
    if (!hasApiData) {
      return INCOME_TABLE_DATA;
    }
    // If API returned empty array, return empty array (will show empty state)
    return [];
  }, [apiData, hasApiData]);

  const columns = useMemo<ColumnDef<IncomeTableData>[]>(
    () => [
      {
        accessorKey: "customer",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="w-full justify-center"
          >
            {t("instructor.income.table.customer")}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => (
          <div className="text-center font-medium break-words">
            {row.getValue("customer")}
          </div>
        ),
      },
      {
        accessorKey: "date",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="w-full justify-center"
          >
            {t("instructor.income.table.date")}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => (
          <div className="text-center">{row.getValue("date")}</div>
        ),
      },
      {
        accessorKey: "type",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="w-full justify-center"
          >
            {t("instructor.income.table.paymentType")}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => {
          const type = row.getValue("type") as string;
          return (
            <div className="flex justify-center items-center">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium border break-words text-center ${getPaymentTypeColor(
                  type
                )}`}
              >
                {type}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: "amount",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="w-full justify-center"
          >
            {t("instructor.income.table.amount")}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => {
          const amount = parseFloat(row.getValue("amount"));
          const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(amount);
          return (
            <div className="text-center font-semibold text-green-600">
              {formatted}
            </div>
          );
        },
      },
    ],
    [t]
  );
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: (row, columnId, filterValue) => {
      return String(row.getValue(columnId))
        .toLowerCase()
        .includes(filterValue.toLowerCase());
    },
  });

  // Loading state
  if (isPending) {
    return <IncomeTableLoadingDesign isAdmin={isAdmin} />;
  }

  // Error state
  if (isError) {
    return <IncomeTableErrorDesign isAdmin={isAdmin} error={error} />;
  }

  // Empty state - when API returned successfully but with no data
  if (isDataEmpty) {
    return <IncomeTableEmptyState isAdmin={isAdmin} />;
  }

  return (
    <div className="w-full space-y-4 mt-16 mb-8 flex flex-col gap-2">
      {/* Filters & Search */}
      <h1
        className={`text-xl md:text-2xl font-bold mb-2 ps-4 ${
          isAdmin && "text-primary ps-0"
        }`}
      >
        {isAdmin
          ? t("admin.home.recentPayoutRequests")
          : t("instructor.income.title")}
      </h1>
      {!isAdmin && (
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between px-4">
          <div className="relative w-full sm:max-w-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-300">
            <Search
              className={`absolute ${
                isRTL ? "left-3" : "right-3"
              } top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-600`}
            />
            <Input
              placeholder={t("instructor.income.search.placeholder")}
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className={`${isRTL ? "pl-10" : "pr-10"}`}
            />
          </div>

          <CustomDropdown
            value={paymentFilter}
            onValueChange={setPaymentFilter}
            placeholder={t("instructor.income.filters.paymentPlaceholder")}
            options={PAYMENT_FILTER_OPTIONS}
            t={t}
            className="w-full sm:w-[180px]"
          />
        </div>
      )}

      {/* Responsive Table Container */}
      <div className="rounded-lg mx-4">
        <div className="overflow-x-auto overflow-y-auto">
          <Table className="w-full">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="bg-gray-50">
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="text-center font-semibold px-2 min-w-[80px]"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {(() => {
                const filteredRows = table
                  .getRowModel()
                  .rows.filter((row) =>
                    paymentFilter && paymentFilter !== "all"
                      ? row.original.type === paymentFilter
                      : true
                  );

                if (filteredRows.length === 0) {
                  return (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-12">
                        <div className="flex flex-col items-center">
                          <Search className="h-12 w-12 text-gray-300 mb-4" />
                          <p className="text-lg font-medium text-gray-900 mb-2">
                            {t("instructor.income.empty.noResults")}
                          </p>
                          <p className="text-gray-500">
                            {t("instructor.income.empty.noResultsDescription")}
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                }

                return filteredRows.map((row) => (
                  <TableRow key={row.id} className="hover:bg-gray-50">
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="text-center px-2 py-3"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ));
              })()}
            </TableBody>
          </Table>
        </div>

        {/* Mobile-friendly scroll indicator */}
        <div className="block sm:hidden p-2 text-center text-sm text-gray-500 border-t">
          {t("instructor.income.table.scrollHint")}
        </div>
      </div>
    </div>
  );
}
