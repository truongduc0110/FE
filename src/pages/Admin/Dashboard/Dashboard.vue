<template>
  <h1 class="text-2xl font-bold text-color-dark max-md:text-xl max-lg:text-center mb-5">Dashboard</h1>
  <div class="bg-color-white-2 min-h-screen rounded-xl font-jakarta">
    <div class="py-4 px-3 border-b border-color-7">
      <div class="text-base font-semibold text-color-1 ">Biểu đồ thống kê</div>
    </div>
    <div class="p-4">
      <div class="grid grid-cols-4 items-center gap-3 mb-5">
        <div class="bg-[#F4EBFF] h-32 rounded-lg p-3 flex flex-col justify-between">
          <div class="bg-white w-8 h-8 flex justify-center items-center rounded-md">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_816_35441)">
                <path d="M10.8332 13.3333H9.1665C8.70817 13.3333 8.33317 12.9583 8.33317 12.5H2.50817V15.8333C2.50817 16.75 3.25817 17.5 4.17484 17.5H15.8332C16.7498 17.5 17.4998 16.75 17.4998 15.8333V12.5H11.6665C11.6665 12.9583 11.2915 13.3333 10.8332 13.3333ZM16.6665 5.83333H13.3332C13.3332 3.99167 11.8415 2.5 9.99984 2.5C8.15817 2.5 6.6665 3.99167 6.6665 5.83333H3.33317C2.4165 5.83333 1.6665 6.58333 1.6665 7.5V10C1.6665 10.925 2.40817 11.6667 3.33317 11.6667H8.33317V10.8333C8.33317 10.375 8.70817 10 9.1665 10H10.8332C11.2915 10 11.6665 10.375 11.6665 10.8333V11.6667H16.6665C17.5832 11.6667 18.3332 10.9167 18.3332 10V7.5C18.3332 6.58333 17.5832 5.83333 16.6665 5.83333ZM8.33317 5.83333C8.33317 4.91667 9.08317 4.16667 9.99984 4.16667C10.9165 4.16667 11.6665 4.91667 11.6665 5.83333H8.32484H8.33317Z" fill="#7F56D9"/>
              </g>
              <defs>
                <clipPath id="clip0_816_35441">
                  <rect width="20" height="20" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </div>
          <div class="text-color-1">
            <div class="text-sm font-medium ">Tổng số</div>
            <div class="text-2xl font-bold">{{ dataProducts.record_total }}</div>
          </div>
        </div>
        <div class="bg-[#FEEAE8] h-32 rounded-lg p-3 flex flex-col justify-between">
          <div class="bg-white w-8 h-8 flex justify-center items-center rounded-md">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.72494 16.5001H16.2749C17.5583 16.5001 18.3583 15.1084 17.7166 14.0001L11.4416 3.1584C10.7999 2.05007 9.19994 2.05007 8.55827 3.1584L2.28327 14.0001C1.6416 15.1084 2.4416 16.5001 3.72494 16.5001ZM9.99994 10.6667C9.5416 10.6667 9.1666 10.2917 9.1666 9.8334V8.16673C9.1666 7.7084 9.5416 7.3334 9.99994 7.3334C10.4583 7.3334 10.8333 7.7084 10.8333 8.16673V9.8334C10.8333 10.2917 10.4583 10.6667 9.99994 10.6667ZM10.8333 14.0001H9.1666V12.3334H10.8333V14.0001Z" fill="#F04438"/>
            </svg>
          </div>
          <div class="text-color-1">
            <div class="text-sm font-medium ">Chưa xác nhận</div>
            <div class="text-2xl font-bold">{{ notificationStats.pending }}</div>
          </div>
        </div>
        <div class="bg-[#DCEFFE] h-32 rounded-lg p-3 flex flex-col justify-between">
          <div class="bg-white w-8 h-8 flex justify-center items-center rounded-md">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M14.9565 1.04175H15.0432C15.7918 1.04173 16.4163 1.04171 16.9119 1.10835C17.4351 1.17868 17.9074 1.33341 18.2869 1.71297C18.6665 2.09252 18.8213 2.56486 18.8916 3.08802C18.9583 3.58367 18.9582 4.20803 18.9582 4.95676V6.71015C18.9582 7.45886 18.9583 8.08318 18.8916 8.57883C18.8213 9.102 18.6665 9.57433 18.2869 9.95383C17.9074 10.3334 17.4351 10.4882 16.9119 10.5585C16.4163 10.6252 15.7919 10.6251 15.0432 10.6251H14.9565C14.2078 10.6251 13.5834 10.6252 13.0878 10.5585C12.5646 10.4882 12.0923 10.3334 11.7128 9.95383C11.3332 9.57433 11.1784 9.102 11.1081 8.57883C11.0415 8.08319 11.0415 7.45882 11.0415 6.71013V4.9567C11.0415 4.20801 11.0415 3.58365 11.1081 3.08802C11.1784 2.56486 11.3332 2.09252 11.7128 1.71297C12.0923 1.33341 12.5646 1.17868 13.0878 1.10835C13.5834 1.04171 14.2078 1.04173 14.9565 1.04175ZM14.1665 7.50008C14.1665 7.03985 14.5379 6.66675 14.9961 6.66675H15.0036C15.4618 6.66675 15.8332 7.03985 15.8332 7.50008C15.8332 7.96032 15.4618 8.33342 15.0036 8.33342H14.9961C14.5379 8.33342 14.1665 7.96032 14.1665 7.50008Z" fill="#0990F7"/>
              <path d="M6.81998 1.875C6.08125 1.87496 5.44473 1.87493 4.93502 1.94346C4.38876 2.0169 3.86513 2.18252 3.44041 2.60724C3.01569 3.03196 2.85007 3.55559 2.77663 4.10184C2.7081 4.61156 2.70813 5.24808 2.70817 5.98681V12.2917L2.7081 12.3261C2.70702 12.3688 2.70192 12.3899 2.68333 12.4284L2.67496 12.4448L2.36168 13.0544C1.75835 14.1678 1.35206 15.0544 1.16416 15.7906C0.970798 16.5481 0.99359 17.2079 1.32213 17.8047C1.68941 18.4718 2.34565 18.7318 3.08171 18.8471C3.79308 18.9584 4.74174 18.9583 5.90547 18.9583H14.094C15.2578 18.9583 16.2064 18.9584 16.9178 18.8471C17.6538 18.7318 18.3101 18.4718 18.6773 17.8047C19.0059 17.2079 19.0287 16.548 18.8353 15.7905C18.647 15.0531 18.2396 14.1646 17.6344 13.0483L17.3371 12.4999C17.3233 12.4743 17.3163 12.4615 17.3118 12.4511C17.2987 12.4204 17.2956 12.4083 17.2925 12.375C17.2915 12.3637 17.2915 12.3397 17.2915 12.2917C17.2915 12.1359 17.2915 12.058 17.258 12C17.2361 11.962 17.2045 11.9304 17.1665 11.9085C17.1085 11.875 17.0306 11.875 16.8748 11.875H4.87484C4.63914 11.875 4.52129 11.875 4.44807 11.8018C4.37484 11.7286 4.37484 11.6107 4.37484 11.375V6.04167C4.37484 5.23244 4.37662 4.70935 4.42843 4.32393C4.47703 3.96248 4.55548 3.84919 4.61892 3.78575C4.68236 3.72231 4.79565 3.64386 5.1571 3.59526C5.54252 3.54344 6.06561 3.54167 6.87484 3.54167H9.16651C9.62676 3.54167 9.99984 3.16858 9.99984 2.70834C9.99984 2.2481 9.62676 1.875 9.16651 1.875H6.81998Z" fill="#0990F7"/>
            </svg>
          </div>
          <div class="text-color-1">
            <div class="text-sm font-medium ">Đã xác nhận</div>
            <div class="text-2xl font-bold">{{ dataOrdersConfirmed.length }}</div>
          </div>
        </div>
        <div
            class="h-32 rounded-lg p-3 flex flex-col justify-between transition-all duration-500"
            :class="revenueClass"
        >
          <div class="bg-white w-8 h-8 flex justify-center items-center rounded-md">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M10.0478 1.45825C11.8734 1.45824 13.3073 1.45824 14.4268 1.60874C15.574 1.76299 16.4842 2.08552 17.1994 2.80068C17.9146 3.51584 18.2371 4.42606 18.3913 5.57327C18.5418 6.69279 18.5418 8.1267 18.5418 9.95225V10.0476C18.5418 11.8732 18.5418 13.3071 18.3913 14.4266C18.2371 15.5738 17.9146 16.484 17.1994 17.1992C16.4842 17.9143 15.574 18.2368 14.4268 18.3911C13.3073 18.5416 11.8734 18.5416 10.0478 18.5416H9.9525C8.12691 18.5416 6.69303 18.5416 5.57351 18.3911C4.4263 18.2368 3.51609 17.9143 2.80092 17.1992C2.08576 16.484 1.76323 15.5738 1.60899 14.4266C1.45848 13.3071 1.45849 11.8732 1.4585 10.0476V9.95225C1.45849 8.12668 1.45848 6.69279 1.60899 5.57327C1.76323 4.42606 2.08576 3.51584 2.80092 2.80068C3.51609 2.08552 4.4263 1.76299 5.57351 1.60874C6.69303 1.45824 8.12693 1.45824 9.9525 1.45825H10.0478ZM14.0647 6.68357C14.2856 7.08736 14.1372 7.59373 13.7335 7.81455C12.5907 8.4395 11.5175 9.74784 10.698 11.0026C10.2986 11.6143 9.97808 12.1838 9.75766 12.6003C9.64766 12.808 9.56316 12.9767 9.50675 13.092L9.42483 13.2632C9.29608 13.5446 9.02191 13.7318 8.71291 13.7488C8.40383 13.7658 8.11072 13.6102 7.95181 13.3445C7.69288 12.9116 7.28144 12.5164 6.90014 12.215C6.71486 12.0685 6.5481 11.953 6.42909 11.8751L6.25385 11.7655C5.85427 11.5373 5.71514 11.0286 5.9431 10.6289C6.1711 10.2291 6.68004 10.0898 7.07982 10.3178L7.34235 10.4809C7.49418 10.5803 7.70241 10.7247 7.93381 10.9076C8.11065 11.0474 8.30836 11.2155 8.508 11.4092C8.722 11.0247 8.9895 10.5708 9.30258 10.0913C10.1498 8.794 11.4099 7.18564 12.9338 6.35227C13.3376 6.13144 13.8439 6.27977 14.0647 6.68357Z" fill="#17B26A"/>
            </svg>
          </div>
          <div class="text-color-1">
            <div class="text-sm font-medium ">Tổng doanh thu tháng</div>
            <div class="text-2xl font-bold">{{ formatPrice(totalRevenue) }}</div>
          </div>
        </div>
      </div>

      <div class="p-6 space-y-8">
        <h2 class="text-2xl font-bold text-gray-800">🔍 Top luật kết hợp theo độ tin cậy</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="(rule, index) in topConfidence" :key="'conf-' + index" class="p-4 bg-white rounded-2xl shadow">
            <p class="text-sm text-gray-600">
              Nếu khách mua: <span class="font-medium text-blue-600">{{ rule.antecedents.join(', ') }}</span>
            </p>
            <p class="text-sm text-gray-600">
              Thì thường mua: <span class="font-medium text-green-600">{{ rule.consequents.join(', ') }}</span>
            </p>
            <p class="text-xs text-gray-400 mt-1">Confidence: {{ rule.confidence }}, Support: {{ rule.support }}</p>
          </div>
        </div>

        <h2 class="text-2xl font-bold text-gray-800">🔥 Top combo phổ biến nhất theo Support</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="(combo, index) in topSupport" :key="'supp-' + index" class="p-4 bg-white rounded-2xl shadow">
            <p class="text-sm text-gray-600">
              Combo: <span class="font-medium text-pink-600">{{ combo.items.join(', ') }}</span>
            </p>
            <p class="text-xs text-gray-400 mt-1">Support: {{ combo.support }}, Confidence: {{ combo.confidence }}</p>
          </div>
        </div>
      </div>


      <iframe title="btlhtttql1" width="1140" height="541.25" src="https://app.powerbi.com/reportEmbed?reportId=3ba8cefd-0499-42bd-8741-8024852263ab&autoAuth=true&ctid=e7572e92-7aee-4713-a3c4-ba64888ad45f" frameborder="0" allowFullScreen="true"></iframe>


      <!-- New Admin Features Section -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <!-- Quick News Widget -->
        <div class="bg-white rounded-lg p-4 border border-gray-200">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-lg font-semibold text-gray-800">Tin tức mới</h3>
            <RouterLink :to="{ name: 'admin-news' }" class="text-blue-500 hover:text-blue-600 text-sm">
              Xem tất cả
            </RouterLink>
          </div>
          <div class="space-y-2">
            <div v-for="news in latestNews" :key="news.id" class="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded">
              <div class="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">{{ news.title }}</p>
                <p class="text-xs text-gray-500">{{ formatDate(news.date) }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Notifications Widget -->
        <div class="bg-white rounded-lg p-4 border border-gray-200">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-lg font-semibold text-gray-800">Cảnh báo gần đây</h3>
            <RouterLink :to="{ name: 'admin-notifications' }" class="text-red-500 hover:text-red-600 text-sm">
              Xem tất cả
            </RouterLink>
          </div>
          <div class="space-y-2">
            <div v-for="alert in recentAlerts" :key="alert.id" class="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded">
              <div :class="[
                'w-2 h-2 rounded-full mt-2 flex-shrink-0',
                alert.priority === 'urgent' ? 'bg-red-500' : 'bg-yellow-500'
              ]"></div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">{{ alert.message }}</p>
                <p class="text-xs text-gray-500">{{ formatTime(alert.time) }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- AI Assistant Widget -->
        <div class="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-4 border border-blue-200">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-lg font-semibold text-gray-800">AI Assistant</h3>
            <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <p class="text-sm text-gray-600 mb-3">Hỏi tôi về bất cứ điều gì liên quan đến cửa hàng</p>
          <RouterLink 
            :to="{ name: 'admin-chatbot' }" 
            class="inline-flex items-center px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.477 8-10 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.477-8 10-8s10 3.582 10 8z"/>
            </svg>
            Trò chuyện ngay
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getProductList} from "@/service/productsService.js";
import {confirmedOrder, getOrderList} from "@/service/orderService.js";
import {getNotificationStats} from "@/service/notificationService.js";
import OrderOnMonth from "@/pages/Admin/Dashboard/OrderOnMonth.vue";
import TotalPriceOnMonth from "@/pages/Admin/Dashboard/TotalPriceOnMonth.vue";
import Products from "@/pages/Admin/Dashboard/Products.vue"
export default {
  components:{
    OrderOnMonth,
    TotalPriceOnMonth,
    Products
  },
  data(){
    return{
      dataProducts : [],
      dataOrders : [],
      dataOrdersConfirmed : [],
      totalRevenue : [],
      notificationStats: {
        urgent: 0,
        pending: 0,
        today: 0,
        processed: 0,
        unread: 0
      },
      latestNews: [
        {
          id: 1,
          title: 'Xu hướng bánh ngọt năm 2025: Từ healthy đến premium',
          date: new Date('2025-06-14')
        },
        {
          id: 2,
          title: 'Công nghệ AI trong sản xuất bánh: Cách mạng mới',
          date: new Date('2025-06-13')
        },
        {
          id: 3,
          title: 'Mẹo bảo quản bánh trong mùa hè nóng ẩm',
          date: new Date('2025-06-12')
        }
      ],
      recentAlerts: [
        {
          id: 1,
          message: 'Đơn hàng #12345 cần xác nhận gấp',
          priority: 'urgent',
          time: new Date(Date.now() - 2 * 60 * 60 * 1000)
        },
        {
          id: 2,
          message: 'Khách VIP đặt đơn hàng lớn',
          priority: 'high',
          time: new Date(Date.now() - 1 * 60 * 60 * 1000)
        },
        {
          id: 3,
          message: 'Tồn kho bột mì thấp',
          priority: 'normal',
          time: new Date(Date.now() - 30 * 60 * 1000)
        }
      ],
      topConfidence: [],
      topSupport: []
    }
  },
  methods: {
    async loadProducts() {
      const result = await getProductList();
      if (result) {
        this.dataProducts = result.data;
      }
    },
    async loadOrders() {
      const result = await getOrderList();
      if (result) {
        this.dataOrders = result.data;
      }
    },
    async loadOrdersConfirmed() {
      const result = await confirmedOrder();
      if (result) {
        this.dataOrdersConfirmed = result.orders;
        this.totalRevenue = this.dataOrdersConfirmed.reduce((sum, order) => sum + (order.totalPrice || 0), 0);
      }
    },
    formatPrice(price) {
      return new Intl.NumberFormat('vi-VN').format(price);
    },
    formatDate(date) {
      return new Intl.DateTimeFormat('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).format(new Date(date));
    },
    formatTime(date) {
      const now = new Date();
      const diff = Math.floor((now - new Date(date)) / 1000);
      
      if (diff < 60) return 'Vài giây trước';
      if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
      if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;
      return `${Math.floor(diff / 86400)} ngày trước`;
    },
    async loadNotificationStats() {
      const result = await getNotificationStats();
      if (result.success) {
        this.notificationStats = result.stats;
      }
    },
    async loadTopCombos(){
      try {
        const response = await fetch("http://localhost:5000/api/top-combos");
        if (!response.ok) throw new Error("Lỗi khi gọi API");
        const result = await response.json();
        this.topConfidence = result.top_confidence;
        this.topSupport = result.top_support
        console.log(result);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu combo:", error);
      }
    }
  },
  computed: {
    revenueClass() {
      if (this.totalRevenue < 5000000) {
        return 'bg-red-100 border border-red-400 animate-pulse';
      } else if (this.totalRevenue < 10000000) {
        return 'bg-yellow-100 border border-yellow-400 animate-pulse';
      } else {
        return 'bg-green-100 border border-green-400 animate-pulse';
      }
    }
  },
  async created () {
    await this.loadProducts();
    await this.loadOrders();
    await this.loadOrdersConfirmed();
    await this.loadNotificationStats();
    await this.loadTopCombos();
  },
};
</script>