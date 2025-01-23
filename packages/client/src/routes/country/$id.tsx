import { createFileRoute } from "@tanstack/react-router";
import { fetchCountry } from "@/utils/fetchers/fetch-accomodations";

export const Route = createFileRoute("/country/$id")({
  component: RouteComponent,
  loader: async ({ params: { id } }) => {
    const country = await fetchCountry(id);
    return { country };
  },
});

function RouteComponent() {
  const { country } = Route.useLoaderData();

  return (
    <div className="accomodation-page">
      <div className="container">
        <h1>
          {country.country}, {country.countryisocode}
        </h1>
      </div>
    </div>
  );
}
