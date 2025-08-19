import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserById } from "@/api/auth-api";

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteUserById(id),
    onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
