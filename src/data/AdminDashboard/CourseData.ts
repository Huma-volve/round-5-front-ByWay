export  interface CourseData {
  id: number;
  title: string;
  description: string;
  video_url: string;
  status: "published" | "draft" | "pending";
  price: number;
  instructor_name: string;
  category_name: string;
  created_at: string;
}
