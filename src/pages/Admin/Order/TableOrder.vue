
<template>
  <h1 class="text-2xl font-bold text-color-dark max-md:text-xl max-lg:text-center">Đơn hàng</h1>
  <div class="mt-8 md:container max-md:px-2 mx-auto product">
    <RouterLink :to="{ name : 'order-confirmed'}">
      <button class="px-5 font-semibold py-2 bg-color-13 text-sm text-color-white rounded-lg max-md:px-3">Đơn hàng đã xác nhận</button>
    </RouterLink>
    <div class="bg-color-white-2 mt-10 rounded-lg max-md:rounded-lg text-center shadow-shadow-5 transition-all duration-300
      ease-in-out hover:shadow-none max-md:px-2">
      <div class="py-5 pl-3 max-lg:py-3 max-md:pl-1">
        <div class="h-10 relative border pl-3 border-color-light w-1/2 rounded-lg flex justify-between items-center max-md:h-8">
          <input v-model="searchQuery" @input="searchOrders" placeholder="Nhập từ khóa..." type="search" class="w-full bg-color-white-2 outline-none text-color-9 text-base max-md:text-xs">
          <button class="px-2 hover:text-color-2 text-color-3">
            <span class="material-icons-sharp text-3xl max-md:text-xl">search</span>
          </button>
        </div>
      </div>
      <div class="overflow-x-auto w-full max-md:my-0 max-md:mx-auto">
        <table class="w-full border-collapse min-w-[600px]">
          <thead>
          <tr class="border-b border-color-light">
            <th class="p-card-padding max-lg:p-5 max-md:text-xs max-md:p-1 text-color-dark whitespace-nowrap">STT</th>
            <th class="p-card-padding max-lg:p-5 max-md:text-xs max-md:p-1 text-color-dark whitespace-nowrap">Họ tên</th>
            <th class="p-card-padding max-lg:p-5 max-md:text-xs max-md:p-2 text-color-dark whitespace-nowrap">Số điện thoại</th>
            <th class="p-card-padding max-lg:p-5 max-md:text-xs max-md:p-2 text-color-dark whitespace-nowrap">Địa chỉ</th>
            <th class="p-card-padding max-lg:p-5 max-md:text-xs max-md:p-1 text-color-dark whitespace-nowrap">Tổng số lượng</th>
            <th class="p-card-padding max-lg:p-5 max-md:text-xs max-md:p-2 text-color-dark whitespace-nowrap">Tổng tiền</th>
            <th class="p-card-padding max-lg:p-5 max-md:text-xs max-md:p-2 text-color-dark whitespace-nowrap">Trạng thái</th>
            <th class="p-card-padding max-lg:p-5 max-md:text-xs max-md:p-2 text-color-dark whitespace-nowrap">Hành động</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in orders">
            <td class="h-10 border-b border-color-light text-color-dark max-md:text-xs whitespace-nowrap" >{{ index + 1 }}</td>
            <td @click="handleDetail(item.id)" class="h-10 border-b border-color-light text-color-dark max-md:text-xs whitespace-nowrap cursor-pointer">{{ item.first_name }} {{ item.last_name }}</td>
            <td class="h-10 border-b border-color-light text-color-dark max-md:text-xs whitespace-nowrap">{{ item.phone }}</td>
            <td class="h-10 border-b border-color-light text-color-dark max-md:text-xs whitespace-nowrap">{{ item.address }}</td>
            <td class="h-10 border-b border-color-light text-color-dark max-md:text-xs whitespace-nowrap">{{ item.totalQuantity }}</td>
            <td class="h-10 border-b border-color-light text-color-dark max-md:text-xs whitespace-nowrap">{{ item.totalPrice }}</td>
            <td class="h-10 border-b border-color-light text-color-dark">
              <button
                  class="px-2 py-1 text-color-white rounded-lg text-sm font-semibold max-md:text-xs max-md:px-2 bg-color-danger">Chưa xác nhận</button>
            </td>
            <td class="h-10 border-b border-color-light text-color-dark whitespace-nowrap">
              <button @click="handleConfirm(item.id)" class="px-2 font-semibold py-1 bg-color-13 text-color-white rounded-lg max-md:text-xs max-md:px-2
                  whitespace-nowrap">Xác nhận</button>
              <button @click="handleDelete(item.id)" class="px-2 font-semibold py-1 bg-color-2 ml-1 text-color-white rounded-lg max-md:text-xs max-md:px-2 whitespace-nowrap">Xóa</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div
      v-if="openOrderDetail"
      :class="{
    'opacity-100 scale-100 pointer-events-auto': openOrderDetail,
    'opacity-0 scale-95 pointer-events-none': !openOrderDetail,
  }"
      class="fixed top-0 left-0 z-[101] right-0 bottom-0 flex justify-center items-center transition-all duration-300 ease-in-out transform"
      style="background: rgba(0, 0, 0, 0.5)"
  >
    <div class="w-2/3 h-[650px] max-md:h-full bg-white p-4 rounded-2xl transition-all duration-300 ease-in-out overflow-y-auto"
         style="scrollbar-width: none;">
      <div class="flex justify-between items-center mb-6">
        <div
            class="border border-gray-300 w-full py-3 px-5 rounded-lg text-xl font-semibold text-gray-700 bg-gray-100">
          Mã đơn hàng: {{ dataOrderDetail.orders.order_info.id }}
        </div>
        <svg
            @click="handleDetail"
            class="cursor-pointer hover:scale-110 transition-transform"
            width="24"
            height="24"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
          <path d="M15 5L5 15M5 5L15 15" stroke="#667085" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="space-y-4">
        <div class="flex items-center gap-3 text-lg font-medium text-gray-700">
          <span class="w-1/3">First Name:</span>
          <div class="text-gray-900 bg-gray-100 py-2 px-4 rounded-lg w-2/3">
            {{ dataOrderDetail.orders.order_info.first_name }}
          </div>
        </div>
        <div class="flex items-center gap-3 text-lg font-medium text-gray-700">
          <span class="w-1/3">Last Name:</span>
          <div class="text-gray-900 bg-gray-100 py-2 px-4 rounded-lg w-2/3">
            {{ dataOrderDetail.orders.order_info.last_name }}
          </div>
        </div>
        <div class="flex items-center gap-3 text-lg font-medium text-gray-700">
          <span class="w-1/3">Address:</span>
          <div class="text-gray-900 bg-gray-100 py-2 px-4 rounded-lg w-2/3">
            {{ dataOrderDetail.orders.order_info.address }}
          </div>
        </div>
        <div class="flex items-center gap-3 text-lg font-medium text-gray-700">
          <span class="w-1/3">Phone:</span>
          <div class="text-gray-900 bg-gray-100 py-2 px-4 rounded-lg w-2/3">
            {{ dataOrderDetail.orders.order_info.phone }}
          </div>
        </div>
      </div>
      <h2 class="text-xl font-semibold text-gray-800 mb-4 mt-6">Sản phẩm trong đơn hàng</h2>
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
        <tr v-for="item in dataOrderDetail.orders.order_items">
          <td class="max-w-[500px] w-1/2 pt-7 pl-8 pr-[14px] pb-3">
            <div class="flex items-center">
              <a href="#" class="max-w-[146px] w-full inline-block text-center bg-color-10 ">
                <img :src="item.image" alt="Image">
              </a>
              <a href="#" class="ml-8 tracking-wider font-semibold text-xl text-color-1">{{ item.title }}</a>
            </div>
          </td>
          <td class="w-[13%] min-w-[100px] px-[14px] pt-7 pb-3 text-xl text-color-1 tracking-spacing-2">
            {{ item.price }}
          </td>
          <td class="pt-7 pb-3 tracking-spacing-2">
            <div class="flex justify-center items-center">
              <input type="number" v-model="item.quantity" min="1" max="100"
                     class="no-spinner text-xl text-color-1 rounded-md text-center focus:outline-none w-1/6">
            </div>
          </td>
          <td class="w-[13%] min-w-[100px] px-[14px] pt-7 pb-3 text-xl text-color-1 tracking-spacing-2">{{ formatPrice(item.price * item.quantity) }}</td>
        </tr>
        </tbody>
      </table>
      <div class="grid grid-cols-2 items-center gap-3 mt-10">
        <div @click="handleDetail" class="py-[10px] px-4 bg-[#F2F4F7] rounded-md text-base font-semibold cursor-pointer text-color-1 text-center">Hủy</div>
        <div class="py-[10px] px-4 bg-[#7F56D9] rounded-md text-base font-semibold cursor-pointer text-white text-center">Xác nhận</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ElNotification } from 'element-plus';
