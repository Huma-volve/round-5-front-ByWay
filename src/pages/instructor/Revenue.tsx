import RevenueChart from "../../components/instructor/revenue/RevenueChart";
import RevenueHeader from "@/components/instructor/revenue/RevenueHeader";
import IncomeTable from "@/components/instructor/revenue/IncomeTable";
import useFetchInstructorRevenueGraphData from "@/hooks/instructor/useFetchInstructorRevenueGraphData";
import useFetchInstructorRecentPayOuts from "@/hooks/instructor/useFetchInstructorRecentPayOuts";
import NewBreadCrumb from "@/components/common/NewBreadCrumb";

export default function Revenue() {
  const { data: recentPayouts, isPending, isError, error } = useFetchInstructorRecentPayOuts();
  // breadcrumb items
  const breadcrumbItems = [
    { label: "common.home", link: "/" },
    { label: "instructor.revenue.title" },
  ];
  return (
    <div className="container">
      <NewBreadCrumb items={breadcrumbItems} />
      <RevenueHeader />
      <RevenueChart
        useRevenueHook={useFetchInstructorRevenueGraphData}
        defaultYear={new Date().getFullYear()}
      />
      <IncomeTable apiData={recentPayouts?.data} isPending={isPending} isError={isError} error={error}/>
    </div>
  );
}
