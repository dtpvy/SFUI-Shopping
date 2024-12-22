import { useMemo } from "react";

import { SfButton, SfCheckbox, SfIconDelete } from "@storefront-ui/react";
import { Link } from "react-router-dom";

import useCartStore from "@/store/cart";

import { Breadcrumb, Counter } from "../Common";
import { Layout } from "../Layout";

const CartPage = () => {
  const cart = useCartStore.use.cart();
  const updateCart = useCartStore.use.updateCart();
  const updateAllCart = useCartStore.use.updateAllCart();
  const removeFromCart = useCartStore.use.removeFromCart();

  const usdFormatter = useMemo(() => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
  }, []);

  const total = useMemo(() => {
    return cart.reduce((total, item) => {
      return item.selected ? total + item.product.price * item.quantity : total;
    }, 0);
  }, [cart]);

  const selectedItem = useMemo(() => {
    return cart.reduce((total, item) => {
      return total + +!!item.selected;
    }, 0);
  }, [cart]);

  const handleUpdateCart = (
    id: number,
    update: { selected?: boolean; quanlity?: number },
  ) => {
    updateCart(id, update);
  };

  const handleCheckAll = () => {
    updateAllCart(
      cart.map((item) => ({
        ...item,
        selected: cart.length !== selectedItem,
      })),
    );
  };

  return (
    <Layout>
      <div className="bg-gradient-to-b from-green-200 to-teal-200 h-[200px] flex flex-col items-center justify-center gap-3">
        <h3 className="font-bold text-2xl">Cart</h3>
        <Breadcrumb />
      </div>
      <div className="relative">
        <div className="p-10">
          <div className="flex items-center gap-2 font-medium border-b pb-3">
            <div className="flex items-center w-[50px]">
              <SfCheckbox
                checked={selectedItem > 0 && selectedItem === cart.length}
                onChange={handleCheckAll}
              />
            </div>
            <div className="flex-[2]">Product</div>
            <div className="w-[100px] text-right">Price</div>
            <div className="w-[100px] text-center">Quantity</div>
            <div className="flex-1 text-right">Subtotal</div>
            <div className="w-[250px]"></div>
          </div>
          {!cart.length && (
            <div className="w-full text-center py-3">No Items</div>
          )}
          {cart.map((item) => {
            return (
              <div
                key={item.id}
                className="flex items-center font-medium border-b py-3 gap-2"
              >
                <div className="flex items-center w-[50px]">
                  <SfCheckbox
                    checked={item.selected}
                    onChange={() =>
                      handleUpdateCart(item.id, { selected: !item.selected })
                    }
                  />
                </div>
                <div className="flex-[2] flex gap-2 items-center">
                  <img
                    src={item.product.images[0]}
                    className="w-[50px] h-[50px] border rounded-sm"
                  />
                  <span className="line-clamp-2">{item.product.title}</span>
                </div>
                <div className="w-[100px] text-right">
                  {usdFormatter.format(item.product.price)}
                </div>
                <div className="w-[100px] text-center">{item.quantity}</div>
                <div className="flex-1 text-right">
                  {usdFormatter.format(item.product.price * item.quantity)}
                </div>

                <div className="w-[250px] flex items-center">
                  <Counter
                    product={item.product}
                    number={item.quantity}
                    setNumber={(number) => {
                      updateCart(item.id, { quantity: number });
                    }}
                  />
                  <button
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove"
                    type="button"
                    className="text-neutral-500 cursor-pointer text-xs font-light ml-auto flex items-center px-3 py-1.5"
                  >
                    <SfIconDelete />
                    <span className="hidden ml-1.5 sm:block"> Remove </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="w-full flex shadow sticky bottom-0 px-10 py-5 bg-green-200 text-green-900">
          <div className="flex items-center gap-4">
            <div className="font-medium">{`Total (${selectedItem} items): `}</div>
            <div className="font-bold text-xl">
              {usdFormatter.format(total)}
            </div>
          </div>
          <Link to="/checkout" className="ml-auto">
            <SfButton size="lg" className="w-[200px] !font-bold">
              Check Out
            </SfButton>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
