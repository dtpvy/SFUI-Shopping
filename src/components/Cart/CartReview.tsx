import { useMemo } from "react";

import { SfButton, SfIconShoppingCart, SfLink } from "@storefront-ui/react";
import { Link } from "react-router-dom";

import useCartStore from "@/store/cart";

const CartReview = () => {
  const cart = useCartStore.use.cart();

  const usdFormatter = useMemo(() => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
  }, []);

  const viewCart = useMemo(() => {
    return cart.slice(0, 4);
  }, [cart]);

  return (
    <div className="bg-white shadow-lg relative flex flex-col gap-3 border border-neutral-200 hover:shadow-lg w-[400px] p-4">
      {viewCart.map((item) => {
        return (
          <div key={item.id} className="flex gap-3">
            <div className="rounded-md w-[100px] shrink-0">
              <img
                className="w-[100px] h-[100px] border rounded-md border-neutral-200"
                src={item.product.images[0]}
                alt="alt"
              />
            </div>
            <div className="flex flex-col">
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
              <div className="items-center sm:mt-auto sm:flex">
                <div className="font-medium">{`Quanlity: ${item.quantity}`}</div>
                <div className="font-bold sm:ml-auto sm:order-1 typography-text-sm sm:typography-text-lg">
                  {usdFormatter.format(item.product.price * item.quantity)}
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <Link to="/cart">
        <SfButton
          size="lg"
          className="w-full"
          variant="secondary"
          slotPrefix={<SfIconShoppingCart size="sm" />}
        >
          View more
        </SfButton>
      </Link>
    </div>
  );
};

export default CartReview;
