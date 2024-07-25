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
import { marked } from 'marked';
import hljs from 'highlight.js';

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
              this.appendMessage('ai', aiResponse, true);
              readStream();
            });
          };

          readStream();
        })
        .catch(error => {
          console.error('Error:', error);
        });
    },
    appendMessage(sender, message, isStreaming = false) {
      const chatMessages = this.$refs.chatMessages;
      const messageElement = document.createElement('div');
      messageElement.classList.add('message', sender === 'user' ? 'user-message' : 'ai-message');

      if (sender === 'ai') {
        const htmlContent = marked(message);
        messageElement.innerHTML = htmlContent;
        this.highlightCodeBlocks(messageElement);
      } else {
        messageElement.textContent = message;
      }

      if (!isStreaming) {
        chatMessages.appendChild(messageElement);
      }

      chatMessages.scrollTop = chatMessages.scrollHeight;
    },
    highlightCodeBlocks(element) {
      element.querySelectorAll('pre code').forEach(block => {
        hljs.highlightBlock(block);
      });
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
            this.appendMessage(message.sender, message.content);
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
