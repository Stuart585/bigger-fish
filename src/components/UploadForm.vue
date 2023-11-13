<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
        <div class="text-2xl w-1/3 h-max flex flex-col justify-center bg-gray-200 p-5 rounded-sm">
            <form @submit.prevent="handleSubmit">
                <div class="flex flex-col justify-items-start">
                    <label for="name" class="">Name:</label>
                    <input type="text" required minlength="1" maxlength="20" size="10" class="inputClass"
                        v-model="newCatch.user" />
                </div>
                <div class="flex flex-col justify-items-start">
                    <label for="name" class="">Location:</label>
                    <br />
                    <label>
                        <input type="radio" name="location" v-model="newCatch.location" value="centennial" />
                        Centennial
                    </label>
                    <label>
                        <input type="radio" name="location" v-model="newCatch.location" value="schooner" />
                        Schooner
                    </label>
                    <label>
                        <input type="radio" name="location" v-model="newCatch.location" value="shiner" />
                        Shiner
                    </label>
                    <br />
                </div>

                <div class="flex flex-col justify-items-start">
                    <label for="name" v-bind:class="{ 'text-slate-400': !newCatch.location }">Species:</label>
                    <br />
                    <label v-for="species in getSpeciesByLocation(newCatch.location)" :key="species">
                        <input type="radio" name="species" v-model="newCatch.species" :value="species.value" />
                        {{ species.label }}
                    </label>

                    <br />
                </div>
                <div class="flex flex-col justify-items-start">
                    <label for="name" class="">Length:</label>
                    <input type="text" required minlength="1" maxlength="20" size="10" class="inputClass"
                        v-model="newCatch.length" />
                </div>
                <div class="flex flex-col justify-items-start">
                    <label for="name" class="">Date:</label>
                    <input type="text" required minlength="1" maxlength="20" size="10" class="inputClass"
                        v-model="newCatch.date" />
                </div>
                <input type="submit" value="Submit"
                    class="text-xl border-0 border-gray-400 rounded-sm px-3 bg-gray-100 cursor-pointer" />
                <button class="text-xl border-0 border-gray-400 rounded-sm px-3 bg-gray-100 cursor-pointer"
                    @click="$emit('cancelForm')">
                    Cancel
                </button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { useSiteStore } from './../stores/siteStore';
import { storeToRefs } from 'pinia'
import { ref } from 'vue';

const emit = defineEmits(['cancelForm', 'submitForm'])

const store = useSiteStore();
const { getSpeciesByLocation } = storeToRefs(store)

let newCatch = ref({
    user: '',
    location: '',
    species: '',
    length: 0,
    date: '',
    image: ''
})

const handleSubmit = () => {
    emit('submitForm', newCatch)
}
</script>
