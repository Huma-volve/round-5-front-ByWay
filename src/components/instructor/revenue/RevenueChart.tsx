import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useTranslation } from "react-i18next";
import { useState, useMemo } from "react";
import {
  getChartDataFromApi,
  getAvailableYearsFromApi,
  formatCurrency,
  type ApiRevenueResponse,
} from "../../../data/revenueData";
import CustomLegend from "./CustomLegend";
import YearSelector from "./YearSelector";

interface RevenueChartProps {
  useRevenueHook: () => {
    data: ApiRevenueResponse | undefined;
    isPending: boolean;
    isError: boolean;
    error: Error | null;
  };
  defaultYear?: number;
}

export default function RevenueChart({
  useRevenueHook,
  defaultYear = new Date().getFullYear(),
}: RevenueChartProps) {
  const { t } = useTranslation();
  const { data, isPending, isError, error } = useRevenueHook();
  const [selectedYear, setSelectedYear] = useState<number>(defaultYear);

  const { chartData, availableYears } = useMemo(() => {
    if (!data?.data) {
      return { chartData: [], availableYears: [] };
    }

    const apiData = data.data;
    const years = getAvailableYearsFromApi(apiData);
    const chart = getChartDataFromApi(apiData, selectedYear);

    return { chartData: chart, availableYears: years };
  }, [data, selectedYear]);

  // Loading state
  if (isPending) {
    return (
      <div>
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div className="flex items-center mb-4">
            <div className="h-8 w-32 bg-gray-200 animate-pulse rounded-md"></div>
          </div>
          <div className="h-6 w-48 bg-gray-200 animate-pulse rounded-md"></div>
        </div>
        <div className="h-[300px] bg-gray-200 animate-pulse rounded-lg"></div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600">
          {error?.message || t("instructor.revenue.errorLoadingData")}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <YearSelector
          availableYears={availableYears}
          selectedYear={selectedYear}
          onYearSelect={setSelectedYear}
        />
        <CustomLegend />
      </div>
      <div dir="ltr">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient
                id="lastPeriodGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="var(--revenue1-graph)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="80%"
                  stopColor="var(--revenue1-graph)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient
                id="currentPeriodGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="var(--revenue2-graph)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="80%"
                  stopColor="var(--revenue2-graph)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              className="text-xs text-gray-500"
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              className="text-xs text-gray-500"
              tickFormatter={(value) => formatCurrency(value)}
              width={60}
              orientation="left"
            />
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
              formatter={(value: number, name: string) => [
                formatCurrency(value),
                name === "lastPeriod"
                  ? t("instructor.revenue.lastPeriod")
                  : t("instructor.revenue.currentPeriod"),
              ]}
            />
            <Area
              dataKey="lastPeriod"
              stroke="var(--revenue1-graph)"
              fill="url(#lastPeriodGradient)"
              strokeWidth={2}
              name="lastPeriod"
            />
            <Area
              dataKey="currentPeriod"
              stroke="var(--revenue2-graph)"
              fill="url(#currentPeriodGradient)"
              strokeWidth={2}
              name="currentPeriod"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
