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
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

export function useAddCategory() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: addCategory,
    onSuccess: (newCategory) => {
      // Update the cache with the new category
      queryClient.setQueryData<Category[]>(["categories"], (oldData) => {
        return oldData ? [...oldData, newCategory] : [newCategory];
      });
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
    onSuccess: (updatedCategory, { id, name }) => {
      // Optimistically update the cache
      queryClient.setQueryData<Category[]>(["categories"], (oldData) => {
        return oldData?.map((cat) =>
          cat.id === id ? { ...cat, name } : cat
        ) || [];
      });
    },
    onError: (error, { id }) => {
      console.error("Failed to update category:", error);
      // Optionally revert optimistic update
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: (_, deletedId) => {
      // Remove from cache
      queryClient.setQueryData<Category[]>(["categories"], (oldData) => {
        return oldData?.filter((cat) => cat.id !== deletedId) || [];
      });
    },
    onError: (error, deletedId) => {
      console.error("Failed to delete category:", error);
      // Revert optimistic update
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}