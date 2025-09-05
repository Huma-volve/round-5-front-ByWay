
import axiosInstance from "@/lib/axios-instance"
import { toast } from "react-toastify";

export const getUserProfile=async ()=>{
    try{
        const res=await  axiosInstance.get("/profile")
        if(res.status===200){
            toast.success(res.data.message);
            return res.data?.data?.user;
        }

    }catch(err){
        console.error(err);
        toast.error("Failed to fetch user profile");
        throw err;
    }
}

export const updateUserProfile=async (data:FormData)=>{
    try{
        const res=await  axiosInstance.put("/profile",data,{
            headers:{"content-type":"multipart/form-data"}
        })
        if(res.status===200){
            toast.success(res.data.message);
            return;
        }

    }catch(err){
        console.error(err);
        toast.error("Failed to update user profile");
        throw err;
    }
}