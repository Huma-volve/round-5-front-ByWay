import { fetchStatsHome } from "@/api/learner-courses-api";
import type { StatsHome } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { useLocalStorage } from "../useLocalStorage";

export default function useStatsHome() {
  const [token] = useLocalStorage("token", "");

  const { data, error, isError, isLoading } = useQuery<StatsHome>({
    queryKey: ["statsHome"],
    queryFn: fetchStatsHome,
    enabled: !!token,
  });

  return { data, error, isError, isLoading };
}
