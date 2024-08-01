<template>
  <div class="mb-6">
    <transition name="message-pop">
      <div class="flex" :class="{'justify-end': message.sender === 'user'}">
        <div class="max-w-2xl rounded-2xl p-4 shadow-lg message-bubble" 
             :class="message.sender === 'user' ? 'user-message' : 'ai-message'">
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
  
  setup() {
    const runPythonCode = inject('runPythonCode');
    const showPythonInterpreter = inject('showPythonInterpreter');
    return { runPythonCode, showPythonInterpreter };
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
      this.highlightCodeBlocks();
    });
  },
  updated() {
    this.$nextTick(() => {
      this.highlightCodeBlocks();
    });
  },
  methods: {
    highlightCodeBlocks() {
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

      // Create run button only if the language is Python
      if (lang === 'python') {
        const runButton = document.createElement('button');
        runButton.className = 'run-btn';
        runButton.textContent = 'Run';
        toolbar.appendChild(runButton);
      }

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

    const handleRunCode = (code) => {
      this.showPythonInterpreter.value = true;
      this.runPythonCode(code);
    };

    // Add event listener for run button
    this.$el.querySelectorAll('.run-btn').forEach(button => {
      button.addEventListener('click', () => {
        const codeBlock = button.parentNode.parentNode.querySelector('code');
        const code = codeBlock.innerText;
        handleRunCode(code);
      });
    });
  }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bangers&family=Varela+Round&display=swap');

.message-bubble {
  position: relative;
  transition: all 0.3s ease;
  font-family: 'Varela Round', sans-serif;
  font-size: 1.1em;
  line-height: 1.5;
}

.message-bubble::before {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
}

.user-message {
  background-color: #FFD6E0;
  color: #FF69B4;
  margin-left: auto;
}


.ai-message {
  background-color: #E0F7FA;
  color: #00BCD4;
}

.ai-message::before {
  border-width: 15px 15px 0 0;
  border-color: #E0F7FA transparent transparent transparent;
  bottom: 0;
  left: -15px;
}

.message-pop-enter-active,
.message-pop-leave-active {
  transition: all 0.5s cubic-bezier(.36,.07,.19,.97);
}

.message-pop-enter-from,
.message-pop-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}

:deep(.message-content) {
  font-family: 'Varela Round', sans-serif;
}

:deep(.message-content h1),
:deep(.message-content h2),
:deep(.message-content h3) {
  font-family: 'Bangers', cursive;
  letter-spacing: 1px;
}

:deep(.message-content pre) {
  @apply bg-gray-800 rounded-lg overflow-x-auto max-w-full my-2 relative;
  border: 2px solid #FFD6E0;
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
  @apply bg-pink-100 text-pink-800 px-1 py-0.5 rounded text-sm font-mono;
}

:deep(.hljs) {
  @apply bg-transparent;
  color: #e0e0e0;
}

:deep(.copy-btn),
:deep(.run-btn) {
  @apply text-white text-xs px-3 py-1 rounded-full opacity-75 hover:opacity-100 transition-all duration-200 transform hover:scale-110;
  font-family: 'Bangers', cursive;
  letter-spacing: 1px;
}

:deep(.copy-btn) {
  background-color: #FF69B4;
}

:deep(.run-btn) {
  background-color: #00BCD4;
}

:deep(.lang-tag) {
  @apply bg-purple-400 text-white text-xs px-2 py-1 rounded-full opacity-75;
  font-family: 'Bangers', cursive;
  letter-spacing: 1px;
}

:deep(.code-toolbar) {
  @apply flex justify-between items-center absolute top-0 left-0 w-full p-2 bg-gray-700 rounded-t-lg;
  height: 35px;
}
</style>