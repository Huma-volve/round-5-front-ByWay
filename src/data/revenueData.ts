export interface RevenueDataPoint {
  month: string;
  lastPeriod: number;
  currentPeriod: number;
  date: string;
}

export const REVENUE_DATA: RevenueDataPoint[] = [
  {
    month: "Jan",
    lastPeriod: 2400,
    currentPeriod: 2800,
    date: "2024-01",
  },
  {
    month: "Feb",
    lastPeriod: 1398,
    currentPeriod: 1890,
    date: "2024-02",
  },
  {
    month: "Mar",
    lastPeriod: 9800,
    currentPeriod: 11200,
    date: "2024-03",
  },
  {
    month: "Apr",
    lastPeriod: 3908,
    currentPeriod: 4500,
    date: "2024-04",
  },
  {
    month: "May",
    lastPeriod: 4800,
    currentPeriod: 5200,
    date: "2024-05",
  },
  {
    month: "Jun",
    lastPeriod: 3800,
    currentPeriod: 4100,
    date: "2024-06",
  },
  {
    month: "Jul",
    lastPeriod: 4300,
    currentPeriod: 4800,
    date: "2024-07",
  },
  {
    month: "Aug",
    lastPeriod: 5200,
    currentPeriod: 5900,
    date: "2024-08",
  },
  {
    month: "Sep",
    lastPeriod: 6100,
    currentPeriod: 6800,
    date: "2024-09",
  },
  {
    month: "Oct",
    lastPeriod: 5500,
    currentPeriod: 6200,
    date: "2024-10",
  },
  {
    month: "Nov",
    lastPeriod: 7200,
    currentPeriod: 8100,
    date: "2024-11",
  },
  {
    month: "Dec",
    lastPeriod: 8900,
    currentPeriod: 9500,
    date: "2024-12",
  },
];

export default REVENUE_DATA;
