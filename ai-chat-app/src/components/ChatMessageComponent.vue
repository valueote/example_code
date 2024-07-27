<template>
  <div class="mb-6">
    <div class="flex" :class="{'justify-end': message.sender === 'user'}">
      <div class="max-w-2xl rounded-lg p-3 shadow" 
           :class="message.sender === 'user' ? 'bg-blue-500 text-black' : 'bg-white text-black'">
        <div class="message-content" v-html="formattedMessage"></div>
      </div>
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
        marked.setOptions({
          highlight: function (code, lang) {
            if (lang && hljs.getLanguage(lang)) {
              return hljs.highlight(code, { language: lang }).value;
            }
            return hljs.highlightAuto(code).value;
          },
          langPrefix: 'hljs language-'
        });
        return marked(this.message.content);
      }
      return this.message.content;
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$el.querySelectorAll('pre code').forEach(block => {
        hljs.highlightElement(block);
      });
    });
  }
};
</script>

<style scoped>
:deep(.message-content pre) {
  @apply bg-gray-800 rounded-md p-3 overflow-x-auto max-w-full my-2;
}

:deep(.message-content code) {
  @apply font-mono text-sm;
}

:deep(.message-content > *:first-child) {
  @apply mt-0;
}

:deep(.message-content > *:last-child) {
  @apply mb-0;
}

:deep(.message-content :not(pre) > code) {
  @apply bg-gray-200 text-gray-800 px-1 py-0.5 rounded text-sm font-mono;
}

:deep(.hljs) {
  @apply bg-transparent;
}
</style>