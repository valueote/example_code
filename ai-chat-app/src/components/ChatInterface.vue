<template>
  <div class="flex h-screen w-screen">
    <!-- 侧边栏 -->
    <div class="w-1/5 bg-gray-800 text-white flex flex-col">
      <div class="p-4">
        <button @click="newConversation" class="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300">
          New Conversation
        </button>
      </div>
      <div class="flex-1 overflow-y-auto">
        <div v-for="(conversation, index) in conversations" :key="index" 
             @click="switchConversation(index)"
             class="p-3 hover:bg-gray-700 cursor-pointer transition duration-300"
             :class="{ 'bg-gray-700': currentConversationIndex === index }">
          Conversation {{ index + 1 }}
        </div>
      </div>
    </div>

    <!-- 主聊天界面 -->
    <div class="w-4/5 flex flex-col bg-gray-100">
      <div class="bg-indigo-600 text-white px-6 py-3 flex justify-between items-center">
        <h1 class="text-lg font-semibold">Chat Bot</h1>
        <div class="space-x-4">
          <button @click="logout" class="px-3 py-1 border border-white rounded-full text-sm hover:bg-white hover:text-indigo-600 transition duration-300">
            <i class="fas fa-sign-out-alt mr-2"></i> Logout
          </button>
          <button @click="clearHistory" class="px-3 py-1 border border-white rounded-full text-sm hover:bg-white hover:text-indigo-600 transition duration-300">
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
      conversations: [],
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
    async loadConversations() {
      try {
        const response = await axios.get('/get_conversations');
        this.conversations = response.data.conversations;
        if (this.conversations.length > 0) {
          this.switchConversation(this.conversations[this.conversations.length - 1]);
        }
      } catch (error) {
        console.error('Error loading conversations:', error);
      }
    },
    async newConversation() {
      try {
        const response = await axios.post('/new_conversation');
        this.conversations.push(response.data.history_num);
        this.switchConversation(response.data.history_num);
      } catch (error) {
        console.error('Error creating new conversation:', error);
      }
    },
    async switchConversation(index) {
      this.currentConversationIndex = index;
      try {
        const response = await axios.post('/switch_conversation', { history_num: index });
        if (response.data.chat_history) {
          this.messages = response.data.chat_history.map(message => ({
            sender: message.type === 'HumanMessage' ? 'user' : 'ai',
            content: message.content
          }));
        } else {
          this.messages = [];
        }
        this.scrollToBottom();
      } catch (error) {
        console.error('Error switching conversation:', error);
      }
    },

    async getConversations() {
      try {
        const response = await axios.get('/get_conversations');
        this.conversations = response.data.conversations;
      } catch (error) {
        console.error('Error fetching conversations:', error);
      }
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
