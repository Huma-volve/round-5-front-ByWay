import { closeAccount, closeAccountStatus } from "@/api/learner-profile-api";
import { getUserProfile, updateUserProfile } from "@/api/user-profile-api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useFetchCloseAccount = () => {
    return useMutation({
        mutationFn: (password: string) => closeAccount(password),
    });
}
export const useFetchCloseAccountStatus = () => {
  return useQuery({
    queryKey: ["closeAccountStatus"],
    queryFn: closeAccountStatus,
  });
};

export const useFetchUserProfile= () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
  })
}

export const useFetchUpdateUserProfile = () => {
  return useMutation({
    mutationKey: ["updateUserProfile"],
    mutationFn: (data: FormData) => {
      console.log('formdata values',data)
      return updateUserProfile(data);
    },
  });
};