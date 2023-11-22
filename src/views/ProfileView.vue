<template>
  <main class="mt-20 mb-32">
    <authenticator>
      <template v-slot="{ user, signOut }">

        <div class="grid grid-cols-2 w-full">
          <div class="w-full h-full flex justify-center">
            <div class="rounded-full overflow-hidden w-60 h-60 m-10">
              <!-- <img src='./../assets/images/fish_profile.png' class=" w-full h-full object-fit"> -->
              <!-- <img :src="user.attributes.picture" class=" w-full h-full object-fit"/> -->
              <image-display v-if="user.attributes.picture" :imageKey="user.attributes.picture"></image-display>
              <img v-else src="./../assets/images/profile_pic_default_1.jpg" class="h-full w-full" />
            </div>
          </div>
          <div class="text-6xl text-slate-100  flex justify-center items-center">{{ user.attributes.name }}</div>
        </div>
        <!-- Buttons -->
        <div class="grid grid-cols-2 gap-3 w-full">
          <button-component @buttonClick="openUploadForm">Upload
            Catch</button-component>
          <button-component @buttonClick="openProfileForm">Update Profile</button-component>
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
        <ProfileForm v-if="showProfileForm == true" @cancelForm="closeForm" @submitProfileForm="updateProfile($event)">
        </ProfileForm>
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
import ProfileForm from './../components/ProfileForm.vue'
import ButtonComponent from './../components/ButtonComponent.vue'
import { API, Auth, } from 'aws-amplify';
import { createCatch, createUserData } from './../graphql/mutations';
import { ref, onMounted } from 'vue';
import { Authenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";
import { Storage } from "@aws-amplify/storage"
import ImageDisplay from './../components/ImageDisplay.vue'



import 
  updateUserAttributes
 from '@aws-amplify/auth';
import { Console } from 'console';


let user = ref({ attributes: { name: '', email: '', picture: '' } });

let showUploadCatch = ref(false);
let showProfileForm = ref(false);

const uploadNewCatch = async (event: any) => {
  let imageSaveResp = null;
  let imgKey = event.image.name + '-' + Date.now()
  if (event?.image) {
    imageSaveResp = await Storage.put(imgKey, event.image)
  }

  const newCatchData = { name: user.value.attributes.name, species: event.species, length: event.length, date: event.date, location: event.location, image: imageSaveResp?.key, userImage: user.value.attributes.picture};
  await API.graphql({
    query: createCatch,
    variables: { input: newCatchData }
  });
  showUploadCatch.value = false
}

const updateProfile = async (event: any) => {
  console.log("Update Profile", event)

    let imageSaveResp = null;
  let imgKey = event.profileImage.name + '-' + Date.now()
  if (event?.profileImage) {
    imageSaveResp = await Storage.put(imgKey, event.profileImage)
  }

  console.log("@@@ Image resp: ", imageSaveResp)

  const url = "https://biggerfishamplify-storage-764fd781200046-dev.s3.ca-central-1.amazonaws.com/public/" + imageSaveResp?.key

   const currentUser = await Auth.currentAuthenticatedUser();


  const updateImage = await Auth.updateUserAttributes(currentUser, {
      picture: imageSaveResp?.key
    });

    console.log("After update: ", updateImage)
    console.log("After update 2!!!: ", user.value.attributes)

  showProfileForm.value = false
}



const checkUser = async () => {
  try {
    const currentUser = await Auth.currentAuthenticatedUser();
    user.value = currentUser;
  } catch (error) {
    user.value = { attributes: { name: '', email: '', picture: '' } }
  }
}

onMounted(() => {
  checkUser()
})

const openUploadForm = () => {
  showUploadCatch.value = true
}

const openProfileForm = () => {
  showProfileForm.value = true
}

const closeForm = () => {
  showUploadCatch.value = false
  showProfileForm.value = false
}
</script>
