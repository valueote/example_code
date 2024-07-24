<template>
    <div>
      <h1>Chat with AI</h1>
      <div id="chat-messages">
        <div v-for="(message, index) in chatHistory" :key="index" :class="['message', message.sender === 'user' ? 'user-message' : 'ai-message']">
          <div v-html="renderMessage(message.content)"></div>
        </div>
      </div>
      <div id="chat-input">
        <input type="text" v-model="userInput" placeholder="Type your message...">
        <button @click="sendMessage">Send</button>
      </div>
      <div id="upload-container">
        <input type="file" id="upload-input" multiple @change="handleFileUpload">
        <label for="upload-input">Upload Documents</label>
      </div>
      <button @click="logout">Logout</button>
    </div>
  </template>
  
  <script>
  import hljs from 'highlight.js';
  import marked from 'marked';
  
  export default {
    data() {
      return {
        userInput: '',
      };
    },
    computed: {
      chatHistory() {
        return this.$store.state.chatHistory;
      },
    },
    methods: {
      sendMessage() {
        if (this.userInput.trim() === '') return;
        this.$store.dispatch('sendMessage', this.userInput);
        this.userInput = '';
      },
      logout() {
        this.$store.dispatch('logout').then(() => {
          this.$router.push('/login');
        });
      },
      handleFileUpload(event) {
        const files = event.target.files;
        this.$store.dispatch('uploadFiles', files);
      },
      renderMessage(message) {
        const htmlContent = marked(message);
        const highlightedContent = hljs.highlightAuto(htmlContent).value;
        return highlightedContent;
      },
    },
  };
  </script>
  
  <style>
  /* 样式 */
  </style>