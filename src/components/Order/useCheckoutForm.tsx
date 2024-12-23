import { useState } from "react";

import { useNavigate } from "react-router-dom";

import useCartStore from "@/store/cart";
import { type Order } from "@/types/order";

export type CheckoutFormType = {
  firstName: string;
  lastName: string;
  phone: string;
  country: string;
  street: string;
  city: string;
  zip: string;
};

type Params = {
  defaultState?: Partial<CheckoutFormType>;
};

export const useCheckoutForm = ({
  defaultState = {
    firstName: "",
    lastName: "",
    phone: "",
    country: "",
    street: "",
    city: "",
    zip: "",
  },
}: Params) => {
  const [state, setState] = useState(defaultState);
  const [error, setError] = useState({});
  const [isError, setIsError] = useState(false);
  const order = useCartStore.use.order();
  const getState = useCartStore.getState;
  const navigate = useNavigate();

  const onChange = (newState: CheckoutFormType) => {
    setState(newState);
  };

  const onChangeField = (field: keyof CheckoutFormType, value: string) => {
    setState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const onSubmit = (orderInfo: Omit<Order, "id" | "info" | "items">) => {
    const error: Record<string, string> = {};
    let isError = false;
    Object.keys(state).forEach((key) => {
      if (!state[key as keyof CheckoutFormType]) {
        isError = true;
        error[key] = "Required";
      } else if (
        key === "phone" &&
        !/^\d{10,11}$/.test(state.phone as string)
      ) {
        isError = true;
        error[key] = "Invalid";
      }
    });
    setError(error);
    setIsError(isError);
    if (isError) return;
    const cart = getState().cart;
    const orderItem = cart.filter((item) => !!item.selected);
    const { ...info } = state as CheckoutFormType;
    const orderId = order({
      items: orderItem,
      info,
      ...orderInfo,
    });
    navigate(`/review-page?order=${orderId}`);
  };

  return {
    state,
    error,
    isError,
    onChange,
    onChangeField,
    onSubmit,
  };
};
