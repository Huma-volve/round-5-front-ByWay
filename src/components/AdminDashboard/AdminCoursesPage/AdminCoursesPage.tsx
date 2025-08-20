import { useTranslation } from "react-i18next"
import TableComponent from "@/components/admin/TableComponent/TableComponent"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "react-toastify"
import { useQuery } from "@tanstack/react-query"

export default function AdminCoursesPage() {
  const token = localStorage.getItem('auth_token')
  const queryClient = useQueryClient()
const { data , isLoading, isError, error } = useQuery({
    queryKey: ['courses'],   
    queryFn: async () => {
      const options = {
        url:"http://round5-byway.huma-volve.com/api/courses",
      method: "get",
      headers: {
      Accept : "application/json",
      Authorization: `Bearer ${token}`
      }
    }
    const {data} = await axios.request(options)
      
     console.log("all courses",data.data);
     return data.data.data  
   
    },
       
  })

//   const courses = [
//  {
//     title: "UI/UX Design Basics",
//     instructor: "Noor Ali",
//     category: "Design",
//     status: "Draft" as const,
//     createdAt: "10 Jul 2024",
//     id: 1,
//   },
//   {
//     title: "Front End Development",
//     instructor: "Salsabeel Ibrahim",
//     category: "Development",
//     status: "Published" as const,
//     createdAt: "18 Jul 2024",
//     id: 2,
//   },
//   {
//     title: "Data Analysis with Python",
//     instructor: "Ahmed Youssef",
//     category: "Data Science",
//     status: "Pending" as const,
//     createdAt: "22 Jul 2024",
//     id: 3,
//   },
//   {
//     title: "Digital Marketing Fundamentals",
//     instructor: "Mona Hassan",
//     category: "Marketing",
//     status: "Published" as const,
//     createdAt: "05 Aug 2024",
//     id: 4,
//   },
//   {
//     title: "Machine Learning Essentials",
//     instructor: "Omar Khaled",
//     category: "AI",
//     status: "Draft" as const,
//     createdAt: "12 Aug 2024",
//     id: 5,},
  
//   ]
//   type courses = {
//   title: string
//   instructor: string
//   category: string
//   status: "Draft" | "Published" | "Pending"
//   createdAt: string
//   id: number,

// }
// const [items , setItems] = useState(courses)

//  function deleteCourse(id: number) {}
  // const token = localStorage.getItem("auth_token")
  
// setItems(items.filter((course) => course.id !== id))
const {mutate} = useMutation({
      mutationKey:['course'],
    mutationFn: async(id: number)=>{
      const options = {
        url: `http://round5-byway.huma-volve.com/api/courses/${id}`,
        method: "DELETE",
        headers: {
               Authorization: `Bearer ${token}`, },
               }
  
    const {data} = await axios.request(options)
      return data.data },

    onError: (error) => {
      
      toast.error(error.message || "Unexpected error")
    },
     onMutate: () => {
    toast.loading("Deleting course...", { toastId: "deleteCourse" })
  },
   onSuccess: () => {
     
    toast.success("Course deleted successfully");
    queryClient.invalidateQueries(
       {queryKey: ['courses']}
    )},
   })
  

 const { t } = useTranslation();
 if (isLoading) return <p>Loading...</p>
   if (isError) return <p>Error: {error.message}</p>
 
  return (
    <div className="p-6 container space-y-4">
     <div className="space-y-2">
       <h2 className="text-xl font-semibold"> {t('instructor.courseManagement.title')}</h2>
      <p className="text-sm text-gray-500 mb-4">
        {t('instructor.courseManagement.coursesManagementDescription')}
       
      </p>
     </div>
      <TableComponent courses={data.data}  deleteCourse={(id: number) => mutate(id)}  />
    </div>
  )
}
