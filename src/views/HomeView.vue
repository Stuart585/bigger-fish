<template>
    <main>
        <div v-if="selectedLocation === null" class="h-screen">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mt-32">
                <CardComponent v-for="location in allLocations" :key="location.id" :title="location.name"
                    :image="location.cardImage" @cardClicked="setLocation(location.id)" />
            </div>
        </div>
        <div v-if="selectedLocation !== null" class="pt-20">
            <!-- location heading -->
            <div class=" h-60 text-5xl md:text-8xl text-white font-semibold ">
                <div class="flex justify-center items-center  h-full w-full  ">{{
                    getLocationById(selectedLocation)?.name }}
                    <div class="">
                        <button class=" rounded-sm overflow-hidden ml-2" @click="selectedLocation = null"><svg height="20"
                                width="30" class="bg-white pl-1">
                                <path
                                    d="M18.984 6.984h2.016v6h-15.188l3.609 3.609-1.406 1.406-6-6 6-6 1.406 1.406-3.609 3.609h13.172v-4.031z" />
                            </svg></button>
                    </div>
                </div>


            </div>
            <!-- species -->
            <div class="grid grid-cols-2 md:flex md:flex-cols gap-3 my-10">
                <button-component v-for="species in getLocationById(selectedLocation)?.species" :key="species.value"
                    :species="species" @buttonClick="setSpecies(species.value)"></button-component>
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
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="catchData in filteredCatches" :key="catchData.name" @click="selectCatch(catchData)"
                            class="outline outline-1 outline-slate-200 cursor-pointer">
                            <td>
                                <div class="px-3 py-1">{{ catchData.name }}</div>
                            </td>
                            <td>{{ catchData.species }}</td>
                            <td>{{ catchData.length }}</td>
                            <td>{{ catchData.date }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- Selected Catch -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 my-10">
                <div class=" h-72 overflow-hidden rounded-md bg-white bg-opacity-30 flex items-center justify-center">
                    <image-display v-if="selectedCatch.image" :imageKey="selectedCatch?.image"></image-display>
                    <img v-else src="./../assets/images/fish-outline.png" />
                </div>
                <div class="w-full h-72  bg-white  bg-opacity-30 rounded-md pt-5">
                    <div class="w-full flex justify-center ">
                        <div class="h-40 w-40 overflow-clip  rounded-full">
                            <image-display v-if="selectedCatch.userImage"
                                :imageKey="selectedCatch?.userImage"></image-display>
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

<script lang="ts" setup >
import CardComponent from './../components/CardComponent.vue'
import ButtonComponent from './../components/ButtonComponent.vue'
import ImageDisplay from './../components/ImageDisplay.vue'
import { ref, onMounted } from 'vue';
import { useSiteStore } from './../stores/siteStore';
import { storeToRefs } from 'pinia'
import { API } from 'aws-amplify';
import { listCatches } from './../graphql/queries';
import type { LocationType, catchType } from '@/stores/models';

const store = useSiteStore();
const { getLocationById } = storeToRefs(store)

let selectedLocation = ref<string | null>(null)
let allLocations = ref<LocationType[]>(store.locations)
let selectedSpecies = ref('')
let selectedCatch = ref<catchType>({
    name: '',
    length: 0,
    location: '',
    date: '',
    userImage: '',
    species: '',
    image: ''
})
let catches = ref([])
let filteredCatches = ref<catchType[]>([])

const getCatches = async () => {
    let newCatches: any = '';
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

const setLocation = (locationId: string) => {
    selectedLocation.value = locationId

    const firstSpecies: string | undefined = allLocations.value.find((location) => location.id === locationId)?.species[0].value;

    catches.value = JSON.parse(JSON.stringify(store.getCatchesByLocation(locationId)))
    catches.value.sort((a: { length: number }, b: { length: number }) => b.length - a.length)

    setSpecies(firstSpecies)
}

const setSpecies = (species: any) => {
    selectedSpecies.value = species

    filteredCatches.value = catches.value.filter((catchObject: catchType) => catchObject.species === species)
    filteredCatches.value.sort((a: { length: number }, b: { length: number }) => b.length - a.length)

    if (filteredCatches.value[0]) {
        selectedCatch.value = filteredCatches.value[0]
    } else {
        selectedCatch.value = {
            name: '',
            length: 0,
            location: '',
            date: '',
            userImage: '',
            species: '',
            image: ''
        }
    }
}

const selectCatch = (catchData: catchType) => {
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
