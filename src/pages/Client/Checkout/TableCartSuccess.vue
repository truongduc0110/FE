
<template>
    <table class="w-full max-w-full bg-color-white border-collapse text-center uppercase border border-border-color-2">
        <thead>
            <tr class="border border-border-color-2">
                <td class="pl-8 pr-6 text-left text-lg py-5 bg-color-white font-medium text-color-4">Têm sản phẩm</td>
                <td class=" text-lg py-5 bg-color-white font-medium text-color-4 px-6">Giá</td>
                <td class=" text-lg py-5 bg-color-white font-medium text-color-4 px-6">Số lượng</td>
                <td class=" text-lg py-5 bg-color-white font-medium text-color-4 px-6">Tổng</td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item) in dataProducts">
                <td class="max-w-[500px] w-1/2 pt-7 pl-8 pr-[14px] pb-3">
                    <div class="flex items-center">
                        <a href="#" class="max-w-[146px] w-full inline-block text-center bg-color-10 ">
                            <img :src="item.image" alt="Image">
                        </a>
                        <a href="#" class="ml-8 tracking-wider font-medium text-2xl text-color-1">{{ item.title }}</a>
                    </div>
                </td>
                <td class="w-[13%] min-w-[100px] px-[14px] pt-7 pb-3 text-2xl text-color-1 tracking-spacing-2">
                  {{ formatPrice(item.price) }}
                </td>
                <td class="pt-7 pb-3 tracking-spacing-2 text-2xl">
                    {{ item.quantity }}
                </td>
                <td class="w-[13%] min-w-[100px] px-[14px] pt-7 pb-3 text-2xl text-color-1 tracking-spacing-2">{{ formatPrice(item.price * item.quantity) }}</td>
            </tr>
        </tbody>
    </table>
    <div class="flex justify-end items-center py-8 gap-8">
        <div class="text-lg text-color-9 font-medium tracking-wider ">Tổng</div>
        <div class="text-4xl text-color-1 tracking-wider ">{{ formatPrice(totalPrice) }}</div>
    </div>
</template>
<script setup>
import { useProduct } from '@/stores/local';
import {getCheckout} from "@/service/orderService.js";
import {useRoute} from "vue-router";
import {computed, onMounted, ref} from "vue";

const route = useRoute();
const id = route.params.id;
const dataUser = ref([]);
const dataProducts = ref([]);


const loadData = async () =>{
  const result = await getCheckout(id)
  if(result){
    console.log(result)
    dataProducts.value = result.orders.order_items;
  }
}
const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN').format(price);
};
const totalPrice = computed(() => {
  return dataProducts.value.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
});
onMounted(loadData);
</script>