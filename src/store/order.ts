import { create } from "zustand";

import { type Order } from "@/types/order";

import { createSelectors } from "./createSelector";

type OrderState = {
  orders: Order[];
  fetchOrders: () => Order[];
  getOrderById: (id: string) => Order | undefined;
};

const useOrderStore = createSelectors(
  create<OrderState>((set) => ({
    orders: [],
    fetchOrders: () => {
      const keys = Object.keys(localStorage).filter((key) =>
        key.startsWith("order_"),
      );
      const orders = keys
        .map((key) => {
          const data = localStorage.getItem(key);
          return data ? JSON.parse(data) : null;
        })
        .filter(Boolean) as Order[];

      set({ orders });
      return orders;
    },
    getOrderById: (id: string) => {
      const orderKey = `order_${id}`;
      const orderData = localStorage.getItem(orderKey);
      return orderData ? JSON.parse(orderData) : undefined;
    },
  })),
);

export default useOrderStore;
