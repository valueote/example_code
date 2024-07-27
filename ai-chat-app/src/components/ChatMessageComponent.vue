<template>
  <div class="mb-6">
    <transition name="fade">
      <div class="flex" :class="{'justify-end': message.sender === 'user'}">
        <div class="max-w-2xl rounded-lg p-3 shadow" 
             :class="message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-white text-black'">
          <div class="message-content" v-html="formattedMessage"></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import 'highlight.js/styles/github-dark.css';
import { marked } from 'marked';
import hljs from 'highlight.js';
import ClipboardJS from 'clipboard';

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
              return hljs.highlight(lang, code).value;
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
        const pre = block.parentNode;
        const button = document.createElement('button');
        button.className = 'copy-btn';
        button.textContent = 'Copy';
        pre.appendChild(button);
      });

      new ClipboardJS('.copy-btn', {
        target: function(trigger) {
          return trigger.parentNode.querySelector('code');
        }
      });
    });
  }
};
</script>

<style scoped>
:deep(.message-content pre) {
  @apply bg-gray-800 rounded-md p-3 overflow-x-auto max-w-full my-2 relative;
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
  color: #e0e0e0;
}

/* Add these new styles */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

:deep(.copy-btn) {
  @apply absolute top-2 right-2 bg-gray-600 text-white text-xs px-2 py-1 rounded opacity-75 hover:opacity-100 transition-opacity duration-200;
}
</style>