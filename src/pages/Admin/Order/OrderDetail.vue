<template>
  <div
      class="w-[700px] max-md:w-full h-[650px] max-md:h-full bg-white p-6 rounded-2xl shadow-lg transition-all duration-300 ease-in-out overflow-y-auto"
      style="scrollbar-width: none;">

    <!-- Header -->
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

    <!-- Order Info -->
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

    <!-- Order Items -->
    <div class="mt-6">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Sản phẩm trong đơn hàng</h2>
      <div class="grid grid-cols-2 gap-4">
        <div v-for="item in dataOrderDetail.orders.order_items" :key="item.id"
             class="bg-white shadow-md rounded-xl p-4 transition-all duration-300 hover:shadow-xl">
          <div class="flex flex-col items-center">
            <img :src="item.image" :alt="item.title"
                 class="w-36 h-40 object-cover rounded-lg mb-3" />
            <div class="text-lg font-medium text-gray-800 text-center">
              {{ item.title }}
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>


<script>
export default {
  props:{
    handleDetail:{
      type : Function,
      required : true
    },
    dataOrderDetail:{
      type : Object
    }
  }
}
</script>