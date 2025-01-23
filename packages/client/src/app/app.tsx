import { useState, useCallback, type ChangeEvent } from "react";
import { AccomodationsResponse } from "@/utils/type-generator";
import { SearchList } from "@/components";
import { fetchAndFilterHotels } from "@/utils/fetchers/fetch-accomodations";
import useDebounce from "@/utils/hooks/useDebounce";

function App() {
  const [accomodations, setAccomodations] =
    useState<AccomodationsResponse | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async (query: string) => {
    const filteredHotels = await fetchAndFilterHotels(query);
    setAccomodations(filteredHotels);
  };

  const debouncedFetchData = useDebounce<string[]>(fetchData, 500);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      if (value === "") {
        setAccomodations(null);
        setSearchQuery("");
        return;
      }

      setSearchQuery(value);
      debouncedFetchData(value);
    },
    [debouncedFetchData]
  );

  const onClear = () => {
    setSearchQuery("");
    setAccomodations(null);
  };

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
                  value={searchQuery}
                  onChange={handleInputChange}
                />
                {searchQuery && (
                  <span className="left-pan">
                    <button onClick={onClear}>
                      <i className="fa fa-close"></i>
                    </button>
                  </span>
                )}
              </div>
              {accomodations && (
                <SearchList
                  cities={accomodations.cities}
                  countries={accomodations.countries}
                  hotels={accomodations.hotels}
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
