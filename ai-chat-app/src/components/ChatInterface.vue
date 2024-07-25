<template>
  <div class="chat-container">
    <div class="chat-header">
      <h1>Chat with AI</h1>
      <div class="header-buttons">
        <button @click="logout" class="logout-button">
          <i class="fas fa-sign-out-alt"></i> Logout
        </button>
        <button @click="clearHistory" class="clear-history-button">
          <i class="fas fa-trash-alt"></i> Clear History
        </button>
      </div>
    </div>
    <div class="chat-messages" ref="chatMessages">
      <ChatMessageComponent v-for="(message, index) in messages" :key="index" :message="message" />
    </div>
    <div class="chat-input">
      <textarea v-model="userInput" @keyup.enter="sendMessage" placeholder="Type your message..."></textarea>
      <button @click="sendMessage" class="send-button">
        <i class="fas fa-paper-plane"></i>
      </button>
    </div>
    <div class="file-upload">
      <input type="file" @change="handleFileUpload" multiple accept=".txt,.pdf,.docx" ref="fileInput" style="display:none;">
      <button @click="$refs.fileInput.click()" class="upload-button">
        <i class="fas fa-upload"></i> Upload Files
      </button>
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
         // eslint-disable-next-line no-constant-condition
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
      } catch (error) {
        console.error('Error loading chat history:', error);
      }
    },
    async clearHistory() {
      try {
        await axios.post('/clear_chat_history');
        this.messages = [];
      } catch (error) {
        console.error('Error clearing chat history:', error);
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
        // Optionally, add a system message to show successful upload
        this.messages.push({ sender: 'system', content: 'Files uploaded successfully' });
      } catch (error) {
        console.error('Error uploading files:', error);
        // Optionally, add a system message to show upload failure
        this.messages.push({ sender: 'system', content: 'File upload failed' });
      }
    }
  }
};
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f0f2f5;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.chat-header {
  background-color: #667eea;
  color: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-header h1 {
  color:white;
  margin: 0;
  font-size: 24px;
}

.header-buttons {
  display: flex;
  gap: 10px;
}

.logout-button, .clear-history-button {
  background-color: transparent;
  border: 2px solid white;
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logout-button:hover, .clear-history-button:hover {
  background-color: white;
  color: #667eea;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.chat-input {
  display: flex;
  padding: 20px;
  background-color: white;
}

.chat-input textarea {
  flex: 1;
  border: none;
  border-radius: 20px;
  padding: 12px 20px;
  font-size: 16px;
  resize: none;
  background-color: #f0f2f5;
  transition: all 0.3s ease;
}

.chat-input textarea:focus {
  outline: none;
  box-shadow: 0 0 0 2px #667eea;
}

.send-button {
  background-color: #667eea;
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin-left: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.send-button:hover {
  background-color: #5a67d8;
  transform: scale(1.05);
}

.file-upload {
  padding: 10px 20px;
  background-color: white;
  border-top: 1px solid #e4e6eb;
}

.upload-button {
  background-color: #667eea;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.upload-button:hover {
  background-color: #5a67d8;
}
</style>