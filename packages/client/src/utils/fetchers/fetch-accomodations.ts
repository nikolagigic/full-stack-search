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

export const fetchHotel = async (id: string) => {
  const hotelData = await fetch(`${API_URL}/hotel/${id}`);
  const hotel = await hotelData.json();
  return hotel;
};

export const fetchCountry = async (id: string) => {
  const countryData = await fetch(`${API_URL}/country/${id}`);
  const country = await countryData.json();
  return country;
};

export const fetchCity = async (id: string) => {
  const cityData = await fetch(`${API_URL}/city/${id}`);
  const city = await cityData.json();
  return city;
};
