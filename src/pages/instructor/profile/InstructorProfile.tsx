// import { useForm } from "react-hook-form";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import type { EditProfileForm } from "@/types/EditForm";

// import axiosInstance from "@/lib/axios-instance";
// import { getEditProfileDefaults } from "@/schemas/editProfileDefaults";
// import { toast } from "react-toastify";
// import { useProfile } from "@/hooks/instructor/useProfile";

// export default function EditProfile() {
//   const queryClient = useQueryClient();
//   // const { data: profileData, isLoading } = useQuery({
//   //   queryKey: ["profile"],
//   //   queryFn: async () => {
//   //     const res = await axiosInstance.get("/api/profile");
//   //     return res.data.data;
//   //   },
//   // });


//     const { data: profileData, isLoading, isError } = useProfile();

//   if (isLoading) return <p>Loading...</p>;
//   if (isError) return <p>Something went wrong!</p>;


//   function EditProfileForm() {
//   const { mutate: updateProfile, isPending } = useUpdateProfile();

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const updatedData = {
//       name: "New Name",
//       email: "newemail@example.com",
//     };
//     updateProfile(updatedData);
//   };


//   const { register, handleSubmit } = useForm<EditProfileForm>({
//     defaultValues: profileData ? getEditProfileDefaults(profileData) : undefined,
//   });

//   const onSubmit = (data: EditProfileForm) => {
//     mutation.mutate(data);
//   };

//  if (isLoading) return <p>Loading...</p>;

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white">
//       <h2 className="text-xl font-semibold pt-4">Edit Profile</h2>

//       <div className="space-y-3">
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium">First Name</label>
//             <Input {...register("first_name")} placeholder="First name" />
//           </div>
//           <div>
//             <label className="block text-sm font-medium">Last Name</label>
//             <Input {...register("last_name")} placeholder="Last name" />
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium">Email</label>
//           <Input {...register("email")} type="email" placeholder="Email" />
//         </div>

//         <div>
//           <label className="block text-sm font-medium">Bio</label>
//           <Textarea {...register("bio")} placeholder="Write your bio..." />
//         </div>
//       </div>

//         <Button type="submit" className="bg-success w-full " disabled={mutation.isPending}>
//         {mutation.isPending ? "Saving..." : "Save Changes"}
//       </Button>
//     </form>
//   );
// }



import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { EditProfileForm } from "@/types/EditForm";

import { getEditProfileDefaults } from "@/schemas/editProfileDefaults";
import { useProfile } from "@/hooks/instructor/useProfile";
import { useUpdateProfile } from "@/hooks/instructor/useUpdateProfile";
import React from "react";

export default function EditProfile() {
  const { data: profileData, isLoading, isError } = useProfile();
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const { register, handleSubmit, reset } = useForm<EditProfileForm>({
    defaultValues: profileData ? getEditProfileDefaults(profileData) : undefined,
  });

  
React.useEffect(() => {
    if (profileData) {
      reset(getEditProfileDefaults(profileData));
    }
  }, [profileData, reset]);

 

  const onSubmit = (data: EditProfileForm) => {
    updateProfile(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold">Edit Profile</h2>

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">First Name</label>
            <Input {...register("first_name")} placeholder="First name" />
          </div>
          <div>
            <label className="block text-sm font-medium">Last Name</label>
            <Input {...register("last_name")} placeholder="Last name" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <Input {...register("email")} type="email" placeholder="Email" />
        </div>

        <div>
          <label className="block text-sm font-medium">Bio</label>
          <Textarea {...register("bio")} placeholder="Write your bio..." />
        </div>
      </div>

      <Button type="submit" className="bg-success w-full" disabled={isPending}>
        {isPending ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
}
