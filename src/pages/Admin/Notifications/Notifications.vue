<template>
  <div class="p-6">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Cảnh báo đơn hàng</h1>
      <div class="flex gap-3">
        <button 
          @click="refreshNotifications" 
          class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          :disabled="loading"
        >
          <svg :class="{'animate-spin': loading}" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2V6M12 18V22M22 12H18M6 12H2M19.0711 4.92893L16.2426 7.75736M7.75736 16.2426L4.92893 19.0711M19.0711 19.0711L16.2426 16.2426M7.75736 7.75736L4.92893 4.92893" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          {{ loading ? 'Đang tải...' : 'Làm mới' }}
        </button>
        <button 
          @click="markAllAsRead" 
          class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
          :disabled="unreadCount === 0"
        >
          Đánh dấu đã đọc tất cả
        </button>
      </div>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div class="bg-red-50 border border-red-200 rounded-lg p-4">
        <div class="flex items-center">
          <div class="p-2 bg-red-100 rounded-lg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 9v4M12 17h.01M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z" stroke="#dc2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-red-600">Khẩn cấp</p>
            <p class="text-2xl font-bold text-red-900">{{ urgentOrders }}</p>
          </div>
        </div>
      </div>

      <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div class="flex items-center">
          <div class="p-2 bg-yellow-100 rounded-lg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#d97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>          <div class="ml-3">
            <p class="text-sm font-medium text-yellow-600">Chờ xử lý</p>
            <p class="text-2xl font-bold text-yellow-900">{{ pendingOrdersCount }}</p>
          </div>
        </div>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 rounded-lg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 17h5l-5 5v-5zM4 19h6v2H4zM4 15h8v2H4zM4 11h10v2H4z" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-blue-600">Hôm nay</p>
            <p class="text-2xl font-bold text-blue-900">{{ todayOrders }}</p>
          </div>
        </div>
      </div>

      <div class="bg-green-50 border border-green-200 rounded-lg p-4">
        <div class="flex items-center">
          <div class="p-2 bg-green-100 rounded-lg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#16a34a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-green-600">Đã xử lý</p>
            <p class="text-2xl font-bold text-green-900">{{ processedToday }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filter Tabs -->
    <div class="border-b border-gray-200 mb-6">
      <nav class="-mb-px flex space-x-8">
        <button 
          v-for="filter in filters" 
          :key="filter.key"
          @click="activeFilter = filter.key"
          :class="[
            'py-2 px-1 border-b-2 font-medium text-sm transition-colors',
            activeFilter === filter.key 
              ? 'border-blue-500 text-blue-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          ]"
        >
          {{ filter.label }}
          <span v-if="filter.count > 0" class="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2 rounded-full text-xs">
            {{ filter.count }}
          </span>
        </button>
      </nav>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
    </div>    <!-- Notifications List -->
    <div v-else class="space-y-4">
      <div 
        v-for="notification in paginatedNotifications" 
        :key="notification.id"
        :class="[
          'bg-white rounded-lg border p-4 transition-all hover:shadow-md',
          notification.priority === 'urgent' ? 'border-red-300 bg-red-50' : '',
          notification.priority === 'high' ? 'border-yellow-300 bg-yellow-50' : '',
          !notification.read ? 'border-l-4 border-l-blue-500' : ''
        ]"
      >
        <div class="flex items-start justify-between">
          <div class="flex items-start space-x-3">
            <!-- Priority Icon -->
            <div class="flex-shrink-0 mt-1">
              <div v-if="notification.priority === 'urgent'" class="w-3 h-3 bg-red-500 rounded-full"></div>
              <div v-else-if="notification.priority === 'high'" class="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div v-else class="w-3 h-3 bg-blue-500 rounded-full"></div>
            </div>
            
            <!-- Content -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1">
                <h3 :class="['font-medium', !notification.read ? 'text-gray-900' : 'text-gray-600']">
                  {{ notification.title }}
                </h3>
                <span v-if="!notification.read" class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  Mới
                </span>
              </div>
              
              <p class="text-gray-600 text-sm mb-2">{{ notification.message }}</p>
              
              <!-- Order Details -->
              <div v-if="notification.orderDetails" class="bg-gray-50 rounded p-3 mb-3">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div>
                    <span class="font-medium text-gray-500">Mã đơn:</span>
                    <span class="ml-1 text-gray-900">#{{ notification.orderDetails.id }}</span>
                  </div>
                  <div>
                    <span class="font-medium text-gray-500">Khách hàng:</span>
                    <span class="ml-1 text-gray-900">{{ notification.orderDetails.customerName }}</span>
                  </div>
                  <div>
                    <span class="font-medium text-gray-500">Giá trị:</span>
                    <span class="ml-1 text-gray-900">{{ formatPrice(notification.orderDetails.total) }}</span>
                  </div>
                  <div>
                    <span class="font-medium text-gray-500">Thời gian:</span>
                    <span class="ml-1 text-gray-900">{{ formatTime(notification.orderDetails.createdAt) }}</span>
                  </div>
                </div>
              </div>
              
              <!-- Meta Info -->
              <div class="flex items-center text-xs text-gray-500 space-x-4">
                <span>{{ formatDate(notification.createdAt) }}</span>
                <span>{{ notification.type }}</span>
              </div>
            </div>
          </div>
          
          <!-- Actions -->
          <div class="flex items-center space-x-2 ml-4">
            <button 
              v-if="notification.orderDetails"
              @click="viewOrder(notification.orderDetails.id)"
              class="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Xem đơn hàng
            </button>
            <button 
              @click="markAsRead(notification)"
              class="text-gray-400 hover:text-gray-600"
              v-if="!notification.read"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 11l3 3L22 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <button 
              @click="dismissNotification(notification)"
              class="text-gray-400 hover:text-red-600"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>    <!-- Empty State -->
    <div v-if="!loading && paginatedNotifications.length === 0" class="text-center py-12">
      <div class="text-gray-400 mb-4">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="mx-auto">
          <path d="M9 11l3 3L22 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gray-600 mb-2">Không có cảnh báo nào</h3>
      <p class="text-gray-500">Tất cả đơn hàng đều đã được xử lý</p>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="flex justify-center mt-8">
      <nav class="flex items-center gap-2">
        <button 
          @click="goToPage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-3 py-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          Trước
        </button>
        <span class="px-4 py-2 text-sm text-gray-600">
          Trang {{ currentPage }} / {{ totalPages }}
        </span>
        <button 
          @click="goToPage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="px-3 py-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          Sau
        </button>
      </nav>
    </div>
  </div>
