import { useTranslation } from "react-i18next";
import TableComponent from "@/components/admin/TableComponent/TableComponent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
// import { Skeleton } from "@/components/ui/skeleton";
import LoadingDesign from "../UserManagement/LoadingDesign";
import ErrorDesign from "../UserManagement/ErrorDesign";
import axiosInstance from "@/lib/axios-instance";
export default function AdminCoursesPage() {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("courses");
      console.log("all courses", data.data);
      return data.data;
    },
  });
  const { mutate } = useMutation({
    mutationKey: ["course"],
    mutationFn: async (id: number) => {
      const { data } = await axiosInstance.delete(`courses/${id}`);
      return data.data;
    },

    onError: (error) => {
      toast.error(error.message || "Unexpected error");
    },
    onMutate: () => {
      toast.loading("Deleting course...");
    },
    onSuccess: () => {
      toast.success("Course deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });

  const { t } = useTranslation();

  if (isLoading) return <LoadingDesign />;
  if (isError) return <ErrorDesign message={error?.message} />;
  return (
    <div className="p-6 container space-y-4">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">
          {" "}
          {t("instructor.courseManagement.title")}
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          {t("instructor.courseManagement.coursesManagementDescription")}
        </p>
      </div>
      <TableComponent
        courses={data ?? []}
        deleteCourse={(id: number) => mutate(id)}
      />
    </div>
  );
}
