import bellBack from "../../assets/images/notify-bell.jpg";
import { useTranslation } from "react-i18next";
import Breadcrumb from "../../components/common/Breadcrumb";
import { useBreadcrumb } from "../../hooks/useBreadcrumb";
import NotifyCard from "../../components/notification/NotifyCard";
import { NOTIFICATION_DETAILES , type NotifyItem } from "../../data/NotificationDetailes";

export default function NotificationPage() {
  const { t } = useTranslation();
  const { getAutoBreadcrumb } = useBreadcrumb();
  return (
    <div className="bg-background w-full">
      <div className="m-4 mt-8 ">
        <Breadcrumb items={getAutoBreadcrumb()} className="mb-6 mt-5" />
      </div>
      { NOTIFICATION_DETAILES.length === 0 ?
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
        :
        <div className="m-auto flex flex-col gap-3 justify-center items-center mt-12">
          {
          NOTIFICATION_DETAILES.slice().reverse().map((notify : NotifyItem , index:number) => 
          <NotifyCard key={notify.id} title={notify.title} time={notify.time} latest={index === 0 ? true : false}/>
        ) 
          }
        </div>
      }
    </div>
  );
}
