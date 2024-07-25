<template>
  <div class="chat-container">
    <h1>Chat with AI</h1>
    <div class="chat-content">
      <div id="chat-messages" ref="chatMessages">
        <ChatMessageComponent
          v-for="(message, index) in chatMessages"
          :key="index"
          :message="message"
        />
      </div>
      <div class="input-area">
        <div id="chat-input">
          <input type="text" v-model="userInput" @keypress.enter="sendMessage" placeholder="Type your message...">
          <button @click="sendMessage" class="send-button">Send</button>
        </div>
        <div class="action-buttons">
          <div id="upload-container">
            <input type="file" id="upload-input" ref="uploadInput" multiple @change="handleFileUpload">
            <label for="upload-input" id="upload-label">Upload Documents</label>
          </div>
          <button @click="logout" class="logout-button">Logout</button>
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
  height: 100%;
  width: 100%;
}

.chat-content {
  display: flex;
  flex-direction: column;
  height: calc(100% - 60px); /* 减去标题的高度 */
}

#chat-messages {
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px;
  background-color: #f7fafc;
  border-radius: 8px 8px 0 0;
  border: 1px solid #e2e8f0;
  border-bottom: none;
}

.input-area {
  background-color: #fff;
  border: 1px solid #e2e8f0;
  border-top: none;
  border-radius: 0 0 8px 8px;
  padding: 20px;
}

#chat-input {
  display: flex;
  margin-bottom: 15px;
}

#chat-input input {
  flex-grow: 1;
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 8px 0 0 8px;
  font-size: 16px;
}

#chat-input input:focus {
  outline: none;
  border-color: #667eea;
}

.send-button {
  padding: 12px 24px;
  background-color: #667eea;
  color: white;
  border: none;
  border-radius: 0 8px 8px 0;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.send-button:hover {
  background-color: #5a67d8;
}

.action-buttons {
  display: flex;
  justify-content: space-between;
}

#upload-container {
  flex: 1;
  margin-right: 10px;
}

#upload-input {
  display: none;
}

#upload-label {
  display: block;
  padding: 12px;
  background-color: #4a5568;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

#upload-label:hover {
  background-color: #2d3748;
}

.logout-button {
  flex: 1;
  padding: 12px;
  background-color: #f56565;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.logout-button:hover {
  background-color: #e53e3e;
}
</style>