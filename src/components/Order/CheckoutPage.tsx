import { useMemo } from "react";

import { SfLink } from "@storefront-ui/react";

import useCartStore from "@/store/cart";

import { Layout } from "../Layout";
import CheckoutForm from "./CheckoutForm";
import OrderSummary from "./OrderSummary";
import { useCheckoutForm } from "./useCheckoutForm";

const CheckoutPage = () => {
  const cart = useCartStore.use.cart();
  const { state, error, onChangeField, onSubmit } = useCheckoutForm({});

  const usdFormatter = useMemo(() => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
  }, []);

  const order = useMemo(() => {
    return cart.filter((item) => !!item.selected);
  }, [cart]);

  return (
    <Layout>
      <div className="flex px-3 gap-2">
        <div className="flex-[2]">
          <CheckoutForm
            formState={state}
            error={error}
            onChangeField={onChangeField}
          />
        </div>
        <div className="flex-1 mt-5 mr-3">
          <OrderSummary order={order} onSubmit={onSubmit} />
        </div>
      </div>
      <div className="flex flex-col p-5 w-2/3 gap-4">
        {order.map((item) => {
          return (
            <div key={item.id} className="flex gap-3 w-full">
              <div className="rounded-md w-[100px] shrink-0">
                <img
                  className="w-[100px] h-[100px] border rounded-md border-neutral-200"
                  src={item.product.images[0]}
                  alt="alt"
                />
              </div>
              <div className="flex flex-col  w-full">
                <SfLink
                  href={`/products/${item.id}`}
                  variant="secondary"
                  className="no-underline typography-text-sm sm:typography-text-lg"
                >
                  {item.product.title}
                </SfLink>
                <div className="my-2 sm:mb-0">
                  <ul className="text-xs font-normal leading-5 sm:typography-text-sm text-neutral-700">
                    <li className="line-clamp-2">{`Description: ${item.product.description}`}</li>
                  </ul>
                </div>
                <div className="items-center sm:mt-auto sm:flex w-full">
                  <div className="font-medium">{`Quanlity: ${item.quantity}`}</div>
                  <div className="font-bold sm:ml-auto sm:order-1 typography-text-sm sm:typography-text-lg">
                    {usdFormatter.format(item.product.price * item.quantity)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default CheckoutPage;
