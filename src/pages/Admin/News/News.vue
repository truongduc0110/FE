<template>
  <div class="p-6">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Tin tức ngành bánh</h1>
      <div class="flex gap-3">
        <button 
          @click="refreshNews" 
          class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          :disabled="loading"
        >
          <svg :class="{'animate-spin': loading}" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2V6M12 18V22M22 12H18M6 12H2M19.0711 4.92893L16.2426 7.75736M7.75736 16.2426L4.92893 19.0711M19.0711 19.0711L16.2426 16.2426M7.75736 7.75736L4.92893 4.92893" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          {{ loading ? 'Đang tải...' : 'Làm mới' }}
        </button>
        <select v-model="selectedSource" @change="filterNews" class="px-3 py-2 border border-gray-300 rounded-lg">
          <option value="">Tất cả nguồn</option>
          <option value="VnExpress">VnExpress</option>
          <option value="Gia đình">Gia đình</option>
          <option value="Du lịch">Du lịch</option>
          <option value="Kinh doanh">Kinh doanh</option>
          <option value="Tin tức bánh">Tin tức bánh</option>
        </select>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
    </div>

    <!-- News Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="article in paginatedNews" 
        :key="article.id" 
        class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
      >        <!-- Article Image -->
        <div class="relative">
          <img 
            :src="getImageUrl(article.image)" 
            :alt="article.title"
            class="w-full h-48 object-cover rounded-t-lg"
            @error="handleImageError"
          />
          <div class="absolute top-3 left-3">
            <span class="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              {{ article.source }}
            </span>
          </div>
          <div class="absolute top-3 right-3">
            <span class="bg-white/90 text-gray-800 px-2 py-1 rounded-full text-xs">
              {{ formatDate(article.publishedAt) }}
            </span>
          </div>
        </div>

        <!-- Article Content -->
        <div class="p-4">
          <h3 class="font-semibold text-gray-800 mb-2 line-clamp-2 leading-tight">
            {{ article.title }}
          </h3>
          <p class="text-gray-600 text-sm mb-3 line-clamp-3">
            {{ article.description || article.excerpt }}
          </p>
          
          <!-- Tags -->
          <div class="flex flex-wrap gap-1 mb-3">
            <span 
              v-for="tag in article.tags?.slice(0, 3)" 
              :key="tag"
              class="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
            >
              #{{ tag }}
            </span>
          </div>

          <!-- Actions -->
          <div class="flex items-center justify-between">
            <a 
              :href="article.url" 
              target="_blank"
              class="text-blue-500 hover:text-blue-600 text-sm font-medium flex items-center gap-1"
            >
              Đọc thêm
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
            <div class="flex gap-2">
              <button 
                @click="bookmarkArticle(article)" 
                :class="article.bookmarked ? 'text-yellow-500' : 'text-gray-400'"
                class="hover:text-yellow-500 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
                </svg>
              </button>
              <button 
                @click="shareArticle(article)" 
                class="text-gray-400 hover:text-blue-500 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 8a3 3 0 1 0-6 0v7.5a3 3 0 1 0 6 0V8zM6 9a3 3 0 1 0 6 0v6a3 3 0 1 0-6 0V9z" stroke="currentColor" stroke-width="2"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="!loading && paginatedNews.length === 0" class="text-center py-12">
      <div class="text-gray-400 mb-4">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="mx-auto">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gray-600 mb-2">Chưa có tin tức</h3>
      <p class="text-gray-500">Tin tức sẽ được cập nhật tự động từ các nguồn tin uy tín</p>
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
import newsService from '../../../service/newsService.js'

