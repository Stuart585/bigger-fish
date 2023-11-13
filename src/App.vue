<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
//import HelloWorld from './components/HelloWorld.vue'

// import { Authenticator } from "@aws-amplify/ui-vue";
// import "@aws-amplify/ui-vue/styles.css";

// import { Amplify } from 'aws-amplify';
// import awsconfig from './aws-exports';
</script>

<template>
  <header>
    <div class="flex justify-center bg-sky-950">
      <nav class="flex flex-row py-5 w-2/3  ">
        <RouterLink to="/" class="px-3 w-full text-slate-100">Bigger Fish</RouterLink>
        <div class="w-max">
          <RouterLink to="/" class="px-3 text-slate-100">Home</RouterLink>
          <RouterLink to="/profile" class="px-3 text-slate-100">Profile</RouterLink>
        </div>
      </nav>
    </div>
  </header>
  <div class="flex justify-center bg-sky-950 h-full pb-20">
    <RouterView class="w-2/3" />
  </div>
</template>

<style scoped></style>
