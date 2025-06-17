<template>
    <div class="container mx-auto">
      <table class="w-full max-w-full bg-color-white border-collapse text-center uppercase border border-border-color-2">
        <thead>
        <tr class="border border-border-color-2">
          <td>
            <label class="flex items-center justify-between custom-checkbox gap-2 w-full max-md:p-3 max-md:px-2 mt-3">
              <div class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" class="hidden" v-model="checkAll" @change="toggleCheckAll">
                <span class="checkmark w-6 h-6 rounded-sm relative"></span>
              </div>
            </label>
          </td>
          <td class="pl-8 pr-6 text-left text-lg py-5 bg-color-white font-medium text-color-4">PRODUCT NAME</td>
          <td class=" text-lg py-5 bg-color-white font-medium text-color-4 px-6">PRICE</td>
          <td class=" text-lg py-5 bg-color-white font-medium text-color-4 px-6">QUANTITY</td>
          <td class=" text-lg py-5 bg-color-white font-medium text-color-4 px-6">TOTAL</td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in store.dataAll.data">
          <td>
            <label class="flex items-center justify-between custom-checkbox gap-2 w-full max-md:p-3 max-md:px-2 mt-3">
              <div class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox"
                       class="hidden"
                       :value="item"
                       v-model="selectedItems">
                <span class="checkmark w-6 h-6 rounded-sm relative"></span>
              </div>
            </label>
          </td>
          <td class="max-w-[500px] w-1/2 pt-7 pl-8 pr-[14px] pb-3">
            <div class="flex items-center">
              <a href="#" class="max-w-[146px] w-full inline-block text-center bg-color-10 ">
                <img :src="item.image" alt="Image">
              </a>
              <a href="#" class="ml-8 tracking-wider font-semibold text-2xl text-color-1">{{ item.title }}</a>
            </div>
          </td>
          <td class="w-[13%] min-w-[100px] px-[14px] pt-7 pb-3 text-2xl text-color-1 tracking-spacing-2">
            {{ formatPrice(item.price) }}
          </td>
          <td class="pt-7 pb-3 tracking-spacing-2">
            <div class="flex justify-center items-center">
                        <span class="h-9 w-9 text-3xl bg-color-white border border-border-color-2 text-color-1 right-[-15px] text-center
                            rounded-md cursor-pointer" @click="handleDecre(index)">-</span>
              <input type="number" v-model="item.quantity" min="1" max="100"
                     class="no-spinner text-xl text-color-1 rounded-md text-center focus:outline-none w-1/6">
              <span class="h-9 w-9 text-3xl bg-color-white border border-border-color-2 text-color-1 right-[-15px] text-center
                            rounded-md cursor-pointer" @click="handleIncre(index)">+</span>
            </div>
          </td>
          <td class="w-[13%] min-w-[100px] px-[14px] pt-7 pb-3 text-2xl text-color-1 tracking-spacing-2">{{ formatPrice(item.totalPrice) }}</td>
          <td class="pt-3">
            <div class="bg-color-white px-[14px] py-2 border-2 border-color-2 rounded-lg text-color-1 font-semibold
                         hover:bg-color-2 hover:text-color-white cursor-pointer" @click="handleDelete(item.id,index)">Delete</div>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="flex justify-between items-center py-8">
        <div class="flex items-center gap-5">
          <div class="min-w-[185px] grow inline-block text-font-15 tracking-wider text-color-4 font-lato">
            <input v-model="codeDiscount" type="text" placeholder="Code" class="min-h-[70px] py-[22px] rounded-md px-[25px] focus:outline-none border border-border-color-2">
          </div>
          <button @click="applyDiscounts" class="min-w-[190px] min-h-[70px] text-sm font-bold text-color-white py-6 px-[50px] bg-color-2 rounded-lg hover:bg-color-6">APPLY</button>
        </div>
        <div class="flex items-center gap-8">
          <div class="text-lg text-color-9 font-medium tracking-wider ">Total</div>
          <div class="text-4xl text-color-1 tracking-wider ">{{ formatPrice(totalSelectedPrice) }} VND</div>
          <div @click="goToCheckout">
            <button class="min-w-[190px] text-sm font-bold text-color-white py-5 px-[50px] bg-color-2 rounded-lg hover:bg-color-6">CHECKOUT</button>
          </div>
        </div>
      </div>
      <HistoryOrder />
    </div>
