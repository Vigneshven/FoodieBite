import { prisma } from "@/backend/lib/prisma";

export async function findLastestNotificationId(recipientId: number) {
  const notification = await prisma.notifications.findFirst({
    where: {
      recipientId,
    },
    orderBy: {
      id: "desc",
    },
    select: {
      id: true,
    },
  });

  return notification?.id ?? 0;
}

export async function findNewNotifications(
  recipientId: number,
  lastSeenId: number,
) {
  return await prisma.notifications.findMany({
    where: {
      recipientId,
      id: {
        gt: lastSeenId,
      },
    },
    orderBy: {
      id: "asc",
    },
    take: 50,
  });
}

// fetch notification history
export async function findNotifications(recipientId: number) {
  return await prisma.notifications.findMany({
    where: {
      recipientId,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 50,
  });
}

// count unread notification
export async function countUnReadNotification(recipientId: number) {
  return await prisma.notifications.count({
    where: {
      recipientId,
      isRead: false,
    },
  });
}

// mark notif as read
export async function markNotificationAsRead(
  notificationId: number,
  recipientId: number,
) {
  return await prisma.notifications.updateMany({
    where: {
      id: notificationId,
      recipientId,
      isRead: false,
    },
    data: {
      isRead: true,
    },
  });
}
