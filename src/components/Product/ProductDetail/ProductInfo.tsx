import { useMemo, useState } from "react";

import {
  SfButton,
  SfCounter,
  SfIconPackage,
  SfIconSafetyCheck,
  SfIconShoppingCart,
  SfIconWarehouse,
  SfLink,
  SfRating,
} from "@storefront-ui/react";

import { Counter } from "@/components/Common";
import useCartStore from "@/store/cart";
import { type Product } from "@/types/product";

type Props = {
  product: Product | null;
};

const ProductInfo = ({ product }: Props) => {
  const [number, setNumber] = useState(1);

  const addToCart = useCartStore.use.addToCart();

  const usdFormatter = useMemo(() => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
  }, []);

  const handleAddToCard = () => {
    if (!product) return;
    addToCart({ id: product.id, product, quantity: number });
  };

  if (!product) return;

  return (
    <section className="md:max-w-[640px]">
      <h1 className="mb-1 font-bold typography-headline-4">{product.title}</h1>
      <strong className="block font-bold typography-headline-3">
        {usdFormatter.format(product.price)}
      </strong>
      <div className="inline-flex items-center mt-4 mb-2">
        <SfRating size="xs" value={product.price} max={5} />
        <SfCounter className="ml-1" size="xs">
          123
        </SfCounter>
        <SfLink
          href="#"
          variant="secondary"
          className="ml-2 text-xs text-neutral-500"
        >
          123 reviews
        </SfLink>
      </div>
      <ul className="mb-4 font-normal typography-text-sm">
        {product.description}
      </ul>
      <div className="py-4 mb-4 border-gray-200 border-y">
        <div className="items-start xs:flex">
          <div className="flex flex-col items-stretch xs:items-center xs:inline-flex">
            <Counter product={product} number={number} setNumber={setNumber} />
            <p className="self-center mt-1 mb-4 text-xs text-neutral-500 xs:mb-0">
              <strong className="text-neutral-900">{product.stock}</strong> in
              stock
            </p>
          </div>
          <SfButton
            size="lg"
            className="w-full xs:ml-4"
            onClick={handleAddToCard}
            slotPrefix={<SfIconShoppingCart size="sm" />}
          >
            Add to cart
          </SfButton>
        </div>
      </div>
      <div className="flex first:mt-4">
        <SfIconPackage
          size="sm"
          className="flex-shrink-0 mr-1 text-neutral-500"
        />
        <p className="text-sm">{product.shippingInformation}</p>
      </div>
      <div className="flex mt-4">
        <SfIconWarehouse
          size="sm"
          className="flex-shrink-0 mr-1 text-neutral-500"
        />
        <p className="text-sm">{product.warrantyInformation}</p>
      </div>
      <div className="flex mt-4">
        <SfIconSafetyCheck
          size="sm"
          className="flex-shrink-0 mr-1 text-neutral-500"
        />
        <p className="text-sm">{product.returnPolicy}</p>
      </div>
    </section>
  );
};

export default ProductInfo;
