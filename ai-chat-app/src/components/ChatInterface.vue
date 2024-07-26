<template>
  <div class="flex h-screen w-screen">
    <!-- 侧边栏 -->
    <div class="w-1/4 bg-white border-r border-gray-200 shadow-md flex flex-col">
      <div class="p-4">
        <button @click="newConversation" class="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300">
          New Conversation
        </button>
      </div>
      <div class="flex-1 overflow-y-auto">
        <div v-for="(conversation, index) in conversations" :key="index" 
             @click="switchConversation(index)"
             class="p-3 hover:bg-gray-100 cursor-pointer"
             :class="{ 'bg-indigo-100': currentConversationIndex === index }">
          Conversation {{ index + 1 }}
        </div>
      </div>
    </div>

    <!-- 主聊天界面 -->
    <div class="w-3/4 flex flex-col bg-gray-100">
      <div class="bg-indigo-600 text-white px-6 py-4 flex justify-between items-center">
        <h1 class="text-xl font-semibold">Chat with AI</h1>
        <div class="space-x-4">
          <button @click="logout" class="px-4 py-2 border border-white rounded-full hover:bg-white hover:text-indigo-600 transition duration-300">
            <i class="fas fa-sign-out-alt mr-2"></i> Logout
          </button>
          <button @click="clearHistory" class="px-4 py-2 border border-white rounded-full hover:bg-white hover:text-indigo-600 transition duration-300">
            <i class="fas fa-trash-alt mr-2"></i> Clear History
          </button>
        </div>
      </div>
      <div class="flex-1 overflow-y-auto px-6 py-4" ref="chatMessages">
        <ChatMessageComponent v-for="(message, index) in messages" :key="index" :message="message" />
      </div>
      <div class="bg-white px-6 py-4 border-t border-gray-200">
        <div class="flex items-center space-x-2">
          <textarea v-model="userInput" @keyup.enter="sendMessage" placeholder="Type your message..."
                    class="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"></textarea>
          <button @click="sendMessage" class="bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition duration-300">
            <i class="fas fa-paper-plane"></i>
          </button>
          <input type="file" @change="handleFileUpload" multiple accept=".txt,.pdf,.docx" ref="fileInput" class="hidden">
          <button @click="$refs.fileInput.click()" class="bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition duration-300">
            <i class="fas fa-upload"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChatMessageComponent from './ChatMessageComponent.vue';
import axios from 'axios';

export default {
  name: 'ChatInterface',
  components: {
    ChatMessageComponent
  },
  data() {
    return {
      messages: [],
      userInput: '',
      conversations: [[]],
      currentConversationIndex: 0,
      isLoading: false
    };
  },
  mounted() {
    this.loadChatHistory();
    this.scrollToBottom();
  },
  methods: {
    async sendMessage() {
      if (this.userInput.trim() === '') return;
      
      const userMessage = { sender: 'user', content: this.userInput };
      this.messages.push(userMessage);
      this.userInput = '';
      this.scrollToBottom();

      this.isLoading = true;
      try {
        const response = await fetch('/ask', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question: userMessage.content }),
        });

        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let aiResponse = '';
        //eslint-disable-next-line no-constant-condition
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
        this.conversations[this.currentConversationIndex] = [...this.messages];
        this.scrollToBottom();
      }
    },
    updateLastAIMessage(content) {
      const lastMessage = this.messages[this.messages.length - 1];
      if (lastMessage.sender === 'ai') {
        lastMessage.content = content;
      } else {
        this.messages.push({ sender: 'ai', content: content });
      }
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const chatMessages = this.$refs.chatMessages;
        chatMessages.scrollTop = chatMessages.scrollHeight;
      });
    },
    logout() {
      axios.get('/logout')
        .then(() => {
          this.$emit('logout');
        })
        .catch(error => {
          console.error('Logout error:', error);
        });
    },
    async loadChatHistory() {
      try {
        const response = await axios.get('/get_chat_history');
        this.messages = response.data.chat_history;
        this.conversations[0] = [...this.messages];
      } catch (error) {
        console.error('Error loading chat history:', error);
      }
    },
    async clearHistory() {
      try {
        await axios.post('/clear_chat_history');
        this.messages = [];
        this.conversations[this.currentConversationIndex] = [];
      } catch (error) {
        console.error('Error clearing chat history:', error);
      }
    },
    newConversation() {
      this.conversations.push([]);
      this.currentConversationIndex = this.conversations.length - 1;
      this.messages = [];
    },
    switchConversation(index) {
      this.currentConversationIndex = index;
      this.messages = this.conversations[index];
      this.scrollToBottom();
    },
    async handleFileUpload() {
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

<style scoped>
html, body {
  height: 100%;
  margin: 0;
}
</style>
