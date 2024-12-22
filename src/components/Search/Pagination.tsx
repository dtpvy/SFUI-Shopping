import { useMemo } from "react";

import {
  SfButton,
  SfIconChevronLeft,
  SfIconChevronRight,
  usePagination,
} from "@storefront-ui/react";
import classNames from "classnames";

type Props = {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  onChange: (page: number) => void;
};

const Pagination = ({ currentPage, pageSize, totalItems, onChange }: Props) => {
  const { totalPages, selectedPage } = usePagination({
    totalItems,
    currentPage,
    pageSize,
  });

  const slicePage = useMemo(() => {
    let startPages: number[] = [],
      middlePages: number[] | null = null,
      endPages: number[] = [];
    if (totalPages <= 6) {
      startPages = new Array(totalPages).fill(0);
    } else {
      startPages = new Array(2).fill(0);
      middlePages =
        selectedPage > 2 && selectedPage <= totalPages - 2
          ? new Array(1).fill(selectedPage)
          : [];
      endPages = new Array(2).fill(0);
    }
    return { startPages, middlePages, endPages };
  }, [selectedPage, totalPages]);

  const handleChange = (page: number) => {
    onChange(page);
  };

  return (
    <nav
      className="flex justify-between items-end border-t border-neutral-200 mb-10 px-5"
      role="navigation"
      aria-label="pagination"
    >
      <SfButton
        size="lg"
        className="gap-3 px-3 sm:px-6"
        aria-label="Go to previous page"
        disabled={selectedPage <= 1}
        variant="tertiary"
        slotPrefix={<SfIconChevronLeft />}
        onClick={() => handleChange(selectedPage - 1)}
      >
        <span className="hidden sm:inline-flex">Previous</span>
      </SfButton>
      <ul className="flex justify-center">
        {slicePage.startPages.map((_, index) => (
          <li key={index + 1}>
            <div
              className={classNames("flex pt-1 border-t-4 border-transparent", {
                "font-medium border-t-4 !border-primary-700":
                  selectedPage === index + 1,
              })}
            >
              <button
                type="button"
                className="min-w-[38px] px-3 sm:px-4 py-3 rounded-md text-neutral-500 md:w-12 hover:bg-primary-100 hover:text-primary-800 active:bg-primary-200 active:text-primary-900"
                aria-current={selectedPage === index + 1}
                onClick={() => handleChange(index + 1)}
              >
                {index + 1}
              </button>
            </div>
          </li>
        ))}
        {slicePage.middlePages !== null && selectedPage - 1 > 2 && (
          <li>
            <div className="flex pt-1 border-t-4 border-transparent">
              <button
                type="button"
                disabled
                aria-hidden="true"
                className="px-3 sm:px-4 py-3 rounded-md text-neutral-500 "
              >
                ...
              </button>
            </div>
          </li>
        )}
        {slicePage.middlePages?.map((page) => (
          <li key={page}>
            <div
              className={classNames("flex pt-1 border-t-4 border-transparent", {
                "font-medium border-t-4 !border-primary-700":
                  selectedPage === page,
              })}
            >
              <button
                type="button"
                className="min-w-[38px] px-3 sm:px-4 py-3 rounded-md text-neutral-500 md:w-12 hover:bg-primary-100 hover:text-primary-800 active:bg-primary-200 active:text-primary-900"
                aria-current={selectedPage === page}
                onClick={() => handleChange(page)}
              >
                {page}
              </button>
            </div>
          </li>
        ))}
        {slicePage.middlePages !== null &&
          selectedPage + 1 <= totalPages - 2 && (
            <li>
              <div className="flex pt-1 border-t-4 border-transparent">
                <button
                  type="button"
                  disabled
                  aria-hidden="true"
                  className="px-3 sm:px-4 py-3 rounded-md text-neutral-500 "
                >
                  ...
                </button>
              </div>
            </li>
          )}
        {slicePage.endPages.map((_, index) => {
          const page = totalPages - slicePage.endPages.length + index + 1;
          return (
            <li key={page}>
              <div
                className={classNames(
                  "flex pt-1 border-t-4 border-transparent",
                  {
                    "font-medium border-t-4 !border-primary-700":
                      selectedPage === page,
                  },
                )}
              >
                <button
                  type="button"
                  className="min-w-[38px] px-3 sm:px-4 py-3 rounded-md text-neutral-500 md:w-12 hover:bg-primary-100 hover:text-primary-800 active:bg-primary-200 active:text-primary-900"
                  aria-current={selectedPage === page}
                  onClick={() => handleChange(page)}
                >
                  {page}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <SfButton
        size="lg"
        aria-label="Go to next page"
        disabled={selectedPage >= totalPages}
        variant="tertiary"
        slotSuffix={<SfIconChevronRight />}
        className="gap-3 px-3 sm:px-6"
        onClick={() => handleChange(selectedPage + 1)}
      >
        <span className="hidden sm:inline-flex">Next</span>
      </SfButton>
    </nav>
  );
};

export default Pagination;
