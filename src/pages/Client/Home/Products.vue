<template>
  <div class="bg-background-image-3 bg-center bg-cover py-[80px] max-h-[650px] h-[650px]">
    <div class="container mx-auto">
      <div class="text-center text-[55px] text-color-1 font-semibold tracking-wider max-lg:text-4xl">
        NEW PRODUCTS
      </div>

      <Splide
          :options="splideOptions"
          aria-label="New Products"
          class="mt-10 overflow-hidden"
      >
        <SplideSlide v-for="(product, index) in products" :key="index">
            <article class="relative text-center px-4 pt-5 pb-10 max-w-[300px] mx-auto z-10 product h-auto">
              <div class="transition-all duration-200 ease-in-out">
                <div class="min-h-[200px] flex items-end justify-center">
                  <img :src="product.thumbnail" :alt="product.name" class="w-[152px] h-[160px]" />
                </div>
                <div class="font-medium text-lg text-color-1 mt-5">
                  <RouterLink :to="`/product/${product.id}`">{{ product.title }}</RouterLink>
                </div>
                <div>
                  <div v-if="products.oldPrice" class="line-through text-color-12 inline-block text-font-15">{{ product.oldPrice }}VND</div>
                  <div class="text-color-2 inline-block text-font-15 font-bold ml-4">{{ formatPrice(product.price )}}VND</div>
                </div>
              </div>
              <span
                  v-if="product.oldPrice"
                  class="transition-all duration-200 ease-in-out bg-color-2 inline-block text-center absolute top-6 right-4 py-[5px] px-3 text-sm font-semibold tracking-wide uppercase text-color-white rounded-md"
              >
                Sale
              </span>
              <div
                  class="flex justify-center items-end absolute top-0 bottom-0 right-0 left-0 content-none px-5 pt-5 pb-10 bg-color-white rounded-md transition-all duration-200 ease-in-out z-[-1] product-more"
              >
                <div>
                  <div class="flex gap-5 items-center justify-center mt-5 list-shop-more">
                    <div class="p-3 bg-color-2 rounded-radius-1 product-icon opacity-0 scale-0 transition-all duration-200 ease-in-out">
                      <Search class="h-5 w-auto text-color-white" />
                    </div>
                    <div class="p-3 bg-color-2 rounded-radius-1 product-icon opacity-0 scale-0 transition-all duration-200 ease-in-out">
                      <ShoppingCart class="h-5 w-auto text-color-white" />
                    </div>
                  </div>
                </div>
              </div>
            </article>
        </SplideSlide>
      </Splide>
    </div>
  </div>
</template>

<script setup>
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css';
import {getProductList} from "@/service/productsService.js";
import {onMounted, ref} from "vue";

// Dữ liệu sản phẩm
const products = ref([]);
const loadProducts = async () =>{
  const result = await getProductList();
  if(result){
    const sortedProducts = result.data.data.sort((a, b) => a.position - b.position);
    const latestProducts = sortedProducts.slice(0, 10);
    products.value = latestProducts;
  }
}
 // Cấu hình Splide
const splideOptions = {
  type: 'loop',
  perPage: 4,
  perMove: 1,
  gap: '1rem',
  pagination: true,
  arrows: false,
  breakpoints: {
    1024: {
      perPage: 3,
    },
    768: {
      perPage: 2,
    },
    640: {
      perPage: 1,
    },
  },
};
const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN').format(price);
};
onMounted(loadProducts)
</script>

<style scoped>
:deep(.splide__track) {
  overflow: visible;
}
</style>