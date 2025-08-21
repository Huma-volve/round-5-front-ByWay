import * as Yup from "yup"
const CourseSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  category: Yup.string().required("Category is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number().positive().required("Price is required"),
  category_id: Yup.number().positive().required("Category is required"),
  status: Yup.string().oneOf(["published", "draft", "pending"]).required("Status is required"),
  created_at: Yup.date().required("Created date is required"),
})
export default CourseSchema