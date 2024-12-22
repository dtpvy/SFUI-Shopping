import { useState } from "react";

import {
  SfButton,
  SfIconChevronLeft,
  SfIconChevronRight,
  SfScrollable,
  type SfScrollableOnDragEndData,
} from "@storefront-ui/react";
import classNames from "classnames";

type Props = {
  images: string[];
};

const ProductView = ({ images }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onDragged = (event: SfScrollableOnDragEndData) => {
    if (event.swipeRight && activeIndex > 0) {
      setActiveIndex((currentActiveIndex) => currentActiveIndex - 1);
    } else if (event.swipeLeft && activeIndex < images.length - 1) {
      setActiveIndex((currentActiveIndex) => currentActiveIndex + 1);
    }
  };

  const activeArrowNavigation = (event: React.KeyboardEvent, index: number) => {
    event.preventDefault();
    const currentElement = event?.target as HTMLElement;
    const nextElement = currentElement.nextElementSibling as HTMLElement;
    const previousElement =
      currentElement.previousElementSibling as HTMLElement;
    if (
      (event.code === "ArrowRight" || event.code === "ArrowUp") &&
      index < images.length - 1
    ) {
      setActiveIndex(index + 1);
      nextElement.focus();
    } else if (
      (event.code === "ArrowLeft" || event.code === "ArrowDown") &&
      index > 0
    ) {
      setActiveIndex(index - 1);
      previousElement.focus();
    }
  };

  return (
    <div className="relative flex flex-col w-full aspect-square">
      <SfScrollable
        className="w-full h-full snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        activeIndex={activeIndex}
        wrapperClassName="h-full min-h-0"
        buttonsPlacement="none"
        isActiveIndexCentered
        drag={{ containerWidth: true }}
        onDragEnd={onDragged}
      >
        {images.map((image, index) => (
          <div
            key={`${image}-${index}`}
            className="flex justify-center h-full basis-full shrink-0 grow snap-center"
          >
            <img
              aria-label={image}
              aria-hidden={activeIndex !== index}
              className="w-auto h-full"
              alt={image}
              src={image}
            />
          </div>
        ))}
      </SfScrollable>
      <SfScrollable
        className="items-center w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
        activeIndex={activeIndex}
        buttonsPlacement="floating"
        slotPreviousButton={
          <SfButton
            className="absolute disabled:hidden !rounded-full z-10 left-4 bg-white"
            variant="secondary"
            size="sm"
            square
            slotPrefix={<SfIconChevronLeft size="sm" />}
          />
        }
        slotNextButton={
          <SfButton
            className="absolute disabled:hidden !rounded-full z-10 right-4 bg-white"
            variant="secondary"
            size="sm"
            square
            slotPrefix={<SfIconChevronRight size="sm" />}
          />
        }
      >
        {images.map((image, index) => (
          <button
            type="button"
            aria-label={image}
            aria-current={activeIndex === index}
            key={`${image}-${index}-thumbnail`}
            className={classNames(
              "md:w-14 md:h-auto relative shrink-0 pb-1 my-2 -mr-2 border-b-4 snap-start cursor-pointer focus-visible:outline focus-visible:outline-offset transition-colors flex-grow md:flex-grow-0",
              activeIndex === index
                ? "border-primary-700"
                : "border-transparent",
            )}
            onClick={() => setActiveIndex(index)}
            onKeyDown={(event) => activeArrowNavigation(event, index)}
          >
            <img
              alt={image}
              className="object-contain border border-neutral-200"
              width="78"
              height="78"
              src={image}
            />
          </button>
        ))}
      </SfScrollable>
    </div>
  );
};

export default ProductView;
