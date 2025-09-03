import { deleteUserById } from "@/api/user-manage-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteUserById(id),
    onSuccess: () => {
      // لازم يطابق useFetchUserDashboard
      queryClient.invalidateQueries({ queryKey: ["userDashboard"] });
    },
  });
}
