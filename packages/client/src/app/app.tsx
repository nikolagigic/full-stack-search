import { useState, useCallback, type ChangeEvent } from "react";
import { AccomodationsResponse } from "@/utils/type-generator";
import { SearchList } from "@/components";
import { fetchAndFilterHotels } from "@/utils/fetchers/fetch-accomodations";
import useDebounce from "@/utils/hooks/useDebounce";

function App() {
  const [accomodations, setAccomodations] = useState<AccomodationsResponse>();
  const [isSearching, setIsSearching] = useState(false);

  const fetchData = async (query: string) => {
    if (query === "") {
      setAccomodations({
        cities: [],
        countries: [],
        hotels: [],
      });
      setIsSearching(false);
      return;
    }

    const filteredHotels = await fetchAndFilterHotels(query);
    console.log(filteredHotels);
    setIsSearching(true);
    setAccomodations(filteredHotels);
  };

  const debouncedFetchData = useDebounce<string[]>(fetchData, 500);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      debouncedFetchData(event.target.value);
    },
    [debouncedFetchData]
  );

  return (
    <div className="App">
      <div className="container">
        <div className="row height d-flex justify-content-center align-items-center">
          <div className="col-md-6">
            <div className="dropdown">
              <div className="form">
                <i className="fa fa-search"></i>
                <input
                  type="text"
                  className="form-control form-input"
                  placeholder="Search accommodation..."
                  onChange={handleInputChange}
                />
                {isSearching && (
                  <span className="left-pan">
                    <i className="fa fa-close"></i>
                  </span>
                )}
              </div>
              {isSearching && (
                <SearchList
                  cities={accomodations?.cities}
                  countries={accomodations?.countries}
                  hotels={accomodations?.hotels}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
