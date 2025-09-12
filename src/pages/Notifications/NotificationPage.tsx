// src/pages/NotificationPage.tsx
import bellBack from "../../assets/images/notify-bell.jpg";
import { useTranslation } from "react-i18next";
// import Breadcrumb from "../../components/common/Breadcrumb";
// import { useBreadcrumb } from "../../hooks/useBreadcrumb";
import NotifyCard from "../../components/notification/NotifyCard";
import { useMemo } from "react";
import NewBreadCrumb from "../../components/common/NewBreadCrumb";
import { useNotifications } from "@/hooks/useNotifications";
import type { NotificationItem } from "@/lib/types";

export default function NotificationPage() {
  const { t } = useTranslation();
  // const { getAutoBreadcrumb } = useBreadcrumb();
  const breadcrumbItems = useMemo(() => [
    { label: "common.home", link: "/" },
    { label: "common.notifications" },
  ], []);
  const { notifications, isLoading, markAsRead, deleteNotification } = useNotifications();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        <p className="text-lg">{t("adminUser.Loading")}</p>
      </div>
    );
  }

  return (
    <div className="bg-background w-full">
      <div className="m-4 mt-8 ">
        {/* <Breadcrumb items={getAutoBreadcrumb()} className="mb-6 mt-5" /> */}
        <NewBreadCrumb items={breadcrumbItems} />
      </div>

      {notifications.length === 0 ? (
        <div className="bg-red mt-[40px] w-full flex flex-col items-center">
          <img
            src={bellBack}
            alt="notifications icon"
            loading="lazy"
            className="w-[300px] mt-4 "
          />
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-lg md:text-xl font-semibold">
              {t("notifications.You are all up to date")}
            </h2>
            <h3 className="text-secondary text-xs md:text-lg">
              {t("notifications.No new notifications - come back soon")}
            </h3>
          </div>
        </div>
      ) : (
        <div className="m-auto flex flex-col gap-3 justify-center items-center mt-12">
          {notifications
            .map((notify: NotificationItem) => (
              <NotifyCard
                key={notify.id}
                title={notify.title}
                time={notify.created_at.slice(0, 10)}
                latest={!notify.is_read}
                id={notify.id}
                onMarkRead={() => markAsRead(notify.id)}
                onDelete={() => deleteNotification(notify.id)}
              />
            ))}
        </div>
      )}
    </div>
  );
}
