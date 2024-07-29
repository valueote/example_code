<template>
    <div v-if="visible" class="c-compiler-modal">
      <div class="c-compiler-content">
        <button @click="close" class="close-button">×</button>
        <textarea v-model="code" placeholder="Enter your C code here"></textarea>
        <button @click="compileAndRun">Compile and Run</button>
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
  }
  
  .c-compiler-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    width: 80%;
    max-width: 600px;
    position: relative;
  }
  
  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
  }
  
  textarea {
    width: 100%;
    height: 200px;
    margin-bottom: 10px;
  }
  
  button {
    padding: 10px 20px;
    margin-bottom: 10px;
  }
  
  .output, .error {
    width: 100%;
    background-color: #f0f0f0;
    padding: 10px;
    border: 1px solid #ccc;
  }
  
  .error {
    background-color: #ffeeee;
    border-color: #ffcccc;
  }
  </style>