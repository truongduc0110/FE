
<template>
    <div class="pb-8 text-[15px] text-color-1 tracking-wider">Showing {{startItem}}–{{endItem}} of {{ totalProduct }} results</div>
      <div v-if="filteredProducts.length" class="grid grid-cols-3 gap-5 max-md:grid-cols-2">
        <div class="pb-5" v-for="product in filteredProducts" :key="product.id">
            <article class="relative text-center px-4 pt-5 pb-10 max-w-[300px] mx-auto z-10 product bg-color-10">
                <div class="transition-all duration-200 ease-in-out">
                    <div class="min-h-[200px] flex items-end justify-center">
                        <img :src="product.image"  alt="" class="w-[152px] h-[160px]">
                    </div>
                    <div class="mt-5">
                        <RouterLink :to="`/product/${product.id}`" class="font-medium text-lg text-color-1 hover:text-color-2 transition-all duration-200 ease-in-out">{{ product.title }}</RouterLink>
                    </div>
                    <div>
                        <div v-if="product.oldPrice" class="line-through text-color-12 inline-block text-font-15">${{ product.oldPrice }}</div>
                        <div class="text-color-2 inline-block text-font-15 font-bold ml-4">{{ formatPrice(product.price)}} VND</div>
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
    <div v-else class="text-md text-color-4 text-center">Không có sản phẩm nào</div>
  <el-pagination background layout="prev, pager, next" :total="totalPage*10" @current-change="handlePageChange" />
</template>

<script setup>
import {computed, ref} from "vue";

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN').format(price);
};
const props = defineProps({
  filteredProducts: Array,
  currentPage: Number,
  totalPage: Number,
  totalProduct: Number,
  limit: Number,
});

// Khởi tạo sự kiện để gửi về component cha
const emit = defineEmits(["page-change"]);

// Tính toán số thứ tự sản phẩm hiển thị
const startItem = computed(() => (props.currentPage - 1) * props.limit + 1);
const endItem = computed(() => Math.min(props.currentPage * props.limit, props.totalProduct));

// Hàm xử lý khi thay đổi trang
const handlePageChange = (page) => {
  emit("page-change", page);
};

</script>

