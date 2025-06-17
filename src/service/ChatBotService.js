import { postChatBot } from "../utils/request";

const WEBHOOK_URL = 'http://localhost:5678/webhook/a5fe1b74-d08a-47f7-aeaf-13838d7ae892/chat'

export const chatBot = async (option) => {
    const result = await postChatBot("api", option);
    return result;
}

const chatbotService = {
    // Key để lưu lịch sử chat trong localStorage
    CHAT_HISTORY_KEY: 'admin_chat_history',
    CURRENT_SESSION_KEY: 'admin_chat_session',

    // Lưu tin nhắn vào localStorage
    saveMessageToHistory(message) {
        try {
            const history = this.getChatHistory();
            history.push({
                ...message,
                timestamp: message.timestamp || new Date().toISOString()
            });

            // Giới hạn lịch sử tối đa 100 tin nhắn
            if (history.length > 100) {
                history.splice(0, history.length - 100);
            }

            localStorage.setItem(this.CHAT_HISTORY_KEY, JSON.stringify(history));
        } catch (error) {
            console.error('Error saving message to history:', error);
        }
    },

    // Lấy lịch sử chat từ localStorage
    getChatHistory() {
        try {
            const history = localStorage.getItem(this.CHAT_HISTORY_KEY);
            return history ? JSON.parse(history) : [];
        } catch (error) {
            console.error('Error loading chat history:', error);
            return [];
        }
    },

    // Xóa lịch sử chat
    clearChatHistory() {
        try {
            localStorage.removeItem(this.CHAT_HISTORY_KEY);
            localStorage.removeItem(this.CURRENT_SESSION_KEY);
        } catch (error) {
            console.error('Error clearing chat history:', error);
        }
    },

    // Lấy hoặc tạo session ID hiện tại
    getCurrentSessionId() {
        try {
            let sessionId = localStorage.getItem(this.CURRENT_SESSION_KEY);
            if (!sessionId) {
                sessionId = this.generateSessionId();
                localStorage.setItem(this.CURRENT_SESSION_KEY, sessionId);
            }
            return sessionId;
        } catch (error) {
            console.error('Error managing session:', error);
            return this.generateSessionId();
        }
    },

    // Tạo session mới
    createNewSession() {
        const newSessionId = this.generateSessionId();
        localStorage.setItem(this.CURRENT_SESSION_KEY, newSessionId);
        return newSessionId;
    },

    // Gửi tin nhắn đến n8n webhook
    async sendMessageToWebhook(message, context = {}) {
        try {
            const sessionId = context.sessionId || this.getCurrentSessionId();

            const payload = {
                message: message,
                user_id: context.userId || 'admin',
                session_id: sessionId,
                chat_id: sessionId, // Thêm chat_id cho Postgres Chat Memory
                timestamp: new Date().toISOString(),
                context: {
                    currentPage: context.currentPage || 'admin_dashboard',
                    userRole: context.userRole || 'admin'
                },
                // Thêm metadata cho chat memory
                metadata: {
                    source: 'admin_chatbot',
                    user_name: 'Admin User',
                    conversation_type: 'support'
                }
            }

            console.log('Sending to n8n:', WEBHOOK_URL);
            console.log('Payload with chat memory:', payload);

            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            })

            console.log('Response status:', response.status);
            console.log('Response ok:', response.ok);
            console.log('Response headers:', Object.fromEntries(response.headers.entries()));

            if (!response.ok) {
                const errorText = await response.text();
                console.log('Error response text:', errorText);
                throw new Error(`HTTP ${response.status}: ${errorText}`)
            }

            const contentType = response.headers.get('content-type');
            console.log('Content-Type:', contentType);

            if (contentType && contentType.includes('application/json')) {
                const result = await response.json();
                console.log('Raw n8n response:', result);
                return result;
            } else {
                const textResult = await response.text();
                console.log('Text response:', textResult);
                return { output: textResult };
            }

        } catch (error) {
            console.error('Service error details:', {
                name: error.name,
                message: error.message,
                stack: error.stack
            });
            throw error
        }
    },

    // Fetch lịch sử chat từ n8n (nếu n8n hỗ trợ API này)
    async fetchChatHistoryFromN8n(sessionId) {
        try {
            // URL để lấy lịch sử chat (cần được config trong n8n)
            const historyUrl = `${WEBHOOK_URL}/history/${sessionId}`;

            const response = await fetch(historyUrl, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                const historyData = await response.json();
                return historyData.messages || [];
            } else {
                console.log('No chat history available from n8n');
                return [];
            }
        } catch (error) {
            console.log('Cannot fetch chat history from n8n:', error.message);
            return [];
        }
    },

    // Tạo session ID unique
    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
    },

    // Xử lý response từ n8n
    processWebhookResponse(response) {
        if (response && response.message) {
            return {
                type: response.type || 'text',
                content: response.message,
                data: response.data || null,
                actions: response.actions || null
            }
        }

        return {
            type: 'text',
            content: 'Xin lỗi, tôi đang gặp sự cố kỹ thuật. Vui lòng thử lại sau.'
        }
    }
}

export default chatbotService