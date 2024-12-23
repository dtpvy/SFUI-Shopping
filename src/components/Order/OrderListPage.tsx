import { useMemo } from "react";

import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import useOrderStore from "@/store/order";

import { Breadcrumb } from "../Common";
import { Layout } from "../Layout";

const OrderListPage = () => {
  const fetchOrders = useOrderStore.use.fetchOrders();
  const { data } = useQuery({
    queryKey: ["fetchOrders"],
    queryFn: fetchOrders,
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
      <div className="bg-gradient-to-b from-green-200 to-teal-200 h-[200px] flex flex-col items-center justify-center gap-3">
        <h3 className="font-bold text-2xl">Orders</h3>
        <Breadcrumb />
      </div>

      <div className="p-10">
        <div className="flex items-center gap-2 font-medium border-b pb-3">
          <div className="flex-1">Order</div>
          <div className="flex-1">Summary</div>
          <div className="flex-[2]">Quantity</div>
          <div className="flex-1">Subtotal</div>
        </div>
        {!data.length && (
          <div className="w-full text-center py-3">No Items</div>
        )}
        {data.map((order) => {
          return (
            <Link to={`/orders/${order.id}`}>
              <div
                key={order.id}
                className="flex items-start font-medium border-b py-3 gap-2 hover:bg-gray-100"
              >
                <div className="flex-1 flex gap-2 items-start pl-2">
                  <img
                    src={order.items[0].product.images[0]}
                    className="w-[50px] h-[50px] border rounded-sm"
                  />
                  <span className="line-clamp-2">{order.id}</span>
                </div>
                <div className="flex-1">
                  {usdFormatter.format(order.summary)}
                </div>
                <div className="flex-[2] flex flex-col gap-1">
                  {order.items.slice(0, 3).map((item) => (
                    <div key={item.id} className="line-clamp-1">
                      {item.product.title}
                    </div>
                  ))}
                </div>
                <div className="flex-1">{`${order.items.length} items`}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </Layout>
  );
};

export default OrderListPage;
