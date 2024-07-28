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
import { inject } from 'vue';

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
        const lang = block.classList[0].split('-')[1];

        // Create toolbar
        const toolbar = document.createElement('div');
        toolbar.className = 'code-toolbar';

        // Create language tag
        const langTag = document.createElement('span');
        langTag.className = 'lang-tag';
        langTag.textContent = lang;
        toolbar.appendChild(langTag);

        // Create copy button
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-btn';
        copyButton.textContent = 'Copy';
        toolbar.appendChild(copyButton);

        // Create run button
        const runButton = document.createElement('button');
        runButton.className = 'run-btn';
        runButton.textContent = 'Run';
        toolbar.appendChild(runButton);

        // Insert toolbar before the code block
        pre.insertBefore(toolbar, pre.firstChild);

        // Adjust padding to avoid遮挡
        pre.style.paddingTop = '30px';
      });

      new ClipboardJS('.copy-btn', {
        target: function(trigger) {
          return trigger.parentNode.parentNode.querySelector('code');
        }
      });

      // Add event listener for run button
      this.$el.querySelectorAll('.run-btn').forEach(button => {
        button.addEventListener('click', () => {
          const codeBlock = button.parentNode.parentNode.querySelector('code');
          const code = codeBlock.innerText;
          this.runPythonCode(code);
        });
      });
    });
  },
  setup() {
    const runPythonCode = inject('runPythonCode');
    return { runPythonCode };
  }
};
</script>

<style scoped>
:deep(.message-content pre) {
  @apply bg-gray-800 rounded-md overflow-x-auto max-w-full my-2 relative;
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
  @apply bg-gray-600 text-white text-xs px-2 py-1 rounded opacity-75 hover:opacity-100 transition-opacity duration-200;
}

:deep(.run-btn) {
  @apply bg-green-600 text-white text-xs px-2 py-1 rounded opacity-75 hover:opacity-100 transition-opacity duration-200;
}

:deep(.lang-tag) {
  @apply bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-75;
}

:deep(.code-toolbar) {
  @apply flex justify-between items-center absolute top-0 left-0 w-full p-2 bg-gray-700 rounded-t-md;
  height: 30px; /* Adjust height to avoid遮挡 */
}
</style>