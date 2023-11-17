<template>
    <div class="flex justify-center fixed w-full z-10 text-xl text-white" :class="{'scrolled' : isScrolled}">
      <nav class="flex flex-row py-5 w-2/3  ">
        <RouterLink to="/" class=" w-full ">Bigger Fish</RouterLink>
        <div class="w-max">
          <RouterLink to="/" class="px-3 ">Home</RouterLink>
          <RouterLink to="/profile" class="pr-3 ">Profile</RouterLink>
        </div>
      </nav>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

let isScrolled = ref(false);

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
})

const handleScroll = () => {
  isScrolled.value = window.scrollY > 0;
}

</script>

<style>
  .scrolled {
    @apply bg-black bg-opacity-50 shadow-lg transition duration-700 ease-in-out
    
  }
</style>

