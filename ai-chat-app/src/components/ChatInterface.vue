<template>
  <div class="chat-container">
    <div class="chat-header">
      <h1>Chat with AI</h1>
      <div class="header-buttons">
        <button @click="logout" class="logout-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
        </button>
        <div class="close-button" @click="closeChat">×</div>
      </div>
    </div>
    <div class="chat-content">
      <div id="chat-messages" ref="chatMessages">
        <ChatMessageComponent
          v-for="(message, index) in chatMessages"
          :key="index"
          :message="message"
        />
      </div>
    </div>
    <div class="input-area">
      <div id="chat-input">
        <input type="text" v-model="userInput" @keypress.enter="sendMessage" placeholder="Type your message...">
        <div class="action-buttons">
          <div id="upload-container">
            <input type="file" id="upload-input" ref="uploadInput" multiple @change="handleFileUpload">
            <label for="upload-input" id="upload-label">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
            </label>
          </div>
          <button @click="sendMessage" class="send-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChatMessageComponent from './ChatMessageComponent.vue';

export default {
  name: 'ChatInterface',
  components: {
    ChatMessageComponent
  },
  data() {
    return {
      userInput: '',
      chatMessages: []
    };
  },
  methods: {
    sendMessage() {
      if (this.userInput.trim() === '') return;
      this.appendMessage('user', this.userInput);
      const message = this.userInput;
      this.userInput = '';

      fetch('/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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
              this.updateLastAiMessage(aiResponse);
              readStream();
            });
          };

          readStream();
        })
        .catch(error => {
          console.error('Error:', error);
        });
    },
    appendMessage(sender, message) {
      this.chatMessages.push({ sender, content: message });
    },
    updateLastAiMessage(message) {
      if (this.chatMessages.length > 0 && this.chatMessages[this.chatMessages.length - 1].sender === 'ai') {
        this.chatMessages[this.chatMessages.length - 1].content = message;
      }
    },
    scrollToBottom() {
      const chatMessages = this.$refs.chatMessages;
      chatMessages.scrollTop = chatMessages.scrollHeight;
    },
    handleFileUpload(event) {
      const files = event.target.files;
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }

      fetch('/upload', {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          alert(data.message);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    },
    logout() {
      fetch('/logout')
        .then(response => response.json())
        .then(data => {
          alert(data.message);
          this.$emit('logout');
        })
        .catch(error => {
          console.error('Error:', error);
        });
    },
    loadChatHistory() {
      fetch('/get_chat_history')
        .then(response => response.json())
        .then(data => {
          data.chat_history.forEach(message => {
            this.chatMessages.push(message);
          });
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  },
  mounted() {
    this.loadChatHistory();
  }
};
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  position: sticky;
  top: 0;
  z-index: 10;
}

.header-buttons {
  display: flex;
  align-items: center;
}


.chat-header h1 {
  margin: 0;
  font-size: 1.5rem;
}


.logout-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  margin-right: 8px;
  color: #4a5568;
  transition: color 0.3s ease;
}

.logout-button:hover {
  color: #2d3748;
}

.close-button {
  font-size: 24px;
  cursor: pointer;
  color: #4a5568;
}


.chat-content {
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px;
  background-color: #f7fafc;
}

.input-area {
  border-top: 1px solid #e2e8f0;
  padding: 15px;
  background-color: #ffffff;
  position: sticky;
  bottom: 0;
}

#chat-input {
  display: flex;
  align-items: center;
}

#chat-input input {
  flex-grow: 1;
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 24px;
  font-size: 16px;
  margin-right: 10px;
}

#chat-input input:focus {
  outline: none;
  border-color: #667eea;
}

.action-buttons {
  display: flex;
  align-items: center;
}

#upload-container {
  margin-right: 10px;
}

#upload-input {
  display: none;
}

#upload-label {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: #4a5568;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

#upload-label:hover {
  background-color: #2d3748;
}

.send-button {
  width: 40px;
  height: 40px;
  background-color: #667eea;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease;
}

.send-button:hover {
  background-color: #5a67d8;
}

/* 添加这个样式来限制对话气泡的宽度 */
:deep(.message-bubble) {
  max-width: 70%;
  word-wrap: break-word;
}
</style>