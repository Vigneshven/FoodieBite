"use client";

import {
  connectNotificationStream,
  getNotification,
  markNotificationAsRead,
} from "@/api/notification/api";
import { Notification } from "@/api/notification/types/type";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export default function NotificationDropDown() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const fetchNotifications = useCallback(async () => {
    try {
      const result = await getNotification();

      setNotifications(result.data.notifications);
      setUnreadCount(result.data.unreadCount);
    } catch {
      toast.error("Failed to fetch notifications");
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  useEffect(() => {
    const eventSource = connectNotificationStream((notification) => {
      setNotifications((previous) => {
        if (previous.some((item) => item.id === notification.id)) {
          return previous;
        }

        return [notification, ...previous].slice(0, 50);
      });

      if (!notification.isRead) {
        setUnreadCount((previous) => previous + 1);
      }
    });

    return () => {
      eventSource.close();
    };
  }, []);

  async function handleNotificationClick(notification: Notification) {
    if (notification.isRead) {
      return;
    }

    try {
      const result = await markNotificationAsRead(notification.id);

      setNotifications((previous) =>
        previous.map((item) =>
          item.id === notification.id ? { ...item, isRead: true } : item,
        ),
      );

      setUnreadCount(result.data.unreadCount);
    } catch {
      toast.error("Failed to mark notification as read");
    }
  }

  function handleSeeAll() {
    setDropdownOpen(false);
    setDialogOpen(true);
  }

  function formatDate(date: string) {
    return new Date(date).toISOString();
  }

  const latestNotifications = notifications.slice(0, 5);

  return (
    <>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger
          render={
            <button
              type="button"
              className="relative inline-flex h-9 w-9 items-center justify-center rounded-md border bg-background hover:bg-accent"
            >
              <Bell size={18} />

              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-xs text-white">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </button>
          }
        />
        <DropdownMenuContent align="end" className="w-80">
          <DropdownMenuLabel className="flex items-center justify-between">
            Notifications
            <span className="text-xs font-normal text-muted-foreground">
              {unreadCount} unread
            </span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          {latestNotifications.length === 0 ? (
            <div className="px-3 py-6 text-center text-sm text-muted-foreground">
              No notifications yet
            </div>
          ) : (
            latestNotifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                onClick={() => handleNotificationClick(notification)}
                className={`flex cursor-pointer flex-col items-start gap-1  py-3 ${
                  !notification.isRead ? "bg-orange-50" : ""
                }`}
              >
                <div className="flex w-full items-center justify-between gap-2">
                  <span className="font-medium">{notification.title}</span>

                  {!notification.isRead && (
                    <span className="h-2 w-2 shrink-0 rounded-full bg-orange-500" />
                  )}
                </div>
                <span className="text-sm text-muted-foreground">
                  {notification.message}
                </span>

                <span className="text-xs text-muted-foreground">
                  {formatDate(notification.createdAt)}
                </span>
              </DropdownMenuItem>
            ))
          )}
          {notifications.length > 5 && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleSeeAll}
                className="cursor-pointer justify-center font-medium text-orange-600"
              >
                See all notifications
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>All Notifications</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            {notifications.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted-foreground">
                No notifications yet
              </p>
            ) : (
              notifications.map((notification) => (
                <button
                  type="button"
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`w-full rounded-lg border p-3 text-left transition-colors hover:bg-muted ${
                    !notification.isRead ? "bg-orange-50" : ""
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium">{notification.title}</span>

                    {!notification.isRead && (
                      <span className="h-2 w-2 shrink-0 rounded-full bg-orange-500" />
                    )}
                  </div>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {notification.message}
                  </p>

                  <p className="mt-2 text-xs text-muted-foreground">
                    {formatDate(notification.createdAt)}
                  </p>
                </button>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
