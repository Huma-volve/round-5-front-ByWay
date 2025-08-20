import { useQuery } from "@tanstack/react-query";
import { searchUsers } from "@/api/user-manage-api";
import type { UserDashboard } from "@/lib/types";

export function useSearchUsers(key: string) {
  return useQuery<UserDashboard[], Error>({
    queryKey: ["searchUsers", key],
    queryFn: () => searchUsers(key),
    enabled: !!key, 
    // keepPreviousData: true, 
  });
}
