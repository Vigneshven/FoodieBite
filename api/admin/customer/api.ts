// customer page

import { CustomerResponse, GetCustomersParams } from "@/api/type/admin/types-api";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchCustomers(params: GetCustomersParams) {
  const query = new URLSearchParams({
    page: String(params.page),
    limit: String(params.limit),
    search: params.search,
    status: params.status,
    sortBy: params.sortBy,
  });

  const res = await fetch(`${BASE_URL}/api/admin/customers?${query}`, {
    method: "GET",
    credentials: "include",
  });

  const result: CustomerResponse = await res.json();

  if (!res.ok) {
    throw new Error("Failed to fetch customers");
  }

  return result.data;
}