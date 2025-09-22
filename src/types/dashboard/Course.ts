export type Course = {
  title: string;
  instructor_name: string;
  category_name: string;
  status: "published" | "draft" | "pending";
  created_at: string;
  id: number;
};
