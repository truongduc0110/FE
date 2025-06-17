
<template>
        <div class="container mx-auto py-10">
            <div class="grid grid-cols-2">
                <div class="">
                    <img :src="products.image"
                        alt="Image"
                        class="bg-color-10"
                    >
                </div>
                <div>
                    <div>
                        <div class="text-4xl text-color-1 font-medium tracking-wider">{{ products.title }}</div>
                        <div class="text-2xl text-color-2 font-medium tracking-wider mt-3">{{ formatPrice(products.price) }} VND</div>
                        <div class="font-lato text-[15px] pb-5 text-color-1 tracking-wider mt-5 border-b border-border-color-2" v-html="products.description">
                        </div>
                    </div>
                    <div class="border-b border-border-color-2 py-8">
                        <div class="text-font-15 text-color-1 tracking-wide">Categories: <span class="text-color-4">Sweets</span></div>
                        <div class="text-font-15 text-color-1 tracking-wide">Weight: <span class="text-color-4">7,25 oz</span></div>
                        <div class="text-font-15 text-color-1 tracking-wide">Box: <span class="text-color-4">60 x 60 x 90 cm</span></div>
                    
                        <div class="flex items-center gap-5 mt-8">
                            <div class="flex gap-2">
                                <input type="number" v-model="num" min="1" max="100" 
                                    class="no-spinner py-4 px-3 max-w-[70px] min-h-[70px] text-2xl text-color-1 rounded-md bg-color-11 text-center">
                                <div class="flex flex-col justify-between">
                                    <span class="h-8 w-8 text-2xl bg-color-11 text-color-1 right-[-15px] text-center rounded-md cursor-pointer" @click="handleIncre">+</span>
                                    <span class="h-8 w-8 text-2xl bg-color-11 text-color-1 right-[-15px] text-center rounded-md cursor-pointer" @click="handleDecre">-</span>
                                </div>
                            </div>
                            <button 
                                class="text-sm font-bold text-color-white py-5 px-12 bg-color-6 rounded-lg hover:bg-color-2 
                                    transition-all duration-200 ease-in-out" @click="addtoCart">
                                ADD TO CARD</button>
                        </div>
                    </div>
                    <div class="py-5">
                        <div>Share</div>
                    </div>
                </div>
            </div>
        </div>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router';
import { getProductDetail } from '@/service/productsService';
import { addProduct } from '@/service/cartService';
import { useProduct } from '@/stores/local';

const num = ref(1)
const cartId = localStorage.getItem("cartId")

const store = useProduct();

const handleIncre = () =>{
  num.value++;
}
const handleDecre = () =>{
  if(num.value > 1){
    num.value--;
  }
}
const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN').format(price);
};

const route = useRoute();
const id = route.params.id;
const products = ref([]);
const fetchApi = async () => {
  const result = await getProductDetail(id)
  products.value = result.detail;
  console.log(result)
};
onMounted(fetchApi);
const addtoCart = async () => {
  const result = await addProduct({
    cartId: cartId,
    product_id: products.value.id,
    quantity: num.value
  });

  if (result) {
    // Kiểm tra sản phẩm đã tồn tại trong giỏ chưa
    const index = store.dataAll.data.findIndex(item => item.id === products.value.id);

    store.$patch((state) => {
      if (index !== -1) {
        state.dataAll.data[index].quantity += num.value;
        state.dataAll.data[index].totalPrice = state.dataAll.data[index].quantity * state.dataAll.data[index].price;
      } else {
        // Nếu sản phẩm chưa có, thêm mới vào giỏ
        state.dataAll.data.push({
          ...products.value,
          quantity: num.value,
          totalPrice: products.value.price * num.value
        });
      }
      // Cập nhật tổng số lượng và tổng giá tiền của giỏ hàng
      state.dataAll.totalPrice = state.dataAll.data.reduce((total, item) => total + item.totalPrice, 0);
      state.dataAll.quantity = state.dataAll.data.reduce((total, item) => total + item.quantity, 0);
    });
    num.value = 1;
  }
};
</script>