import { createFileRoute } from '@tanstack/react-router'
import { fetchCity } from '@/utils/fetchers/fetch-accomodations'

export const Route = createFileRoute('/city/$id')({
  component: RouteComponent,
  loader: async ({ params: { id } }) => {
    const city = await fetchCity(id)
    return { city }
  },
})

function RouteComponent() {
  const { city } = Route.useLoaderData()

  return (
    <div className="accomodation-page">
      <div className="container">
        <h1>{city.name}</h1>
      </div>
    </div>
  )
}
