
<template>
    <div class="py-10">
        <Product />
        <Order />
        <Featured :parentId="products.parentId"/>
    </div>
    
</template>
<script setup>
import Product from './Product.vue';
import Order from './Order.vue';
import Featured from './Featured.vue';
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import {getProductDetail} from "@/service/productsService.js";

const route = useRoute();
const id = route.params.id;
const products = ref({});
const fetchApi = async () => {
  const result = await getProductDetail(id)
  products.value = result.detail;
};
onMounted(fetchApi);
</script>
