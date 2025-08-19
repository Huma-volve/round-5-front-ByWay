/**
 * Query keys for React Query
 *
 * Centralized query keys to maintain consistency and avoid typos
 * across the application.
 */

export const QUERY_KEYS = {
  // Admin Dashboard
  TOP_RATED_COURSES: ["topRatedCourses"] as const,
  DASHBOARD_STATS: ["dashboardStats"] as const,

  // Courses
  COURSES: ["courses"] as const,
  COURSE_DETAILS: (id: string | number) => ["courses", id] as const,

  // Users
  USERS: ["users"] as const,
  USER_PROFILE: (id: string | number) => ["users", id] as const,

  // Auth
  USER_AUTH: ["userAuth"] as const,
} as const;

export default QUERY_KEYS;
