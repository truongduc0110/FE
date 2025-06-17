<template>
  <div class="h-full flex flex-col bg-gray-50">
    <!-- Header -->
    <div class="bg-white border-b border-gray-200 p-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>          <div>
            <h2 class="text-lg font-semibold text-gray-900">AI Assistant Admin</h2>
            <p class="text-sm text-gray-500">
              <span class="text-green-500">●</span>
              Powered by Google Gemini
              <span v-if="currentSessionId" class="ml-2 text-xs bg-gray-100 px-2 py-1 rounded">
                Session: {{ currentSessionId.slice(-8) }}
              </span>
            </p>
          </div>
        </div>
          <div class="flex items-center space-x-2">
          <!-- Quick Actions -->
          <div class="flex items-center space-x-2">
            <button 
              @click="showQuickActions = !showQuickActions"
              class="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              title="Thao tác nhanh"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>

            <button 
              @click="createNewSession"
              class="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              title="Tạo cuộc trò chuyện mới"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            
            <button 
              @click="clearChat"
              class="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              title="Xóa cuộc trò chuyện"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Quick Actions Panel -->
      <div v-if="showQuickActions" class="mt-4 p-3 bg-gray-50 rounded-lg">
        <h3 class="text-sm font-medium text-gray-700 mb-2">Câu hỏi nhanh:</h3>
        <div class="flex flex-wrap gap-2">
          <button 
            v-for="action in quickActions" 
            :key="action.id"
            @click="sendQuickMessage(action.message)"
            class="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:bg-gray-100 transition-colors"
          >
            {{ action.label }}
          </button>
        </div>
      </div>
    </div>

    <!-- Chat Messages -->
    <div class="flex-1 overflow-y-auto p-4 space-y-4" ref="chatContainer">
      <!-- Welcome Message -->
      <div v-if="messages.length === 0" class="text-center py-8">
        <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>        <h3 class="text-lg font-medium text-gray-900 mb-2">🍰 Chào mừng đến với ShopCake AI</h3>
        <p class="text-gray-500 max-w-md mx-auto">
          Tôi có thể giúp bạn quản lý cửa hàng bánh, phân tích doanh số, tư vấn sản phẩm và trả lời các câu hỏi về kinh doanh bánh.
        </p>
      </div>

      <!-- Messages -->
      <div v-for="message in messages" :key="message.id" class="flex" :class="message.sender === 'user' ? 'justify-end' : 'justify-start'">
        <div :class="[
          'max-w-xs lg:max-w-md px-4 py-2 rounded-lg',
          message.sender === 'user' 
            ? 'bg-blue-500 text-white' 
            : 'bg-white border border-gray-200 text-gray-900'
        ]">
          <!-- Message Content -->
          <div v-if="message.type === 'text'" class="whitespace-pre-wrap">
            {{ message.content }}
          </div>
          
          <!-- Data/Chart Message -->
          <div v-else-if="message.type === 'data'" class="space-y-2">
            <p class="text-sm">{{ message.content }}</p>
            <div v-if="message.data" class="bg-gray-50 rounded p-2 text-xs">
              <div v-for="(item, index) in message.data" :key="index" class="flex justify-between py-1">
                <span>{{ item.label }}</span>
                <span class="font-medium">{{ item.value }}</span>
              </div>
            </div>
          </div>
          
          <!-- Action Buttons -->
          <div v-if="message.actions" class="mt-2 space-y-1">
            <button 
              v-for="action in message.actions" 
              :key="action.id"
              @click="handleAction(action)"
              class="w-full text-left px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded"
            >
              {{ action.label }}
            </button>
          </div>
          
          <!-- Timestamp -->
          <div class="text-xs mt-1 opacity-70">
            {{ formatTime(message.timestamp) }}
          </div>
        </div>
      </div>

      <!-- Typing Indicator -->
      <div v-if="isTyping" class="flex justify-start">
        <div class="bg-white border border-gray-200 rounded-lg px-4 py-2">
          <div class="flex space-x-1">
            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Input Area -->
    <div class="border-t border-gray-200 bg-white p-4">
      <div class="flex items-end space-x-2">
        <!-- Attachment Button -->
        <button 
          class="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          title="Đính kèm file"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66L9.64 16.2a2 2 0 01-2.83-2.83L15.8 4.38" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        
        <!-- Message Input -->
        <div class="flex-1 relative">
          <textarea
            v-model="inputMessage"
            @keydown.enter.exact="sendMessage"
            @keydown.enter.shift.exact="() => {}"
            placeholder="Hỏi tôi về bất cứ điều gì..."
            rows="1"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            :disabled="isTyping"
            ref="messageInput"
          ></textarea>
          
          <!-- Character Count -->
          <div v-if="inputMessage.length > 0" class="absolute -bottom-5 right-0 text-xs text-gray-400">
            {{ inputMessage.length }}/1000
          </div>
        </div>
        
        <!-- Send Button -->
        <button 
          @click="sendMessage"
          :disabled="!inputMessage.trim() || isTyping"
          class="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import chatbotService from '../../../service/ChatBotService.js'

