import { closeAccount, closeAccountStatus } from "@/api/learner-profile-api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const fetchCloseAccount = () => {
    return useMutation({
        mutationFn: (password: string) => closeAccount(password),
    });
}
export const fetchCloseAccountStatus = () => {
  return useQuery({
    queryKey: ["closeAccountStatus"],
    queryFn: closeAccountStatus,
  });
};