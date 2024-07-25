<template>
  <div :class="['message', message.sender === 'user' ? 'user-message' : 'ai-message']">
    <div class="message-bubble">
      <div class="message-content" v-html="formattedMessage"></div>
    </div>
  </div>
</template>

<script>
import 'highlight.js/styles/github-dark.css';
import { marked } from 'marked';
import hljs from 'highlight.js';

export default {
  name: 'ChatMessageComponent',
  props: {
    message: {
      type: Object,
      required: true
    }
  },
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
  display: flex;
  flex-direction: column;
}

.message-bubble {
  max-width: 70%;
  word-wrap: break-word;
}

.message-content {
  padding: 12px 16px;
  border-radius: 18px;
  font-size: 14px;
  line-height: 1.4;
  white-space: pre-wrap;
}

.user-message {
  align-items: flex-end;
}

.user-message .message-bubble {
  margin-left: auto;
}

.user-message .message-content {
  background-color: #1877f2;
  color: white;
}

.ai-message {
  align-items: flex-start;
}

.ai-message .message-content {
  background-color: #e4e6eb;
  color: #2d3748;
}

/* 添加样式以确保代码块正确显示 */
.ai-message pre {
  background-color: #1e1e1e;
  border-radius: 12px;
  padding: 12px;
  overflow-x: auto;
  max-width: 100%;
}

.ai-message code {
  font-family: 'Courier New', Courier, monospace;
  border-radius: 8px;
}

</style>