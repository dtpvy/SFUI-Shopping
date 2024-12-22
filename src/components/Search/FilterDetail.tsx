import { useState } from "react";

import {
  SfAccordionItem,
  SfButton,
  SfCheckbox,
  SfDrawer,
  SfIconChevronLeft,
  SfListItem,
  SfRadio,
  SfRating,
  SfSelect,
} from "@storefront-ui/react";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";

import { getCategories } from "@/apis/category";
import {
  PRICE_FILTERS,
  RATING_FILTERS,
  SORT_OPTIONS,
} from "@/constants/filter";
import { type FilterOptions } from "@/types/filter";

type Props = {
  open?: boolean;
  filter: FilterOptions;
  onClose?: () => void;
  onApply?: (params: FilterOptions) => void;
};

const FilterDetail = ({ filter, open, onClose, onApply }: Props) => {
  const [opened, setOpened] = useState<string[]>([
    "ratting",
    "price",
    "categories",
  ]);
  const [preFilter, setPreFilter] = useState(filter);

  const { data: categories } = useQuery({
    queryKey: ["getCategories"],
    queryFn: getCategories,
  });

  const handleToggle = (id: string) => {
    if (!opened.includes(id)) {
      setOpened((current) => [...current, id]);
    } else {
      setOpened((current) => current.filter((item) => item !== id));
    }
  };

  const handleChangeCategories = (id: string, check: boolean) => {
    setPreFilter((prev) => {
      const newCategories = !check
        ? prev.categories.filter((cat) => cat !== id)
        : [...prev.categories, id];
      return { ...prev, categories: newCategories };
    });
  };

  const handleChangePrice = (priceFrom: number, priceTo: number) => {
    setPreFilter((prev) => {
      return { ...prev, priceFrom, priceTo };
    });
  };

  const handleChangeRating = (rating: number) => {
    setPreFilter((prev) => {
      return { ...prev, rating };
    });
  };

  const handleClearFilters = () => {
    const filter = {
      page: 1,
      categories: [],
      priceFrom: 0,
      priceTo: Infinity,
      rating: 0,
      sortType: null,
      order: null,
    };
    setPreFilter(filter);
    onApply?.(filter);
  };

  const handleChangeSort = (value: string) => {
    const sort = SORT_OPTIONS.find((sort) => sort.value === value);
    setPreFilter((prev) => ({
      ...prev,
      sortType: sort?.type || null,
      order: sort?.order || null,
    }));
  };

  const isOpened = (id: string) => {
    return opened.includes(id);
  };

  return (
    <SfDrawer
      open={!!open}
      placement="left"
      onClose={onClose}
      className="bg-neutral-50 border border-gray-300 w-[600px] duration-500 transition ease-in-out h-screen overflow-auto"
    >
      <aside className="w-full p-5">
        <h5 className="py-2 px-4 mb-6 bg-neutral-100 typography-headline-6 font-bold text-neutral-900 uppercase tracking-widest md:rounded-md">
          Sort by
        </h5>
        <div className="px-2">
          <SfSelect
            onChange={(e) => handleChangeSort(e.target.value)}
            autoFocus={false}
            aria-label="Sort by"
            className="bg-white"
          >
            {SORT_OPTIONS.map((option) => (
              <option value={option.value} key={option.value}>
                {option.label}
              </option>
            ))}
          </SfSelect>
        </div>
        <h5 className="py-2 px-4 mt-6 mb-4 bg-neutral-100 typography-headline-6 font-bold text-neutral-900 uppercase tracking-widest md:rounded-md">
          Filter
        </h5>
        <div className="flex flex-col gap-2">
          <SfAccordionItem
            open={isOpened("categories")}
            onToggle={() => handleToggle("categories")}
            className="w-full"
            summary={
              <div className="flex justify-between p-2 mb-2 bg-gray-100">
                <p className="font-medium typography-headline-5">Categories</p>
                <SfIconChevronLeft
                  className={classNames(
                    "text-neutral-500",
                    `${isOpened("categories") ? "rotate-90" : "-rotate-90"}`,
                  )}
                />
              </div>
            }
          >
            <fieldset name="radio-price">
              {categories?.map((item) => (
                <SfListItem
                  key={item.id}
                  as="label"
                  size="sm"
                  className={classNames(
                    "px-1.5 bg-transparent hover:bg-transparent",
                    {
                      "font-medium": preFilter.categories.includes(item.slug),
                    },
                  )}
                  slotPrefix={
                    <SfCheckbox
                      className="flex items-center"
                      value={item.id}
                      checked={preFilter.categories.includes(item.slug)}
                      name="radio-price"
                      onChange={(e) =>
                        handleChangeCategories(item.slug, e.target.checked)
                      }
                    />
                  }
                >
                  <p>
                    <span className="mr-2 text-sm">{item.name}</span>
                  </p>
                </SfListItem>
              ))}
            </fieldset>
          </SfAccordionItem>
          <SfAccordionItem
            open={isOpened("price")}
            onToggle={() => handleToggle("price")}
            className="w-full"
            summary={
              <div className="flex justify-between p-2 mb-2 bg-gray-100">
                <p className="font-medium typography-headline-5">Price</p>
                <SfIconChevronLeft
                  className={classNames(
                    "text-neutral-500",
                    `${isOpened("price") ? "rotate-90" : "-rotate-90"}`,
                  )}
                />
              </div>
            }
          >
            <fieldset name="radio-price">
              {PRICE_FILTERS.map(({ label, value, priceFrom, priceTo }) => (
                <SfListItem
                  key={value}
                  as="label"
                  size="sm"
                  className={classNames(
                    "px-1.5 bg-transparent hover:bg-transparent",
                    {
                      "font-medium":
                        priceTo === preFilter.priceTo &&
                        priceFrom === preFilter.priceFrom,
                    },
                  )}
                  slotPrefix={
                    <SfRadio
                      className="flex items-center"
                      value={value}
                      checked={
                        priceTo === preFilter.priceTo &&
                        priceFrom === preFilter.priceFrom
                      }
                      name="radio-price"
                      onChange={() => handleChangePrice(priceFrom, priceTo)}
                    />
                  }
                >
                  <p>
                    <span className="mr-2 text-sm">{label}</span>
                  </p>
                </SfListItem>
              ))}
            </fieldset>
          </SfAccordionItem>
          <SfAccordionItem
            open={isOpened("ratting")}
            onToggle={() => handleToggle("ratting")}
            className="w-full"
            summary={
              <div className="flex justify-between p-2 mb-2 bg-gray-100">
                <p className="font-medium">Rating</p>
                <SfIconChevronLeft
                  className={classNames(
                    "text-neutral-500",
                    `${isOpened("ratting") ? "rotate-90" : "-rotate-90"}`,
                  )}
                />
              </div>
            }
          >
            <fieldset id="radio-rating">
              {RATING_FILTERS.map(({ id, label, value }) => (
                <SfListItem
                  key={id}
                  as="label"
                  size="sm"
                  className={classNames(
                    "!items-center py-4 md:py-1 bg-transparent hover:bg-transparent",
                  )}
                  slotPrefix={
                    <SfRadio
                      value={value}
                      className="flex items-center"
                      checked={preFilter.rating === +value}
                      name="radio-rating"
                      onChange={() => handleChangeRating(+value)}
                    />
                  }
                >
                  <div className="flex flex-wrap items-center">
                    <SfRating
                      className="-mt-px"
                      value={Number(value)}
                      max={5}
                      size="sm"
                    />
                    <span
                      className={classNames("mx-2 text-base md:text-sm", {
                        "font-medium": +value === filter.rating,
                      })}
                    >
                      {label}
                    </span>
                  </div>
                </SfListItem>
              ))}
            </fieldset>
          </SfAccordionItem>
        </div>
        <div className="flex justify-between mt-3">
          <SfButton
            variant="tertiary"
            className="w-full mr-3"
            onClick={handleClearFilters}
          >
            Clear all filters
          </SfButton>
          <SfButton
            onClick={() => onApply?.({ ...preFilter, page: 1 })}
            className="w-full"
          >
            Show products
          </SfButton>
        </div>
        <SfButton onClick={onClose} variant="secondary" className="w-full mt-4">
          Close filter
        </SfButton>
      </aside>
    </SfDrawer>
  );
};

export default FilterDetail;
