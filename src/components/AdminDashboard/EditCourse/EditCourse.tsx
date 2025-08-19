
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {  Save } from "lucide-react"
import { useTranslation } from "react-i18next"

export default function EditCourse() {

const { t } = useTranslation();
  return (

    <div className="container space-y-4 min-h-screen">

   <div className="space-y-2">
     <h1 className="text-2xl font-bold">{t('instructor.courseManagement.basicInformation')}</h1>
    <p className="text-sm text-gray-500">{t('instructor.courseManagement.updateManageCourse')}</p>

   </div>

  <Card className="rounded-2xl shadow-sm">
    <CardHeader>
      <CardTitle>{t('instructor.courseManagement.courseTittle')}</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div>
        <Label>{t('instructor.courseManagement.courseTittle')}</Label>
        <Input placeholder={t('instructor.courseManagement.placeholders.courseTittle')} />
      </div>
      <div>
        <Label>{t('common.instructor')}</Label>
        <Input placeholder={t('instructor.courseManagement.placeholders.instructor')} />
      </div>
      <div>
        <Label>{t('instructor.courseManagement.category')}</Label>
        <Input placeholder={t('instructor.courseManagement.placeholders.category')} />
      </div>
      <div>
        <Label>{t('instructor.courseManagement.selectStatus')}</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder={t('instructor.courseManagement.placeholders.status')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="published">{t('instructor.courseManagement.published')}</SelectItem>
            <SelectItem value="draft">{t('instructor.courseManagement.draft')}</SelectItem>
            <SelectItem value="pending">{t('instructor.courseManagement.pending')}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>{t('instructor.courseManagement.createdDate')}</Label>
        <Input type="date" value="2024-07-10" />
      </div>
    </CardContent>
  </Card>

  <div className="flex gap-2 justify-end py-3">
    <Button className="bg-rate text-white">
      <Save className="h-4 w-4 mr-2" /> {t('instructor.courseManagement.saveChanges')}
    </Button>
  </div>
</div>

  )
}
