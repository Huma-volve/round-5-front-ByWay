import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios-instance";

const fetchApprove = async (id: string | number) => {
  const res = await axiosInstance.get(`courses/approve/${id}`);
  return res.data.data;
};

export function useApproveCourse(id: string | number) {
  return useQuery({
    queryKey: ["Approve", id],
    queryFn: () => fetchApprove(id), 
    enabled: !!id, 
  });
}
