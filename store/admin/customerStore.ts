import { create } from "zustand";
import type { Customer, CustomerStatsData } from "@/api/type/admin/types-api";

type CustomerStore = {
  customers: Customer[];
  stats: CustomerStatsData;
  setCustomers: (customers: Customer[]) => void;
  setStats: (stats: CustomerStatsData) => void;
  updateCustomer: (id: string, status: "active" | "inactive") => void;
  removeCustomer: (id: string) => void;
};

export const useCustomerStore = create<CustomerStore>((set) => ({
  customers: [],
  stats: {
    totalCustomers: 0,
    activeCustomers: 0,
    inactiveCustomers: 0,
    newCustomers: 0,
  },
  setCustomers: (customers) => set({ customers }),
  setStats: (stats) => set({ stats }),
  updateCustomer: (id, status) =>
    set((state) => ({
      customers: state.customers.map((customer) =>
        customer.id === id ? { ...customer, status } : customer,
      ),
    })),
  removeCustomer: (id) =>
    set((state) => ({
      customers: state.customers.filter((customer) => customer.id !== id),
    })),
}));
