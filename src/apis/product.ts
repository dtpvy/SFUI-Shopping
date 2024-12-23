import { type Product } from "@/types/product";
import { BASE_URL } from "@/utils/env";

import { apiGet } from "./api";

export const getProducts = async () => {
  try {
    const res = await apiGet<null, DataResponse<Product[]>>(
      `${BASE_URL}/products`,
    );
    return res.data;
  } catch {
    return null;
  }
};

export const getHomeProducts = async () => {
  try {
    const res = await apiGet<null, DataResponse<Product[]>>(
      `${BASE_URL}/products`,
    );
    return res.data.sort(() => Math.random() - 0.5).slice(0, 12);
  } catch {
    return null;
  }
};

type SearchParam = Partial<{
  page: number;
  pageSize: number;
  categories: string[];
  priceTo: number;
  priceFrom: number;
  rating: number;
  sortType: string | null;
  order: string | null;
}>;

type PaginatedResponse<T> = {
  page: number;
  pageSize: number;
  totalPage: number;
  totalItems: number;
  data: T[];
};

const mockFilterProducts = (
  products: Product[],
  params: SearchParam,
): PaginatedResponse<Product> => {
  const {
    categories = [],
    priceFrom = 0,
    priceTo = Infinity,
    rating = 0,
    page = 1,
    pageSize = 10,
    sortType = null,
    order = null,
  } = params;

  const filteredByCategory = products.filter((product) =>
    categories.length ? categories.includes(product.category) : true,
  );

  const filteredByPrice = filteredByCategory.filter(
    (product) => product.price >= priceFrom && product.price <= priceTo,
  );

  const filteredByRating = filteredByPrice.filter(
    (product) => product.rating >= rating,
  );

  const totalItems = filteredByRating.length;
  const totalPage = Math.ceil(totalItems / pageSize);

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const sortedProducts = filteredByRating.sort((a, b) => {
    if (!sortType || !order) return 0;

    if (sortType === "price") {
      return order === "asce" ? a.price - b.price : b.price - a.price;
    } else {
      const dateA = new Date(a.meta.createdAt);
      const dateB = new Date(b.meta.createdAt);
      return order === "asce" ? +dateA - +dateB : +dateB - +dateA;
    }
  });

  const paginatedProducts = sortedProducts.slice(startIndex, endIndex);

  return {
    page,
    pageSize,
    totalPage,
    totalItems,
    data: paginatedProducts,
  };
};

export const searchProducts = async (params: SearchParam) => {
  try {
    const res = await apiGet<null, DataResponse<Product[]>>(
      `${BASE_URL}/products`,
    );

    return mockFilterProducts(res.data, params);
  } catch {
    return null;
  }
};

export const getProductById = async (id: string) => {
  try {
    const res = await apiGet<null, DataResponse<Product[]>>(
      `${BASE_URL}/products`,
    );
    return res.data.find((item) => item.id === id);
  } catch {
    return null;
  }
};
