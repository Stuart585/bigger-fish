<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
        <div class="text-2xl w-1/3 h-max flex flex-col justify-center bg-gray-200 p-5 rounded-md">
            <form @submit.prevent="handleSubmit">
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
                    <div v-if="!newCatch.location" class="text-slate-400">Select a location first</div>
                    <label v-for="species in getSpeciesByLocation(newCatch.location)" :key="species.value">
                        <input type="radio" name="species" v-model="newCatch.species" :value="species.value" />
                        {{ species.label }}
                    </label>

                    <br />
                </div>
                <div class="flex flex-col justify-items-start py-2">
                    <label for="name" class="">Length:</label>
                    <input type="text" minlength="1" maxlength="20" size="10" class="inputClass"
                        v-model="newCatch.length" />
                </div>
                <div class="flex flex-col justify-items-start py-2">
                    <label for="name" class="">Date:</label>
                    <input type="text" minlength="1" maxlength="20" size="10" class="inputClass" v-model="newCatch.date"
                        placeholder="dd/mm/yyyy" @input="validateDate" />
                    <div v-if="isValidDate === false" class="text-red-500">
                        Date must be dd/mm/yyyy
                    </div>
                </div>
                <div class="flex flex-col justify-items-start pt-2 pb-4">
                    <label for="file" class="pb-2">Upload a photo of your catch:</label>
                    <input type="file" @change="uploadImage" />
                </div>
                <div v-if="isValidForm === false" class="text-red-500">
                    All fields required
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

<script setup lang="ts">
import { useSiteStore } from './../stores/siteStore';
import { storeToRefs } from 'pinia'
import { ref } from 'vue';

const emit = defineEmits(['cancelForm', 'submitForm'])
const store = useSiteStore();
const { getSpeciesByLocation } = storeToRefs(store)

let isValidDate = ref();
let isValidForm = ref();

let newCatch = ref({
    user: '',
    location: '',
    species: '',
    length: 0,
    date: '',
    image: ''
})

const handleSubmit = () => {
    const isValid = validateForm()
    if (isValid) {
        emit('submitForm', newCatch.value)
    } else {
        isValidForm.value = false
    }
}

const uploadImage = async (e: any) => {
    const file = e.target.files[0]
    newCatch.value.image = file;
}

const validateDate = () => {
    const datePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    isValidDate.value = datePattern.test(newCatch.value.date);
}

const validateForm = () => {
    if (newCatch.value.location && newCatch.value.species && newCatch.value.length && newCatch.value.image && isValidDate.value) {
        return true
    } else {
        return false
    }
} 
</script>
