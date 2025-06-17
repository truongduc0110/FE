<template>
    <div class="container mx-auto grid grid-cols-3 gap-5">       
        <div class="pb-5" v-for="product in data" :key="product.id">
            <article class="relative text-center px-4 pt-5 pb-10 max-w-[300px] mx-auto z-10 product">
                <div class="transition-all duration-200 ease-in-out">
                    <div class="min-h-[200px] flex items-end justify-center">
                        <img :src="product.thumbnail"  alt="" class="w-[152px] h-[160px]">
                    </div>
                    <div class="mt-5">
                        <RouterLink :to="`/product/${product.id}`" class="font-medium text-lg text-color-1 hover:text-color-2 transition-all duration-200 ease-in-out">{{ product.title }}</RouterLink>
                    </div>
                    <div>
                        <div v-if="product.oldPrice" class="line-through text-color-12 inline-block text-font-15">${{ product.oldPrice }}</div>
                        <div class="text-color-2 inline-block text-font-15 font-bold ml-4">${{ product.price }}</div>
                    </div>
                </div>
                <span class="transition-all duration-200 ease-in-out bg-color-2 inline-block text-center absolute top-6 right-4 py-[5px] px-3 text-sm font-semibold tracking-wide uppercase text-color-white rounded-md">Sale</span>
                <div class="flex justify-center items-end absolute top-0 bottom-0 right-0 left-0 content-none px-5 
                            pt-5 pb-10 bg-color-10 rounded-md transition-all duration-200 ease-in-out z-[-1] product-more-shop">
                    <div>
                        <div class="flex gap-5 items-center justify-center mt-5 list-shop-more">
                            <div class="p-3 bg-color-2 rounded-radius-1 product-icon opacity-0 scale-0 transition-all duration-200 ease-in-out">
                                <Search class="h-5 w-auto text-color-white"/>
                            </div>
                            <div class="p-3 bg-color-2 rounded-radius-1 product-icon opacity-0 scale-0 transition-all duration-200 ease-in-out">
                                <ShoppingCart class="h-5 w-auto text-color-white"/>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { getProductCategory } from '@/service/productsService';

const props = defineProps({
  productId: {
    type: String,
    required: true
  },
})

const data = ref([])
const fetchApi = () => {
  const fetchApi = async () => {
    const result = await getProductCategory(props.productId)
    if(result){
      data.value = result;
    }
  }
  fetchApi();
};

onMounted(fetchApi);
</script>
