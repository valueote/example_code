<template>
    <div v-if="visible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl w-11/12 max-w-4xl p-6 relative">
        <button @click="close" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200" aria-label="Close">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
        <h2 class="text-2xl font-bold mb-4 text-gray-800">C Compiler</h2>
        <div class="mb-4">
          <textarea
            ref="codeEditor"
            v-model="code"
            @keydown="handleTab"
            placeholder="Enter your C code here"
            spellcheck="false"
            class="w-full h-64 p-4 text-sm font-mono bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          ></textarea>
        </div>
        <button @click="compileAndRun" class="flex items-center justify-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
          </svg>
          Compile and Run
        </button>
        <div v-if="output" class="mt-4 bg-green-100 rounded-md p-4">
          <h3 class="text-lg font-semibold mb-2 text-gray-800">Output:</h3>
          <pre class="text-sm font-mono whitespace-pre-wrap break-words text-gray-700">{{ output }}</pre>
        </div>
        <div v-if="error" class="mt-4 bg-red-100 rounded-md p-4">
          <h3 class="text-lg font-semibold mb-2 text-red-800">Error:</h3>
          <pre class="text-sm font-mono whitespace-pre-wrap break-words text-red-700">{{ error }}</pre>
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