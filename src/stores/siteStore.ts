import { defineStore } from 'pinia'
import type { LocationType, catchType } from './models'

export const useSiteStore = defineStore('siteStore', {
  state: () => ({
    locations: [
      {
        id: 'centennial',
        name: 'Centennial Lake',
        species: [
          { value: 'bass', label: 'Bass' },
          { value: 'walleye', label: 'Walleye' },
          { value: 'pike', label: 'Pike' },
          { value: 'trout', label: 'Trout' }
        ],
        cardImage: "centennial-map-2.png"
      },
      {
        id: 'shiner',
        name: 'Shiner Lake',
        species: [
            { value: 'bass', label: 'Bass' },
            { value: 'walleye', label: 'Walleye' },
            { value: 'perch', label: 'Perch' },
            { value: 'trout', label: 'Trout' }
          ],
        cardImage: 'shiner-map-1.png'
      },
      {
        id: 'schooner',
        name: 'Schooner Lake',
        species: [
            { value: 'bass', label: 'Bass' },
            { value: 'walleye', label: 'Walleye' },
            { value: 'pike', label: 'Pike' },
          ],
        cardImage: 'schooner-map-1.png'
      },
     
    ] as LocationType[],
    userData: {
      name: 'Bob69',
      profileImage: 'profilePic'
    },
    allCatches: [] as catchType[],
    selectedLocation: null
  }),
  getters: {
    getLocationById: (state) => {
      return (locationId: string) => state.locations.find((location) => location.id === locationId)
    },
    getCatchesBySpecies: (state) => {
      return (species: string) =>
        state.allCatches.filter((catchObject) => catchObject.species === species)
    },
    getCatchesByLocation: (state) => {
      return (locationId: string) =>
        state.allCatches.filter((catchObject) => catchObject.location === locationId)
    },
    getSpeciesByLocation: (state) => {
        return (locationId: string) => state.locations.find((location) => location.id === locationId)?.species
    },
    getCatchesByUser: (state) => {
      return (userName: string) =>  state.allCatches.filter((catchObject) => catchObject.name === userName)
  }}
})

