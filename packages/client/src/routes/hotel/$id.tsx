import { createFileRoute } from "@tanstack/react-router";
import { fetchHotel } from "@/utils/fetchers/fetch-accomodations";

export const Route = createFileRoute("/hotel/$id")({
  component: RouteComponent,
  loader: async ({ params: { id } }) => {
    const hotel = await fetchHotel(id);
    return { hotel };
  },
});

function RouteComponent() {
  const { hotel } = Route.useLoaderData();

  return (
    <div className="accomodation-page">
      <div className="container">
        <h1>{hotel.chain_name}</h1>
        <span>{hotel.hotel_name}</span>
      </div>
    </div>
  );
}
