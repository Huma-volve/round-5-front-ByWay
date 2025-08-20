import { patchUserStatus } from "@/api/user-manage-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { UserDashboard } from "@/lib/types";

export function useToggleUserStatus() {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, { id: number}>({
    mutationFn: ({ id }) => patchUserStatus(id),

    onMutate: async ({ id }) => {
      await queryClient.cancelQueries({ queryKey: ["userDashboard"] });
      const previous = queryClient.getQueryData<UserDashboard[]>(["userDashboard"]);

      queryClient.setQueryData<UserDashboard[]>(["userDashboard"], (old) =>
        (old ?? []).map((user) =>
          user.id === id ? { ...user } : user
        )
      );

      return { previous };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["userDashboard"] });
    },
  });
}