import {confirmOrder, deleteOrder, getCheckout, getOrderList} from "@/service/orderService.js";
import OrderDetail from "@/pages/Admin/Order/OrderDetail.vue";

export default {
  data(){
    return{
      orders : [],
      searchQuery: "",
      allOrders: [],
      openOrderDetail : false,
      dataOrderDetail : {}
    }
  },
  components:{
    OrderDetail
  },
  methods:{
    async handleDelete (id){
      const result = await deleteOrder(id)
      if(result){
        ElNotification({
          title: 'Success',
          message: 'Xóa thành công đơn hàng',
          type: 'success',
        })
        await this.loadOrders();
      }
    },
    async loadOrders() {
      try {
        const result = await getOrderList();
        this.orders = result.data;
        this.allOrders = result.data;
        console.log(result)
      } catch (err) {
        console.log("Lỗi");
      }
    },
    searchOrders() {
      if (!this.searchQuery) {
        this.orders = this.allOrders; // Nếu không có từ khóa, hiển thị danh sách gốc
      } else {
        this.orders = this.allOrders.filter((order) =>
            order.first_name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
    },
    async handleConfirm(id){
      const result = await confirmOrder({
        "id" : id
      });
      if(result){
        await this.loadOrders();
      }
    },
    async handleDetail(id){
      this.openOrderDetail = !this.openOrderDetail;
      const result = await getCheckout(id);
      if(result){
        this.dataOrderDetail = result;
        console.log(result)
      }
    },
    formatPrice(price){
      return new Intl.NumberFormat('vi-VN').format(price);
    }
  },
  async created(){
    await this.loadOrders();
  }
}
</script>
