<template>
  <div class="flex h-screen w-screen bg-gray-50">
    <!-- 侧边栏 -->
    <div class="w-1/5 bg-white border-r border-gray-200 flex flex-col">
      <!-- 新建对话按钮 -->
      <div class="p-4">
        <button @click="newConversation" class="w-full bg-gray-100 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-200 transition duration-300 flex items-center justify-center">
          <i class="fas fa-plus mr-2"></i> New Chat
        </button>
      </div>
      
      <!-- 对话列表 -->
      <div class="flex-1 overflow-y-auto">
        <div v-for="(conversation, index) in conversations" :key="index" 
             @click="switchConversation(index)"
             class="p-3 hover:bg-gray-100 cursor-pointer transition duration-300 flex items-center"
             :class="{ 'bg-gray-100': currentConversationIndex === index }">
          <i class="far fa-comment-alt mr-3"></i>
          <span class="text-sm">{{ conversation.title || `Chat ${index + 1}` }}</span>
        </div>
      </div>
      
      <!-- 用户信息和设置 -->
      <div class="p-4 border-t border-gray-200">
        <button @click="logout" class="w-full text-left py-2 px-4 rounded-md hover:bg-gray-100 transition duration-300 flex items-center">
          <i class="fas fa-sign-out-alt mr-2"></i> Log out
        </button>
      </div>
    </div>

    <!-- 主聊天界面 -->
    <div class="w-5/4 flex-1 flex flex-col">
      <!-- 聊天消息区域 -->
      <div class="flex-1 overflow-y-auto px-4 py-6" ref="chatMessages">
        <div v-for="(message, index) in messages" :key="index" class="mb-6">
          <ChatMessageComponent v-for="(message, index) in messages" :key="index" :message="message" />
        </div>
      </div>
      
      <!-- 输入区域 -->
      <div class="border-t border-gray-200 p-4">
        <div class="flex items-center bg-white rounded-lg shadow-sm">
          <textarea v-model="userInput" @keyup.enter="sendMessage" placeholder="Send a message..."
                    class="flex-1 px-4 py-2 focus:outline-none resize-none" rows="1"></textarea>
          <button @click="sendMessage" class="p-2 text-gray-500 hover:text-gray-700">
            <i class="fas fa-paper-plane"></i>
          </button>
        </div>
        <div class="text-xs text-gray-500 mt-2 text-center">
          ChatGPT may produce inaccurate information about people, places, or facts.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ChatMessageComponent from './ChatMessageComponent.vue';

