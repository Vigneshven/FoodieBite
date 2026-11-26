export type Notification = {
  id: number;
  recipientId: number;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
};

export type NotificationResponse = {
  message: string;
  data: {
    notifications: Notification[];
    unreadCount: number;
  };
};

export type MarkNotificationReadResponse = {
  message: string;
  data: {
    unreadCount: number;
  };
};
