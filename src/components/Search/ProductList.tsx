import { type Product } from "@/types/product";

import { ProductItem } from "../Product";

type Props = {
  isLoading?: boolean;
  data: Product[];
};

const ProductList = ({ isLoading = true, data }: Props) => {
  return (
    <div className="w-full grid grid-cols-5 gap-5 p-10">
      {isLoading
        ? Array.from({ length: 10 }, (_, i) => (
            <div key={i} className="animate-pulse">
              <div className="w-full aspect-square bg-gray-200 rounded"></div>
              <div className="flex flex-col gap-2 py-3">
                <div className="w-full rounded bg-gray-200 h-6"></div>
                <div className="w-full rounded bg-gray-200 h-6"></div>
                <div className="w-full rounded bg-gray-200 h-6"></div>
              </div>
            </div>
          ))
        : data.map((item) => {
            return <ProductItem key={item.id} product={item} />;
          })}
    </div>
  );
};

export default ProductList;
