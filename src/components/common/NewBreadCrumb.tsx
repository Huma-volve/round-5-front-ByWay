import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb";
import { useState } from "react";
import type { breadCrumbProps } from "@/lib/types";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function NewBreadCrumb({ items }: breadCrumbProps) {
    const { t } = useTranslation();
  const [showAll, setShowAll] = useState(false);
  const maxItems = 4;
  const shouldCollapse = items.length > maxItems && !showAll;

  const renderBreadcrumbItem = (
    item: { label: string; link?: string },
    index: number,
    isLast: boolean
  ) => (
    <div key={item.label + index} className="flex items-center gap-3">
      <BreadcrumbItem>
        {item.link ? (
          <BreadcrumbLink className="cursor-pointer" asChild>
            <Link to={item.link}>{t(item.label)}</Link>
          </BreadcrumbLink>
        ) : (
          <BreadcrumbPage className={`text-blue-500`}>
            {t(item.label)}
          </BreadcrumbPage>
        )}
      </BreadcrumbItem>
      {!isLast && <BreadcrumbSeparator />}
    </div>
  );

  const renderBreadcrumbs = () => {
    if (!shouldCollapse) {
      return items.map((item, index) =>
        renderBreadcrumbItem(item, index, index === items.length - 1)
      );
    }

    // Show first 2, ellipsis, then last 2 items
    const firstItems = items.slice(0, 2);
    const lastItems = items.slice(-2);

    return (
      <>
        {firstItems.map((item, index) =>
          renderBreadcrumbItem(item, index, false)
        )}
        <BreadcrumbItem>
          <BreadcrumbEllipsis
            onClick={() => setShowAll(true)}
            className="cursor-pointer"
          />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {lastItems.map((item, index) =>
          renderBreadcrumbItem(
            item,
            items.length - 2 + index,
            index === lastItems.length - 1
          )
        )}
      </>
    );
  };

  return (
    <Breadcrumb className="mb-6 mt-5">
      <BreadcrumbList>{renderBreadcrumbs()}</BreadcrumbList>
    </Breadcrumb>
  );
}
