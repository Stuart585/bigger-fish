<template>
  <div
    class="w-full h-52 justify-center bg-white bg-opacity-0 rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-lg cursor-pointer main-bg "
    @click="$emit('cardClicked')">
    <div
      class="h-full text-white text-3xl flex justify-center items-center bg-black bg-opacity-10">
       
       {{ titleTest }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, toRefs } from 'vue';
import { defineProps, reactive } from "vue";

const props = defineProps({
  titleTest: String,
});
const { titleTest } = toRefs(props);
</script>

<style scoped >
.main-bg {
  background-image: url("./../assets/images/centennial-map.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom right;
}
</style>