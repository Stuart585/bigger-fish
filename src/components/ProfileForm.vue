<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
        <div class="text-2xl w-1/2 h-max flex flex-col justify-center  p-5 rounded-sm form-bg">
            <form @submit.prevent="handleSubmit" class="w-1/2">
                <!-- User Name -->
                <div class="flex flex-col justify-items-start py-2">
                   
                    <input type="text" minlength="1" maxlength="20" size="10" class="input peer" placeholder="Username" v-model="profileData.userName"/>
                    <label for="name" class="form-label">User Name:</label>
                </div>
                <!-- Profile Pic -->
                <div class="flex flex-col justify-items-start  bg-green-200">
                     <label for="file-upload" class="">Upload Profile Image:</label>
                    <input id="file-upload" type="file" @change="uploadImage" class="hidden" />
                </div>
               
                <!-- Submit Form -->
                <div v-if="isValidForm === false" class="text-red-500">
                    username or profile image required
                </div>
                <input type="submit" value="Submit"
                    class="text-xl border-0 border-gray-400 rounded-sm px-3 bg-gray-100 cursor-pointer" />
                <button class="ml-2 text-xl border-0 border-gray-400 rounded-sm px-3 bg-gray-100 cursor-pointer"
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

<style lang="scss" scoped >

.form-bg {
    background-image: linear-gradient(105deg, rgba(#eee, .9) 0%, rgba(#eee, .9) 60%, transparent 50%),  url(../assets/images/lake-photo-4.jpg);
    background-size: 100%;
    border-radius: 3px;

    //height: 50rem;
}

.input {
    @apply text-slate-800 text-lg px-3 py-1 border-b-4  border-transparent ;

    @apply focus:border-solid focus:outline-none focus:border-b-4 focus:border-green-400 focus:shadow-lg focus:shadow-slate-300;

    @apply transition duration-500;

    &::-webkit-input-placeholder {
            @apply  text-slate-400;
        };
}

.form-label {
    @apply relative  text-sm text-slate-800 pl-2 pb-1 opacity-100 peer-placeholder-shown:opacity-0  transition duration-200;
}

.upload-input {
@apply text-slate-600 text-lg bg-green-400;
}

// .input:placeholder-shown + & label {
//     opacity: 0;
// }

// .label {
//     @apply text-slate-800 text-lg;
// }

// .form-input {
//     @apply text-md ;
// }

</style>
