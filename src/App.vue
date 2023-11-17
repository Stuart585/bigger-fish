<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';

import MainHeader from "./components/MainHeader.vue"

Amplify.configure(awsconfig);



</script>

<template >
  <main-header></main-header>

  <div class=" main-bg ">
    
  </div>
  <div class="h-max bg-black bg-opacity-50 flex justify-center">
      <RouterView class="w-2/3" />
    </div>
</template>

<style scoped>
.background-class {
  background-image: url('./assets/images/lake-1.jpg');
  background-size: cover;
}

.main-bg {
  background-image: url("./assets/images/lake-1.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom right;
  position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: -1;
}
</style>
