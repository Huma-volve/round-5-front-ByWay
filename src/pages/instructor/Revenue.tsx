import RevenueChart from "../../components/instructor/revenue/RevenueChart";
import RevenueHeader from "@/components/instructor/revenue/RevenueHeader";
import IncomeTable from "@/components/instructor/revenue/IncomeTable";
import useFetchInstructorRevenueGraphData from "@/hooks/instructor/useFetchInstructorRevenueGraphData";

export default function Revenue() {
  return (
    <div className=" mt-12">
      <RevenueHeader />
      <RevenueChart 
        useRevenueHook={useFetchInstructorRevenueGraphData}
        defaultYear={new Date().getFullYear()}
      />
      <IncomeTable />
    </div>
  );
}
