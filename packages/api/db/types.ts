import type { WithId, Document } from "mongodb";

export type City = {
  name: string;
};

export type Country = {
  country: string;
  countryisocode: string;
};

export type Hotel = {
  chain_name: string;
  hotel_name: string;
  addressline1: string;
  addressline2?: string;
  zipcode: string;
  city: string;
  state: string;
  country: string;
  countryisocode: string;
  star_rating: number;
};

export type AccomodationsResponse = {
  hotels: WithId<Document | Hotel>[];
  cities: WithId<Document | City>[];
  countries: WithId<Document | Country>[];
};
