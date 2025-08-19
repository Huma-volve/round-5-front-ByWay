import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Eye} from "lucide-react"
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
type Course = {
  title: string
  instructor: string
  category: string
    status: "Published" | "Draft" | "Pending"
  createdAt: string
  id: number
}

interface TableProps {
  courses: Course[]
   deleteCourse: (id: number) => void
}

export default function TableComponent({ courses ,deleteCourse }: TableProps) {
 const { t } = useTranslation();
 
  return (
    <div className="rounded-2xl shadow-md bg-background p-4 ">
      <Table>
        <TableCaption>{t('instructor.courseManagement.recentCourses')}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>{t('instructor.courseManagement.courseTittle')}</TableHead>
            <TableHead>{t('common.instructor')}</TableHead>
            <TableHead>{t('instructor.courseManagement.category')}</TableHead>
            <TableHead>{t('instructor.courseManagement.selectStatus')}</TableHead>
            <TableHead>{t('instructor.courseManagement.createdDate')}</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course, i) => (
            <TableRow key={i}>
              <TableCell>{course.title}</TableCell>
              <TableCell>{course.instructor}</TableCell>
              <TableCell>{course.category}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-lg text-sm ${
                    course.status === "Published"
                      ? "bg-green-100 text-success"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {course.status}
                </span>
              </TableCell>
              <TableCell>{course.createdAt}</TableCell>
              <TableCell className="flex gap-2 justify-end">
                         
             <DropdownMenu>
                 <DropdownMenuTrigger> 
                     <div className="flex gap-2 items-center">
                        <Eye className="h-5 w-5 text-rate" />
                          <p>view</p>
                        </div> </DropdownMenuTrigger>
                                    <DropdownMenuContent>
    <DropdownMenuLabel>
        <Link to={`/instructor/course-details/${course.id}`} className="p-0 h-auto text-revenue2Graph">
                  
                    {t('instructor.courseManagement.viewCourse')}
                </Link ></DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem><Link to='/admin/EditCourse'  className="p-0 h-auto text-yellow-600">
                    {t('instructor.courseManagement.EditCourse')}
                </Link ></DropdownMenuItem>
    <DropdownMenuItem> <button onClick={() => deleteCourse(course.id)} className="p-0 h-auto text-danger">
                   
                    {t('instructor.courseManagement.deleteCourse')}</button ></DropdownMenuItem>

  </DropdownMenuContent>
</DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
