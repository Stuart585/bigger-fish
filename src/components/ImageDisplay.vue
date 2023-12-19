<template>
    <div v-if="imageKey" class="h-full w-full ">
        <img class="object-cover h-full w-full" :src="signedURL" />
    </div>
</template>

<script setup lang="ts">
import { defineProps, ref, watch } from "vue";
import { toRefs, onMounted } from 'vue';
import { Storage } from "@aws-amplify/storage"

const props = defineProps({
    imageKey: String,
});

const { imageKey } = toRefs(props);
const signedURL = ref<any>(null)

const getImage = async () => {
    if (imageKey?.value) {
        Storage.get(imageKey.value, { download: true }).then((result: any) => {
            signedURL.value = URL.createObjectURL(result.Body)
        })
    }
}

watch(imageKey, (newValue, oldValue) => {
  getImage();
});

onMounted(() => {
    getImage()
})

</script>
