<template>
  <div :class="['mb-4', message.sender === 'user' ? 'text-right' : 'text-left']">
    <div :class="['inline-block max-w-[70%] rounded-lg px-4 py-2', 
                  message.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800']">
      <div class="message-content" v-html="formattedMessage"></div>
    </div>
  </div>
</template>

<script>
import 'highlight.js/styles/atom-one-dark.css';
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
:deep(.message-content pre) {
  @apply bg-gray-800 rounded-md p-3 overflow-x-auto max-w-full my-2;
}

:deep(.message-content code) {
  @apply font-mono text-sm;
}

/* Remove extra padding in message bubbles */
:deep(.message-content > *:first-child) {
  @apply mt-0;
}

:deep(.message-content > *:last-child) {
  @apply mb-0;
}

/* Style for inline code */
:deep(.message-content :not(pre) > code) {
  @apply bg-gray-100 text-gray-800 px-1 py-0.5 rounded text-sm font-mono;
}
</style>