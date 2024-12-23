import { create } from "zustand";

import { type Order } from "@/types/order";
import { type Product } from "@/types/product";

import { createSelectors } from "./createSelector";

export type CartItem = {
  id: string;
  product: Product;
  quantity: number;
  selected?: boolean;
};

type CartState = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  updateCart: (
    id: string,
    update: { selected?: boolean; quantity?: number },
  ) => void;
  updateAllCart: (newCart: CartItem[]) => void;
  removeFromCart: (id: string) => void;
  loadCart: () => void;
  order: (order: Omit<Order, "id">) => string;
};

const saveCartToLocalStorage = (cart: CartItem[]) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const getCartFromLocalStorage = (): CartItem[] => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};

const useCartStore = createSelectors(
  create<CartState>((set) => ({
    cart: getCartFromLocalStorage(),
    addToCart: (item) =>
      set((state) => {
        const exists = state.cart.find((cartItem) => cartItem.id === item.id);
        const updatedCart = exists
          ? state.cart.map((cartItem) =>
              cartItem.id === item.id
                ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                : cartItem,
            )
          : [...state.cart, { ...item, quantity: item.quantity }];
        saveCartToLocalStorage(updatedCart);
        return { cart: updatedCart };
      }),

    updateCart: (id, { selected, quantity }) =>
      set((state) => {
        const updatedCart = state.cart.map((cartItem) =>
          cartItem.id === id
            ? {
                ...cartItem,
                selected: selected !== undefined ? selected : cartItem.selected,
                quantity: quantity !== undefined ? quantity : cartItem.quantity,
              }
            : cartItem,
        );
        saveCartToLocalStorage(updatedCart);
        return { cart: updatedCart };
      }),

    updateAllCart: (newCart) =>
      set(() => ({
        cart: newCart,
      })),
    removeFromCart: (id) =>
      set((state) => {
        const updatedCart = state.cart.filter((cartItem) => cartItem.id !== id);
        saveCartToLocalStorage(updatedCart);
        return { cart: updatedCart };
      }),
    order: (order) => {
      const id = new Date().getTime();
      localStorage.setItem(`order_${id}`, JSON.stringify({ id, ...order }));
      set((state) => {
        const updatedCart = state.cart.filter((cartItem) => !cartItem.selected);
        saveCartToLocalStorage(updatedCart);
        return { cart: updatedCart };
      });
      return `${id}`;
    },

    loadCart: () =>
      set(() => ({
        cart: getCartFromLocalStorage(),
      })),
  })),
);

export default useCartStore;
