import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { EditProfileForm } from "@/types/EditForm";
import { getEditProfileDefaults } from "@/schemas/editProfileDefaults";
import { useProfile } from "@/hooks/instructor/useProfile";
import { useUpdateProfile } from "@/hooks/instructor/useUpdateProfile";
import React from "react";
import EditProfileSkeleton from "@/components/instructor/edit/EditProfileSkeleton";
import ErrorState from "@/components/course/CourseCard/ErrorState";

export default function EditProfile() {
  const { data: profileData, isLoading, isError} = useProfile();
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const { register, handleSubmit, reset } = useForm<EditProfileForm>({
    defaultValues: profileData
      ? getEditProfileDefaults(profileData)
      : undefined,
  });

  React.useEffect(() => {
    if (profileData) {
      reset(getEditProfileDefaults(profileData));
    }
  }, [profileData, reset]);

  if (isLoading) return <EditProfileSkeleton />;
  if (isError) return <ErrorState />;

  const onSubmit = (data: EditProfileForm) => {
    updateProfile(data);
  };

  return (
    <section className="flex items-center min-h-[80vh]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" space-y-6 bg-white p-6 rounded-xl shadow  w-full"
      >
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

        <Button
          type="submit"
          className="bg-success w-full text-white"
          disabled={isPending}
        >
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </section>
  );
}
