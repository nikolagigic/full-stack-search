import mongoClient, { MongoClientSingleton } from "utils/mongo-client";
import { Filter, Document, ObjectId, WithId } from "mongodb";
import type { AccomodationsResponse } from "db/types";

export const getAccomodations = async (
  search: string
): Promise<AccomodationsResponse> => {
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

  const hotelsCacheKey = `hotels-${search}`;
  const countriesCacheKey = `countries-${search}`;
  const citiesCacheKey = `cities-${search}`;
  const [hotels, countries, cities] = await Promise.all([
    await MongoClientSingleton.cachedQuery(
      "hotels",
      hotelsQuery,
      {},
      hotelsCacheKey,
      30000
    ),
    await MongoClientSingleton.cachedQuery(
      "countries",
      countriesQuery,
      {},
      countriesCacheKey,
      30000
    ),
    await MongoClientSingleton.cachedQuery(
      "cities",
      citiesQuery,
      {},
      citiesCacheKey,
      30000
    ),
  ]);

  const formattedResponse = {
    hotels,
    countries,
    cities,
  };

  return formattedResponse;
};

export const getHotelById = async (id?: string) => {
  const db = mongoClient.db();
  const hotels = db.collection("hotels");
  const hotel = await hotels.findOne({ _id: new ObjectId(id) });

  return hotel;
};

export const getCountryById = async (id?: string) => {
  const db = mongoClient.db();
  const countries = db.collection("countries");
  const country = await countries.findOne({ _id: new ObjectId(id) });

  return country;
};

export const getCityById = async (id?: string) => {
  const db = mongoClient.db();
  const cities = db.collection("cities");
  const city = await cities.findOne({ _id: new ObjectId(id) });

  return city;
};
