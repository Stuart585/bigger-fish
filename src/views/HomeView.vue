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
      <!-- banner image -->
      <div class=" h-60 text-8xl text-white font-semibold ">
        <div class="flex justify-center items-center bg-white h-full w-full bg-opacity-0">{{
          getLocationById(selectedLocation).name }}</div>
        <!-- <div @click="selectedLocation = null" class="cursor-pointer">Back</div> -->
      </div>
      <!-- species -->
      <div class="flex flex-cols gap-3 my-10">
        <button-component v-for="species in getLocationById(selectedLocation).species" :key="species" :species="species"
          @buttonClick="setSpecies(species.value)"></button-component>
      </div>
      <!-- Table -->
      <div class="rounded-md overflow-hidden">
        <table class="w-full min-w-max table-auto text-left bg-white  bg-opacity-70 ">
          <thead class=" outline outline-1 outline-slate-200">
            <tr>
              <th>
                <div class="px-3 py-1">Angler</div>
              </th>
              <th>Species</th>
              <th>Length</th>
              <th>Date</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="catchData in filteredCatches" :key="catchData" @click="selectCatch(catchData)"
              class="outline outline-1 outline-slate-200 cursor-pointer">
              <td>
                <div class="px-3 py-1">{{ catchData.name }}</div>
              </td>
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
        <div class=" h-72 overflow-hidden rounded-md bg-white bg-opacity-30 flex items-center justify-center">
          <image-display v-if="selectedCatch.image" :imageKey="selectedCatch?.image"></image-display>
          <img v-else src="./../assets/images/fish-outline.png" class="" />
        </div>
        <div class="w-full h-72  bg-white  bg-opacity-30 rounded-md pt-5">
          <div class="w-full flex justify-center ">
            <div class="h-40 w-40 overflow-clip  rounded-full">
              <image-display v-if="selectedCatch.userImage" :imageKey="selectedCatch?.userImage"></image-display>
              <img v-else src="./../assets/images/profile_pic_default_1.jpg" class="h-full w-full" />
            </div>
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
let selectedSpecies = ref('')
let selectedCatch = ref({})
let catches = ref([])
let filteredCatches = ref([])

const getCatches = async () => {
  let newCatches = '';
  try {
    newCatches = await API.graphql({
      query: listCatches
    })
  } catch (error) {
    console.log("Error: ", error)
  }

  if (newCatches?.data?.listCatches?.items) {
    store.allCatches = newCatches.data.listCatches.items
  }
}

const setLocation = (locationId) => {
  selectedLocation.value = locationId

  const firstSpecies = allLocations.value.find((location) => location.id === locationId)
    .species[0].value

  catches.value = JSON.parse(JSON.stringify(store.getCatchesByLocation(locationId)))
  catches.value.sort((a, b) => b.length - a.length)

  setSpecies(firstSpecies)
}

const setSpecies = (species) => {
   selectedSpecies.value = species

  filteredCatches.value = catches.value.filter((catchObject) => catchObject.species === species)
  filteredCatches.value.sort((a, b) => b.length - a.length)

  if (filteredCatches.value[0]) {
    selectedCatch.value = filteredCatches.value[0]
  } else {
    selectedCatch.value = {}
  }
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
}
</style>
