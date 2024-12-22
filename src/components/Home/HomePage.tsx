import { useMemo } from "react";

import { SfButton, SfRating, SfScrollable } from "@storefront-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { getCategories } from "@/apis/category";
import { getHomeProducts } from "@/apis/product";

import { Layout } from "../Layout";
import Banner from "./Banner";
import Category from "./Category";

const HomePage = () => {
  const { data: categories } = useQuery({
    queryKey: ["getCategories"],
    queryFn: getCategories,
  });

  const { data: products } = useQuery({
    queryKey: ["getHomeProducts"],
    queryFn: getHomeProducts,
  });

  const usdFormatter = useMemo(() => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
  }, []);

  return (
    <Layout>
      <div className="flex flex-col">
        <Banner />
        <div className="p-10 mx-10 flex flex-col items-center gap-5">
          <h3 className="font-bold text-xl">Categories</h3>
          <div className="w-full">
            <SfScrollable
              className="items-center w-full snap-x snap-mandatory hide-scrollbar"
              drag
            >
              {categories?.map((item) => {
                return <Category key={item.id} category={item} />;
              })}
            </SfScrollable>
          </div>
        </div>
        <div className="p-10 mx-10 flex flex-col items-center gap-5">
          <h3 className="font-bold text-2xl">Our Products</h3>
          <div className="w-full grid grid-cols-4 gap-10">
            {products?.map((item) => {
              return (
                <Link key={item.id} to={`/products/${item.id}`}>
                  <div className="flex flex-col shrink-0">
                    <img
                      src={item.images[0]}
                      className="bg-gray-200 w-full h-auto aspect-square"
                    />
                    <div className="flex flex-col bg-gray-100 p-3 min-h-[100px]">
                      <div className="font-medium text-md line-clamp-2">
                        {item.title}
                      </div>
                      <div className="flex flex-row justify-between mt-auto">
                        <div>{usdFormatter.format(item.price)}</div>
                        <SfRating value={item.rating} halfIncrement />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <Link to="/search" className="w-1/3">
            <SfButton variant="secondary" className="w-full">
              Show more
            </SfButton>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
