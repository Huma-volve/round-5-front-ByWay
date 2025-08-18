import RevenueChart from "../../components/instructor/revenue/RevenueChart";
import RevenueHeader from "@/components/instructor/revenue/RevenueHeader";
import IncomeTable from "@/components/instructor/revenue/IncomeTable";

export default function Revenue() {
  return (
    <div className=" mt-12">
      <RevenueHeader />
      <RevenueChart />
      <IncomeTable />
    </div>
  );
}