export default {
  name: 'AdminNews',
  data() {
    return {
      loading: false,
      news: [],
      filteredNews: [],      selectedSource: '',
      currentPage: 1,
      itemsPerPage: 9
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredNews.length / this.itemsPerPage);
    },
    paginatedNews() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredNews.slice(start, end);
    }  },
  methods: {
    async refreshNews() {
      this.loading = true;
      try {
        console.log('Fetching news from backend...');
        
        // Thử gọi API backend trước
        const response = await newsService.getAllNews();
        console.log('News API response:', response);        if (response && response.success && response.data) {
          // Chuyển đổi dữ liệu từ backend thành format frontend
          this.news = response.data.map(item => ({
            id: item.id,
            title: item.tieu_de,            description: item.mo_ta || 'Không có mô tả',
            source: this.getSourceFromUrl(item.link_bai_viet),
            url: item.link_bai_viet || '#',
            image: this.validateImageUrl(item.anh),
            publishedAt: item.thoi_gian_dang ? new Date(item.thoi_gian_dang) : new Date(),
            tags: this.extractTags(item.tieu_de),
            bookmarked: false
          }));
          
          console.log('Processed news data:', this.news);        } else {
          throw new Error('API không trả về dữ liệu hợp lệ');
        }
        
      } catch (error) {
        console.error('Error fetching news from API:', error);
        console.log('Không thể tải tin tức từ backend');
        
        // Không sử dụng mock data, để mảng rỗng
        this.news = [];
      }
      
      this.filterNews();
      this.loading = false;    },
    
    // Helper method để xác định source từ URL
    getSourceFromUrl(url) {
      if (!url) return 'other';
      
      const urlLower = url.toLowerCase();
      if (urlLower.includes('banh24h') || urlLower.includes('vnexpress')) return 'VnExpress';
      if (urlLower.includes('banhkem') || urlLower.includes('giadinh')) return 'Gia đình';
      if (urlLower.includes('banhngot') || urlLower.includes('dulich')) return 'Du lịch';
      if (urlLower.includes('kinhdoanh')) return 'Kinh doanh';
      return 'Tin tức bánh';
    },
    
    // Helper method để tạo tags từ title
    extractTags(title) {
      if (!title) return [];
      
      const titleLower = title.toLowerCase();
      const tags = [];
      
      // Các từ khóa phổ biến trong ngành bánh
      const keywords = [
        { key: 'bánh', tag: 'bánh' },
        { key: 'kem', tag: 'kem' },
        { key: 'ngọt', tag: 'bánh ngọt' },
        { key: 'robot', tag: 'công nghệ' },
        { key: 'ai', tag: 'AI' },
        { key: 'phép', tag: 'công nghệ' },
        { key: 'xuất', tag: 'xuất khẩu' },
        { key: 'nhật', tag: 'quốc tế' },
        { key: 'tào', tag: 'tào phớ' },
        { key: 'trà', tag: 'đồ uống' },
        { key: 'chăm', tag: 'nghệ thuật' },
        { key: 'định', tag: 'nghiên cứu' },
        { key: 'dua', tag: 'dừa' },
        { key: 'báy', tag: 'display' },
        { key: 'online', tag: 'online' },
        { key: 'mẹo', tag: 'mẹo hay' },
        { key: 'hello kitty', tag: 'hoạt hình' }
      ];
      
      keywords.forEach(keyword => {
        if (titleLower.includes(keyword.key) && !tags.includes(keyword.tag)) {
          tags.push(keyword.tag);
        }
      });
        return tags.slice(0, 3); // Chỉ lấy tối đa 3 tags
    },
    
    // Validate và return image URL hợp lệ
    validateImageUrl(imageUrl) {
      if (!imageUrl) return '/src/assets/images/bg-img-1.jpg';
      
      // Kiểm tra nếu là URL hợp lệ
      try {
        new URL(imageUrl);
        return imageUrl;
      } catch {
        // Nếu không phải URL hợp lệ, dùng ảnh mặc định
        return '/src/assets/images/bg-img-1.jpg';
      }
    },
    
    // Get image URL với fallback
    getImageUrl(imageUrl) {
      return this.validateImageUrl(imageUrl);
    },
    
    filterNews() {
      if (this.selectedSource) {
        this.filteredNews = this.news.filter(article => article.source === this.selectedSource);
      } else {
        this.filteredNews = [...this.news];
      }
      this.currentPage = 1;
    },
    
    formatDate(date) {
      return new Intl.DateTimeFormat('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).format(new Date(date));
    },
    
    bookmarkArticle(article) {
      article.bookmarked = !article.bookmarked;
      // TODO: Lưu bookmark vào database
    },
    
    shareArticle(article) {
      if (navigator.share) {
        navigator.share({
          title: article.title,
          text: article.description,
          url: article.url,
        });
      } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(article.url);        alert('Đã copy link bài viết!');
      }
    },
      handleImageError(event) {
      // Fallback image khi không load được ảnh từ URL
      console.log('Image load error:', event.target.src);
      event.target.src = '/src/assets/images/bg-img-1.jpg';
      
      // Đảm bảo không bị loop error nếu ảnh mặc định cũng lỗi
      event.target.onerror = null;
    },
    
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    }
  },
  
  async mounted() {
    await this.refreshNews();
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
