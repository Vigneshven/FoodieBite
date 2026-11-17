import { create } from "zustand";
import type { Customer } from "@/api/type/admin/types-api";

type CustomerStore = {
  customers: Customer[];
  setCustomers: (customers: Customer[]) => void;
  updateCustomer: (id: string, status: "active" | "inactive") => void;
  removeCustomer: (id: string) => void;
};

export const useCustomerStore = create<CustomerStore>((set) => ({
  customers: [],
  setCustomers: (customers) => set({ customers }),
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
