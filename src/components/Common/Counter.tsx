import { SfButton, SfIconAdd, SfIconRemove } from "@storefront-ui/react";

import { type Product } from "@/types/product";

type Props = {
  product: Product;
  number: number;
  setNumber: (number: number) => void;
};

const Counter = ({ product, number, setNumber }: Props) => {
  const handleIncrease = () => {
    setNumber(number + 1);
  };
  const handleDecrease = () => {
    setNumber(number - 1);
  };

  const handleOnChange = (value: string) => {
    setNumber(+value || 1);
  };

  return (
    <div className="flex items-center justify-between mt-4 sm:mt-0">
      <div className="flex border border-neutral-300 rounded-md">
        <SfButton
          variant="tertiary"
          square
          className="rounded-r-none"
          disabled={number <= 1}
          aria-label="Decrease value"
          onClick={handleDecrease}
        >
          <SfIconRemove />
        </SfButton>
        <input
          type="number"
          role="spinbutton"
          className="appearance-none outline-none mx-2 w-8 text-center bg-transparent font-medium [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:display-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:display-none [&::-webkit-outer-spin-button]:m-0 [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none disabled:placeholder-disabled-900"
          min={1}
          max={product.stock}
          value={number}
          onChange={(e) => handleOnChange(e.target.value)}
        />
        <SfButton
          variant="tertiary"
          square
          className="rounded-l-none"
          disabled={number >= product.stock}
          aria-label="Increase value"
          onClick={handleIncrease}
        >
          <SfIconAdd />
        </SfButton>
      </div>
    </div>
  );
};

export default Counter;
