export type FilterOptions = {
  page: number;
  categories: string[];
  priceFrom: number;
  priceTo: number;
  rating: number;
  sortType: null | string;
  order: string | null;
};
