import { useTranslation } from "react-i18next";
import TableComponent from "@/components/admin/TableComponent/TableComponent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
// import { Skeleton } from "@/components/ui/skeleton";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import LoadingDesign from "../UserManagement/LoadingDesign";
import ErrorDesign from "../UserManagement/ErrorDesign";
export default function AdminCoursesPage() {
  const [token] = useLocalStorage("auth_token", "");
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const options = {
        url: "https://round5-byway.huma-volve.com/api/courses",
        method: "get",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.request(options);

      console.log("all courses", data.data);
      return data.data;
    },
  });
  const { mutate } = useMutation({
    mutationKey: ["course"],
    mutationFn: async (id: number) => {
      const options = {
        url: `https://round5-byway.huma-volve.com/api/courses/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.request(options);
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
