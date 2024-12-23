import { useMemo } from "react";

import { SfLink } from "@storefront-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import useOrderStore from "@/store/order";

import { Layout } from "../Layout";

const OrderDetailPage = () => {
  const params = useParams();
  const getOrderById = useOrderStore.use.getOrderById();
  const { data } = useQuery({
    queryKey: ["getOrderById", params.id],
    queryFn: () => {
      return getOrderById(params.id || "");
    },
  });

  const usdFormatter = useMemo(() => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
  }, []);

  if (!data)
    return (
      <Layout>
        <div className="min-h-[800px] bg-gray-100 animate-pulse"></div>
      </Layout>
    );

  return (
    <Layout>
      <div className="flex p-10 gap-2 min-h-[800px]">
        <div className="flex flex-col p-5 w-2/3 gap-4">
          <div className="mb-3">
            <h3 className="font-bold">User information</h3>
            <div className="flex flex-col gap-2 mt-3 font-medium p-5 border shadow">
              <div>{`First Name: ${data.info.firstName}`}</div>
              <div>{`Last Name: ${data.info.lastName}`}</div>
              <div>{`Phone Number: ${data.info.phone}`}</div>
              <div>{`Country: ${data.info.country}`}</div>
              <div>{`City: ${data.info.city}`}</div>
              <div>{`Street: ${data.info.street}`}</div>
              <div>{`Zip: ${data.info.zip}`}</div>
            </div>
          </div>
          <h3 className="font-bold">Order Items</h3>
          {data.items.map((item) => {
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
        <div className="flex-1 mt-5 mr-3">
          <div>
            <div className="md:shadow-lg md:rounded-md md:border md:border-neutral-100">
              <div className="flex justify-between items-end bg-neutral-100 md:bg-transparent py-2 px-4 md:px-6 md:pt-6 md:pb-4">
                <p className="typography-headline-4 font-bold md:typography-headline-3">
                  Order Summary
                </p>
                <p className="typography-text-base font-medium">
                  (Items: {data.items.length})
                </p>
              </div>
              <div className="px-4 pb-4 mt-3 md:px-6 md:pb-6 md:mt-0">
                <div className="flex justify-between typography-text-base pb-4">
                  <div className="flex flex-col grow pr-2">
                    <p>Items Subtotal</p>
                    <p className="typography-text-xs text-neutral-500">
                      Original Price
                    </p>
                    <p className="typography-text-xs text-secondary-700">
                      Savings
                    </p>
                    <p className="my-2">Delivery</p>
                    <p className="my-2">Promotion</p>
                  </div>
                  <div className="flex flex-col text-right">
                    <p>{usdFormatter.format(data.subTotal)}</p>
                    <p className="typography-text-xs text-neutral-500">
                      {usdFormatter.format(data.originalPrice)}
                    </p>
                    <p className="typography-text-xs text-secondary-700">
                      {usdFormatter.format(data.saving)}
                    </p>
                    <p className="my-2">{usdFormatter.format(data.delivery)}</p>
                    <p className="my-2">{usdFormatter.format(data.promte)}</p>
                  </div>
                </div>
                <p className="px-3 py-1.5 bg-secondary-100 text-secondary-700 typography-text-sm rounded-md text-center mb-4">
                  You are saving $
                  {Math.abs(data.saving + data.promte).toFixed(2)} on your order
                  today!
                </p>
                <div className="flex justify-between typography-headline-4 md:typography-headline-3 font-bold pb-4 mb-4 border-b border-neutral-200">
                  <p>Total</p>
                  <p>{usdFormatter.format(data.summary)}</p>
                </div>
                <div className="typography-text-sm mt-4 text-center">
                  By placing my order, you agree to our{" "}
                  <SfLink href="#">Terms and Conditions</SfLink> and our{" "}
                  <SfLink href="#">Privacy Policy.</SfLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderDetailPage;
