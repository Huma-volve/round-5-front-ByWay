import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CourseSchema from "@/schemas/courseSchema";
import { Save } from "lucide-react";
import axiosInstance from "@/lib/axios-instance";
import { useCourse } from "@/hooks/AdminDashboard/useCourse";
import type { AxiosError } from "axios";
import ErrorState from "@/components/course/CourseCard/ErrorState";
import CourseFormSkeleton from "./CourseFormSkeleton";
export default function EditCourse() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { data, isLoading, isError } = useCourse(id);

  if (isLoading) return <CourseFormSkeleton/>;
  if (isError)
    return (
      <div className="flex justify-center items-center">
        <ErrorState />
      </div>
    );

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
          } catch (err) {
            const axiosError = err as AxiosError<{ message?: string }>;
            const errorMessage =
              axiosError.response?.data?.message || "Failed to update course";
            toast.error(errorMessage);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {() => (
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
