
<template>
    <div class="container mx-auto py-[100px]">
        <div>
            <h3 class="text-4xl font-medium text-color-1 tracking-wider text-center">Địa chỉ giao hàng</h3>
            <div class="my-8">
                <div class="flex justify-between gap-3">
                    <input v-model="delivery.first_name" type="text" placeholder="First Name" class="w-full min-h-[60px] py-5 focus:outline-none border-b border-border-color-2 text-font-15 bg-transparent text-color-1">
                    <input v-model="delivery.last_name" type="text" placeholder="Last Name" class="w-full min-h-[60px] py-5 focus:outline-none border-b border-border-color-2 text-font-15 bg-transparent text-color-1">
                </div>
                <input v-model="delivery.company" type="text" placeholder="Company" class="my-5 w-full min-h-[60px] py-5 focus:outline-none border-b border-border-color-2 text-font-15 bg-transparent text-color-1">
                <input v-model="delivery.address" type="text" placeholder="Address" class="my-5 w-full min-h-[60px] py-5 focus:outline-none border-b border-border-color-2 text-font-15 bg-transparent text-color-1">
                <input v-model="delivery.city" type="text" placeholder="City/Town" class="my-5 w-full min-h-[60px] py-5 focus:outline-none border-b border-border-color-2 text-font-15 bg-transparent text-color-1">
                <div class="flex justify-between gap-3">
                    <input v-model="delivery.email" type="text" placeholder="Email" class="w-full min-h-[60px] py-5 focus:outline-none border-b border-border-color-2 text-font-15 bg-transparent text-color-1">
                    <input v-model="delivery.phone" type="text" placeholder="Phone" class="w-full min-h-[60px] py-5 focus:outline-none border-b border-border-color-2 text-font-15 bg-transparent text-color-1">
                </div>
            </div>
        </div>

        <div class="mt-[80px]">
            <h3 class="text-4xl font-medium text-color-1 tracking-wider mb-[50px]">Giỏ hàng của bạn</h3>
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
              <tr v-for="(item, index) in dataProducts">
                <td class="max-w-[500px] w-1/2 pt-7 pl-8 pr-[14px] pb-3">
                  <div class="flex items-center">
                    <a href="#" class="max-w-[146px] w-full inline-block text-center bg-color-10 ">
                      <img :src="item.image" alt="Image">
                    </a>
                    <a href="#" class="ml-8 tracking-wider font-semibold text-xl text-color-1">{{ item.title }}</a>
                  </div>
                </td>
                <td class="w-[13%] min-w-[100px] px-[14px] pt-7 pb-3 text-xl text-color-1 tracking-spacing-2">
                  {{ formatPrice(item.price) }}
                </td>
                <td class="pt-7 pb-3 tracking-spacing-2">
                  <div class="flex justify-center items-center">
                    <input type="number" v-model="item.quantity" min="1" max="100"
                           class="no-spinner text-xl text-color-1 rounded-md text-center focus:outline-none w-1/6">
                  </div>
                </td>
                <td class="w-[13%] min-w-[100px] px-[14px] pt-7 pb-3 text-xl text-color-1 tracking-spacing-2">{{ formatPrice(item.totalPrice) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="grid grid-cols-2 gap-5 checkout mt-[100px]">
          <div v-if="!statusPayment">
            <h3 class="text-4xl font-medium text-color-1 tracking-wider">Phương thức thanh toán</h3>
            <div class="py-7 px-[26px] border border-border-color-2 mt-10">
              <label class="capitalize relative text-left pl-8 text-font-15 tracking-wide text-color-9 cursor-pointer flex items-center">
                <input v-model="methodPayment" value="vnPay" type="radio" name="payment" class="absolute left-0 top-[2xp] rounded-[3px] cursor-pointer w-5 h-5">
                <span class="text-color-1 text-lg tracking-widest font-medium">VN PAY</span>
              </label>
              <label class="mt-8 capitalize relative text-left pl-8 text-font-15 tracking-wide text-color-9 cursor-pointer flex items-center">
                <input v-model="methodPayment" value="Cod" type="radio" name="payment" class="absolute left-0 top-[2px] rounded-[3px] cursor-pointer w-5 h-5">
                <span class="text-color-1 text-lg tracking-widest font-medium">Thanh toán khi nhận hàng</span>
              </label>
            </div>
            <div v-if="methodPayment !== 'Cod' && methodPayment !== ''" class="text-right mt-5">
              <button @click="handlePayment" class="text-sm font-bold text-color-white py-5 px-8 bg-linear-gradient-1 rounded-lg
                hover:bg-color-6">PAYMENT NOW</button>
            </div>
          </div>
          <div v-else>
            <h3 class="text-4xl font-medium text-color-1 tracking-wider">Thanh toán thành công</h3>
            <div class="py-7 px-[26px] border border-border-color-2 mt-10">
              <div class="grid grid-cols-2 gap-4">
                <p class="text-lg text-color-9 font-semibold">Mã giao dịch:</p>
                <p class="text-lg text-color-1 font-medium">{{ paymentData.transactionNo }}</p>

                <p class="text-lg text-color-9 font-semibold">Số tiền:</p>
                <p class="text-lg text-color-1 font-medium">{{ formatPrice(paymentData.amount) }} VND</p>

                <p class="text-lg text-color-9 font-semibold">Thời gian:</p>
                <p class="text-lg text-color-1 font-medium">{{ paymentData.payDate }}</p>
              </div>
            </div>
          </div>
            <div>
                <h3 class="text-4xl font-medium text-color-1 tracking-wider">CART TOTAL</h3>
                <div class="border border-border-color-2 mt-10">
                    <div class="flex justify-between py-[22px] pl-6 pr-[50px] border-b border-border-color-2">
                        <div class="text-color-1 text-lg tracking-wider">CART SUBTOTAL</div>
                        <div class="text-color-1 text-lg tracking-wider">{{ formatPrice(totalPrice) }} <span class="font-semibold">VND</span></div>
                    </div>
                    <div class="flex justify-between py-[22px] pl-6 pr-[50px] border-b border-border-color-2">
                        <div class="text-color-1 text-lg tracking-wider">SHIPPING</div>
                        <div class="text-color-1 text-lg tracking-wider">FREE</div>
                    </div>
                  <div class="flex justify-between py-[22px] pl-6 pr-[50px] border-b border-border-color-2">
                    <div class="text-color-1 text-lg tracking-wider">Discount</div>
                    <div class="text-color-1 text-lg tracking-wider">{{ formatPrice(discountAmount) }} VND</div>
                  </div>
                    <div class="flex justify-between py-[22px] pl-6 pr-[50px] border-b border-border-color-2">
                        <div class="text-color-1 text-lg tracking-wider">TOTAL</div>
                        <div class="text-color-1 text-lg tracking-wider">{{formatPrice(totalPrice)}} <span class="font-semibold">VND</span></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="text-right mt-5">
            <button class="min-w-[190px] text-sm font-bold text-color-white py-5 px-[50px] bg-color-2 rounded-lg
                hover:bg-color-6" @click="handleOrder">ORDER NOW</button>
        </div>
      <div @click="handlePaymentMomo">Payment</div>
    </div>
</template>
<script setup>
import {ElNotification} from 'element-plus'
import {useProduct} from '@/stores/local';
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import {checkout, payment, paymentMomo} from "@/service/orderService.js";
import { v4 as uuidv4 } from 'uuid';

const store = useProduct();
const router = useRouter();
const methodPayment = ref('');
const dataProducts = ref([]);
const totalPrice = ref(0);
const totalQuantity = ref(0);
const discountAmount = localStorage.getItem('discountAmount') || 0;
const userId = JSON.parse(localStorage.getItem('user')).id
const discountId = localStorage.getItem("discountId");

const loadProducts = () =>{
  const selectedItems = JSON.parse(localStorage.getItem('selectedCartItems')) || [];
  dataProducts.value = selectedItems;
  const total =  selectedItems.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);
  totalPrice.value = total - discountAmount;
  totalQuantity.value = dataProducts.value.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);
}

