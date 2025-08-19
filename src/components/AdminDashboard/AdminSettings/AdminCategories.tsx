import { useEffect, useState } from "react";
import { X, Plus, Loader2, AlertCircle } from "lucide-react";

import {
  useCategories,
  useAddCategory,
  useUpdateCategory,
  useDeleteCategory,
} from "./categories-hooks";

interface Category {
  id: number;
  name: string;
}

function AdminCategories() {
  // API calls with better error handling
  const { data: storedCategories, isLoading, error, refetch } = useCategories();
  const { mutate: addCategory, isPending: isAdding } = useAddCategory();
  const { mutate: updateCategory, isPending: isUpdating } = useUpdateCategory();
  const { mutate: deleteCategory, isPending: isDeleting } = useDeleteCategory();

  // Local state management
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [tempName, setTempName] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");

  // Sync local state with fetched data
  useEffect(() => {
    if (storedCategories) {
      setCategories(storedCategories);
    }
  }, [storedCategories]);

  const startEditing = (cat: Category) => {
    setEditingId(cat.id);
    setTempName(cat.name);
  };

  const saveEdit = async (id: number) => {
    if (!tempName.trim()) {
      cancelEdit();
      return;
    }

    try {
      await updateCategory(
        { id, name: tempName.trim() },
        {
          onSuccess: () => {
            // Optimistically update local state
            setCategories(prev => 
              prev.map(cat => 
                cat.id === id ? { ...cat, name: tempName.trim() } : cat
              )
            );
            setEditingId(null);
            setTempName("");
          },
          onError: (error) => {
            console.error("Failed to update category:", error);
            // Could add toast notification here
          }
        }
      );
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setTempName("");
  };

  const handleAddCategory = async () => {
    const name = newCategoryName.trim();
    if (!name) return;

    try {
      await addCategory(name, {
        onSuccess: (newCategory) => {
          // Optimistically add to local state
          setCategories(prev => [...prev, newCategory]);
          setNewCategoryName("");
        },
        onError: (error) => {
          console.error("Failed to add category:", error);
        }
      });
    } catch (error) {
      console.error("Add failed:", error);
    }
  };

  const handleDeleteCategory = async (id: number, name: string) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }

    try {
      await deleteCategory(id, {
        onSuccess: () => {
          // Optimistically remove from local state
          setCategories(prev => prev.filter(cat => cat.id !== id));
        },
        onError: (error) => {
          console.error("Failed to delete category:", error);
        }
      });
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
        <span className="ml-2 text-gray-600">Loading categories...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center">
          <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
          <h3 className="text-sm font-medium text-red-800">
            Failed to load categories
          </h3>
        </div>
        <p className="mt-2 text-sm text-red-700">
          {error instanceof Error ? error.message : "Something went wrong"}
        </p>
        <button
          onClick={() => refetch()}
          className="mt-3 text-sm bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Categories</h2>
        <p className="text-xs text-gray-500">Click to edit, hover to delete</p>
      </div>

      {/* Add Category Input */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !isAdding) {
              handleAddCategory();
            }
          }}
          placeholder="Enter category name..."
          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={isAdding}
        />
        <button
          onClick={handleAddCategory}
          disabled={!newCategoryName.trim() || isAdding}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
        >
          {isAdding ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
          Add
        </button>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mb-4">
        {categories.map((cat: Category) => (
          <div key={cat.id} className="group relative">
            <div
              className={`
                relative flex items-center
                rounded-lg border transition-all duration-150
                ${
                  editingId === cat.id
                    ? "border-blue-400 bg-blue-50 shadow-md"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                }
                ${isDeleting ? "opacity-50" : ""}
              `}
            >
              <div className="flex-1 px-2 py-1.5">
                {editingId === cat.id ? (
                  <input
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    onBlur={() => !isUpdating && saveEdit(cat.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !isUpdating) {
                        saveEdit(cat.id);
                      }
                      if (e.key === "Escape") {
                        cancelEdit();
                      }
                    }}
                    autoFocus
                    disabled={isUpdating}
                    className="w-full bg-transparent outline-none text-gray-900 text-xs font-medium disabled:opacity-50"
                    placeholder="Category name..."
                  />
                ) : (
                  <span
                    onClick={() => !isUpdating && !isDeleting && startEditing(cat)}
                    className="block w-full cursor-text text-xs font-medium text-gray-900 hover:text-blue-600 transition-colors"
                  >
                    {cat.name}
                  </span>
                )}
              </div>

              {/* Loading indicator for updates */}
              {isUpdating && editingId === cat.id && (
                <div className="absolute right-1">
                  <Loader2 className="w-3 h-3 animate-spin text-blue-500" />
                </div>
              )}

              {/* Delete button */}
              <button
                onClick={() => handleDeleteCategory(cat.id, cat.name)}
                disabled={isDeleting || isUpdating}
                className="
                  absolute -top-1 -right-1 
                  w-4 h-4 rounded-full 
                  bg-red-500 text-white 
                  opacity-0 group-hover:opacity-100
                  hover:bg-red-600
                  transition-all duration-150
                  flex items-center justify-center
                  shadow-sm
                  disabled:opacity-50 disabled:cursor-not-allowed
                "
                aria-label={`Delete ${cat.name} category`}
              >
                <X className="w-2 h-2" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="w-1/4 bg-gray-50 rounded-md p-2">
        <div className="flex items-center justify-between text-xs text-gray-600">
          <span>Total</span>
          <span className="font-medium text-gray-900">{categories.length}</span>
        </div>
      </div>

      {/* Empty state */}
      {categories.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p className="text-sm">No categories yet. Add your first one above!</p>
        </div>
      )}
    </div>
  );
}

export default AdminCategories;