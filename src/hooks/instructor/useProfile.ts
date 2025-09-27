import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios-instance";

const getProfile = async () => {
  const res = await axiosInstance.get("instructor/profile");
  return res.data.data;
};

export function useProfile() {

    
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
}
