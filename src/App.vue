<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

</script>

<template >
  <header>
    <div class="flex justify-center ">
      <nav class="flex flex-row py-5 w-2/3  ">
        <RouterLink to="/" class="px-3 w-full text-slate-800">Bigger Fish</RouterLink>
        <div class="w-max">
          <RouterLink to="/" class="px-3 text-slate-800">Home</RouterLink>
          <RouterLink to="/profile" class="px-3 text-slate-800">Profile</RouterLink>
        </div>
      </nav>
    </div>
  </header>
  <div class="flex justify-center  h-full pb-20 background-class">
    <RouterView class="w-2/3" />
  </div>
</template>

<style scoped>
.background-class {
  background-image: url('./assets/images/lake-1.jpg');
  background-size: cover; 
}

</style>
