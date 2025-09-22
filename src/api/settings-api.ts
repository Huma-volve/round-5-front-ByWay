import axiosInstance from "@/lib/axios-instance";
import type { UserProfile } from "@/lib/types";

interface AddCategoryResponse extends Category {}
interface UpdateCategoryResponse extends Category {}


// API Response interface
interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

// Settings interface
interface Settings {
  commission: number;
  withdrawal: number;
}

interface Category {
  id: number;
  name: string;
}


// GET - Fetch settings
export async function getSettings(): Promise<Settings> {
  try {
    const { data } = await axiosInstance.get<ApiResponse<Settings>>("/settings");
    return data.data;
  } catch (error) {
    console.error("Error fetching settings:", error);
    throw new Error("Failed to fetch settings");
  }
}

// PUT/PATCH - Update settings
export async function updateSettings(settings: Partial<Settings>): Promise<Settings> {
  console.log(settings);
  try {
    const { data } = await axiosInstance.put<ApiResponse<Settings>>("/settings", settings);
    console.log(data.data);
    return data.data;
  } catch (error: any) {
    console.error("Error updating settings:", error);
    
    if (error.response?.status === 400) {
      throw new Error("Invalid settings data");
    }
    
    throw new Error("Failed to update settings");
  }
}


// GET - Fetch all categories
export async function getCategories(): Promise<Category[]> {
  try {
    const { data } = await axiosInstance.get("/categories");
    console.log(data.data);
    return data.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories");
  }
}

// POST - Add new category
export async function addCategory(name: string): Promise<AddCategoryResponse> {
  if (!name.trim()) {
    throw new Error("Category name is required");
  }

  try {
    const { data } = await axiosInstance.post<AddCategoryResponse>("/categories", { 
      name: name.trim() 
    });
    return data;
  } catch (error: any) {
    console.error("Error adding category:", error);
    
    if (error.response?.status === 409) {
      throw new Error("A category with this name already exists");
    }
    if (error.response?.status === 400) {
      throw new Error("Invalid category name");
    }
    
    throw new Error("Failed to add category");
  }
}

// PATCH - Update existing category
export async function updateCategory(id: number, name: string): Promise<UpdateCategoryResponse> {
  if (!name.trim()) {
    throw new Error("Category name is required");
  }

  try {
    const { data } = await axiosInstance.put(
      `/categories/${id}`, 
      { name: name.trim() }
    );
    return data.data;
  } catch (error: any) {
    console.error("Error updating category:", error);
    
    if (error.response?.status === 404) {
      throw new Error("Category not found");
    }
    if (error.response?.status === 409) {
      throw new Error("A category with this name already exists");
    }
    if (error.response?.status === 400) {
      throw new Error("Invalid category name");
    }
    
    throw new Error("Failed to update category");
  }
}

// DELETE - Remove category
export async function deleteCategory(id: number): Promise<{ success: boolean; id: number }> {
  if (!id || id <= 0) {
    throw new Error("Valid category ID is required");
  }

  try {
    await axiosInstance.delete(`/categories/${id}`);
    return { success: true, id };
  } catch (error: any) {
    console.error("Error deleting category:", error);
    
    if (error.response?.status === 404) {
      throw new Error("Category not found");
    }
    if (error.response?.status === 409) {
      throw new Error("Cannot delete category that is in use");
    }
    
    throw new Error("Failed to delete category");
  }
}

export async function userProfileData(): Promise<UserProfile> {
  try {
    const { data } = await axiosInstance.get<ApiResponse<UserProfile>>(
      `/profile`
    );
    return data.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw new Error("Failed to fetch user profile");
  }
}
