// Admin Dashboard stats

import { cookies } from "next/headers";
import {
  DashBoardStats,
} from "../../type/admin/types-api";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getDashboardStats(): Promise<DashBoardStats> {
  const cookieStore = await cookies();

  const cookieHeader = cookieStore.toString();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Cookie: cookieHeader,
  };
  const res = await fetch(`${BASE_URL}/api/admin/dashboard/stats`, {
    method: "GET",
    headers,
    credentials: "include",
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch admin dashboard stats`);
  }

  const body = await res.json();

  return body.data;
}
