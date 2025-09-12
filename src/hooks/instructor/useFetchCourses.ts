import { useQuery } from "@tanstack/react-query";
import { fetchInstructorCourses } from "@/api/instructor-get-courses-api";

export default function useFetchCourses(pageNumber?: number){
return useQuery({
    queryKey : ['courses','page',pageNumber],
    queryFn : () => fetchInstructorCourses(pageNumber),
    // queryFn : () => {
    //     let data;
    //     return data=[]
    // },
    // placeholderData : undefined,
});}