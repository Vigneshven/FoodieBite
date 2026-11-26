import { MarkNotificationReadResponse, Notification, NotificationResponse } from "./types/type";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getNotification(): Promise<NotificationResponse> {
  const response = await fetch(`${BASE_URL}/api/notifications`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch notifications");
  }

  return await response.json();
}

export function connectNotificationStream(
  onNotification: (notification: Notification) => void,
) {
  const eventSource = new EventSource(`${BASE_URL}/api/notifications/stream`, {
    withCredentials: true,
  });

  eventSource.addEventListener("notifications", (event) => {
    const messageEvent = event as MessageEvent<string>;
    const notification: Notification = JSON.parse(messageEvent.data);

    onNotification(notification);

    eventSource.onerror = (error) => {
      console.log(error);
    };
  });

  return eventSource;
}

export async function markNotificationAsRead(
  notificationId: number,
): Promise<MarkNotificationReadResponse> {
  const response = await fetch(
    `${BASE_URL}/api/notifications/${notificationId}/read`,
    {
      method: "PATCH",
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to mark notification as read");
  }

  return await response.json();
}
