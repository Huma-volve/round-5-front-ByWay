import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { CourseAction } from "@/data/courseActionsData";

interface CourseActionCardProps {
  action: CourseAction;
}

export default function CourseActionCard({ action }: CourseActionCardProps) {
  const IconComponent = action.icon;

  return (
    <Card
      className={`cursor-pointer hover:shadow-lg transition-shadow ${
        action.primary ? "ring-2 ring-primary ring-opacity-50" : ""
      } ${action.destructive ? "border-red-200 hover:border-red-300" : ""} ${
        action.edit ? "border-green-200 hover:border-green-300" : ""
      }`}
      onClick={action.action}
    >
      <CardHeader>
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-lg ${
              action.primary
                ? "bg-primary text-white"
                : action.destructive
                ? "bg-red-100 text-red-600"
                : action.edit
                ? "bg-green-100 text-green-600"
                : "bg-secondary text-white"
            }`}
          >
            <IconComponent className="h-6 w-6" />
          </div>
          <CardTitle className="text-lg">{action.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{action.description}</p>
        <Button
          variant={
            action.primary
              ? "default"
              : action.destructive
              ? "destructive"
              : "outline"
          }
          className={`w-full bg-gray-100 ${
            action.primary
              ? " text-primary hover:bg-primary hover:text-white"
              : action.destructive
              ? "text-destructive hover:bg-destructive hover:text-destructive-foreground"
              : action.edit
              ? "text-green-600 hover:bg-green-600 hover:text-white"
              : "text-gray-600 hover:bg-secondary hover:text-white"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            action.action();
          }}
        >
          {action.title}
        </Button>
      </CardContent>
    </Card>
  );
}
