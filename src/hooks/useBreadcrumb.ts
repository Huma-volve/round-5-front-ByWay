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
    "/instructor/add-course": "common.addCourse"
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

    // Build path progressively
    let buildPath = "";
    pathSegments.forEach((segment, index) => {
      buildPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;

      // Get translation key from mapping or use segment as fallback
      const translationKey = pathMapping[buildPath];
      const label = translationKey
        ? t(translationKey)
        : segment.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase());

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
