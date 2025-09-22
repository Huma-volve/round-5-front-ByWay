import axiosInstance from "@/lib/axios-instance";

export const addAdmin = async (data: {}) => {
    try{
        const response = await axiosInstance.post('users/add/admin', data);
        return response.data;
    }catch(error){
        throw error;
    }
}
