import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { CartPage } from "@/components/Cart";
import { HomePage } from "@/components/Home";
import {
  CheckoutPage,
  OrderDetailPage,
  OrderListPage,
  ReviewPage,
} from "@/components/Order";
import { ProductDetailPage } from "@/components/Product";
import { SearchProductPage } from "@/components/Search";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/search",
    element: <SearchProductPage />,
  },
  {
    path: "/products/:id",
    element: <ProductDetailPage />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "/checkout",
    element: <CheckoutPage />,
  },
  {
    path: "/review-page",
    element: <ReviewPage />,
  },
  {
    path: "/orders/:id",
    element: <OrderDetailPage />,
  },
  {
    path: "/orders",
    element: <OrderListPage />,
  },
]);

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
