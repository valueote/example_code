<template>
  <div>
    <h1>Chat with AI</h1>
    <div id="chat-messages" ref="chatMessages">
      <ChatMessageComponent
        v-for="(message, index) in chatMessages"
        :key="index"
        :message="message"
      />
    </div>
    <div id="chat-input">
      <input type="text" v-model="userInput" @keypress.enter="sendMessage" placeholder="Type your message...">
      <button @click="sendMessage">Send</button>
    </div>
    <div id="upload-container">
      <input type="file" id="upload-input" ref="uploadInput" multiple @change="handleFileUpload">
      <label for="upload-input" id="upload-label">Upload Documents</label>
    </div>
    <button @click="logout" style="margin-top: 20px;">Logout</button>
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
#chat-messages {
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px;
  background-color: #f0f2f5;
  border-radius: 8px;
  margin-bottom: 20px;
}
#chat-input {
  display: flex;
  justify-content: space-between;
}
#user-input {
  flex-grow: 1;
  padding: 12px;
  border: 1px solid #dddfe2;
  border-radius: 20px;
  margin-right: 10px;
}
button {
  padding: 12px 20px;
  background-color: #1877f2;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}
#upload-container {
  margin-top: 20px;
}
#upload-input {
  display: none;
}
#upload-label {
  display: block;
  padding: 12px;
  background-color: #1877f2;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
}
#upload-label:hover {
  background-color: #166fe5;
}
</style>
