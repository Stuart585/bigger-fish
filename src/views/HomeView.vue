<template>
  <main>
    <div v-if="selectedLocation === null" class="h-screen">
      <!-- <div class="flex justify-center my-10">
        <h1 class="text-3xl font-bold text-slate-100">Select Region</h1>
      </div> -->
      <div class="grid grid-cols-3 gap-3 mt-32">
        <CardComponent v-for="location in allLocations" :key="location" :titleTest="location.name"
          @cardClicked="setLocation(location.id)" />
      </div>
    </div>
    <div v-if="selectedLocation !== null" class="pt-20">
      <!-- Title -->
      <!-- <div class="flex text-xl text-slate-100">
        <div class="w-full">{{ getLocationById(selectedLocation).name }}</div>
        <div @click="selectedLocation = null" class="cursor-pointer">Back</div>
      </div> -->
      <!-- banner image -->
      <div class=" h-60 text-8xl text-white font-semibold ">
        <div class="flex justify-center items-center bg-white h-full w-full bg-opacity-0">{{
          getLocationById(selectedLocation).name }}</div>
      </div>
      <!-- species -->
      <div class="flex flex-cols gap-3 my-10">
        <!-- <button v-for="species in getLocationById(selectedLocation).species" :key="species"
          class="bg-sky-900 w-full p-3 rounded-lg text-slate-100 text-xl" @click="setSpecies(species)">
          {{ species.label }}
        </button> -->
        <button-component v-for="species in getLocationById(selectedLocation).species" :key="species" :species="species" @buttonClick="setSpecies(species)"></button-component>
      </div>
      <!-- Table -->
      <div class="rounded-md overflow-hidden">
      <table class="w-full min-w-max table-auto text-left bg-white  bg-opacity-70 ">
        <thead class=" outline outline-1 outline-slate-200">
          <tr >
            <th @click="sortCatches('name')"><div class="px-3 py-1">Angler</div></th>
            <th>Species</th>
            <th @click="sortCatches('length')">Length</th>
            <th>Date</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="catchData in catches" :key="catchData" @click="selectCatch(catchData)"
            class="outline outline-1 outline-slate-200">
            <td><div class="px-3 py-1">{{ catchData.name }}</div></td>
            <td>{{ catchData.species }}</td>
            <td>{{ catchData.length }}</td>
            <td>{{ catchData.date }}</td>
            <td>{{ catchData.location }}</td>
          </tr>
        </tbody>
      </table>
    </div>
      <!-- Selected Catch -->
      <div class="grid grid-cols-2 gap-3 my-10">
        <div>
          <img src="./../assets/images/lake1photo.jpg" class="w-full h-60 object-cover" />
        </div>
        <div class="w-full h-60 bg-sky-900 rounded-md">
          <div class="h-2/3 overflow-clip flex justify-center p-3">
            <image-display v-if="selectedCatch.test" :imageKey="selectedCatch?.test"></image-display>
            <img v-else src="./../assets/images/fish_profile.png" class="h-full object-scale-down rounded-full" />
          </div>
          <div class="h-1/3 grid grid-cols-2 gap-5 py-3 text-slate-200">
            <div class="text-right">
              Name: {{ selectedCatch.name }}
              <br />
              Length: {{ selectedCatch.length }}
              <br />
            </div>
            <div class="text-left">
              Location: {{ selectedCatch.location }}
              <br />
              Date: {{ selectedCatch.date }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup >
import CardComponent from './../components/CardComponent.vue'
import ButtonComponent from './../components/ButtonComponent.vue'
import ImageDisplay from './../components/ImageDisplay.vue'
import { ref, onMounted } from 'vue';
import { useSiteStore } from './../stores/siteStore';
import { storeToRefs } from 'pinia'
import { API } from 'aws-amplify';
import { listCatches } from './../graphql/queries';

const store = useSiteStore();
const { getLocationById } = storeToRefs(store)

let selectedLocation = ref(null)

let allLocations = ref(store.locations)
let locationSpecies = ref([])
let selectedSpecies = ref('')
let selectedCatch = ref({})

let catches = ref([])

const getCatches = async () => {
  const newCatches = await API.graphql({
    query: listCatches
  })
  store.allCatches = newCatches.data.listCatches.items
}

const setLocation = (locationId) => {
  selectedLocation.value = locationId
  locationSpecies.value = allLocations.value.find((location) => {
    location.id === locationId
  })

  const firstSpecies = allLocations.value.find((location) => location.id === selectedLocation.value)
    .species[0].value
  catches.value = JSON.parse(JSON.stringify(store.getCatchesBySpecies(firstSpecies)))
  catches.value.sort((a, b) => b.length - a.length)
  selectedCatch.value = catches.value[0]
}

const setSpecies = (species) => {
  selectedSpecies.value = species
  catches.value = JSON.parse(JSON.stringify(store.getCatchesBySpecies(selectedSpecies.value.value)))
  catches.value.sort((a, b) => b.length - a.length)
}

const selectCatch = (catchData) => {
  selectedCatch.value = catchData
}

onMounted(() => {
  getCatches()
})
</script>

<style>
.banner-bg {
  background-image: url("./../assets/images/centennial-lake-1.png");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
}</style>
