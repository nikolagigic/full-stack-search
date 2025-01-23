import { API_URL } from "@/constants";
import type { AccomodationsResponse } from "@/utils/type-generator";

export const fetchAndFilterHotels = async (value: string) => {
  const accomodationsData = await fetch(
    `${API_URL}/accomodations?search=${value}`
  );
  const accomodations =
    (await accomodationsData.json()) as AccomodationsResponse;
  return accomodations;
};