</template>
<script setup>
import HistoryOrder from "@/pages/Client/Cart/HistoryOrder.vue"
import { changeQuantity, deleteProduct } from '@/service/cartService';
import { useProduct } from '@/stores/local';
import {useRouter} from "vue-router";
import {computed, ref, watch} from "vue";
import {applyDiscount} from "@/service/DiscountsServive.js";

const store = useProduct();

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN').format(price);
};
const cartId = localStorage.getItem("cartId")

const selectedItems = ref([]);
const router = useRouter();
const checkAll = ref(false);
const codeDiscount = ref('');
const discountAmount = ref(0);
const userId = JSON.parse(localStorage.getItem('user')).id

// Theo dõi thay đổi `checkAll` để set tất cả sản phẩm
const toggleCheckAll = () => {
  if (checkAll.value) {
    selectedItems.value = [...store.dataAll.data];
  } else {
    selectedItems.value = [];
  }
};

watch(() => selectedItems.value.length, () => {
  checkAll.value = selectedItems.value.length === store.dataAll.data.length;
});
const totalSelectedPrice = computed(() => {
  const total = selectedItems.value.reduce((acc, item) => {
    return acc + (item.price * item.quantity);
  }, 0);
  return total - discountAmount.value;
});
const goToCheckout = () => {
  if (selectedItems.value.length === 0) {
    alert("Please select at least one product to proceed to checkout.");
    return;
  }
  localStorage.setItem('selectedCartItems', JSON.stringify(selectedItems.value));
  localStorage.setItem('discountAmount', JSON.stringify(discountAmount.value));
  router.push('/checkout');
};

const handleIncre = async (index) => {
  store.dataAll.data[index].quantity++;
  store.dataAll.data[index].totalPrice = store.dataAll.data[index].quantity * store.dataAll.data[index].price
  store.dataAll.totalPrice += store.dataAll.data[index].price;
  store.dataAll.quantity++;

  const result = await changeQuantity({
    "product_id" : store.dataAll.data[index].id,
    "quantity": store.dataAll.data[index].quantity,
    "cartId": cartId
  });
  if(result){
    console.log("ok");
  }
};

const handleDecre = async (index) => {
  if(store.dataAll.data[index].quantity > 1){
    store.dataAll.data[index].quantity--;
    store.dataAll.data[index].totalPrice = store.dataAll.data[index].quantity * store.dataAll.data[index].price
    store.dataAll.totalPrice -= store.dataAll.data[index].price;
    store.dataAll.quantity--;
  }
  else{
    await handleDelete(store.dataAll.data[index].id, index);
  }
  const result = await changeQuantity({
    "product_id" : store.dataAll.data[index].id,
    "quantity": store.dataAll.data[index].quantity,
    "cartId": cartId
  });
  if(result){
    console.log("ok");
  }
};
const handleDelete = async (id,index) =>{
  const result = await deleteProduct({
    'product_id' : id
  });
  if(result){
    store.dataAll.data.splice(index, 1);
  }
}

const applyDiscounts = async () =>{
  const result = await applyDiscount({
    code : codeDiscount.value,
    orderTotal : totalSelectedPrice.value,
    userId : userId
  });
  if(result){
    alert(result.message)
    if(result.success === true){
      localStorage.setItem('discountId', result.discount_id);
      discountAmount.value = result.discount_value
    }
  }
}
</script>
<style scoped>

.custom-checkbox {
  user-select: none;
}
.custom-checkbox .checkmark {
  border: 1px solid rgba(0,0,0,0.3);
  transition: all 0.3s ease;
}

.custom-checkbox input:checked + .checkmark {
  background-color: #c14679;
  border-color: #c14679;
}

.custom-checkbox input:checked + .checkmark::after {
  content: "✔";
  color: white;
  font-size: 15px;
  font-weight: 600;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

</style>