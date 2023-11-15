<template>
  <div
    class="w-full h-max justify-center bg-sky-900 rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
    @click="$emit('cardClicked')">
    <div class="p-2  flex justify-center ">
      <img src='./../assets/images/map1.jpg'>

    </div>
    <div>
      <p class=" text-slate-100 text-xl flex justify-center">
        {{ titleTest }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, toRefs } from 'vue';
import { defineProps, reactive } from "vue";
// export default defineComponent({
//   name: 'CardComponent',
//   props: {
//     titleTest: {
//       type: String,
//       required: false,
//     },
//   },
//   emits: ['cardClicked'],
//   setup(props) {
//     const { titleTest } = props;

//     const handleClick = () => {
//       //emit('cardClicked')
//     }

//     return {
//       titleTest,
//       handleClick
//     };
//   }
// });

const props = defineProps({
  titleTest: String,
});

//emits: ['cardClicked']

const { titleTest } = toRefs(props);




</script>

<style scoped lang="scss"></style>