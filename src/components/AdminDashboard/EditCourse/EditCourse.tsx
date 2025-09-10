import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import CourseSchema from "@/schemas/courseSchema";
import { Skeleton } from "@/components/ui/skeleton";
import { Save } from "lucide-react";
import axiosInstance from "@/lib/axios-instance";
import { useUpdateCourseStatus } from "@/hooks/useUpdateCourseStatus";
import { useCourse } from "@/hooks/AdminDashboard/useCourse";
export default function EditCourse() {
  const navigate = useNavigate();
  const updateStatusMutation = useUpdateCourseStatus();
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

  const { data, isLoading, isError, error } = useCourse(id);

  if (isLoading)
    return (
      <Skeleton className="container space-y-4 min-h-screen w-full rounded-full" />
    );
  if (isError) return <p>Error: {(error as Error).message}</p>;

  if (isLoading)
    return (
      <Skeleton className="container space-y-4 min-h-screen w-full rounded-full" />
    );
  if (isError) return <p>Error: {(error as Error).message}</p>;

  return (
    <div className="container space-y-4 min-h-screen">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">
          {t("instructor.courseManagement.basicInformation")}
        </h1>
        <p className="text-sm text-gray-500">
          {t("instructor.courseManagement.updateManageCourse")}
        </p>
      </div>

      <Formik
        enableReinitialize
        initialValues={{
          title: data?.title || "",
          description: data?.description || "",
          price: data?.price || 0,
          category_id: 0,
          category: data?.category_name || "",
          status: data?.status || "draft",
          created_at: data?.created_at?.slice(0, 10) || "",
        }}
        validationSchema={CourseSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await axiosInstance.put(`/courses/${id}`, values);
            toast.success("Course updated successfully!");
            navigate("/admin/course-manage");
          } catch (err: any) {
            toast.error("Error: " + err.message);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <Card className="rounded-2xl shadow-sm">
              <CardHeader>
                <CardTitle>
                  {t("instructor.courseManagement.courseTittle")}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div>
                  <Label>{t("instructor.courseManagement.courseTittle")}</Label>
                  <Field as={Input} name="title" />
                  <ErrorMessage
                    name="title"
                    component="p"
                    className="text-red-500 my-2 text-sm"
                  />
                </div>

                <div>
                  <Label>{t("instructor.courseManagement.selectStatus")}</Label>

                  <Select
                    value={values.status}
                    onValueChange={(val) => {
                      setFieldValue("status", val);
                      if (id) {
                        updateStatusMutation.mutate({
                          courseId: id,
                          status: val as "published" | "draft" | "pending",
                        });
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={t(
                          "instructor.courseManagement.placeholders.status"
                        )}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="published">
                        {t("instructor.courseManagement.published")}
                      </SelectItem>
                      <SelectItem value="draft">
                        {t("instructor.courseManagement.draft")}
                      </SelectItem>
                      <SelectItem value="pending">
                        {t("instructor.courseManagement.pending")}
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <ErrorMessage
                    name="status"
                    component="p"
                    className="text-red-500 my-2 text-sm"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-2 justify-end py-3">
              {" "}
              <Button type="submit" className="bg-rate text-white">
                <Save className="h-4 w-4 mr-2" />

                {t("instructor.courseManagement.saveChanges")}
              </Button>{" "}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
