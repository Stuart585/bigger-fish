<template>
  <div
  :style="{ backgroundImage: `url(./src/assets/images/${image})` }"
    class="w-full h-52 justify-center  rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-lg cursor-pointer main-bg" 
    @click="$emit('cardClicked')"
    >
    <div
      class="h-full text-white text-4xl flex justify-center items-center relative font-semibold bg-black bg-opacity-20">
       
       {{ title }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import { defineProps } from "vue";

const props = defineProps({
  title: String,
  image: String
});
const { title } = toRefs(props);
const { image } = toRefs(props);

</script>

<style lang="scss" scoped >
.main-bg {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom right;
}
</style>