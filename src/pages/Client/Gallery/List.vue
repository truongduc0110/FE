

<template>
    <div class="container mx-auto py-5">
        <div class="grid grid-cols-3 gap-7">
            <div class="overflow-hidden relative" v-for="item in ListCategory" :key="item.id">
                <img :src="item.thumbnail" alt="Image" class="w-[370px] h-[316px]">
                <div class="flex justify-center items-center absolute top-0 right-0 left-0 bottom-0 bg-white opacity-0 hover:opacity-90 transition-all duration-300 ease-linear">
                    <div class="text-center">
                        <div class="text-lg font-medium text-color-1">{{ item.title }}</div>
                        <div class="flex gap-3 items-center justify-center mt-5">
                            <div class="p-3 bg-color-2 rounded-radius-1 transition-all duration-300 ease-linear hover:bg-color-1">
                                <Search class="h-6 w-auto text-color-white"/>
                            </div>
                            <RouterLink :to="`/shop?category=${item.id}`" class="p-3 bg-color-2 rounded-radius-1 transition-all duration-300 ease-linear hover:bg-color-1">
                                <ShoppingCart class="h-6 w-auto text-color-white"/>
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { getCategoryList } from '@/service/categoryService';

const ListCategory = ref([])

const fetchListCategory = async () =>{
  const result = await getCategoryList()
  if(result){
    ListCategory.value = result.data.data;
  }
}

onMounted(fetchListCategory);
</script>
