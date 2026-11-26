"use client";

import {
  connectNotificationStream,
  getNotification,
} from "@/api/notification/api";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, ChevronDown, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import NotificationDropDown from "../NotificationDropdown";

export default function AdminHeader() {
  const [unreadCount, setUnreadCount] = useState(0);
  useEffect(() => {
    let isMouted = true;

    async function fetchNotification() {
      try {
        const result = await getNotification();

        if (isMouted) {
          setUnreadCount(result.data.unreadCount);
        }
      } catch {
        toast.error("Failed to fetch notification");
      }
    }
    fetchNotification();
    return () => {
      isMouted = false;
    };
  }, []);

  useEffect(() => {
    const eventSource = connectNotificationStream(() => {
      setUnreadCount((previousCount) => previousCount + 1);
    });

    return () => {
      eventSource.close();
    };
  }, []);
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b bg-white px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-lg font-bold text-gray-900">Admin DashBoard</h1>
          <p className="text-xs text-gray-500">
            Manage your food delivery business
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-lg border bg-gray-50 px-3 py-2 md:flex">
          <Search size={17} className="text-gray-400" />
          <input
            type="search"
            placeholder="Search"
            className="w-40 bg-transparent text-sm outline-none"
          />
        </div>

        <Button className="relative">
          <NotificationDropDown />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button
                type="button"
                className="flex items-center gap-2 rounded-lg hover:bg-gray-100"
              />
            }
          >
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-orange-100 font-semibold text-orange-500">
                AD
              </AvatarFallback>
            </Avatar>
            <div className="hidden text-left sm:block">
              <p className="text-sm font-semibold">Admin</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
            <ChevronDown size={16} className="hidden sm:block" />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem className="text-red-500">
                Logout
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
