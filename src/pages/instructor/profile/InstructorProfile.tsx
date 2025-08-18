import { Button } from "@/components/ui/button";
import WorkExperienceForm from "../../../components/instructor/WorkExperienceForm/WorkExperienceForm";
import MainForm from "../../../components/instructor/MainForm/MainForm";
// import axios from "axios";
// import { useMutation } from '@tanstack/react-query';
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function InstructorProfile() {
  const { t } = useTranslation();
  const [workForms, setWorkForms] = useState<number[]>([1]);
  function addExperience() {
    setWorkForms((prev) => [...prev, prev.length + 1]);
  }

  // const mutation = useMutation({
  //   mutationFn: async()=>{
  //     const options={
  //       url: "" ,
  //       method: ""
  //     }
  //     const {data} = await axios.request(options)
  //   }
  // })
  return (
    <>
      <main className="container mx-auto py-4">
        <section className="space-y-5">
          <MainForm />

          {workForms.map((id) => (
            <WorkExperienceForm
              key={id}
              title={`${t("workExperience.Work Experience")} ${id}`}
              onAdd={addExperience}
            />
          ))}

          <Button
            type="submit"
            className="btn space-y-4 bg-success hover:bg-green-600 "
          >
            {t("save.Save")}
          </Button>
        </section>
      </main>
    </>
  );
}
