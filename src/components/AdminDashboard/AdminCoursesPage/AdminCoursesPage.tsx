import { useTranslation } from "react-i18next"

import { useState } from "react"
import TableComponent from "@/components/admin/TableComponent/TableComponent"


export default function AdminCoursesPage() {

  const courses = [
 {
    title: "UI/UX Design Basics",
    instructor: "Noor Ali",
    category: "Design",
    status: "Draft" as const,
    createdAt: "10 Jul 2024",
    id: 1,
  },
  {
    title: "Front End Development",
    instructor: "Salsabeel Ibrahim",
    category: "Development",
    status: "Published" as const,
    createdAt: "18 Jul 2024",
    id: 2,
  },
  {
    title: "Data Analysis with Python",
    instructor: "Ahmed Youssef",
    category: "Data Science",
    status: "Pending" as const,
    createdAt: "22 Jul 2024",
    id: 3,
  },
  {
    title: "Digital Marketing Fundamentals",
    instructor: "Mona Hassan",
    category: "Marketing",
    status: "Published" as const,
    createdAt: "05 Aug 2024",
    id: 4,
  },
  {
    title: "Machine Learning Essentials",
    instructor: "Omar Khaled",
    category: "AI",
    status: "Draft" as const,
    createdAt: "12 Aug 2024",
    id: 5,},
  
  ]
  type courses = {
  title: string
  instructor: string
  category: string
  status: "Draft" | "Published" | "Pending"
  createdAt: string
  id: number,

}
const [items , setItems] = useState(courses)

 function deleteCourse(id: number) {
setItems(items.filter((course) => course.id !== id))
}

 const { t } = useTranslation();
 
  return (
    <div className="p-6 container space-y-4">
     <div className="space-y-2">
       <h2 className="text-xl font-semibold"> {t('instructor.courseManagement.title')}</h2>
      <p className="text-sm text-gray-500 mb-4">
        {t('instructor.courseManagement.coursesManagementDescription')}
       
      </p>
     </div>
      <TableComponent courses={items}  deleteCourse={deleteCourse}  />
    </div>
  )
}
