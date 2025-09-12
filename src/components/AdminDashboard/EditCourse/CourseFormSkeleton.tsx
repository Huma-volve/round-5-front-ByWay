import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"

export default function CourseFormSkeleton() {
  return (
    <div className="container space-y-4 min-h-screen">
      <div className="space-y-2">
        <Skeleton className="h-7 w-72 rounded-md" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>

      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-5 w-48" />
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-3 w-32" />
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-2 justify-end py-3">
        <Button disabled className="bg-rate text-white">
          <Save className="h-4 w-4 mr-2" />
          <Skeleton className="h-4 w-24" />
        </Button>
      </div>
    </div>
  )
}
