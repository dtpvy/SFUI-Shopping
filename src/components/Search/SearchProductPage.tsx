import { useMemo, useState } from "react";

import { SfSelect } from "@storefront-ui/react";
import { IconAdjustmentsHorizontal } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

import { searchProducts } from "@/apis/product";
import { SORT_OPTIONS } from "@/constants/filter";
import { type FilterOptions } from "@/types/filter";

import { Breadcrumb } from "../Common";
import { Layout } from "../Layout";
import FilterDetail from "./FilterDetail";
import Pagination from "./Pagination";
import ProductList from "./ProductList";

const SearchProductPage = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const category = query.get("category");

  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<FilterOptions>({
    page: 1,
    categories: category ? [category] : [],
    priceFrom: 0,
    priceTo: Infinity,
    rating: 0,
    sortType: null,
    order: null,
  });

  const { data, isLoading } = useQuery({
    queryKey: ["searchProducts", filter],
    queryFn: () => {
      return searchProducts(filter);
    },
  });

  const [start, end] = useMemo(() => {
    if (!data) return [];
    const start = (data.page - 1) * data.pageSize + 1;
    const end = start + data.data.length - 1;
    return [start, end];
  }, [data]);

  const handleChangePage = (page: number) => {
    setFilter((prev) => ({
      ...prev,
      page,
    }));
  };

  const handleChangeSort = (value: string) => {
    const sort = SORT_OPTIONS.find((sort) => sort.value === value);

    setFilter((prev) => ({
      ...prev,
      sortType: sort?.type || null,
      order: sort?.order || null,
    }));
  };

  return (
    <Layout>
      <div className="bg-gradient-to-b from-cyan-400 to-green-200 h-[200px] flex flex-col items-center justify-center gap-3">
        <h3 className="font-bold text-2xl">Shop</h3>
        <Breadcrumb />
      </div>
      <div className="flex flex-row px-10 py-4 bg-green-200 gap-5 items-center">
        <div
          onClick={() => setOpen(true)}
          className="flex cursor-pointer font-medium hover:bg-green-700 hover:text-white rounded px-3 py-2"
        >
          <IconAdjustmentsHorizontal />
          <div>Filter</div>
        </div>
        <div className="border-l border-green-700 pl-4">
          {data && `Showing ${start}-${end} of ${data?.totalItems} results`}
        </div>
        <div className="flex gap-3 items-center ml-auto">
          Sort by
          <SfSelect
            onChange={(event) => handleChangeSort(event.target.value)}
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
      </div>
      <ProductList isLoading={isLoading} data={data?.data || []} />
      {data && (
        <Pagination
          currentPage={data.page}
          pageSize={data.pageSize}
          totalItems={data.totalItems}
          onChange={handleChangePage}
        />
      )}
      {open && (
        <FilterDetail
          open={open}
          filter={filter}
          onApply={setFilter}
          onClose={() => setOpen(false)}
        />
      )}
    </Layout>
  );
};

export default SearchProductPage;
