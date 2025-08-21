import { useTranslation } from "react-i18next"
import TableComponent from "@/components/admin/TableComponent/TableComponent"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "react-toastify"
import { useQuery } from "@tanstack/react-query"
import { Skeleton } from "@/components/ui/skeleton"
export default function AdminCoursesPage() {
  const token = localStorage.getItem('auth_token')
  const queryClient = useQueryClient()
const { data , isLoading, isError, error  } = useQuery({
  
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
     return data.data
   
    },
       
  })
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
     toast.dismiss("deleteCourse"); 
      toast.error(error.message || "Unexpected error")
    },
     onMutate: () => {
    toast.loading("Deleting course...", { toastId: "deleteCourse" })
  },
   onSuccess: () => {
       toast.dismiss("deleteCourse");
    toast.success("Course deleted successfully");
    queryClient.invalidateQueries(
       {queryKey: ['courses']}
    )},
   })
  

 const { t } = useTranslation();
if (isLoading) 
return   <div className="p-6 space-y-2">
      <Skeleton className="h-6 w-48" /> 
      <Skeleton className="h-4 w-80" /> 
      <div className="space-y-2 mt-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex space-x-2">
            <Skeleton className="h-6 w-full" />
          </div>
        ))}
      </div>
    </div>
  if (isError) return <p>Error: {error.message}</p>
 
  return (
    <div className="p-6 container space-y-4">
     <div className="space-y-2">
       <h2 className="text-xl font-semibold"> {t('instructor.courseManagement.title')}</h2>
      <p className="text-sm text-gray-500 mb-4">
        {t('instructor.courseManagement.coursesManagementDescription')}
       
      </p>
     </div>
      <TableComponent courses={data ?? []}  deleteCourse={(id: number) => mutate(id)}  />
    </div>
  )
}
