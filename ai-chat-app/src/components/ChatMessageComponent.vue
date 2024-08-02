<template>
  <div class="mb-6">
    <transition name="message-pop">
      <div class="flex" :class="{'justify-end': message.sender === 'user'}">
        <img v-if="message.sender === 'ai'" src="@/assets/cat.png" alt="AI Avatar" class="ai-avatar">
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
      pre.style.paddingTop = '20px';
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
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Poppins:wght@600&display=swap');



.message-bubble {
  position: relative;
  transition: all 0.3s ease;
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  max-width: 80%;
  margin-bottom: 1rem;
  border: 2px solid #8B4513;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.user-message {
  background-color: #FFD700;
  color: #8B4513;
  border-radius: 18px 18px 0 18px;
  padding: 12px 16px;
  margin-left: auto;
}

.ai-message {
  background-color: #FFF9E6;
  color: #8B4513;
  border-radius: 18px 18px 18px 0;
  padding: 12px 16px;
}

.ai-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  align-self: flex-end;
}

.message-pop-enter-active,
.message-pop-leave-active {
  transition: all 0.5s cubic-bezier(.36,.07,.19,.97);
}

.message-pop-enter-from,
.message-pop-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
}

:deep(.message-content) {
  font-family: 'Roboto', sans-serif;
}

:deep(.message-content h1),
:deep(.message-content h2),
:deep(.message-content h3) {
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  color: #8B4513;
}

:deep(.message-content pre) {
  background-color: #F8F8F8;
  border-radius: 8px;
  padding: 2.5rem 1rem 1rem;
  margin: 1rem 0;
  overflow-x: auto;
  border: 2px solid #8B4513;
  position: relative;
}

:deep(.message-content code) {
  font-family: 'Roboto Mono', monospace;
  font-size: 0.9rem;
  color: #333;
}

:deep(.message-content > *:first-child) {
  margin-top: 0;
}

:deep(.message-content > *:last-child) {
  margin-bottom: 0;
}

:deep(.message-content :not(pre) > code) {
  background-color: #FFD700;
  color: #8B4513;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.9rem;
}

:deep(.hljs) {
  background-color: transparent;
  color: #333;
}
:deep(.copy-btn),
:deep(.run-btn) {
  font-family: 'Roboto', sans-serif;
  font-size: 0.8rem;
  font-weight: bold;
  color: #FFFFFF;
  padding: 4px 8px;
  border-radius: 4px;
  opacity: 0.8;
  transition: all 0.2s ease;
}

:deep(.copy-btn:hover),
:deep(.run-btn:hover) {
  opacity: 1;
  transform: translateY(-1px);
}

:deep(.copy-btn) {
  background-color: #FFA500;
}

:deep(.run-btn) {
  background-color: #98FB98;
}

:deep(.lang-tag) {
  font-family: 'Roboto', sans-serif;
  font-size: 0.8rem;
  font-weight: bold;
  background-color: #8B4513;
  color: #FFFFFF;
  padding: 2px 6px;
  border-radius: 4px;
}


:deep(.code-toolbar) {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 0.5rem;
  background-color: #E6E6E6;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  border-bottom: 2px solid #8B4513;
}



@keyframes wiggle {
  0% { transform: rotate(0deg); }
  25% { transform: rotate(1deg); }
  50% { transform: rotate(0deg); }
  75% { transform: rotate(-1deg); }
  100% { transform: rotate(0deg); }
}

.message-bubble:hover {
  animation: wiggle 0.5s ease-in-out;
}
</style>