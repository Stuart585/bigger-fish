<template>
    <button
        class="bg-white  bg-opacity-30 w-full p-3 rounded-lg text-slate-100 text-xl transform transition duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
        @click="$emit('buttonClick', species)">
        {{ species?.label }}
        <slot></slot>
    </button>
</template>

<script lang="ts" setup>
import type { catchType, LabelValue } from '@/stores/models';
import { defineComponent, toRefs, type PropType } from 'vue';
import { defineProps, reactive } from "vue";


const props = defineProps({
    species: Object as PropType<LabelValue>,

});
const { species } = toRefs(props);
</script>

<style></style>