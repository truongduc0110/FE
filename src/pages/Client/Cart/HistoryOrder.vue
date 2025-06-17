
<template>
  <div v-for="(products, date) in dataProducts" :key="date" class="mt-10">
    <div class="text-left text-lg py-5 bg-color-white font-medium text-color-4">{{ date }}</div>
    <table class="w-full max-w-full bg-color-white border-collapse text-center uppercase border border-border-color-2">
      <thead>
        <tr class="border border-border-color-2">
          <td class="pl-8 pr-6 text-left text-lg py-5 bg-color-white font-medium text-color-4">PRODUCT NAME</td>
          <td class=" text-lg py-5 bg-color-white font-medium text-color-4 px-6">PRICE</td>
          <td class=" text-lg py-5 bg-color-white font-medium text-color-4 px-6">QUANTITY</td>
          <td class=" text-lg py-5 bg-color-white font-medium text-color-4 px-6">TOTAL</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td class="max-w-[500px] w-1/2 pt-7 pl-8 pr-[14px] pb-3">
            <div class="flex items-center">
              <a href="#" class="max-w-[146px] w-full inline-block text-center bg-color-10 ">
                <img :src="product.image" alt="Image">
              </a>
              <RouterLink :to="`/product/${product.productId}`" class="ml-8 tracking-wider font-semibold text-2xl text-color-1">{{ product.title }}</RouterLink>
            </div>
          </td>
          <td class="w-[13%] min-w-[100px] px-[14px] pt-7 pb-3 text-2xl text-color-1 tracking-spacing-2">
            {{ formatPrice(product.price) }}
          </td>
          <td class="w-[13%] min-w-[100px] px-[14px] pt-7 pb-3 text-2xl text-color-1 tracking-spacing-2">
            {{ product.quantity }}
          </td>
          <td class="w-[13%] min-w-[100px] px-[14px] pt-7 pb-3 text-2xl text-color-1 tracking-spacing-2">{{ formatPrice(product.price * product.quantity) }}</td>
<!--          <td class="pt-3">-->
<!--            <div class="bg-color-white px-[14px] w-fit py-2 border-2 border-color-2 rounded-lg text-color-1 font-semibold-->
<!--                             hover:bg-color-2 hover:text-color-white cursor-pointer">Delete</div>-->
<!--          </td>-->
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>

import {getHistoryOrder} from "@/service/orderService.js";
import {onMounted, ref} from "vue";

const cartId = localStorage.getItem("cartId")
const dataProducts = ref([]);

const loadProducts = async () =>{
  const result = await getHistoryOrder(cartId)
  if(result){
    dataProducts.value = result.orders.reduce((acc, order) => {
      const date = order.created_at;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(order);
      return acc;
    }, {});
  }
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN').format(price);
};
// const handleDelete = async (id,index) =>{
//   const result = await deleteProduct({
//     'product_id' : id
//   });
//   if(result){
//     store.dataAll.data.splice(index, 1);
//   }
// }
onMounted(loadProducts)
</script>
