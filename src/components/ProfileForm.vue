<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
        <div class="text-2xl w-1/3 h-max flex flex-col justify-center bg-gray-200 p-5 rounded-sm">
            <form @submit.prevent="handleSubmit">
                <!-- User Name -->
                <div class="flex flex-col justify-items-start py-2">
                    <label for="name">User Name:</label>
                    <input type="text" minlength="1" maxlength="20" size="10" class="inputClass" v-model="profileData.userName"/>
                </div>
                <!-- Profile Pic -->
                <div class="flex flex-col justify-items-start pt-2 pb-4">
                    <label for="file" class="pb-2">Upload Profile Image:</label>
                    <input type="file" @change="uploadImage" />
                </div>
               
                <!-- Submit Form -->
                <div v-if="isValidForm === false" class="text-red-500">
                    username or profile image required
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

const emit = defineEmits(['cancelForm', 'submitProfileForm'])

const store = useSiteStore();

let profileData = ref({
    userName: '',
    profileImage: ''
})
let isValidForm = ref();

const handleSubmit = () => {
    if(!profileData.value.userName && !profileData.value.profileImage ){
        isValidForm.value = false;
    }else {
        emit('submitProfileForm', profileData.value)
    }
    
}

const uploadImage = async (e: any) => {
    console.log("Upload Image: ")
    const file = e.target.files[0]
    profileData.value.profileImage = file;
}
</script>
