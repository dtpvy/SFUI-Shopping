import { type Banner } from "@/types/banner";
import { BASE_URL } from "@/utils/env";

import { apiGet } from "./api";

export const getBannerInfo = async () => {
  try {
    const res = await apiGet<null, DataResponse<Banner>>(`${BASE_URL}/banner`);
    return res.data;
  } catch {
    return null;
  }
};
