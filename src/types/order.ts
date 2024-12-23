import type { CartItem } from "@/store/cart";

export type Order = {
  id: string;
  items: CartItem[];
  subTotal: number;
  originalPrice: number;
  promte: number;
  delivery: number;
  saving: number;
  summary: number;
  info: {
    firstName: string;
    lastName: string;
    country: string;
    street: string;
    city: string;
    zip: string;
    phone: string;
  };
};
