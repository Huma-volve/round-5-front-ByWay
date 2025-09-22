import { addAdmin } from "@/api/add-admin"
import { useMutation } from "@tanstack/react-query"

export const useFetchAddAdmin=()=>{
    return useMutation({
        mutationFn:(data:{})=>addAdmin(data),
    })
}