</template>

<script>
import { getNotifications, getNotificationStats } from "@/service/notificationService.js";

export default {
  name: 'AdminNotifications',
  data() {
    return {
      loading: false,
      notifications: [],
      activeFilter: 'all',
      currentPage: 1,
      itemsPerPage: 10,      pendingOrders: [],
      confirmedOrders: [],
      allOrders: []
    }
  },
  computed: {
    filters() {
      return [
        { key: 'all', label: 'Tất cả', count: this.notifications.length },
        { key: 'unread', label: 'Chưa đọc', count: this.unreadCount },
        { key: 'urgent', label: 'Khẩn cấp', count: this.urgentCount },
        { key: 'today', label: 'Hôm nay', count: this.todayCount }
      ];
    },
    
    filteredNotifications() {
      let filtered = [...this.notifications];
      
      switch (this.activeFilter) {
        case 'unread':
          filtered = filtered.filter(n => !n.read);
          break;
        case 'urgent':
          filtered = filtered.filter(n => n.priority === 'urgent');
          break;
        case 'today':
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          filtered = filtered.filter(n => new Date(n.createdAt) >= today);
          break;
      }
      
      return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },
    
    unreadCount() {
      return this.notifications.filter(n => !n.read).length;
    },
    
    urgentCount() {
      return this.notifications.filter(n => n.priority === 'urgent').length;
    },
    
    todayCount() {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return this.notifications.filter(n => new Date(n.createdAt) >= today).length;
    },    urgentOrders() {
      return this.pendingOrders.filter(order => {
        const hoursSinceCreated = (new Date() - new Date(order.createdAt)) / (1000 * 60 * 60);
        return hoursSinceCreated > 24; // Đơn hàng quá 24h chưa xử lý = khẩn cấp
      }).length;
    },
    
    pendingOrdersCount() {
      return this.pendingOrders.length;
    },
    
    todayOrders() {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return this.pendingOrders.filter(order => 
        new Date(order.createdAt) >= today
      ).length;
    },
    
    processedToday() {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return this.confirmedOrders.filter(order => 
        new Date(order.confirmedAt || order.updatedAt) >= today
      ).length;
    },
    
    totalPages() {
      return Math.ceil(this.filteredNotifications.length / this.itemsPerPage);
    },
    
    paginatedNotifications() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredNotifications.slice(start, end);
    }
  },  methods: {
    async refreshNotifications() {
      this.loading = true;
      try {
        console.log('Fetching notifications...');
        const result = await getNotifications();
        console.log('Notification result:', result);
        
        if (result.success) {
          this.notifications = result.notifications;
          this.pendingOrders = result.pendingOrders;
          this.confirmedOrders = result.confirmedOrders;
          console.log('Loaded notifications:', this.notifications.length);
          console.log('Pending orders:', this.pendingOrders.length);
        } else {
          console.error('Error fetching notifications:', result.error);
          // Fallback: tạo mock data khi API lỗi
          this.createMockData();
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
        // Fallback: tạo mock data khi có lỗi
        this.createMockData();
      } finally {
        this.loading = false;
      }
    },

    createMockData() {
      console.log('Creating mock data...');
      // Tạo data mẫu khi không có data thực
      this.pendingOrders = [
        {
          id: '12345',
          customerName: 'Nguyễn Văn A',
          totalPrice: 350000,
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 giờ trước
        },
        {
          id: '12346',
          customerName: 'Trần Thị B',
          totalPrice: 1200000,
          createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000) // 1 giờ trước
        },
        {
          id: '12347',
          customerName: 'Lê Văn C',
          totalPrice: 180000,
          createdAt: new Date(Date.now() - 26 * 60 * 60 * 1000) // 26 giờ trước (quá hạn)
        }
      ];
      
      this.confirmedOrders = [
        {
          id: '12340',
          customerName: 'Hoàng Văn E',
          totalPrice: 280000,
          createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
          confirmedAt: new Date(Date.now() - 1 * 60 * 60 * 1000)
        }
      ];

      // Tạo notifications từ mock data
      this.generateNotificationsFromMockData();
    },

    generateNotificationsFromMockData() {
      const notifications = [];
      const now = new Date();

      // Tạo notification cho đơn hàng chưa xác nhận
      this.pendingOrders.forEach(order => {
        const hoursSinceCreated = (now - new Date(order.createdAt)) / (1000 * 60 * 60);
        let priority = 'normal';
        let title = 'Đơn hàng mới cần xác nhận';
        let message = `Đơn hàng #${order.id} đã được đặt`;

        if (hoursSinceCreated > 24) {
          priority = 'urgent';
          title = 'Đơn hàng quá hạn chưa xử lý';
          message = `Đơn hàng #${order.id} đã quá ${Math.floor(hoursSinceCreated)}h chưa được xác nhận`;
        } else if (hoursSinceCreated > 2) {
          priority = 'high';
          message = `Đơn hàng #${order.id} đã được đặt cách đây ${Math.floor(hoursSinceCreated)} giờ`;
        }

        // Kiểm tra nếu đơn hàng có giá trị cao (VIP)
        if (order.totalPrice > 1000000) {
          priority = priority === 'urgent' ? 'urgent' : 'high';
          title = 'Đơn hàng VIP cần ưu tiên';
          message = `Khách hàng đã đặt đơn hàng lớn trị giá ${this.formatPrice(order.totalPrice)}`;
        }

        notifications.push({
          id: `order_${order.id}`,
          title,
          message,
          type: 'new_order',
          priority,
          read: false,
          createdAt: new Date(order.createdAt),
          orderDetails: {
            id: order.id,
            customerName: order.customerName,
            total: order.totalPrice,
            createdAt: new Date(order.createdAt)
          }
        });
      });

      // Tạo notification cho đơn hàng đã xử lý hôm nay
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      this.confirmedOrders.forEach(order => {
        const confirmedDate = new Date(order.confirmedAt || order.updatedAt);
        if (confirmedDate >= today) {
          notifications.push({
            id: `confirmed_${order.id}`,
            title: 'Đơn hàng đã được xử lý',
            message: `Đơn hàng #${order.id} đã được xác nhận và chuyển sang sản xuất`,
            type: 'order_processed',
            priority: 'normal',
            read: true,
            createdAt: confirmedDate,
            orderDetails: {
              id: order.id,
              customerName: order.customerName,
              total: order.totalPrice,
              createdAt: new Date(order.createdAt)
            }
          });
        }
      });

      // Sắp xếp theo thời gian tạo (mới nhất trước)
      this.notifications = notifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      console.log('Generated notifications:', this.notifications.length);
    },
    
    markAsRead(notification) {
      notification.read = true;
      // TODO: Gửi API để cập nhật trạng thái đã đọc
    },
    
    markAllAsRead() {
      this.notifications.forEach(n => n.read = true);
      // TODO: Gửi API để cập nhật tất cả trạng thái đã đọc
    },
    
    dismissNotification(notification) {
      const index = this.notifications.findIndex(n => n.id === notification.id);
      if (index > -1) {
        this.notifications.splice(index, 1);
      }
      // TODO: Gửi API để xóa thông báo
    },
      viewOrder(orderId) {
      // Chuyển hướng đến trang chi tiết đơn hàng
      this.$router.push(`/admin/order`);
    },
      formatDate(date) {
      try {
        if (!date) return 'Không xác định';
        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) return 'Không xác định';
        
        return new Intl.DateTimeFormat('vi-VN', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }).format(parsedDate);
      } catch (error) {
        console.error('Error formatting date:', error);
        return 'Không xác định';
      }
    },
    
    formatTime(date) {
      try {
        if (!date) return 'Không xác định';
        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) return 'Không xác định';
        
        return new Intl.DateTimeFormat('vi-VN', {
          hour: '2-digit',
          minute: '2-digit'
        }).format(parsedDate);
      } catch (error) {
        console.error('Error formatting time:', error);
        return 'Không xác định';
      }
    },
      formatPrice(price) {
      try {
        if (!price || isNaN(price)) return '0đ';
        return new Intl.NumberFormat('vi-VN', { 
          style: 'currency', 
          currency: 'VND' 
        }).format(price);
      } catch (error) {
        console.error('Error formatting price:', error);
        return '0đ';
      }
    },
    
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    }
  },
    async mounted() {
    console.log('🚀 Component mounted, loading notifications...');
    await this.refreshNotifications();
    
    // Nếu vẫn không có data sau khi load, tạo mock data
    if (this.notifications.length === 0) {
      console.log('📝 No notifications found, creating mock data...');
      this.createMockData();
    }
    
    // Auto refresh every 30 seconds
    setInterval(() => {
      this.refreshNotifications();
    }, 30000);
  }
}
</script>

<style scoped>
.transition-all {
  transition: all 0.2s ease-in-out;
}
</style>
