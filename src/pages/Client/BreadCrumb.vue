
<template>
    <div class="bg-background-image-4 bg-center bg-cover min-h-[24.84375vw] overflow-hidden relative">
        <div class="text-color-white text-[55px] flex justify-center items-center font-semibold tracking-wider py-[100px] max-md:py-0
          absolute top-0 left-[-1px] right-[-1px] bottom-0">{{ BreadCrumb }}</div>
    </div>
    <ul class="flex justify-center items-center gap-3 py-4 bg-color-8">
        <li class="text-color-4 inline text-sm font-semibold tracking-widest">
            HOME
        </li>
        <li>
            <Right class="h-4 w-auto"/>
        </li>
        
        <li class="text-color-1 inline text-sm font-semibold tracking-widest">{{ BreadCrumb }}</li>
    </ul>

    <RouterView></RouterView>

</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const BreadCrumb = computed(() => {
  return route.name.toUpperCase()
});
</script>


