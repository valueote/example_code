<template>
    <div class="cpp-compiler p-4 bg-gray-100 rounded shadow-md">
      <h2 class="text-2xl font-bold mb-4">C++ Code Compiler</h2>
      <textarea v-model="code" placeholder="Enter your C++ code here" rows="10" class="w-full p-2 mb-4 border rounded"></textarea>
      <br />
      <button @click="compileAndRun" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Compile and Run</button>
      <div v-if="output" class="output mt-4 bg-green-100 p-2 rounded">
        <h3 class="text-lg font-bold">Output:</h3>
        <pre class="whitespace-pre-wrap">{{ output }}</pre>
      </div>
      <div v-if="error" class="error mt-4 bg-red-100 p-2 rounded">
        <h3 class="text-lg font-bold">Error:</h3>
        <pre class="whitespace-pre-wrap">{{ error }}</pre>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'CppCompiler',
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
          const response = await axios.post('/compile_run_cpp', { code: this.code });
          if (response.data.output) {
            this.output = response.data.output;
            this.error = '';
          } else if (response.data.error) {
            this.error = response.data.error;
            this.output = '';
          }
        } catch (err) {
          this.error = 'Request failed, please check if the backend service is running.';
          this.output = '';
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add any additional custom styles here */
  </style>