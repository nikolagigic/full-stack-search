# Accommodation Search

## Technical Coding Test

This project has a simple setup with an api, hooked up to MongoDB and a frontend piece initiated with [vite](https://vitejs.dev/).

## Install and run

From the project root:

```
npm install
```

### Run

Once install has finished, you can use the following to run both the API and UI:

```
npm run start
```

### API

To run the API separately, navigate to the `./packages/api` folder

```
$ cd packages/api
```

And run the `api` server with

```
$ npm run dev
```

The API should start at http://localhost:3001

### Client

To run the `client` server separately, navigate to the `./packages/client` folder

```
$ cd ./packages/client
```

And run the `client` with

```
$ npm run start
```

The UI should start at http://localhost:3000

### Database connection & environment variables

By default, the code is set up to start and seed a MongoDB in-memory server, which should be sufficient for the test. The database URL will be logged on startup, and the seed data can be found at ./packages/api/db/seeds.

If this setup does not work for you or if you prefer to use your own MongoDB server, you can create a .env file. In the ./packages/api folder, create a .env file (or rename the existing .env.sample) and fill in the environment variables.

## Task at hand

When the project is up and running, you should see a search-bar on the screen. This one is currently hooked up to the `/hotels` endpoint.
When you type in a partial string that is part of the name of the hotel, it should appear on the screen.
Ie. type in `resort` and you should see some Hotels where the word `resort` is present.

You will also see 2 headings called **"Countries"** and **"Cities"**.

The assignment is to build a performant way to search for Hotels, Cities or Countries.
Partial searches will be fine. Hotels will need to filterable by location as well.
Ie. The search `uni` should render

- Hotels that are located in the United States, United Kingdom or have the word `uni` in the hotel name.
- Countries that have `uni` in their name Ie. United States, United Kingdom
- No Cities as there is no match

Clicking the close button within the search field should clear out the field and results.

When clicking on one of the `Hotels`, `Cities` or `Countries` links, the application should redirect to the relevant page and render the selected `Hotel`, `City` or `Country` as a heading.

### Limitations

Given the time constraints, we do not expect a fully production-ready solution. We're primarily interested in the approach and the overall quality of the solution.
Feel free to modify the current codebase as needed, including adding or removing dependencies.
For larger or more time-intensive changes, you're welcome to outline your ideas in the write-up section below and discuss them further during the call.

<img src="./assets/search-example.png" width="400px" />

### Write-up

<!-- Write-up/conclusion section -->

- The MongoDB client should not be initialized within an API route because it creates a new connection for every request, leading to significant performance overhead and exceeding connection limits. MongoDB is designed to reuse a single client instance with connection pooling for efficiency. Initializing the client globally or during app startup ensures optimal resource utilization and avoids memory leaks, especially in serverless environments.

- In real world scenario we would ideally want to have schema and models which we can use for type bindings during fetching. I abstracted the types of Hotels, Countries and Cities and created a "type-generator" on the client side to mock the behaviour of codegens and ensure type safety.

- I implemented custom in-memory caching on the backend side for findMany queries as MongoDB does not support it out of the box. Implementing any other caching 3rd party service like Redis might be a hussle to set-up on the reviewers side, hence the custom solution. Another thing I would consider is queuing if I was to look out for scalability. Not needed for the purpose of this demo.

- Custom debouncing is implemented on the front-end side so not every character change is triggering a side-effect.

- Loaders are used so we make sure data is ready before the page renders as this is key information that will be presented on the page. Loaders are cached by default which is also a plus for our use case.

- I tried implementing infinite scrolling but due to the nature of data and how the initial presentation of the data within scroll component and data structure has be setup it was difficult to work with it and setup headings in places while keeping the loadMore intersections working. Another way to go around this that I thinked of is instead of headings I would use other types of accomodation visualisation, like icons at the end of the name. Also, mongodb restrictions with relationships would insist on artificial foreign keys to perform true joins and get the true number of asked items rather then fetching the number of items from each collection. This was also a key factor in infinite scrolling implementation. It is possible but can be time consuming.

- MongoDB might not be the best option in our usecase as we could use more read-heavy optimised engines we find in relational databases where we can create indexes and decrease the txs computation time, implement relationships and use joins.

### Database structure

#### Hotels Collection

```json
[
  {
    "chain_name": "Samed Resorts Group",
    "hotel_name": "Sai Kaew Beach Resort",
    "addressline1": "8/1 Moo 4 Tumbon Phe Muang",
    "addressline2": "",
    "zipcode": "21160",
    "city": "Koh Samet",
    "state": "Rayong",
    "country": "Thailand",
    "countryisocode": "TH",
    "star_rating": 4
  },
  {
    /* ... */
  }
]
```

#### Cities Collection

```json
[
  { "name": "Auckland" },
  {
    /* ... */
  }
]
```

#### Countries Collection

```json
[
  {
    "country": "Belgium",
    "countryisocode": "BE"
  },
  {
    /* ... */
  }
]
```
