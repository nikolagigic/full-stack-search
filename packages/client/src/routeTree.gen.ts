/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as HotelIdImport } from './routes/hotel/$id'
import { Route as CountryIdImport } from './routes/country/$id'
import { Route as CityIdImport } from './routes/city/$id'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const HotelIdRoute = HotelIdImport.update({
  id: '/hotel/$id',
  path: '/hotel/$id',
  getParentRoute: () => rootRoute,
} as any)

const CountryIdRoute = CountryIdImport.update({
  id: '/country/$id',
  path: '/country/$id',
  getParentRoute: () => rootRoute,
} as any)

const CityIdRoute = CityIdImport.update({
  id: '/city/$id',
  path: '/city/$id',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/city/$id': {
      id: '/city/$id'
      path: '/city/$id'
      fullPath: '/city/$id'
      preLoaderRoute: typeof CityIdImport
      parentRoute: typeof rootRoute
    }
    '/country/$id': {
      id: '/country/$id'
      path: '/country/$id'
      fullPath: '/country/$id'
      preLoaderRoute: typeof CountryIdImport
      parentRoute: typeof rootRoute
    }
    '/hotel/$id': {
      id: '/hotel/$id'
      path: '/hotel/$id'
      fullPath: '/hotel/$id'
      preLoaderRoute: typeof HotelIdImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/city/$id': typeof CityIdRoute
  '/country/$id': typeof CountryIdRoute
  '/hotel/$id': typeof HotelIdRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/city/$id': typeof CityIdRoute
  '/country/$id': typeof CountryIdRoute
  '/hotel/$id': typeof HotelIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/city/$id': typeof CityIdRoute
  '/country/$id': typeof CountryIdRoute
  '/hotel/$id': typeof HotelIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/city/$id' | '/country/$id' | '/hotel/$id'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/city/$id' | '/country/$id' | '/hotel/$id'
  id: '__root__' | '/' | '/city/$id' | '/country/$id' | '/hotel/$id'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  CityIdRoute: typeof CityIdRoute
  CountryIdRoute: typeof CountryIdRoute
  HotelIdRoute: typeof HotelIdRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  CityIdRoute: CityIdRoute,
  CountryIdRoute: CountryIdRoute,
  HotelIdRoute: HotelIdRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/city/$id",
        "/country/$id",
        "/hotel/$id"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/city/$id": {
      "filePath": "city/$id.tsx"
    },
    "/country/$id": {
      "filePath": "country/$id.tsx"
    },
    "/hotel/$id": {
      "filePath": "hotel/$id.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
