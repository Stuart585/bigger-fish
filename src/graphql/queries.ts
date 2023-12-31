/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUserData = /* GraphQL */ `
  query GetUserData($id: ID!) {
    getUserData(id: $id) {
      id
      profileImage
      userEmail
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listUserData = /* GraphQL */ `
  query ListUserData(
    $filter: ModelUserDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserData(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        profileImage
        userEmail
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getCatch = /* GraphQL */ `
  query GetCatch($id: ID!) {
    getCatch(id: $id) {
      id
      name
      species
      length
      date
      location
      locationId
      image
      userImage
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
        locationId
        image
        userImage
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
