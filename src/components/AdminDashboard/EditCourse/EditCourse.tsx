import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"  
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save } from "lucide-react"
import { useTranslation } from "react-i18next"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { toast } from "react-toastify"
import { Skeleton } from "@/components/ui/skeleton"
import CourseSchema from "@/schemas/courseSchema"
export default function EditCourse() {
const navigate = useNavigate()
  const { id } = useParams()
  const token = localStorage.getItem("auth_token")
  const { t } = useTranslation()

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["course", id],
    queryFn: async () => {
      const {data} = await axios.get(`http://round5-byway.huma-volve.com/api/courses/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(data.data)
      return data.data
    },
    enabled: !!id && !!token,
  })

  if (isLoading) return <Skeleton className=" container space-y-4 min-h-screen w-full rounded-full" />
  if (isError) return <p>Error: {error.message}</p>

  return (
    <div className="container space-y-4 min-h-screen">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">{t("instructor.courseManagement.basicInformation")}</h1>
        <p className="text-sm text-gray-500">{t("instructor.courseManagement.updateManageCourse")}</p>
      </div>

      <Formik
        enableReinitialize
        initialValues={{
          title: data?.title || "",
          description: data?.description || "",
          price: data?.price || 0,
          category_id: data?.category_id || 0,
          category: data?.category || "",
          status: data?.status || "draft",
          created_at: data?.created_at?.slice(0, 10) || "",
        }}
        validationSchema={CourseSchema}
        onSubmit={
          async (values, { setSubmitting }) => {
          try {
            await axios.put(`http://round5-byway.huma-volve.com/api/courses/${id}`, values, {
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
            })
            toast.success("Course updated successfully!")
             navigate("/admin/courses"); 
          } catch (err) {
             if (err instanceof Error) {
    toast.error("Error: " + err.message);
  } else {
    toast.error("Unexpected error");
  }
          } finally {
            setSubmitting(false)
          }
        }}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form>
            <Card className="rounded-2xl shadow-sm">
              <CardHeader>
                <CardTitle>{t("instructor.courseManagement.courseTittle")}</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
               <div>
                  <Label>{t("instructor.courseManagement.courseTittle")}</Label>
                  <Field as={Input}  name="title" placeholder={t("instructor.courseManagement.placeholders.courseTittle")} />
                  <ErrorMessage name="title" component="p" className="text-red-500 my-2 text-sm" />
                </div>
                   <div>
                  <Label>{t("instructor.courseManagement.description")}</Label>
                  <Field as={Input} name="description" placeholder="Enter course description" />
                  <ErrorMessage name="description" component="p" className="text-red-500 my-2 text-sm" />
                </div>
                <div>
                  <Label>{t("instructor.courseManagement.price")}</Label>
                  <Field as={Input}  type="number" name="price" />
                  <ErrorMessage name="price" component="p" className="text-red-500 my-2 text-sm" />
                </div>
                  <div>
                  <Label>{t("instructor.courseManagement.category")}</Label>
                  <Field as={Input} type="text" name="category" />
                  <ErrorMessage name="category" component="p" className="text-red-500 my-2 text-sm" />
                </div>
                <div>
                  <Label>{t("instructor.courseManagement.selectStatus")}</Label>
                  <Select
                    value={values.status}
                    onValueChange={(val) => setFieldValue("status", val)}>
                    <SelectTrigger>
                      <SelectValue placeholder={t("instructor.courseManagement.placeholders.status")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="published">{t("instructor.courseManagement.published")}</SelectItem>
                      <SelectItem value="draft">{t("instructor.courseManagement.draft")}</SelectItem>
                      <SelectItem value="pending">{t("instructor.courseManagement.pending")}</SelectItem>
                    </SelectContent>
                  </Select>
                  <ErrorMessage name="status" component="p" className="text-red-500 my-2 text-sm" />
                </div>
                <div>
                  <Label>{t("instructor.courseManagement.createdDate")}</Label>
                  <Field as={Input} type="date" name="created_at" />
                  <ErrorMessage name="created_at" component="p" className="text-red-500 my-2 text-sm" />
                </div>
              </CardContent>
            </Card>
   <div className="flex gap-2 justify-end py-3">
              <Button type="submit" disabled={isSubmitting} className="bg-rate text-white">
                <Save className="h-4 w-4 mr-2" /> {t("instructor.courseManagement.saveChanges")}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div> )
}
