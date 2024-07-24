<template>
  <div class="flex flex-col h-screen bg-gray-100">
    <div class="flex items-center justify-between p-4 bg-blue-600 text-white">
      <h1 class="text-2xl font-bold">Chat with AI</h1>
      <button @click="logout" class="px-4 py-2 bg-red-500 text-white rounded">Logout</button>
    </div>
    <div id="chat-messages" class="flex-1 p-4 overflow-y-auto space-y-4">
      <div v-for="(message, index) in chatHistory" :key="index" :class="['message', message.sender === 'user' ? 'user-message' : 'ai-message']">
        <div v-html="message.content" class="p-3 rounded" :class="message.sender === 'user' ? 'bg-blue-500 text-white ml-auto max-w-xs' : 'bg-gray-300 text-gray-800 mr-auto max-w-md'"></div>
      </div>
    </div>
    <div id="chat-input" class="p-4 flex space-x-4">
      <input type="text" v-model="userInput" @keypress.enter="sendMessage" placeholder="Type your message..." class="flex-1 px-4 py-2 border border-gray-300 rounded">
      <button @click="sendMessage" class="px-4 py-2 bg-blue-500 text-white rounded">Send</button>
    </div>
    <div id="upload-container" class="p-4 flex justify-center">
      <input type="file" id="upload-input" multiple @change="uploadFiles" class="hidden">
      <label for="upload-input" class="px-4 py-2 bg-green-500 text-white rounded cursor-pointer">Upload Documents</label>
    </div>
  </div>
</template>

<script>
import { marked } from 'marked';
export default {
  data() {
    return {
      userInput: '',
      chatHistory: [],
    };
  },
  mounted() {
    this.loadChatHistory();
  },
  methods: {
    sendMessage() {
      if (this.userInput.trim() === '') return;

      this.appendMessage('user', this.userInput);
      const message = this.userInput;
      this.userInput = '';

      fetch('/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: message }),
      })
      .then(response => {
        const reader = response.body.getReader();
        let aiResponse = '';

        const readStream = () => {
          reader.read().then(({ done, value }) => {
            if (done) {
              this.appendMessage('ai', aiResponse);
              return;
            }
            const chunk = new TextDecoder().decode(value);
            aiResponse += chunk;
            this.appendMessage('ai', aiResponse, true);
            readStream();
          });
        };
        
        readStream();
      })
      .catch(error => console.error('Error:', error));
    },
    appendMessage(sender, message, isStreaming = false) {
      const content = sender === 'ai' ? marked.parse(message) : message;
      this.chatHistory.push({ sender, content });
      this.$nextTick(() => {
        const chatMessages = this.$refs.chatMessages;
        chatMessages.scrollTop = chatMessages.scrollHeight;
        if (!isStreaming) {
          this.$refs.chatMessages.lastElementChild.id = '';
        }
      });
    },
    uploadFiles(event) {
      const files = event.target.files;
      const formData = new FormData();
      Array.from(files).forEach(file => formData.append('files', file));

      fetch('/upload', { method: 'POST', body: formData })
      .then(response => response.json())
      .then(data => alert(data.message))
      .catch(error => console.error('Error:', error));
    },
    loadChatHistory() {
      fetch('/get_chat_history')
      .then(response => response.json())
      .then(data => {
        this.chatHistory = data.chat_history.map(message => ({
          sender: message.sender,
          content: marked.parse(message.content),
        }));
      })
      .catch(error => console.error('Error:', error));
    },
    logout() {
      localStorage.removeItem('isLoggedIn');
      this.$router.push({ name: 'Login' });
    },
  },
};
</script>