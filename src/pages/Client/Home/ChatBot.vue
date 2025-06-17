<template>
  <div
      class="w-[300px] h-[400px] bg-white rounded-2xl shadow flex flex-col
           absolute bottom-[40px] right-5 z-50"
  >
    <!-- Header -->
    <div
        class="py-2 px-4 border-b border-color-7 flex justify-between items-center flex-none"
        style="max-height: 60px"
    >
      <div class="flex items-center gap-2">
        <img src="@/assets/images/Avatar_AI.png" alt="AI" class="w-8 h-8 rounded-full" />
        <div class="text-base font-semibold text-color-1">Chat bot</div>
      </div>
      <div class="flex gap-2 items-center">
        <div
            @click="onHideChat"
            class="w-8 h-8 rounded-lg border border-color-2 flex justify-center items-center cursor-pointer"
        >
          <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.99658 10H10.0041" stroke="#667085" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14.9998 10H15.0073" stroke="#667085" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M4.99976 10H5.00724" stroke="#667085" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>

        <div
            @click="onCloseChat"
            class="w-8 h-8 rounded-lg border border-color-2 flex justify-center items-center cursor-pointer"
        >
          <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 5L5 15M5 5L15 15" stroke="#667085" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
    </div>

    <!-- Vùng tin nhắn -->
    <div class="flex-grow overflow-y-auto px-3 pt-2 pb-1" ref="messagesContainer">
      <div class="flex flex-col gap-3">
        <div
            v-for="(msg, index) in messages"
            :key="index"
            class="flex"
            :class="{
            'justify-end': msg.sender === 'You',
            'justify-start': msg.sender !== 'You'
          }"
        >
          <div v-if="msg.sender !== 'You'" class="flex items-start gap-2 w-full">
            <img src="@/assets/images/Avatar_AI.png" alt="AI" class="w-8 h-8 rounded-full" />
            <div class="flex flex-col w-full">
              <div class="flex justify-between items-center mb-1">
                <div class="text-sm font-medium text-color-1">Bot Bánh</div>
                <div class="text-xs text-color-6 font-normal">{{ msg.time || '...' }}</div>
              </div>
              <div
                  class="text-sm bg-color-17 font-normal mb-3 text-color-16 py-[6px] px-[10px]
                       rounded-tr-md rounded-bl-md rounded-br-md border border-color-2 max-w-[70%]"
              >
                {{ msg.text }}
              </div>
            </div>
          </div>

          <div v-else class="ml-auto mb-3 max-w-[70%]">
            <div class="text-xs font-medium text-color-1 mb-1">Bạn</div>
            <div
                class="text-sm text-white font-normal bg-color-4 py-[6px] px-[10px]
                     rounded-tl-md rounded-br-lg rounded-bl-lg user-message"
            >
              {{ msg.text }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Khu vực nhập liệu -->
    <div class="flex-none border-t border-color-4 px-3 py-3">
      <div class="flex items-center gap-2">
        <input
            type="text"
            v-model="userInput"
            @keyup.enter="sendMessage"
            class="focus:outline-none flex-1 text-sm text-color-1"
            placeholder="Nhập nội dung..."
        />
        <svg @click="sendMessage" class="cursor-pointer" width="20" height="20" fill="none">
          <path d="M2.01 19L19 10L2.01 1L2 7l10 3-10 3z" fill="#667085"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Chatbot",
  props: {
    handleChatbot: {
      type: Function,
      required: true
    }
  },
  data() {
    // Lấy dữ liệu user từ localStorage và kiểm tra an toàn
    const user = localStorage.getItem('user');
    const userId = user ? JSON.parse(user).id : null; // Nếu không có user, gán id là null

    return {
      userInput: "",
      sessionId: "",
      messages: [
        {
          sender: "Chatbot",
          text: "Chào bạn! Tôi là Trợ lý AI của Bakery, cần hỗ trợ đặt bánh không?"
        }
      ],
      id: userId // Gán id từ userId đã kiểm tra
    };
  },
  created() {
    // Lấy hoặc tạo session_id khi component được tạo
    this.sessionId = localStorage.getItem('session_id') || this.generateUUID();
    localStorage.setItem('session_id', this.sessionId);

    // Thêm CSS để ẩn ID trong tin nhắn người dùng
    this.addUserMessageCSS();
  },
  methods: {
    addUserMessageCSS() {
      // Tạo style element
      const style = document.createElement('style');
      style.type = 'text/css';

      // Thêm CSS để làm cho ký tự đầu tiên trong tin nhắn người dùng trở nên trong suốt
      // và không chiếm không gian
      const css = `
        .user-message {
          position: relative;
        }
        .user-message::first-letter {
          opacity: 0;
          position: absolute;
          width: 0;
          overflow: hidden;
          white-space: nowrap;
        }
      `;

      // Thêm CSS vào style element
      if (style.styleSheet) {
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }

      // Thêm style vào head
      document.head.appendChild(style);
    },

    // Tạo UUID đơn giản (không cần thư viện)
    generateUUID() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    },
    async sendMessage() {
      const content = this.userInput.trim();
      if (!content) return;

      // Tạo ID riêng cho lượt chat này
      const chatId = this.generateUUID();

      // Thêm tin nhắn người dùng - Gắn ID vào đầu tin nhắn
      // ID sẽ bị ẩn bằng CSS
      this.messages.push({
        sender: "You",
        text: this.id + content,
        time: new Date().toLocaleTimeString('vi-VN', {hour: '2-digit', minute: '2-digit'})
      });
      this.userInput = "";

      this.$nextTick(() => {
        this.scrollToBottom();
      });

      // Tạo tin nhắn loading
      const loadingMsg = {sender: "Chatbot", text: "Đang xử lý..."};
      this.messages.push(loadingMsg);

      try {
        const response = await fetch('https://truongduc0110101.app.n8n.cloud/webhook/215db750-1c0b-49e0-849b-561601968c1c/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            // Gửi tin nhắn với ID (backend sẽ trích xuất ID)
            msg: this.id + content,
            chat_id: chatId,
            session_id: this.sessionId
          })
        });

        const data = await response.json();
        console.log("Phản hồi từ API:", data);

        // Xóa tin nhắn "Đang xử lý..." và thêm phản hồi thật
        this.messages.pop();
        this.messages.push({
          sender: "Chatbot",
          text: data?.output || "Xin lỗi, tôi không hiểu.",
          time: new Date().toLocaleTimeString('vi-VN', {hour: '2-digit', minute: '2-digit'})
        });
      } catch (error) {
        console.error("Lỗi kết nối API:", error);
        this.messages.pop();
        this.messages.push({
          sender: "Chatbot",
          text: "Lỗi kết nối, vui lòng thử lại.",
          time: new Date().toLocaleTimeString('vi-VN', {hour: '2-digit', minute: '2-digit'})
        });
      }

      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },
    scrollToBottom() {
      const container = this.$refs.messagesContainer;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    },
    onHideChat() {
      this.handleChatbot();
    },
    onCloseChat() {
      this.handleChatbot();
      this.messages = [
        {
          sender: "Chatbot",
          text: "Chào bạn! Tôi là Trợ lý AI của Bakery, cần hỗ trợ đặt bánh không?"
        }
      ];
    }
  }
};
</script>