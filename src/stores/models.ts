// export interface catchType {
// [x: string]: { name: string; length: number; location: string; date: string }
//     name: string
//     species: string
//     length: number
//     date: string
//     location: string
//   }

  export interface LabelValue {
    label: string,
    value: string
  }

  export interface catchType {
    name: string
    species: string
    length: number
    date: string
    location: string
    userImage: string
    image: string
  }

  export interface LocationType {
    id: string,
    name: string,
    species: LabelValue[],
    cardImage: string
  }