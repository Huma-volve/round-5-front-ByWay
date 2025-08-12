import * as React from "react";
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
import { ArrowUpDown, ListFilter, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  INCOME_TABLE_DATA,
  PAYMENT_FILTER_OPTIONS,
  type IncomeTableData,
} from "../../../data/incomeTableData";
export default function IncomeTable() {
  const { t, i18n } = useTranslation();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [paymentFilter, setPaymentFilter] = React.useState("all");

  // Detect RTL based on current language
  const isRTL = i18n.language === "ar";

  // Payment type color mapping
  const getPaymentTypeColor = (type: string) => {
    switch (type) {
      case "Cash":
        return "bg-green-100 text-green-800 border-green-200";
      case "Credit Card":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Bank Transfer":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const data = React.useMemo<IncomeTableData[]>(() => INCOME_TABLE_DATA, []);

  const columns = React.useMemo<ColumnDef<IncomeTableData>[]>(
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

  return (
    <div className="w-full space-y-4 mt-16 mb-8 flex flex-col gap-2">
      {/* Filters & Search */}
      <h1 className="text-2xl font-bold mb-2 ps-4">
        {t("instructor.income.title")}
      </h1>
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
        <Select onValueChange={(value) => setPaymentFilter(value)}>
          <SelectTrigger className="w-full sm:w-[180px] [&>svg]:hidden">
            <div className="flex items-center justify-between w-full">
              <SelectValue
                placeholder={t("instructor.income.filters.paymentPlaceholder")}
              />
              <ListFilter className="h-4 w-4 ml-2 text-gray-600" />
            </div>
          </SelectTrigger>
          <SelectContent
            className="z-50"
            position="popper"
            side="bottom"
            align="start"
            sideOffset={4}
          >
            {PAYMENT_FILTER_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {t(option.labelKey)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

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
              {table
                .getRowModel()
                .rows.filter((row) =>
                  paymentFilter && paymentFilter !== "all"
                    ? row.original.type === paymentFilter
                    : true
                )
                .map((row) => (
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
                ))}
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