export default {
  name: 'AdminChatbot',  data() {
    return {
      messages: [],
      inputMessage: '',
      isTyping: false,      
      isOnline: true,
      showQuickActions: false,
      currentSessionId: null,
      quickActions: [
        { id: 1, label: 'Báo cáo doanh thu hôm nay', message: 'Cho tôi xem báo cáo doanh thu hôm nay của cửa hàng bánh' },
        { id: 2, label: 'Đơn hàng chưa xử lý', message: 'Có bao nhiêu đơn hàng bánh chưa được xử lý?' },
        { id: 3, label: 'Sản phẩm bán chạy', message: 'Top 5 loại bánh bán chạy nhất tuần này là gì?' },
        { id: 4, label: 'Khách hàng mới', message: 'Số lượng khách hàng mới mua bánh trong tháng này' },
        { id: 5, label: 'Tồn kho nguyên liệu', message: 'Nguyên liệu làm bánh nào sắp hết?' },
        { id: 6, label: 'Xu hướng bán hàng', message: 'Phân tích xu hướng bán bánh theo mùa' },
        { id: 7, label: 'Gợi ý menu', message: 'Gợi ý menu bánh mới cho tuần tới' },
        { id: 8, label: 'Quản lý chi phí', message: 'Phân tích chi phí nguyên liệu làm bánh' }
      ]
    }
  },
    methods: {    async sendMessage() {
      if (!this.inputMessage.trim() || this.isTyping) return;
      
      const message = this.inputMessage.trim();
      this.inputMessage = '';
      
      // Add user message
      this.addMessage('user', 'text', message);
      
      // Show typing indicator
      this.isTyping = true;
      this.scrollToBottom();

      try {
        console.log('=== CHATBOT DEBUG START ===');
        console.log('Sending message:', message);
        console.log('Current session ID:', this.currentSessionId);
        
        // Gọi n8n webhook với Google Gemini
        const webhookResponse = await chatbotService.sendMessageToWebhook(message, {
          currentPage: 'admin_dashboard',
          userRole: 'admin',
          userId: 'admin',
          sessionId: this.currentSessionId
        });
        
        console.log('=== WEBHOOK RESPONSE ===');
        console.log('Type:', typeof webhookResponse);
        console.log('Full response:', webhookResponse);
        console.log('Response keys:', Object.keys(webhookResponse || {}));
        
        // Hiển thị phản hồi thực tế từ AI
        if (webhookResponse) {
          let aiResponse = null;
            // Thử các cách lấy response khác nhau
          if (webhookResponse.output) {
            aiResponse = webhookResponse.output;
            console.log('Found in .output:', aiResponse);
          } else if (webhookResponse.response) {
            aiResponse = webhookResponse.response;
            console.log('Found in .response:', aiResponse);
          } else if (webhookResponse.message) {
            aiResponse = webhookResponse.message;
            console.log('Found in .message:', aiResponse);
          } else if (webhookResponse.text) {
            aiResponse = webhookResponse.text;
            console.log('Found in .text:', aiResponse);
          } else if (webhookResponse.data) {
            console.log('Checking .data:', webhookResponse.data);
            if (webhookResponse.data.output) {
              aiResponse = webhookResponse.data.output;
            } else if (webhookResponse.data.response) {
              aiResponse = webhookResponse.data.response;
            } else if (webhookResponse.data.message) {
              aiResponse = webhookResponse.data.message;
            } else if (webhookResponse.data.text) {
              aiResponse = webhookResponse.data.text;
            }
          } else if (typeof webhookResponse === 'string') {
            aiResponse = webhookResponse;
            console.log('Is string:', aiResponse);
          }
          
          console.log('Final AI response:', aiResponse);
          
          // Hiển thị response thực tế từ AI
          if (aiResponse && aiResponse.trim()) {
            this.addMessage('bot', 'text', aiResponse);
          } else {
            this.addMessage('bot', 'text', 'AI response trống - check console');
          }
        } else {
          this.addMessage('bot', 'text', 'webhookResponse null - check console');
        }
        
      } catch (error) {
        console.error('=== CHATBOT ERROR ===', error);
        this.addMessage('bot', 'text', `Lỗi: ${error.message}`);
      }
      
      this.isTyping = false;
      this.scrollToBottom();
    },
    
    sendQuickMessage(message) {
      this.inputMessage = message;
      this.sendMessage();
      this.showQuickActions = false;
    },
      addMessage(sender, type, content, data = null, actions = null) {
      const message = {
        id: Date.now() + Math.random(),
        sender,
        type,
        content,
        data,
        actions,
        timestamp: new Date()
      };
      
      this.messages.push(message);
      
      // Lưu tin nhắn vào localStorage
      chatbotService.saveMessageToHistory(message);
    },

    // Tải lịch sử chat
    async loadChatHistory() {
      try {
        // Lấy lịch sử từ localStorage trước
        const localHistory = chatbotService.getChatHistory();
        
        if (localHistory.length > 0) {
          this.messages = localHistory.map(msg => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }));
          console.log(`Loaded ${localHistory.length} messages from localStorage`);
        }

        // Thử lấy lịch sử từ n8n (nếu có)
        if (this.currentSessionId) {
          const n8nHistory = await chatbotService.fetchChatHistoryFromN8n(this.currentSessionId);
          if (n8nHistory.length > 0) {
            console.log(`Found ${n8nHistory.length} messages from n8n`);
            // Merge hoặc replace history nếu cần
          }
        }
        
        this.scrollToBottom();
      } catch (error) {
        console.error('Error loading chat history:', error);
      }
    },

    // Tạo session mới
    createNewSession() {
      if (confirm('Bạn có muốn bắt đầu cuộc trò chuyện mới? Lịch sử hiện tại sẽ được lưu.')) {
        // Tạo session mới
        this.currentSessionId = chatbotService.createNewSession();
        
        // Xóa messages hiện tại (không xóa localStorage)
        this.messages = [];
        
        // Hiển thị thông báo
        this.addMessage('bot', 'text', '🆕 Đã bắt đầu cuộc trò chuyện mới. Tôi có thể giúp gì cho bạn?');
        
        console.log('Created new session:', this.currentSessionId);
      }
    },

    clearChat() {
      if (confirm('Bạn có chắc muốn xóa toàn bộ cuộc trò chuyện và lịch sử đã lưu?')) {
        // Xóa messages và localStorage
        this.messages = [];
        chatbotService.clearChatHistory();
        
        // Tạo session mới
        this.currentSessionId = chatbotService.createNewSession();
          console.log('Chat cleared, new session:', this.currentSessionId);
      }
    },
    
    handleAction(action) {
      switch (action.id) {
        case 'view_orders':
          this.$router.push('/admin/orders');
          break;
        case 'process_orders':
          this.addMessage('bot', 'text', 'Đang chuyển bạn đến trang xử lý đơn hàng...');
          setTimeout(() => this.$router.push('/admin/orders'), 1000);
          break;
        case 'order_supplies':
          this.addMessage('bot', 'text', 'Tôi đã tạo danh sách đặt hàng nguyên liệu dựa trên tồn kho hiện tại. Bạn có muốn xem không?');
          break;
        case 'view_inventory':
          this.addMessage('bot', 'text', 'Đang chuyển đến trang quản lý kho...');
          break;      }
    },
    
    formatTime(timestamp) {
      return new Intl.DateTimeFormat('vi-VN', {
        hour: '2-digit',
        minute: '2-digit'
      }).format(timestamp);
    },
    
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.chatContainer;
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      });
    }
  },mounted() {
    // Khởi tạo session ID
    this.currentSessionId = chatbotService.getCurrentSessionId();
    console.log('Current session ID:', this.currentSessionId);
    
    // Tải lịch sử chat
    this.loadChatHistory();
    
    // Auto-focus input
    this.$refs.messageInput?.focus();
    
    // Welcome message nếu chưa có tin nhắn
    setTimeout(() => {
      if (this.messages.length === 0) {
        this.addMessage('bot', 'text', '🍰 Xin chào! Tôi là AI Assistant của ShopCake. Tôi có thể giúp bạn:\n\n📊 Phân tích doanh số bánh\n📦 Quản lý đơn hàng bánh\n� Thông tin sản phẩm bánh\n👥 Hỗ trợ khách hàng\n💰 Báo cáo tài chính\n📈 Xu hướng kinh doanh bánh\n🎉 Tư vấn bánh cho dịp lễ\n\nHãy hỏi tôi bất cứ điều gì về cửa hàng bánh của bạn!');
      }
    }, 500);
  }
}
</script>

<style scoped>
@keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0,0,0);
  }
  40%, 43% {
    transform: translate3d(0,-8px,0);
  }
  70% {
    transform: translate3d(0,-4px,0);
  }
  90% {
    transform: translate3d(0,-2px,0);
  }
}

.animate-bounce {
  animation: bounce 1.4s ease-in-out infinite;
}

/* Custom scrollbar */
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: #d1d5db #f3f4f6;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f3f4f6;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style>
