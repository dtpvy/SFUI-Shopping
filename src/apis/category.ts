import { type Category } from "@/types/category";
import { BASE_URL } from "@/utils/env";

import { apiGet } from "./api";

export const getCategories = async () => {
  try {
    const res = await apiGet<null, DataResponse<Category[]>>(
      `${BASE_URL}/categories`,
    );
    return res.data;
  } catch {
    return null;
  }
};
