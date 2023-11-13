/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCatch = /* GraphQL */ `
  mutation CreateCatch(
    $input: CreateCatchInput!
    $condition: ModelCatchConditionInput
  ) {
    createCatch(input: $input, condition: $condition) {
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
export const updateCatch = /* GraphQL */ `
  mutation UpdateCatch(
    $input: UpdateCatchInput!
    $condition: ModelCatchConditionInput
  ) {
    updateCatch(input: $input, condition: $condition) {
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
export const deleteCatch = /* GraphQL */ `
  mutation DeleteCatch(
    $input: DeleteCatchInput!
    $condition: ModelCatchConditionInput
  ) {
    deleteCatch(input: $input, condition: $condition) {
      id
      name
      species
      length
      date
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createLocation = /* GraphQL */ `
  mutation CreateLocation(
    $input: CreateLocationInput!
    $condition: ModelLocationConditionInput
  ) {
    createLocation(input: $input, condition: $condition) {
      id
      name
      species
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateLocation = /* GraphQL */ `
  mutation UpdateLocation(
    $input: UpdateLocationInput!
    $condition: ModelLocationConditionInput
  ) {
    updateLocation(input: $input, condition: $condition) {
      id
      name
      species
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteLocation = /* GraphQL */ `
  mutation DeleteLocation(
    $input: DeleteLocationInput!
    $condition: ModelLocationConditionInput
  ) {
    deleteLocation(input: $input, condition: $condition) {
      id
      name
      species
      createdAt
      updatedAt
      __typename
    }
  }
`;
