<template>
  <main>
    <authenticator>
      <template v-slot="{ user, signOut }">

    <div class="grid grid-cols-2 w-full">
      <div class=" ">
        <img src='./../assets/images/fish_profile.png' class="p-10 w-full h-80 object-cover">
      </div>
      <div class="text-6xl text-slate-100  flex justify-center items-center">{{ userData.name }}</div>
    </div>
    <!-- Buttons -->
    <div class="grid grid-cols-2 gap-3 w-full">
      <button class="bg-sky-900 rounded-md text-slate-100 text-lg p-2 font-bold" @click="showUploadForm">Upload
        Catch</button>
      <button class="bg-sky-900 rounded-md text-slate-100 text-lg p-2 font-bold">Update Profile</button>
    </div>
    <!-- Catches -->
    <div class="grid grid-cols-4 gap-3 w-full pt-10">
      <!-- <div v-for="userCatch in userCatches" :key="userCatch" class="w-full bg-sky-800 rounded-md">
        <img src='./../assets/images/fish_profile.png' class="p-3 object-cover">
        <div class="px-3 text-slate-100">
          <p>Location: {{ userCatch.location }}</p>
          <p>Species: {{ userCatch.species }}</p>
          <p>Length: {{ userCatch.length }}cm</p>
          <p>Date{{ userCatch.date }}</p>
        </div>
      </div> -->
    </div>
    <!-- Upload Form -->
    <UploadForm v-if="showUploadCatch == true" @cancelForm="closeForm" @submitForm="uploadNewCatch($event)">
    </UploadForm>
    <!-- Test sign in -->
    <div v-if="user" class="text-lg text-slate-300">
      User is signed in!!!
      <br>
      {{ user.attributes.name }}
      <br>
      {{ user.attributes.email }}
    </div>
    <button class="text-lg text-slate-300" @click="signOut">Sign Out</button>
    </template>
    </authenticator>
  </main>
</template>

<script setup lang="ts">
import UploadForm from './../components/UploadForm.vue'
import { API, Auth,  } from 'aws-amplify';
import { createCatch } from './../graphql/mutations';
import { ref, onMounted } from 'vue';
import { Authenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";
import {Storage} from "@aws-amplify/storage"


let userData = {
  name: "Bob69",
  profileImage: "profilePic"
}

let user = ref({attributes: {name: ''}});

let showUploadCatch = ref(false);

const uploadNewCatch = async (event: any) => {
  let imageSaveResp = null;
  let imgKey = event.image.name + '-' + Date.now()
  if (event?.image){
    imageSaveResp = await Storage.put(imgKey, event.image)
  }

  const catchTest = { name: user.value.attributes.name, species: event.species, length: event.length, date: event.date, location: event.location, test: imageSaveResp?.key };
  await API.graphql({
    query: createCatch,
    variables: { input: catchTest }
  });
  showUploadCatch.value = false
}

const checkUser = async () => {
  try {
    const currentUser = await Auth.currentAuthenticatedUser();
    user.value = currentUser;
  } catch (error) {
    user.value = {attributes: {name: ''}}
  }
}

onMounted(() => {
  checkUser()
})

const showUploadForm = () => {
  showUploadCatch.value = true
}
const closeForm = () => {
  showUploadCatch.value = false
}
</script>
