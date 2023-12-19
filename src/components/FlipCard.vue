<template>
    <!-- <div
        class="w-full bg-white bg-opacity-20 rounded-md pb-2">
        <div class="p-2 h-52 overflow-hidden">
            <image-display v-if="userCatch?.image" :imageKey="userCatch?.image"></image-display>
            <img v-else src="./../assets/images/fish-outline.png" class="" />
        </div>
        <div class="px-3 text-white">
            <p>Location: {{ userCatch?.location }}</p>
            <p>Species: {{ userCatch?.species }}</p>
            <p>Length: {{ userCatch?.length }}cm</p>
            <p>Date{{ userCatch?.date }}</p>
        </div>
    </div> -->
    <div class="w-full bg-white bg-opacity-20 rounded-md h-32 overflow-hidden">
            <image-display v-if="userCatch?.image" :imageKey="userCatch?.image"></image-display>
            <img v-else src="./../assets/images/fish-outline.png" class="" />
    </div>
    <div class="card-back">
        test
    </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import { defineProps, type PropType } from "vue";
import type { catchType } from '@/stores/models';
import ImageDisplay from './../components/ImageDisplay.vue'

const props = defineProps({
    userCatch: Object as PropType<catchType>,
});
const { userCatch } = toRefs(props);

</script>

<style lang="scss" scoped >
.main-bg {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: bottom right;
}

.flip-card {

}
</style>