export const PRICE_FILTERS = [
  {
    id: "pr1",
    priceFrom: 0,
    priceTo: 24.99,
    label: "Under $24.99",
    value: "under",
  },
  {
    id: "pr2",
    priceFrom: 25,
    priceTo: 49.99,
    label: "$25.00 - $49.99",
    value: "25-49",
  },
  {
    id: "pr3",
    priceFrom: 50,
    priceTo: 99.99,
    label: "$50.00 - $99.99",
    value: "50-99",
  },
  {
    id: "pr4",
    priceFrom: 100,
    priceTo: 199.99,
    label: "$100.00 - $199.99",
    value: "100-199",
  },
  {
    id: "pr5",
    priceFrom: 200,
    priceTo: Infinity,
    label: "$200.00 and above",
    value: "above",
  },
];

export const RATING_FILTERS = [
  { id: "r1", label: "5", value: "5" },
  { id: "r2", label: "4 & up", value: "4" },
  { id: "r3", label: "3 & up", value: "3" },
  { id: "r4", label: "2 & up", value: "2" },
  { id: "r5", label: "1 & up", value: "1" },
];

export const SORT_OPTIONS = [
  {
    id: "sort1",
    label: "Relevance",
    value: "relevance",
    type: null,
    order: null,
  },
  {
    id: "sort2",
    label: "Price: Low to High",
    value: "price low to high",
    type: "price",
    order: "asce",
  },
  {
    id: "sort3",
    label: "Price: High to Low",
    value: "price high to low",
    type: "price",
    order: "dec",
  },
  {
    id: "sort4",
    label: "New Arrivals",
    value: "new arrivals",
    type: "time",
    order: "dec",
  },
];
