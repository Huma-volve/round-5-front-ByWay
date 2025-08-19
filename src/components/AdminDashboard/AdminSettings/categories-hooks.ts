import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCategories, addCategory, updateCategory, deleteCategory } from "@/api/settings-api";

interface Category {
  id: number;
  name: string;
}

export function useCategories() {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 30 * 60 * 1000, // 30 minutes - data stays fresh for 30 min
    refetchOnMount: false, // Don't refetch when component mounts if data exists
    refetchOnWindowFocus: false, // Don't refetch when window gains focus
    refetchOnReconnect: false, // Don't refetch when reconnecting to internet
    retry: 1, // Only retry once if request fails
    retryDelay: (attemptIndex) => Math.min(1000 * 10 ** attemptIndex, 30000),
  });
}

export function useAddCategory() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: addCategory,
    onSuccess: () => {
      // Invalidate and refetch categories to get fresh data from server
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      console.error("Failed to add category:", error);
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, name }: { id: number; name: string }) =>
      updateCategory(id, name),
    onSuccess: () => {
      // Invalidate and refetch to get fresh data from server
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      console.error("Failed to update category:", error);
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      // Invalidate and refetch to get fresh data from server
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      console.error("Failed to delete category:", error);
    },
  });
}