import { currencyFormatter } from "../utils/CurrencyFormatter";

export interface RevenueDataPoint {
  month: string;
  revenue: number;
  date: string;
}

export interface RevenueInfo {
  amount: number;
  labelKey: string; // Changed from label to labelKey for i18n
  isIncreased: boolean;
  formattedAmount?: string;
}

// API Response types
export interface ApiRevenueResponse {
  status: number;
  message: string;
  data: Record<string, RevenueDataPoint[]>;
}

// Fallback/dummy data for instructor (temporary until endpoint is ready)
export const INSTRUCTOR_REVENUE_DATA: Record<number, RevenueDataPoint[]> = {
  2022: [
    { month: "Jan", revenue: 1800, date: "2022-01" },
    { month: "Feb", revenue: 1200, date: "2022-02" },
    { month: "Mar", revenue: 7200, date: "2022-03" },
    { month: "Apr", revenue: 2800, date: "2022-04" },
    { month: "May", revenue: 3600, date: "2022-05" },
    { month: "Jun", revenue: 2900, date: "2022-06" },
    { month: "Jul", revenue: 3200, date: "2022-07" },
    { month: "Aug", revenue: 3800, date: "2022-08" },
    { month: "Sep", revenue: 4500, date: "2022-09" },
    { month: "Oct", revenue: 4200, date: "2022-10" },
    { month: "Nov", revenue: 5400, date: "2022-11" },
    { month: "Dec", revenue: 6800, date: "2022-12" },
  ],
  2023: [
    { month: "Jan", revenue: 2400, date: "2023-01" },
    { month: "Feb", revenue: 1398, date: "2023-02" },
    { month: "Mar", revenue: 9800, date: "2023-03" },
    { month: "Apr", revenue: 3908, date: "2023-04" },
    { month: "May", revenue: 4800, date: "2023-05" },
    { month: "Jun", revenue: 3800, date: "2023-06" },
    { month: "Jul", revenue: 4300, date: "2023-07" },
    { month: "Aug", revenue: 5200, date: "2023-08" },
    { month: "Sep", revenue: 6100, date: "2023-09" },
    { month: "Oct", revenue: 5500, date: "2023-10" },
    { month: "Nov", revenue: 7200, date: "2023-11" },
    { month: "Dec", revenue: 8900, date: "2023-12" },
  ],
  2024: [
    { month: "Jan", revenue: 3200, date: "2024-01" },
    { month: "Feb", revenue: 2100, date: "2024-02" },
    { month: "Mar", revenue: 12500, date: "2024-03" },
    { month: "Apr", revenue: 5500, date: "2024-04" },
    { month: "May", revenue: 6800, date: "2024-05" },
    { month: "Jun", revenue: 5900, date: "2024-06" },
    { month: "Jul", revenue: 7200, date: "2024-07" },
    { month: "Aug", revenue: 8100, date: "2024-08" },
    { month: "Sep", revenue: 9200, date: "2024-09" },
    { month: "Oct", revenue: 8800, date: "2024-10" },
    { month: "Nov", revenue: 10500, date: "2024-11" },
    { month: "Dec", revenue: 12800, date: "2024-12" },
  ],
  2025: [
    { month: "Jan", revenue: 5400, date: "2025-01" },
    { month: "Feb", revenue: 3890, date: "2025-02" },
    { month: "Mar", revenue: 15800, date: "2025-03" },
    { month: "Apr", revenue: 7900, date: "2025-04" },
    { month: "May", revenue: 9200, date: "2025-05" },
    { month: "Jun", revenue: 8100, date: "2025-06" },
    { month: "Jul", revenue: 9800, date: "2025-07" },
    { month: "Aug", revenue: 11900, date: "2025-08" },
    { month: "Sep", revenue: 13800, date: "2025-09" },
    { month: "Oct", revenue: 12200, date: "2025-10" },
    { month: "Nov", revenue: 15100, date: "2025-11" },
    { month: "Dec", revenue: 19500, date: "2025-12" },
  ],
};

// Convert API response to chart format
export const getChartDataFromApi = (apiData: Record<string, RevenueDataPoint[]>, selectedYear: number) => {
  const currentYearData = apiData[selectedYear.toString()] || [];
  const currentYear = new Date().getFullYear(); // Get current year dynamically
  const lastYearData = apiData[currentYear.toString()] || []; // Always use current year as reference for last period

  return currentYearData.map((current, index) => ({
    month: current.month,
    currentPeriod: current.revenue,
    lastPeriod: lastYearData[index]?.revenue || 0,
    date: current.date,
  }));
};

// Convert dummy data to chart format (for instructor fallback)
export const getChartDataFromDummyData = (selectedYear: number) => {
  const currentYearData = INSTRUCTOR_REVENUE_DATA[selectedYear] || [];
  const currentYear = new Date().getFullYear();
  const lastYearData = INSTRUCTOR_REVENUE_DATA[currentYear] || [];

  return currentYearData.map((current, index) => ({
    month: current.month,
    currentPeriod: current.revenue,
    lastPeriod: lastYearData[index]?.revenue || 0,
    date: current.date,
  }));
};

// Get available years from API data
export const getAvailableYearsFromApi = (apiData: Record<string, RevenueDataPoint[]>): number[] => {
  return Object.keys(apiData)
    .map(Number)
    .sort((a, b) => b - a);
};

// Get available years from dummy data (for instructor fallback)
export const getAvailableYearsFromDummyData = (): number[] => {
  return Object.keys(INSTRUCTOR_REVENUE_DATA)
    .map(Number)
    .sort((a, b) => b - a);
};

// Helper function to format currency
export const formatCurrency = (amount: number): string => {
  return currencyFormatter.format(amount);
};
