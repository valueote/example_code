<template>
    <div v-if="visible" class="c-compiler-modal">
      <div class="c-compiler-content">
        <button @click="close" class="close-button" aria-label="Close">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
        <h2>C Compiler</h2>
        <div class="editor-wrapper">
          <textarea
            ref="codeEditor"
            v-model="code"
            @keydown="handleTab"
            placeholder="Enter your C code here"
            spellcheck="false"
          ></textarea>
        </div>
        <button @click="compileAndRun" class="run-button">
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path d="M8 5v14l11-7z"/>
          </svg>
          Compile and Run
        </button>
        <div v-if="output" class="output">
          <h3>Output:</h3>
          <pre>{{ output }}</pre>
        </div>
        <div v-if="error" class="error">
          <h3>Error:</h3>
          <pre>{{ error }}</pre>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: {
      visible: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        code: '',
        output: '',
        error: ''
      };
    },
    methods: {
      async compileAndRun() {
        try {
          const response = await axios.post('/compile_run_c', { code: this.code });
          if (response.data.output) {
            this.output = response.data.output;
            this.error = '';
          } else if (response.data.error) {
            this.error = response.data.error;
            this.output = '';
          }
        } catch (err) {
          this.error = err.response.data.error;
          this.output = '';
        }
      },
      close() {
        this.$emit('close');
      },
      handleTab(e) {
        if (e.key === 'Tab') {
          e.preventDefault();
          const start = this.$refs.codeEditor.selectionStart;
          const end = this.$refs.codeEditor.selectionEnd;
          this.code = this.code.substring(0, start) + '    ' + this.code.substring(end);
          this.$nextTick(() => {
            this.$refs.codeEditor.selectionStart = this.$refs.codeEditor.selectionEnd = start + 4;
          });
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .c-compiler-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .c-compiler-content {
    background-color: #f8f9fa;
    padding: 30px;
    border-radius: 8px;
    width: 90%;
    max-width: 800px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    position: relative;
  }
  
  .close-button {
    position: absolute;
    top: 15px;
    right: 15px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s;
  }
  
  .close-button:hover {
    transform: scale(1.1);
  }
  
  .close-button svg {
    fill: #6c757d;
  }
  
  h2 {
    margin-top: 0;
    margin-bottom: 20px;
    color: #343a40;
  }
  
  .editor-wrapper {
    position: relative;
    margin-bottom: 20px;
  }
  
  textarea {
    width: 100%;
    height: 300px;
    padding: 15px;
    font-family: 'Courier New', Courier, monospace;
    font-size: 14px;
    line-height: 1.5;
    border: 1px solid #ced4da;
    border-radius: 4px;
    resize: vertical;
    background-color: #fff;
    color: #212529;
  }
  
  .run-button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.2s;
  }
  
  .run-button:hover {
    background-color: #0056b3;
  }
  
  .run-button svg {
    margin-right: 8px;
    fill: currentColor;
  }
  
  .output, .error {
    margin-top: 20px;
    padding: 15px;
    border-radius: 4px;
    font-family: 'Courier New', Courier, monospace;
    white-space: pre-wrap;
    word-break: break-word;
  }
  
  .output {
    background-color: #e9ecef;
    border: 1px solid #ced4da;
  }
  
  .error {
    background-color: #f8d7da;
    border: 1px solid #f5c6cb;
    color: #721c24;
  }
  
  h3 {
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 18px;
    color: #343a40;
  }
  
  pre {
    margin: 0;
    font-size: 14px;
    line-height: 1.5;
  }
  </style>