const delivery = ref({
  "first_name" : "",
  "last_name" : "",
  "company" : "",
  "address": "",
  "city" : "",
  "email" : "",
  "phone" : ""
})
const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN').format(price);
};
const handleOrder = async () =>{
  const requiredFields = ["first_name", "last_name", "address", "city", "email", "phone"];
  const missingFields = requiredFields.filter(field => !delivery.value[field].trim());

  if (missingFields.length > 0) {
    ElNotification({
      title: "Lỗi",
      message: "Vui lòng nhập đầy đủ thông tin giao hàng",
      type: "error",
    });
    return;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(delivery.value.email)) {
    ElNotification({
      title: "Lỗi",
      message: "Địa chỉ email không hợp lệ",
      type: "error",
    });
    return;
  }
  if(methodPayment.value === '' && statusPayment === false){
    ElNotification({
      title: 'Lỗi',
      message: 'Vui lòng chọn phương thức thanh toán',
      type: 'error',
    })
  }else {
    const result = await checkout({
      "cart_id" : localStorage.getItem("cartId"),
      "delivery" : delivery.value,
      "products" : dataProducts.value,
      "quantity" : totalQuantity.value,
      "totalPrice" : totalPrice.value,
      "discount_id" : discountId,
      "user_id" : userId
    })
    if (result) {
      store.$patch((state) => {
        const orderedIds = dataProducts.value.map(item => item.id);
        state.dataAll.data = state.dataAll.data.filter(
            item => !orderedIds.includes(item.id)
        );
      })
      localStorage.removeItem("selectedCartItems");
      localStorage.removeItem("discountAmount");
      localStorage.removeItem("discountId");
      router.replace({path: `/success/${result.order_id}`});
    }
  }
}
const handlePayment = async () =>{
  const orderId = uuidv4();
  const amount = store.dataAll.totalPrice;

  const result = await payment({
    orderId : orderId,
    amount : amount
  })
  if (result.payUrl) {
    window.location.href = result.payUrl;
  }
}
const handlePaymentMomo = async () =>{
  const amount = 100000;

  const result = await paymentMomo(amount)
  if (result.payUrl) {
    window.location.href = result.payUrl;
  }
}
const statusPayment = ref(false);
const paymentData = ref({
  transactionNo: "",
  amount: "",
  payDate: ""
});

onMounted(() => {
  loadProducts();
  const params = new URLSearchParams(window.location.search);
  if (params.get("vnp_ResponseCode") === "00") {
    statusPayment.value = true;
    paymentData.value.transactionNo = params.get("vnp_TransactionNo") || "Không có";
    paymentData.value.amount = (parseInt(params.get("vnp_Amount")) / 100) || "Không có"; // Chia 100 vì VNPAY trả về x100
    paymentData.value.payDate = params.get("vnp_PayDate") || "Không có";
    store.dataAll.totalPrice = 0
  }
});

</script>