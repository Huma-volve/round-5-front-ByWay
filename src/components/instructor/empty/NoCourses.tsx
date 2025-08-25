import { Button } from '@/components/ui/button'
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom'

export default function NoCourses() {
    const {t} = useTranslation()
  return (
    <> <div className="w-full flex flex-col items-center justify-center py-12 space-y-4 border border-dashed border-gray-300 rounded-lg">
      <p className="text-gray-500 text-xl font-semibold">{t("instructor.noCoursesYet")}</p>
      <Link to="/instructor/add-course">
        <Button className="bg-success text-white px-6 py-3 rounded text-md font-semibold md:text-xl hover:bg-green-600">
          {t("instructor.AddCourse")}
        </Button>
      </Link>
    </div>
    </>
  )
}
