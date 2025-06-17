
<template>
    <table class="w-full max-w-full bg-color-white border-collapse text-center uppercase border border-border-color-2">
        <thead>
            <tr class="border border-border-color-2">
                <td class="pl-8 pr-6 text-left text-lg py-5 bg-color-white font-medium text-color-4">Họ tên</td>
                <td class=" text-lg py-5 bg-color-white font-medium text-color-4 px-6">Số điện thoại</td>
                <td class=" text-lg py-5 bg-color-white font-medium text-color-4 px-6">Địa chỉ</td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="w-2/6 min-w-[100px] px-[14px] pt-7 pb-3 text-lg text-color-1 tracking-spacing-2 text-start">
                  {{ dataUser.first_name }} {{ dataUser.last_name}}
                </td>
                <td class="w-2/6 pt-7 pb-3 tracking-spacing-2 text-lg">
                  {{ dataUser.phone }}
                </td>
                <td class="w-2/6 min-w-[100px] px-[14px] pt-7 pb-3 text-lg text-color-1 tracking-spacing-2">
                  {{ dataUser.address }}
                </td>
            </tr>
            
        </tbody>
    </table>
</template>
<script setup>
import {getCheckout} from "@/service/orderService.js";
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";

const route = useRoute();
const id = route.params.id;
const dataUser = ref([]);

const loadData = async () =>{
  const result = await getCheckout(id)
  if(result){
    dataUser.value = result.orders.order_info;
  }
}
onMounted(loadData);
</script>