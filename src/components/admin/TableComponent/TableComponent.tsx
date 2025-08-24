
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Link } from "react-router-dom"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTranslation } from "react-i18next"
import { MoreVertical } from "lucide-react"
type Course = {
  title: string
  instructor_name: string
  category_name: string
  status: "published" | "draft" | "pending"
  created_at: string
  id: number
}

interface TableProps {
  courses: Course[]
   deleteCourse: (id: number) => void
}

export default function TableComponent({ courses ,deleteCourse }: TableProps) {
 const { t } = useTranslation();
 
  return (
    <>


<div className="rounded-2xl shadow-md bg-secondary-background border border-border-card p-4">
  <Table>
    <TableCaption className="text-secondary-dark font-medium">
      {t('instructor.courseManagement.recentCourses')}
    </TableCaption>

    <TableHeader>
      <TableRow className="bg-secondary-background">
        <TableHead className="font-semibold">{t('instructor.courseManagement.courseTittle')}</TableHead>
        <TableHead className="font-semibold">{t('common.instructor')}</TableHead>
        <TableHead className="font-semibold">{t('instructor.courseManagement.category')}</TableHead>
        <TableHead className="font-semibold">{t('instructor.courseManagement.selectStatus')}</TableHead>
        <TableHead className="font-semibold">{t('instructor.courseManagement.createdDate')}</TableHead>
        <TableHead className="text-right font-semibold">{t("adminUser.Actions")}</TableHead>
      </TableRow>
    </TableHeader>

    <TableBody>
      {courses.map((course, i) => (
        <TableRow
          key={i}
          className={i % 2 === 0 ? "bg-background" : "bg-input"}
        >
          <TableCell className="py-2">{course.title}</TableCell>
          <TableCell className="py-2">{course.instructor_name}</TableCell>
          <TableCell className="py-2">
            <span className="px-2 py-1 rounded-md text-sm bg-category text-category-icon font-medium">
              {course.category_name}
            </span>
          </TableCell>
          <TableCell className="py-2">
            <span
              className={`px-2 py-1 rounded-lg text-sm font-medium ${
                course.status === "published"
                  ? "bg-revenue1-bg text-success"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {course.status}
            </span>
          </TableCell>
          <TableCell className="py-2">{course.created_at}</TableCell>
          <TableCell className="flex gap-2 justify-end">
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger>
                <button className="hover:bg-border p-1 rounded-full">
                  <MoreVertical className="w-5 h-5 text-secondary-dark" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  <Link
                    to={`course-details/${course.id}`}
                    className="p-0 h-auto text-revenue2-graph"
                  >
                    {t('instructor.courseManagement.viewCourse')}
                  </Link>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link
                    to={`edit/${course.id}`}
                    className="p-0 h-auto text-yellow-600"
                  >
                    {t('instructor.courseManagement.EditCourse')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button
                    onClick={() => deleteCourse(course.id)}
                    className="p-0 h-auto text-danger"
                  >
                    {t('instructor.courseManagement.deleteCourse')}
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</div>
</>
  )
}
