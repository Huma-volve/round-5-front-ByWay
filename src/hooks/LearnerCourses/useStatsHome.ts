import { fetchStatsHome } from "@/api/learner-courses-api";
import type { StatsHome } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export default function useStatsHome() {
  const { data, error, isError, isLoading } = useQuery<StatsHome>({
    queryKey: ["statsHome"],
    queryFn: fetchStatsHome,
  });

  return { data, error, isError, isLoading };
}
