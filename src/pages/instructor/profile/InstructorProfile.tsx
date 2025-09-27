import { Formik, Form, Field, ErrorMessage } from "formik";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useInstructor } from "@/api/useInstructor";
import { useUpdateInstructorProfile } from "@/hooks/instructor/useUpdateInstructorProfile";
import {
  getInstructorProfileUpdateSchema,
  type InstructorProfileUpdateFormValues,
} from "@/schemas/InstructorProfileSchema";
import { useTranslation } from "react-i18next";
import {
  Upload,
  User,
  Globe,
  Linkedin,
  Youtube,
  Facebook,
  MapPin,
  FileText,
  Info,
} from "lucide-react";
import { useState, useRef } from "react";
import ErrorState from "@/components/course/CourseCard/ErrorState";
import EditProfileSkeleton from "@/components/instructor/edit/EditProfileSkeleton";
import NewBreadCrumb from "@/components/common/NewBreadCrumb";

export default function InstructorProfile() {
  const { t } = useTranslation();
  const { data: instructorData, isLoading, error, refetch } = useInstructor();
  const { mutate: updateProfile, isPending } = useUpdateInstructorProfile();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string>("");

  const breadcrumbItems = [
    { label: "common.home", link: "/" },
    { label: "instructor.dashboard", link: "/instructor" },
    { label: "profile.editProfile" },
  ];

  const initialValues: InstructorProfileUpdateFormValues = {
    first_name: instructorData?.first_name || "",
    last_name: instructorData?.last_name || "",
    bio: instructorData?.bio || "",
    about: instructorData?.about || "",
    nationality: instructorData?.nationality || "",
    twitter_link: instructorData?.twitter_link || "",
    linkedin_link: instructorData?.linkedin_link || "",
    youtube_link: instructorData?.youtube_link || "",
    facebook_link: instructorData?.facebook_link || "",
    image: instructorData?.image || "",
  };

  const handleRetry = () => {
    refetch();
  };

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: File | null) => void
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setFieldValue("image", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (values: InstructorProfileUpdateFormValues) => {
    updateProfile(values);
  };

  if (error) {
    return (
      <main className="container py-12">
        <ErrorState
          message="Failed to load instructor profile. Please try again."
          onRetry={handleRetry}
        />
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="container py-6">
        <NewBreadCrumb items={breadcrumbItems} />
        <EditProfileSkeleton />
      </main>
    );
  }

  return (
    <main className="container py-6 space-y-6">
      <NewBreadCrumb items={breadcrumbItems} />

      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader className="pb-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  {t("profile.editProfile")}
                </CardTitle>
                <CardDescription className="text-gray-600 mt-1">
                  {t("profile.updateYourInformation")}
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-8">
            <Formik
              initialValues={initialValues}
              validationSchema={getInstructorProfileUpdateSchema(t)}
              onSubmit={onSubmit}
              enableReinitialize
            >
              {({ setFieldValue, values, errors, touched }) => (
                <Form className="space-y-8">
                  {/* Profile Image Section */}
                  <div className="flex flex-col items-center space-y-4 pb-6 border-b border-gray-200">
                    <div className="relative group">
                      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gradient-to-br from-blue-500 to-purple-600">
                        {previewImage || values.image ? (
                          <img
                            src={
                              previewImage ||
                              (typeof values.image === "string"
                                ? values.image
                                : "")
                            }
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white text-4xl font-bold">
                            {values.first_name?.charAt(0) || "I"}
                          </div>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-200"
                      >
                        <Upload size={16} />
                      </button>
                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, setFieldValue)}
                      className="hidden"
                    />

                    <p className="text-sm text-gray-500 text-center">
                      {t("profile.clickToUploadImage")}
                    </p>

                    {errors.image && touched.image && (
                      <p className="text-red-500 text-sm">{errors.image}</p>
                    )}
                  </div>

                  {/* Basic Information */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                      <User className="w-5 h-5 text-blue-600" />
                      <h3 className="text-lg font-semibold text-gray-900">
                        {t("profile.basicInformation")}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label
                          htmlFor="first_name"
                          className="text-sm font-medium text-gray-700"
                        >
                          {t("profile.firstName")}{" "}
                          <span className="text-red-500">*</span>
                        </Label>
                        <Field
                          name="first_name"
                          as={Input}
                          id="first_name"
                          placeholder={t("profile.enterFirstName")}
                          className={`${
                            errors.first_name && touched.first_name
                              ? "border-red-500 focus:border-red-500"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          name="first_name"
                          component="p"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="last_name"
                          className="text-sm font-medium text-gray-700"
                        >
                          {t("profile.lastName")}{" "}
                          <span className="text-red-500">*</span>
                        </Label>
                        <Field
                          name="last_name"
                          as={Input}
                          id="last_name"
                          placeholder={t("profile.enterLastName")}
                          className={`${
                            errors.last_name && touched.last_name
                              ? "border-red-500 focus:border-red-500"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          name="last_name"
                          component="p"
                          className="text-red-500 text-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="nationality"
                        className="text-sm font-medium text-gray-700 flex items-center gap-2"
                      >
                        <MapPin className="w-4 h-4" />
                        {t("profile.nationality")}
                      </Label>
                      <Field
                        name="nationality"
                        as={Input}
                        id="nationality"
                        placeholder={t("profile.enterNationality")}
                        className={`${
                          errors.nationality && touched.nationality
                            ? "border-red-500 focus:border-red-500"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        name="nationality"
                        component="p"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>

                  {/* Bio and About */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <h3 className="text-lg font-semibold text-gray-900">
                        {t("profile.aboutYou")}
                      </h3>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="bio"
                        className="text-sm font-medium text-gray-700"
                      >
                        {t("profile.bio")}
                      </Label>
                      <Field
                        name="bio"
                        as={Textarea}
                        id="bio"
                        placeholder={t("profile.enterBio")}
                        rows={3}
                        className={`resize-none ${
                          errors.bio && touched.bio
                            ? "border-red-500 focus:border-red-500"
                            : ""
                        }`}
                      />
                      <p className="text-xs text-gray-500">
                        {t("profile.bioDescription")}
                      </p>
                      <ErrorMessage
                        name="bio"
                        component="p"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="about"
                        className="text-sm font-medium text-gray-700 flex items-center gap-2"
                      >
                        <Info className="w-4 h-4" />
                        {t("profile.about")}
                      </Label>
                      <Field
                        name="about"
                        as={Textarea}
                        id="about"
                        placeholder={t("profile.enterAbout")}
                        rows={6}
                        className={`resize-none ${
                          errors.about && touched.about
                            ? "border-red-500 focus:border-red-500"
                            : ""
                        }`}
                      />
                      <p className="text-xs text-gray-500">
                        {t("profile.aboutDescription")}
                      </p>
                      <ErrorMessage
                        name="about"
                        component="p"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Globe className="w-5 h-5 text-blue-600" />
                      <h3 className="text-lg font-semibold text-gray-900">
                        {t("profile.socialLinks")}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label
                          htmlFor="twitter_link"
                          className="text-sm font-medium text-gray-700 flex items-center gap-2"
                        >
                          {/* X.com logo SVG */}
                          <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4 text-black"
                          >
                          <path
                            d="M3 3h5.5l4.5 6.5L17.5 3H22l-7.5 10L22 21h-5.5l-4.5-6.5L6.5 21H2l7.5-10L2 3z"
                            fill="currentColor"
                          />
                          </svg>
                          {t("profile.twitterLink")}
                        </Label>
                        <Field
                          name="twitter_link"
                          as={Input}
                          id="twitter_link"
                          placeholder="https://twitter.com/username"
                          className={`${
                            errors.twitter_link && touched.twitter_link
                              ? "border-red-500 focus:border-red-500"
                              : ""
                          }`}
                        />

                        <ErrorMessage
                          name="twitter_link"
                          component="p"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="linkedin_link"
                          className="text-sm font-medium text-gray-700 flex items-center gap-2"
                        >
                          <Linkedin className="w-4 h-4 text-blue-600" />
                          {t("profile.linkedinLink")}
                        </Label>
                        <Field
                          name="linkedin_link"
                          as={Input}
                          id="linkedin_link"
                          placeholder="https://linkedin.com/in/username"
                          className={`${
                            errors.linkedin_link && touched.linkedin_link
                              ? "border-red-500 focus:border-red-500"
                              : ""
                          }`}
                        />

                        <ErrorMessage
                          name="linkedin_link"
                          component="p"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="youtube_link"
                          className="text-sm font-medium text-gray-700 flex items-center gap-2"
                        >
                          <Youtube className="w-4 h-4 text-red-600" />
                          {t("profile.youtubeLink")}
                        </Label>
                        <Field
                          name="youtube_link"
                          as={Input}
                          id="youtube_link"
                          placeholder="https://youtube.com/c/channelname"
                          className={`${
                            errors.youtube_link && touched.youtube_link
                              ? "border-red-500 focus:border-red-500"
                              : ""
                          }`}
                        />

                        <ErrorMessage
                          name="youtube_link"
                          component="p"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="facebook_link"
                          className="text-sm font-medium text-gray-700 flex items-center gap-2"
                        >
                          <Facebook className="w-4 h-4 text-blue-700" />
                          {t("profile.facebookLink")}
                        </Label>
                        <Field
                          name="facebook_link"
                          as={Input}
                          id="facebook_link"
                          placeholder="https://facebook.com/username"
                          className={`${
                            errors.facebook_link && touched.facebook_link
                              ? "border-red-500 focus:border-red-500"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          name="facebook_link"
                          component="p"
                          className="text-red-500 text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end pt-6 border-t border-gray-200">
                    <Button
                      type="submit"
                      disabled={isPending}
                      className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50"
                    >
                      {isPending
                        ? t("common.saving")
                        : t("profile.saveChanges")}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
