import { defineStore } from 'pinia'

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
        bannerImage: '',
        cardImage: ''
      },
      {
        id: 'schooner',
        name: 'Schooner Lake',
        species: [
            { value: 'bass', label: 'Bass' },
            { value: 'walleye', label: 'Walleye' },
            { value: 'pike', label: 'Pike' },
          ],
        bannerImage: '',
        cardImage: ''
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
        bannerImage: '',
        cardImage: ''
      }
    ],
    userData: {
      name: 'Bob69',
      profileImage: 'profilePic'
    },
    //allCatches: [] as catchType[],
    allCatches: [] as any[],
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
  }
})

interface catchType {
  name: string
  species: string
  length: number
  date: string
  location: string
}
