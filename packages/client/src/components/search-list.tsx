import type { AccomodationsResponse } from "@/utils/type-generator";
import { Link } from "@tanstack/react-router";

interface SearchlistProps {
  hotels?: AccomodationsResponse["hotels"];
  countries?: AccomodationsResponse["countries"];
  cities?: AccomodationsResponse["cities"];
}

export default function SearchList({
  hotels,
  countries,
  cities,
}: SearchlistProps) {
  const hotelsLength = hotels?.length ?? 0;
  const countriesLength = countries?.length ?? 0;
  const citiesLength = cities?.length ?? 0;

  const combinedLength = hotelsLength + countriesLength + citiesLength;

  return (
    <div className="search-dropdown-menu dropdown-menu w-100 show p-2">
      {combinedLength === 0 ? (
        <p>No Accomodations found</p>
      ) : (
        <>
          <h1>Hotels</h1>
          {hotelsLength === 0 ? (
            <p>No hotels found</p>
          ) : (
            hotels!.map((hotel, i) => (
              <li key={i}>
                <Link
                  to={`/hotel/$id`}
                  params={{ id: hotel._id.toString() }}
                  className="dropdown-item"
                >
                  <i className="fa fa-building mr-2"></i>
                  {hotel.hotel_name}
                </Link>
                <hr className="divider" />
              </li>
            ))
          )}
          <h1>Countries</h1>
          {countriesLength === 0 ? (
            <p>No countries found</p>
          ) : (
            countries!.map((country, i) => (
              <li key={i}>
                <Link
                  to={`/country/$id`}
                  params={{ id: country._id.toString() }}
                  className="dropdown-item"
                >
                  <i className="fa fa-building mr-2"></i>
                  {country.country}
                </Link>
                <hr className="divider" />
              </li>
            ))
          )}
          <h1>Cities</h1>
          {citiesLength === 0 ? (
            <p>No cities found</p>
          ) : (
            cities!.map((city, i) => (
              <li key={i}>
                <Link
                  to={`/city/$id`}
                  params={{ id: city._id.toString() }}
                  className="dropdown-item"
                >
                  <i className="fa fa-building mr-2"></i>
                  {city.name}
                </Link>
                <hr className="divider" />
              </li>
            ))
          )}
        </>
      )}
    </div>
  );
}
