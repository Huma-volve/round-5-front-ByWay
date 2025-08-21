import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchNotificationInstructor,
  fetchNotificationLearner,
  markNotificationAsReadInstructor,
  markNotificationAsReadLearner,
  deleteNotificationInstructor,
  deleteNotificationLearner,
} from "@/api/notification-api";

import type {
  NotificationItem,
  InstructorNotificationResponse,
  LearnerNotificationResponse,
} from "@/lib/types";
import type { AxiosError } from "axios";

export function useNotifications() {
  const role = localStorage.getItem("role");
  const queryClient = useQueryClient();

  // Fetch Notifications
  const {
    data: notifications = [],
    isLoading,
    isError,
    error,
  } = useQuery<NotificationItem[], AxiosError>({
    queryKey: ["notifications", role],
    queryFn: async () => {
      if (role === "instructor") {
        const data = await fetchNotificationInstructor();
        return data.map((item: InstructorNotificationResponse) => ({
          id: item.id,
          title: item.data?.title ?? "Notification",
          message: item.data?.message ?? "",
          is_read: !!item.read_at,
          created_at: item.created_at,
        }));
      } else {
        const data = await fetchNotificationLearner();
        return data.map((item: LearnerNotificationResponse) => ({
          id: item.id,
          title: item.title,
          message: item.message,
          is_read: item.is_read,
          created_at: item.created_at,
        }));
      }
    },
  });

  // Mark as Read
  const markAsReadMutation = useMutation({
    mutationFn: async (id: string) => {
      if (role === "instructor") {
        return markNotificationAsReadInstructor(id);
      } else {
        return markNotificationAsReadLearner(id);
      }
    },
    onSuccess: (_, id) => {
      queryClient.setQueryData<NotificationItem[]>(["notifications", role], (old) =>
        old ? old.map((n) => (n.id === id ? { ...n, is_read: true } : n)) : []
      );
    },
  });

  // Delete
  const deleteNotificationMutation = useMutation({
    mutationFn: async (id: string) => {
      if (role === "instructor") {
        return deleteNotificationInstructor(id);
      } else {
        return deleteNotificationLearner(id);
      }
    },
    onSuccess: (_, id) => {
      queryClient.setQueryData<NotificationItem[]>(["notifications", role], (old) =>
        old ? old.filter((n) => n.id !== id) : []
      );
    },
  });

  return {
    notifications,
    isLoading,
    isError,
    error,
    markAsRead: markAsReadMutation.mutate,
    deleteNotification: deleteNotificationMutation.mutate,
  };
}
