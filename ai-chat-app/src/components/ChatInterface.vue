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
          <div class="action-buttons">
            <div id="upload-container">
              <input type="file" id="upload-input" ref="uploadInput" multiple @change="handleFileUpload">
              <label for="upload-input" id="upload-label">+</label>
            </div>
            <button @click="sendMessage" class="send-button">➜</button>
          </div>
        </div>
      </div>
    </div>
    <button @click="logout" class="logout-button">Logout</button>
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
  width: 66vw;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  padding: 20px;
  margin: 0;
  border-bottom: 1px solid #e2e8f0;
}

.chat-content {
  display: flex;
  flex-direction: column;
  height: calc(100% - 60px - 50px); /* 减去标题和登出按钮的高度 */
}

#chat-messages {
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px;
  background-color: #f7fafc;
}

.input-area {
  border-top: 1px solid #e2e8f0;
  padding: 10px;
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
  font-size: 24px;
  font-weight: bold;
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
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease;
}

.send-button:hover {
  background-color: #5a67d8;
}

.logout-button {
  align-self: flex-end;
  padding: 10px 20px;
  margin: 10px;
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