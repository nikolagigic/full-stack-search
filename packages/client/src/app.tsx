import { useState, type ChangeEvent } from "react";
import { getCodeSandboxHost } from "@codesandbox/utils";
import { AccomodationsResponse } from "@utils/type-generator";
import { SearchList } from "./components";

const codeSandboxHost = getCodeSandboxHost(3001);
const API_URL = codeSandboxHost
  ? `https://${codeSandboxHost}`
  : "http://localhost:3001";

const fetchAndFilterHotels = async (value: string) => {
  const accomodationsData = await fetch(
    `${API_URL}/accomodations?search=${value}`
  );
  const accomodations =
    (await accomodationsData.json()) as AccomodationsResponse;
  return accomodations;
};

function App() {
  const [accomodations, setAccomodations] = useState<AccomodationsResponse>();
  const [isSearching, setIsSearching] = useState(false);

  const fetchData = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "") {
      setAccomodations({
        cities: [],
        countries: [],
        hotels: [],
      });
      setIsSearching(false);
      return;
    }

    const filteredHotels = await fetchAndFilterHotels(event.target.value);
    console.log(filteredHotels);
    setIsSearching(true);
    setAccomodations(filteredHotels);
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
                  onChange={fetchData}
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
