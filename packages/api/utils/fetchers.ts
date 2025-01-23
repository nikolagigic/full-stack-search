import mongoClient from "utils/mongo-client";
import { Filter, Document } from "mongodb";
import type { AccomodationsResponse } from "db/types";

export const getAccomodations = async (
  search: string
): Promise<AccomodationsResponse> => {
  const db = mongoClient.db();
  const hotelsCollection = db.collection("hotels");
  const countriesCollection = db.collection("countries");
  const citiesCollection = db.collection("cities");

  const hotelsQuery: Filter<Document | AccomodationsResponse["hotels"]> = {};
  const countriesQuery: Filter<Document | AccomodationsResponse["countries"]> =
    {};
  const citiesQuery: Filter<Document | AccomodationsResponse["cities"]> = {};
  if (search) {
    const searchRegex = new RegExp(search, "i"); // case-insensitive search

    hotelsQuery.$or = [
      { chain_name: searchRegex },
      { hotel_name: searchRegex },
      { city: searchRegex },
      { country: searchRegex },
    ];
    countriesQuery.$or = [
      { country: searchRegex },
      { countryisocode: searchRegex },
    ];
    citiesQuery.$or = [{ name: searchRegex }];
  }

  const [hotels, countries, cities] = await Promise.all([
    hotelsCollection.find(hotelsQuery).toArray(),
    countriesCollection.find(countriesQuery).toArray(),
    citiesCollection.find(citiesQuery).toArray(),
  ]);

  const formattedResponse = {
    hotels,
    countries,
    cities,
  };

  return formattedResponse;
};
