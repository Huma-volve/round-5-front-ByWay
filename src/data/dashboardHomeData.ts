export interface DashboardHeadingData {
  amount: number;
  labelKey: string;
}

export interface DashboardTopRatedCourses {
  id: number;
  title: string;
  instructor: string;
  rating: number;
  students: number;
}

const DASHBOARD_HEADING_DATA: DashboardHeadingData[] = [
  {
    amount: 4200,
    labelKey: "Active Learners",
  },
  {
    amount: 150,
    labelKey: "Active Instructors",
  },
  {
    amount: 30,
    labelKey: "Published Courses",
  },
  {
    amount: 1200,
    labelKey: "Total Revenue",
  },
];

export const TOP_RATED_COURSES: DashboardTopRatedCourses[] = [
  {
    id: 1,
    title: "UI/UX Design",
    instructor: "Medhat Morad",
    rating: 4.5,
    students: 100,
  },
  {
    id: 2,
    title: "JavaScript Basics",
    instructor: "John Doe",
    rating: 4.7,
    students: 150,
  },
  {
    id: 3,
    title: "React for Beginners",
    instructor: "Jane Smith",
    rating: 4.8,
    students: 200,
  },
];

export default DASHBOARD_HEADING_DATA;
