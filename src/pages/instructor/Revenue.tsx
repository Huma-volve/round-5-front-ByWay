import RevenueChart from "../../components/instructor/revenue/RevenueChart";
import RevenueHeader from "@/components/instructor/revenue/RevenueHeader";
import IncomeTable from "@/components/instructor/revenue/IncomeTable";
import useFetchInstructorRevenueGraphData from "@/hooks/instructor/useFetchInstructorRevenueGraphData";
import useFetchInstructorRecentPayOuts from "@/hooks/instructor/useFetchInstructorRecentPayOuts";

export default function Revenue() {
  const { data: recentPayouts, isPending, isError, error } = useFetchInstructorRecentPayOuts();
  console.log(recentPayouts);
  return (
    <div className=" mt-12">
      <RevenueHeader />
      <RevenueChart
        useRevenueHook={useFetchInstructorRevenueGraphData}
        defaultYear={new Date().getFullYear()}
      />
      <IncomeTable apiData={recentPayouts?.data} isPending={isPending} isError={isError} error={error}/>
    </div>
  );
}
