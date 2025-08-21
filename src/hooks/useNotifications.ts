import { useEffect, useState } from "react";
import { 
  fetchNotificationInstructor, 
  fetchNotificationLearner, 
  markNotificationAsReadInstructor, 
  markNotificationAsReadLearner,
  deleteNotificationInstructor,
  deleteNotificationLearner
} from "@/api/notification-api";

import type { NotificationItem, InstructorNotificationResponse, LearnerNotificationResponse } from "@/lib/types";

export function useNotifications() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const role = localStorage.getItem("role");

  useEffect(() => {
    async function load() {
      setLoading(true);

      try {
        if (role === "instructor") {
          const data = await fetchNotificationInstructor();
          const formatted: NotificationItem[] = data.map((item: InstructorNotificationResponse) => ({
            id: item.id,
            title: item.data?.title ?? "Notification",
            message: item.data?.message ?? "",
            is_read: !!item.read_at,
            created_at: item.created_at,
          }));
          setNotifications(formatted);
        } else {
          const data = await fetchNotificationLearner();
          const formatted: NotificationItem[] = data.map((item: LearnerNotificationResponse) => ({
            id: item.id,
            title: item.title,
            message: item.message,
            is_read: item.is_read,
            created_at: item.created_at,
          }));
          setNotifications(formatted);
        }
      } catch (err) {
        console.error("Error fetching notifications:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  // -------- Mark as Read --------
  const markAsRead = async (id: string) => {
    try {
      if (role === "instructor") {
        await markNotificationAsReadInstructor(id);
      } else {
        await markNotificationAsReadLearner(id);
      }

      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
      );
    } catch (err) {
      console.error("Error marking as read:", err);
    }
  };

  // -------- Delete --------
  const deleteNotification = async (id: string) => {
    try {
      if (role === "instructor") {
        await deleteNotificationInstructor(id);
      } else {
        await deleteNotificationLearner(id);
      }

      // تحديث الـ state محلياً
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      console.error("Error deleting notification:", err);
    }
  };

  return { notifications, loading, markAsRead, deleteNotification };
}
