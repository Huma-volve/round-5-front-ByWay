import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import type { BreadcrumbItem } from "../components/common/Breadcrumb";

export const useBreadcrumb = () => {
  const { t } = useTranslation();
  const location = useLocation();

  // Path mapping configuration - add more as needed
  const pathMapping: Record<string, string> = {
    "/": "common.home",
    "/instructor": "common.instructor",
    "/instructor/reviews": "instructor.reviews",
    "/instructor/add-course": "common.addCourse",
    "/instructor/add-lessons": "instructor.lessons.addLessons",
    "/instructor/courses/select": "instructor.courseManagement.title",
    "/settings": "common.settings",
    "/settings/paymethod": "common.paymethod",
    "/settings/payhistory": "common.payhistory",
    "/favourites": "common.favourites",
    "/notifications": "common.notifications",
    "/profile": "profile.profile",
    "/edit-user-profile": "profile.editUserProfile",
    "/success":"success.success",
    "/shopping-cart": "cart.Shopping Cart",
    "/checkout": "cart.Checkout",
    "/close-account": "closeAccount.Close Account",

  };

  const createBreadcrumb = (
    items: Array<{
      labelKey?: string;
      label?: string;
      path?: string;
      isActive?: boolean;
    }>
  ): BreadcrumbItem[] => {
    return items.map((item) => ({
      label: item.labelKey ? t(item.labelKey) : item.label || "",
      path: item.path,
      isActive: item.isActive,
    }));
  };

  // Generate breadcrumbs automatically from current path
  const getAutoBreadcrumb = (customPath?: string): BreadcrumbItem[] => {
    const currentPath = customPath || location.pathname;
    const pathSegments = currentPath.split("/").filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [];

    // Always start with home
    breadcrumbs.push({
      label: t("common.home"),
      path: "/",
      isActive: currentPath === "/",
    });

    // Handle dynamic routes with IDs - replace with user-friendly names
    const processedSegments = pathSegments.map((segment, index) => {
      const previousSegments = pathSegments.slice(0, index);

      // Handle course ID segments
      if (
        previousSegments.includes("courses") &&
        segment.match(/^[a-zA-Z0-9-_]+$/) &&
        !["select", "manage", "lessons", "add", "edit"].includes(segment)
      ) {
        return "course-details"; // Replace course ID with generic name
      }

      // Handle lesson ID segments
      if (
        previousSegments.includes("lessons") &&
        previousSegments.includes("edit") &&
        segment.match(/^[a-zA-Z0-9-_]+$/)
      ) {
        return "lesson-details"; // Replace lesson ID with generic name
      }

      return segment;
    });

    // Build path progressively
    let buildPath = "";
    processedSegments.forEach((processedSegment, index) => {
      const originalSegment = pathSegments[index];
      buildPath += `/${originalSegment}`; // Keep original path for navigation
      const isLast = index === processedSegments.length - 1;

      // Skip course ID segments - don't create breadcrumb items for them

      // Special handling for dynamic course routes
      let translationKey = pathMapping[buildPath];
      let fallbackLabel = processedSegment;

      if (processedSegment === "course-details") {
        translationKey = "instructor.courseManagement.courseDetails";
        fallbackLabel = "Course Details";
      }
      // Handle course management routes
      if (buildPath.includes("/instructor/courses/") && !translationKey) {
        if (buildPath.endsWith("/manage")) {
          translationKey = "instructor.courseManagement.title";
          fallbackLabel = "Course Details";
        } else if (buildPath.endsWith("/lessons")) {
          translationKey = "instructor.lessons.title";
          fallbackLabel = "Lessons";
        } else if (buildPath.endsWith("/lessons/add")) {
          translationKey = "instructor.lessons.addLessons";
          fallbackLabel = "Add Lessons";
        } else if (buildPath.includes("/lessons/edit/")) {
          translationKey = "instructor.lessons.editLesson";
          fallbackLabel = "Edit Lesson";
        }
      }

      // Get final label
      const label = translationKey
        ? t(translationKey)
        : fallbackLabel
            .replace("-", " ")
            .replace(/\b\w/g, (l) => l.toUpperCase());

      breadcrumbs.push({
        label,
        path: buildPath,
        isActive: isLast,
      });
    });

    return breadcrumbs;
  };

  // Predefined breadcrumbs for common pages (still available for custom use)
  return {
    createBreadcrumb,
    getAutoBreadcrumb,
    currentPath: location.pathname,
  };
};
