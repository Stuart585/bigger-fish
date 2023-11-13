/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCatch = /* GraphQL */ `
  query GetCatch($id: ID!) {
    getCatch(id: $id) {
      id
      name
      species
      length
      date
      location
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listCatches = /* GraphQL */ `
  query ListCatches(
    $filter: ModelCatchFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCatches(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        species
        length
        date
        location
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getLocation = /* GraphQL */ `
  query GetLocation($id: ID!) {
    getLocation(id: $id) {
      id
      name
      species
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listLocations = /* GraphQL */ `
  query ListLocations(
    $filter: ModelLocationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLocations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        species
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
