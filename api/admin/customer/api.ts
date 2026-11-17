// customer page

import {
  CustomerResponse,
  GetCustomersParams,
} from "@/api/type/admin/types-api";

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

// update the customer status

export async function updateCustomerStatus(id: string, status: string) {
  const res = await fetch(`${BASE_URL}/api/admin/customers/${id}/status`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error("Failed to update customer status");
  }

  return result.data;
}
