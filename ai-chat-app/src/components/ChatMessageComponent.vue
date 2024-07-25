<template>
  <div :class="['message', message.sender === 'user' ? 'user-message' : 'ai-message']" v-html="formattedMessage"></div>
</template>

<script>
import 'highlight.js/styles/github-dark.css'; // You can choose other styles from highlight.js
import { marked } from 'marked';
import hljs from 'highlight.js';

export default {
  name: 'ChatMessageComponent',
  props: ['message'],
  computed: {
    formattedMessage() {
      if (this.message.sender === 'ai') {
        return marked(this.message.content, {
          highlight: function (code, lang) {
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            return hljs.highlight(code, { language }).value;
          }
        });
      }
      return this.message.content;
    }
  },
  mounted() {
    if (this.message.sender === 'ai') {
      this.$nextTick(() => {
        this.$el.querySelectorAll('pre code').forEach(block => {
          hljs.highlightElement(block);
        });
      });
    }
  }
};
</script>

<style scoped>
.message {
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 18px;
  max-width: 70%;
  white-space: pre-wrap;
}
.user-message {
  background-color: #1877f2;
  color: white;
  align-self: flex-end;
}
.ai-message {
  background-color: #e4e6eb;
  color: black;
  align-self: flex-start;
}
</style>
