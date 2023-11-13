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

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'CardComponent',
  props: {
    titleTest: {
      type: String,
      required: false,
    },
    cardImage: {
      default: '../assets/mouse.png',
      type: String,
    },
    imageName: {
      default: 'mouse.png',
      type: String,
    },
    description: {
      default: '',
      type: String,
    },
    clickPath: {
      type: String,
    }
  },
  emits: ['cardClicked'],
  setup(props) {
    const { title, paragraph } = props;

    const handleClick = () => {
      //emit('cardClicked')
    }

    return {
      title,
      paragraph,
      handleClick
    };
  }
});
</script>

<style scoped lang="scss"></style>