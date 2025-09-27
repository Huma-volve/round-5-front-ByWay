// src/hooks/useInstructor.ts
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios-instance";

export function useInstructor() {
  return useQuery({
    queryKey: ["instructor"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`instructor/profile`);
      return data.data;
    },
  });
}
