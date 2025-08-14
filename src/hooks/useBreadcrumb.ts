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
    "/courses/course-details": "common.coursedetailes",
    "/learner-myCourses": "common.learnermycourse",
    "/learner-myCourses/course-details": "common.coursedetailes"
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

    // Process segments to replace IDs with friendly labels
    const processedSegments = pathSegments.map((segment, index) => {
      const previousSegments = pathSegments.slice(0, index);

      // Detect course ID in `/courses/{id}`
      if (
        previousSegments.includes("courses") &&
        segment.match(/^[a-zA-Z0-9-_]+$/)
      ) {
        return "course-details";
      }

      // Detect learner course ID in `/learner-myCourses/{id}`
      if (
        previousSegments.includes("learner-myCourses") &&
        segment.match(/^[a-zA-Z0-9-_]+$/)
      ) {
        return "course-details";
      }

      // Detect lesson ID in `/lessons/edit/{id}`
      if (
        previousSegments.includes("lessons") &&
        previousSegments.includes("edit") &&
        segment.match(/^[a-zA-Z0-9-_]+$/)
      ) {
        return "lesson-details";
      }

      return segment;
    });

    // Build path progressively
    let buildPath = "";
    processedSegments.forEach((processedSegment, index) => {
      const originalSegment = pathSegments[index];
      buildPath += `/${originalSegment}`;
      const isLast = index === processedSegments.length - 1;

      let translationKey = pathMapping[buildPath];
      let fallbackLabel = processedSegment;

      if (processedSegment === "course-details") {
        translationKey = "common.coursedetailes";
        fallbackLabel = "Course Details";
      }

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

      const label = translationKey
        ? t(translationKey)
        : fallbackLabel.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase());

      breadcrumbs.push({
        label,
        path: buildPath,
        isActive: isLast,
      });
    });

    return breadcrumbs;
  };

  return {
    createBreadcrumb,
    getAutoBreadcrumb,
    currentPath: location.pathname,
  };
};
