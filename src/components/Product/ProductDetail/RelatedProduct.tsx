import {
  SfButton,
  SfIconChevronLeft,
  SfIconChevronRight,
  SfLink,
  SfScrollable,
} from "@storefront-ui/react";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";

import { searchProducts } from "@/apis/product";

function ButtonPrev({
  disabled = false,
  ...attributes
}: {
  disabled?: boolean;
}) {
  return (
    <SfButton
      className={classNames(
        "absolute !rounded-full z-10 left-4 bg-white hidden md:block",
        {
          "!hidden": disabled,
        },
      )}
      variant="secondary"
      size="lg"
      square
      {...attributes}
    >
      <SfIconChevronLeft />
    </SfButton>
  );
}

function ButtonNext({
  disabled = false,
  ...attributes
}: {
  disabled?: boolean;
}) {
  return (
    <SfButton
      className={classNames(
        "absolute !rounded-full z-10 right-4 bg-white hidden md:block",
        {
          "!hidden": disabled,
        },
      )}
      variant="secondary"
      size="lg"
      square
      {...attributes}
    >
      <SfIconChevronRight />
    </SfButton>
  );
}

type Props = {
  category: string | null;
};

const RelatedProduct = ({ category }: Props) => {
  const { data } = useQuery({
    queryKey: ["relatedProducts", category],
    queryFn: () => {
      if (!category) return;
      return searchProducts({ categories: [category], pageSize: 10 });
    },
    enabled: !!category,
  });

  return (
    <SfScrollable
      className="m-auto py-4 items-center w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      drag
      buttons-placement="floating"
      slotPreviousButton={<ButtonPrev />}
      slotNextButton={<ButtonNext />}
    >
      {data?.data?.map(({ id, title, price, images }) => (
        <div
          key={id}
          className="first:ms-auto last:me-auto ring-1 ring-inset ring-neutral-200 shrink-0 rounded-md hover:shadow-lg w-[148px] lg:w-[192px]"
        >
          <div className="relative">
            <SfLink href={`/products/${id}`} className="block">
              <img
                src={images[0]}
                alt={title}
                className="block object-cover h-auto rounded-md aspect-square lg:w-[190px] lg:h-[190px]"
                width="146"
                height="146"
              />
            </SfLink>
          </div>
          <div className="p-2 border-t border-neutral-200 typography-text-sm">
            <SfLink
              title={title}
              variant="secondary"
              href={`/products/${id}`}
              className="no-underline line-clamp-1"
            >
              {title}
            </SfLink>
            <span className="block mt-2 font-bold">{price}</span>
          </div>
        </div>
      ))}
    </SfScrollable>
  );
};

export default RelatedProduct;
