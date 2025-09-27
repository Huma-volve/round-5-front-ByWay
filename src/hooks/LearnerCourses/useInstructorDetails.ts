import { fetchInstructorDetails } from "@/api/learner-courses-api";
import type { instructorDetails } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
export default function useInstructorDetails(instructorId: string) {
  const {
    data: instructor,
    error,
    isLoading,
    isError
  } = useQuery<instructorDetails>({
    queryKey: ["instructorDetails", instructorId],
    queryFn: () =>
      fetchInstructorDetails(
        instructorId
      ) as unknown as Promise<instructorDetails>,
  });

  return {
    instructor,
    error,
    isLoading,
    isError
  };
}