export default {
  name: 'ChatInterface',
  data() {
    return {
      messages: [], // 存储消息的数组
      userInput: '', // 用户输入的消息
      conversations: [], // 存储会话的数组
      currentConversationIndex: 0, // 当前会话的索引
      isLoading: false // 是否正在加载消息
    };
  },
  components: {
    ChatMessageComponent,
  },
  mounted() {
    // 组件挂载时加载聊天历史记录并滚动到底部
    this.loadConversations();
    this.switchConversation(0);
    this.scrollToBottom();
  },
  methods: {
    async sendMessage() {
      // 如果用户输入为空，则不发送消息
      if (this.userInput.trim() === '') return;
      
      // 创建用户消息对象并添加到消息数组中
      const userMessage = { sender: 'user', content: this.userInput };
      this.messages.push(userMessage);
      this.userInput = '';
      this.scrollToBottom();

      this.isLoading = true;
      try {
        // 发送用户消息到后端
        const response = await fetch('/ask', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question: userMessage.content }),
        });

        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let aiResponse = '';
        // 持续读取后端返回的流数据
        // eslint-disable-next-line
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value);
          aiResponse += chunk;
          this.updateLastAIMessage(aiResponse);
        }

      } catch (error) {
        console.error('Error:', error);
      } finally {
        this.isLoading = false;
        // 更新当前会话的消息数组
        this.conversations[this.currentConversationIndex] = [...this.messages];
        this.scrollToBottom();
      }
    },
    updateLastAIMessage(content) {
      // 更新最后一条AI消息的内容
      const lastMessage = this.messages[this.messages.length - 1];
      if (lastMessage.sender === 'ai') {
        lastMessage.content = content;
      } else {
        this.messages.push({ sender: 'ai', content: content });
      }
    },
    scrollToBottom() {
      // 滚动到聊天消息的底部
      this.$nextTick(() => {
        const chatMessages = this.$refs.chatMessages;
        chatMessages.scrollTop = chatMessages.scrollHeight;
      });
    },
    logout() {
      // 用户登出
      axios.get('/logout')
        .then(() => {
          this.$emit('logout');
        })
        .catch(error => {
          console.error('Logout error:', error);
        });
    },
    async loadChatHistory() {
      // 加载聊天历史记录
      try {
        // 发送GET请求到'/get_chat_history'端点以获取聊天历史记录
        const response = await axios.get('/get_chat_history');
        // 将获取到的聊天历史记录赋值给messages数组
        this.messages = response.data.chat_history;
        // 将messages数组复制到conversations数组的第一个元素
        this.conversations[0] = [...this.messages];
      } catch (error) {
        // 如果加载聊天历史记录时发生错误，打印错误信息
        console.error('Error loading chat history:', error);
      }
    },

    async clearHistory() {
      // 清除聊天历史记录
      try {
        // 发送POST请求到'/clear_chat_history'端点以清除聊天历史记录
        await axios.post('/clear_chat_history');
        // 清空messages数组
        this.messages = [];
        // 清空当前会话的messages数组
        this.conversations[this.currentConversationIndex] = [];
      } catch (error) {
        // 如果清除聊天历史记录时发生错误，打印错误信息
        console.error('Error clearing chat history:', error);
      }
    },

    async loadConversations() {
      // 加载所有会话
      try {
        // 发送GET请求到'/get_conversations'端点以获取所有会话
        const response = await axios.get('/get_conversations');
        // 将获取到的会话赋值给conversations数组
        this.conversations = response.data.conversations;
        console.log('Conversations:', this.conversations);
        console.log('Conversations:', this.conversations);
      } catch (error) {
        // 如果加载会话时发生错误，打印错误信息
        console.error('Error loading conversations:', error);
      }
    },

    async newConversation() {
      // 创建新会话
      try {
        // 发送POST请求到'/new_conversation'端点以创建新会话
        const response = await axios.post('/new_conversation');
        // 将新会话的编号添加到conversations数组
        this.conversations.push(response.data.history_num);
        // 切换到新会话
        console.log('num conunt', response.data.history_num);
        this.switchConversation(response.data.history_num - 1);
      } catch (error) {
        // 如果创建新会话时发生错误，打印错误信息
        console.error('Error creating new conversation:', error);
      }
    },

    async switchConversation(index) {
      // 切换会话
      // 设置当前会话的索引为传入的index
      this.currentConversationIndex = index;
      try {
        // 发送POST请求到'/switch_conversation'端点以切换会话
        const response = await axios.post('/switch_conversation', { history_num: index });
        // 如果响应中包含聊天历史记录，将其转换为messages数组
        if (response.data.chat_history) {
          this.messages = response.data.chat_history.map(message => ({
            sender: message.type === 'HumanMessage' ? 'user' : 'ai',
            content: message.content
          }));
        } else {
          // 否则，清空messages数组
          this.messages = [];
        }
        // 滚动到聊天消息的底部
        this.scrollToBottom();
      } catch (error) {
        // 如果切换会话时发生错误，打印错误信息
        console.error('Error switching conversation:', error);
      }
    },

    async getConversations() {
      // 获取所有会话
      try {
        // 发送GET请求到'/get_conversations'端点以获取所有会话
        const response = await axios.get('/get_conversations');
        // 将获取到的会话赋值给conversations数组
        this.conversations = response.data.conversations;
      } catch (error) {
        // 如果获取会话时发生错误，打印错误信息
        console.error('Error fetching conversations:', error);
      }
    },
    async handleFileUpload() {
      // 处理文件上传
      const files = this.$refs.fileInput.files;
      if (files.length === 0) return;

      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }

      try {
        const response = await axios.post('/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        console.log(response.data.message);
        this.messages.push({ sender: 'system', content: 'Files uploaded successfully' });
      } catch (error) {
        console.error('Error uploading files:', error);
        this.messages.push({ sender: 'system', content: 'File upload failed' });
      }
    }
  }
};
</script>
```
<style scoped>
html, body {
  height: 100%;
  margin: 0;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.message-enter-active,
.message-leave-active {
  transition: all 0.5s ease;
}

.message-enter-from,
.message-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}


.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) 30s;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
</style>
