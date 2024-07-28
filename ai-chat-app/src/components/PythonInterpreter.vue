<template>
    <div v-if="show" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div class="bg-white p-5 rounded-lg shadow-xl w-3/4 h-3/4 flex flex-col">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold">Python Interpreter</h2>
          <button @click="close" class="text-gray-500 hover:text-gray-700">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div id="python-terminal" class="flex-grow bg-black text-white p-4 rounded overflow-auto"></div>
      </div>
    </div>
  </template>
  
  <script>
  /* global loadPyodide */
  
  export default {
    name: 'PythonInterpreter',
    props: {
      show: {
        type: Boolean,
        required: true
      }
    },
    data() {
      return {
        pyodide: null,
        initialized: false // 添加一个标志来跟踪是否已经初始化
      };
    },
    methods: {
      close() {
        this.$emit('close');
      },
      async loadPyodide() {
        if (!this.pyodide) {
            const terminal = document.getElementById('python-terminal');
            terminal.innerHTML += 'Loading Pyodide...<br>';
            this.pyodide = await loadPyodide();
            terminal.innerHTML += 'Python 3.9.5 (default, May 3 2021, 19:12:05)<br>';
            terminal.innerHTML += '[Pyodide] on WebAssembly/JavaScript<br>';
            terminal.innerHTML += 'Type "help", "copyright", "credits" or "license" for more information.<br>';
            terminal.innerHTML += '>>> ';
        }
      },

      async runPythonInterpreter() {
        await this.$nextTick();
        if (!this.pyodide) {
          await this.loadPyodide();
        }
        this.createInputElement();
      },

      createInputElement() {
        const terminal = document.getElementById('python-terminal');
        const inputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.style.background = 'transparent';
        inputElement.style.border = 'none';
        inputElement.style.outline = 'none';
        inputElement.style.color = 'white';
        inputElement.style.width = '90%';
        terminal.appendChild(inputElement);
        inputElement.focus();
  
        inputElement.addEventListener('keydown', async (event) => {
          if (event.key === 'Enter') {
            const command = inputElement.value;
            terminal.removeChild(inputElement);
            terminal.innerHTML += command + '<br>';
            await this.runPythonCommand(command);
            terminal.innerHTML += '>>> ';
            this.createInputElement();
          }
        });
      },

      async runPythonCommand(command) {
        const terminal = document.getElementById('python-terminal');
        try {
          const result = await this.pyodide.runPythonAsync(`
            import sys
            from io import StringIO
            old_stdout = sys.stdout
            sys.stdout = mystdout = StringIO()
            ${command}
            sys.stdout = old_stdout
            mystdout.getvalue()
          `);
          if (result !== undefined && result.trim() !== '') {
            terminal.innerHTML += result.toString() + '<br>';
          } else {
            const variableName = command.trim();
            if (variableName && !variableName.includes(' ')) {
              const variableValue = await this.pyodide.runPythonAsync(`str(${variableName})`);
              if (variableValue !== undefined) {
                terminal.innerHTML += variableValue.toString() + '<br>';
              }
            }
          }
        } catch (error) {
          terminal.innerHTML += error.toString() + '<br>';
        }
        this.createInputElement();
      },
      async runCode(code) {
        if (!this.pyodide) {
          await this.loadPyodide();
        }
        
       
      }
    },
  }
  </script>