<script lang="ts" setup>
    import { ref } from 'vue'
    import type { TabsPaneContext } from 'element-plus'
    import List from './List.vue';

    const activeName = ref('first')

    const handleClick = (tab: TabsPaneContext, event: Event) => {
        console.log(tab, event)
    }

</script>


<template>
    <div class="bg-background-image-4 bg-center bg-cover min-h-[24.84375vw] overflow-hidden relative">
        <div class="text-color-white text-[55px] flex justify-center items-center font-semibold tracking-wider py-[100px] absolute top-0 left-[-1px] right-[-1px] bottom-0">GALLERY</div>
    </div>
    <ul class="flex justify-center items-center gap-3 py-4 bg-color-8">
        <li class="text-color-4 inline text-sm font-semibold tracking-widest">
            HOME
        </li>
        <li>
            <Right class="h-4 w-auto"/>
        </li>
        
        <li class="text-color-1 inline text-sm font-semibold tracking-widest">GALLERY</li>
    </ul>

</template>

