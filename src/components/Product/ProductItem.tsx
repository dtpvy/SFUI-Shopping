import { useMemo } from "react";

import { SfRating } from "@storefront-ui/react";
import { Link } from "react-router-dom";

import { type Product } from "@/types/product";

type Props = {
  product: Product;
};

const ProductItem = ({ product }: Props) => {
  const usdFormatter = useMemo(() => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
  }, []);

  return (
    <Link to={`/products/${product.id}`}>
      <div className="border border-neutral-200 rounded-md hover:shadow-lg w-full">
        <div className="relative">
          <img
            src={product.images[0]}
            alt={product.description}
            className="object-cover h-auto rounded-md aspect-square"
            width="300"
            height="300"
          />
        </div>
        <div className="p-4 border-t border-neutral-200">
          <div className="no-underline font-bold">{product.title}</div>
          <div className="flex items-center pt-1">
            <SfRating size="xs" value={product.rating} max={5} />
          </div>
          <div
            title={product.description}
            className="py-2 font-normal typography-text-sm text-neutral-700 line-clamp-3"
          >
            {product.description}
          </div>
          <span className="block pb-2 font-bold typography-text-lg">
            {usdFormatter.format(product.price)}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
