<template>
  <aside :class="{
      'max-md:hidden': !openSidebar,
      'max-md:block': openSidebar,
      'fixed top-0 left-0 md:pl-5 w-[14rem] max-md:left-[-100%] max-md:bg-color-background max-md:w-[18rem] max-md:z-20 max-md:shadow-shadow-3 max-md:pr-card-padding': true
    }">
    <div class="flex item-center justify-between mt-6">
      <div class="flex gap-3 max-md:ml-4 ">
        <img src="@/assets/images/logo.png" alt="Logo" class="w-8 h-8">
        <div class="text-lg font-bold max-lg:hidden max-md:inline text-color-dark">EGA<span>TOR</span></div>
      </div>
      <div @click="toggleSidebar" class="hidden max-md:inline-block cursor-pointer text-color-dark">
        <span class="material-icons-sharp">close</span>
      </div>
    </div>
    <div class="flex flex-col h-[calc(100vh-6rem)] sidebar">
      <div class="flex-1 space-y-1 py-2">
      <RouterLink to="/admin/dashboard" class="flex gap-4 items-center relative h-12 transition-all duration-300 text-color-info-dark
              ease-in-out ml-8 hover:text-color-primary max-lg:w-[5.6rem] max-md:w-full max-md:h-12" :class="{ active: $route.path === '/admin/dashboard' }">
            <span class="material-icons-sharp text-2xl transition-all duration-300 ease-out">
              grid_view
            </span>
        <h3 class="text-sm max-lg:hidden max-md:inline">Tổng quan</h3>
      </RouterLink>
      <RouterLink to="/admin/product" class="flex gap-4 items-center relative h-12 transition-all duration-300 text-color-info-dark
              ease-in-out ml-8 hover:text-color-primary max-lg:w-[5.6rem] max-md:w-full max-md:h-12" :class="{ active: $route.name === 'product' || $route.name === 'create-product' || $route.name === 'edit-product'}">
        <span class="material-icons-sharp text-2xl transition-all duration-300 ease-out">inventory</span>
        <h3 class="text-sm max-lg:hidden max-md:inline">Sản phẩm</h3>
      </RouterLink>
      <RouterLink to="/admin/category" class="flex gap-4 items-center relative h-12 transition-all duration-300 text-color-info-dark
              ease-in-out ml-8 hover:text-color-primary max-lg:w-[5.6rem] max-md:w-full max-md:h-12"
                  :class="{ active: $route.name === 'category'|| $route.name === 'create-category' || $route.name === 'edit-category'}">
        <span class="material-icons-sharp text-2xl transition-all duration-300 ease-out">category</span>
        <h3 class="text-sm max-lg:hidden max-md:inline">Danh mục</h3>
      </RouterLink>
      <RouterLink  :to="{ name : 'order'}" class="flex gap-4 items-center relative h-12 transition-all duration-300 text-color-info-dark
              ease-in-out ml-8 hover:text-color-primary max-lg:w-[5.6rem] max-md:w-full max-md:h-12"
                  :class="{ active: $route.name === 'order' || $route.name === 'order-confirmed'}">
        <span class="material-icons-sharp text-2xl transition-all duration-300 ease-out">list_alt</span>
        <h3 class="text-sm max-lg:hidden max-md:inline">Đơn hàng</h3>
      </RouterLink>
      <RouterLink :to="{ name : 'discounts'}" class="flex gap-4 items-center relative h-12 transition-all duration-300 text-color-info-dark
              ease-in-out ml-8 hover:text-color-primary max-lg:w-[5.6rem] max-md:w-full max-md:h-12"
                  :class="{ active: $route.name === 'discounts' || $route.name === 'create-discount' || $route.name === 'edit-discount'|| $route.name === 'discounts-category' }">
        <span class="material-icons-sharp">discount</span>
        <h3 class="text-sm max-lg:hidden max-md:inline">Mã giảm giá</h3>
      </RouterLink>
      <RouterLink :to="{ name : 'banners'}" class="flex gap-4 items-center relative h-12 transition-all duration-300 text-color-info-dark
              ease-in-out ml-8 hover:text-color-primary max-lg:w-[5.6rem] max-md:w-full max-md:h-12"
                  :class="{ active: $route.name === 'banners' || $route.name === 'create-banner' || $route.name === 'edit-discount' }">
        <span class="material-icons-sharp">discount</span>
        <h3 class="text-sm max-lg:hidden max-md:inline">Banner</h3>
      </RouterLink>
      <RouterLink :to="{ name : 'roles'}" class="flex gap-4 items-center relative h-12 transition-all duration-300 text-color-info-dark
              ease-in-out ml-8 hover:text-color-primary max-lg:w-[5.6rem] max-md:w-full max-md:h-12"
                  :class="{ active: $route.name === 'roles' || $route.name === 'create-role' || $route.name === 'edit-role' }">
        <span class="material-icons-sharp text-2xl transition-all duration-300 ease-out">account_tree</span>
        <h3 class="text-sm max-lg:hidden max-md:inline">Nhóm quyền</h3>
      </RouterLink>
      <RouterLink :to="{ name : 'accounts'}" class="flex gap-4 items-center relative h-12 transition-all duration-300 text-color-info-dark
              ease-in-out ml-8 hover:text-color-primary max-lg:w-[5.6rem] max-md:w-full max-md:h-12"
                  :class="{ active: $route.name === 'accounts' || $route.name === 'create-accounts' || $route.name === 'edit-accounts' }">
        <span class="material-icons-sharp text-2xl transition-all duration-300 ease-out">manage_accounts</span>
        <h3 class="text-sm max-lg:hidden max-md:inline">Tài khoản</h3>
      </RouterLink>
      <RouterLink :to="{ name : 'admin-news'}" class="flex gap-4 items-center relative h-12 transition-all duration-300 text-color-info-dark
              ease-in-out ml-8 hover:text-color-primary max-lg:w-[5.6rem] max-md:w-full max-md:h-12"
                  :class="{ active: $route.name === 'admin-news' }">
        <span class="material-icons-sharp text-2xl transition-all duration-300 ease-out">newspaper</span>
        <h3 class="text-sm max-lg:hidden max-md:inline">Tin tức</h3>
      </RouterLink>
      <RouterLink :to="{ name : 'admin-notifications'}" class="flex gap-4 items-center relative h-12 transition-all duration-300 text-color-info-dark
              ease-in-out ml-8 hover:text-color-primary max-lg:w-[5.6rem] max-md:w-full max-md:h-12"
                  :class="{ active: $route.name === 'admin-notifications' }">
        <span class="material-icons-sharp text-2xl transition-all duration-300 ease-out">notifications</span>
        <h3 class="text-sm max-lg:hidden max-md:inline">Cảnh báo</h3>
        <span v-if="unreadCount > 0" class="absolute top-2 right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {{ unreadCount > 9 ? '9+' : unreadCount }}
        </span>
      </RouterLink>
      <RouterLink :to="{ name : 'admin-chatbot'}" class="flex gap-4 items-center relative h-12 transition-all duration-300 text-color-info-dark
              ease-in-out ml-8 hover:text-color-primary max-lg:w-[5.6rem] max-md:w-full max-md:h-12"
                  :class="{ active: $route.name === 'admin-chatbot' }">
        <span class="material-icons-sharp text-2xl transition-all duration-300 ease-out">smart_toy</span>
        <h3 class="text-sm max-lg:hidden max-md:inline">AI Assistant</h3>
        <span class="absolute top-2 right-2 bg-green-500 w-3 h-3 rounded-full animate-pulse"></span>
      </RouterLink>
      </div>
      <!-- Logout ở cuối sidebar -->
      <div class="mt-auto pb-2">
        <RouterLink to="/" class="flex text-color-info-dark ml-8 gap-4 items-center h-12 transition-all duration-300
                ease-in-out hover:text-color-primary">
          <span class="material-icons-sharp text-2xl transition-all duration-300 ease-out">logout</span>
          <h3 class="text-sm max-lg:hidden max-lg:relative max-md:inline">Logout</h3>
        </RouterLink>
      </div>
    </div>
  </aside>
</template>

<script>
import { getNotificationStats } from "@/service/notificationService.js";

export default {
  props:{
    toggleSidebar :{
      type : Function,
      required : true
    },
    openSidebar:{
      type : Boolean,
      required : true
    }
  },
  data() {
    return {
      unreadCount: 0
    }
  },
  async created(){
    // Lấy số thông báo chưa đọc
    await this.loadNotificationCount();
    
    // Cập nhật số thông báo theo thời gian thực
    setInterval(async () => {
      await this.loadNotificationCount();
    }, 30000); // Cập nhật mỗi 30 giây
  },
  methods: {
    async loadNotificationCount() {
      try {
        const result = await getNotificationStats();
        if (result.success) {
          this.unreadCount = result.stats.unread;
        }
      } catch (error) {
        console.error('Error loading notification count:', error);
      }
    }
  }
}
</script>