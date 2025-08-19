import axiosInstance from "@/lib/axios-instance";
import type { UserDashboard, UserProfileDashboard } from "@/lib/types";

// User Management 
export async function fetchUsersDashboard(): Promise<UserDashboard[]> {
  const { data } = await axiosInstance.get<{data: UserDashboard[]}>("users");
  return data.data;
}

export async function fetchUsersDashboardProfile(id:number): Promise<UserProfileDashboard> {
  const res = await axiosInstance.get<{ data: UserProfileDashboard }>(`users/${id}`);
  console.log("dattta ===>", res.data);
  return res.data.data ?? res.data; 
}



export async function deleteUserById(id: number): Promise<void> {
  await axiosInstance.delete(`users/${id}`);
}
// End of User Management
