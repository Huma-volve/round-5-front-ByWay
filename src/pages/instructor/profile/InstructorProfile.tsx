import { Button } from "@/components/ui/button";
import WorkExperienceForm from "../../../components/instructor/WorkExperienceForm/WorkExperienceForm";
import MainForm from "../../../components/instructor/MainForm/MainForm";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { Formik, Form, FieldArray } from "formik";
import { getInstructorProfileSchema } from "@/schemas/InstructorProfileSchema";
import axiosInstance from "@/lib/axios-instance";

export default function InstructorProfile() {
  const { t } = useTranslation();
  const mutation = useMutation({
    mutationFn: async (values: unknown) => {
      const { data } = await axiosInstance.post(
        "/instructor/profile/store",
        values,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      return data;
    },

    onSuccess: (data) => {
      toast.success(data?.message);
    },
  });

  return (
    <Formik
      initialValues={{
        fname: "",
        lname: "",
        headline: "",
        about: "",
        skills: "",
        workExperience: [
          { jobTitle: "", companyName: "", startDate: "", endDate: "" },
        ],
      }}
      validationSchema={getInstructorProfileSchema}
      onSubmit={(values) => {
        mutation.mutate(values);
      }}
    >
      {({ values }) => (
        <Form className="container mx-auto py-4">
          <section className="space-y-5">
            <MainForm />

            <FieldArray
              name="workExperience"
              render={(arrayHelpers) => (
                <>
                  {values.workExperience.map((exp, index) => (
                    <WorkExperienceForm
                      key={index}
                      index={index}
                      title={`${t(
                        "instructor.workExperience.Work Experience"
                      )} ${index + 1}`}
                      onAdd={() =>
                        arrayHelpers.push({
                          jobTitle: "",
                          companyName: "",
                          startDate: "",
                          endDate: "",
                        })
                      }
                    />
                  ))}
                </>
              )}
            />
            <Button
              type="submit"
              className="btn space-y-4 bg-success hover:bg-green-600"
            >
              {t("save.Save")}
            </Button>
          </section>
        </Form>
      )}
    </Formik>
  );
}
