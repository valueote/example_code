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
      initialized: false,
      codeBuffer: '',
      isMultiline: false,
      indentLevel: 0
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
        this.loadTerminalPrompt();
      }
    },

    async runPythonInterpreter() {
      await this.$nextTick();
      if (!this.pyodide) {
        await this.loadPyodide();
      }
      this.loadTerminalPrompt();
      this.createInputElement();
    },

    loadTerminalPrompt() {
      const terminal = document.getElementById('python-terminal');
      terminal.innerHTML = 'Python 3.9.5 (default, May 3 2021, 19:12:05)<br>';
      terminal.innerHTML += '[Pyodide] on WebAssembly/JavaScript<br>';
      terminal.innerHTML += 'Type "help", "copyright", "credits" or "license" for more information.<br>';
    },

    createInputElement() {
      const terminal = document.getElementById('python-terminal');
      const promptSpan = document.createElement('span');
      promptSpan.textContent = this.isMultiline ? '... ' : '>>> ';
      terminal.appendChild(promptSpan);

      const inputElement = document.createElement('input');
      inputElement.type = 'text';
      inputElement.style.background = 'transparent';
      inputElement.style.border = 'none';
      inputElement.style.outline = 'none';
      inputElement.style.color = 'white';
      inputElement.style.width = '95%';
      terminal.appendChild(inputElement);
      inputElement.focus();

      inputElement.addEventListener('keydown', async (event) => {
        if (event.key === 'Enter') {
          const command = inputElement.value;
          terminal.removeChild(inputElement);
          terminal.removeChild(promptSpan);
          terminal.innerHTML += `${promptSpan.textContent}${command}<br>`;
          await this.handleCommand(command);
        } else if (event.key === 'Tab') {
          event.preventDefault();
          const start = inputElement.selectionStart;
          const end = inputElement.selectionEnd;
          inputElement.value = inputElement.value.substring(0, start) + '    ' + inputElement.value.substring(end);
          inputElement.selectionStart = inputElement.selectionEnd = start + 4;
        }
      });
    },

    async handleCommand(command) {
      if (command.trim() === '' && this.isMultiline) {
        await this.runPythonCommand(this.codeBuffer);
        this.isMultiline = false;
        this.indentLevel = 0;
        this.codeBuffer = '';
      } else if (command.trim() === '') {
        this.createInputElement();
        return;
      }

      if (this.isMultiline) {
        this.codeBuffer += '    '.repeat(this.indentLevel) + command + '\n';
        if (command.trim().endsWith(':')) {
          this.indentLevel++;
        } else if (command.trim() === 'return' || command.trim().startsWith('break') || command.trim().startsWith('continue')) {
          this.indentLevel = Math.max(0, this.indentLevel - 1);
        }
      } else {
        if (command.trim().endsWith(':')) {
          this.isMultiline = true;
          this.indentLevel = 1;
          this.codeBuffer = command + '\n';
        } else {
          await this.runPythonCommand(command);
        }
      }

      this.createInputElement();
    },

    async runPythonCommand(command) {
      const terminal = document.getElementById('python-terminal');
      try {
        const processedCommand = this.processIndentation(command);
        const result = await this.pyodide.runPythonAsync(`
          import sys
          from io import StringIO
          old_stdout = sys.stdout
          sys.stdout = mystdout = StringIO()
          try:
              exec(${JSON.stringify(processedCommand)})
          except Exception as e:
              print(str(e))
          sys.stdout = old_stdout
          mystdout.getvalue()
        `);
        if (result !== undefined && result.trim() !== '') {
          terminal.innerHTML += result + '<br>';
        }
      } catch (error) {
        terminal.innerHTML += error.toString() + '<br>';
      }
    },

    processIndentation(code) {
      return code.replace(/\t/g, '    ');
    },

    async runCode(code) {
      if (!this.pyodide) {
        await this.loadPyodide();
      }
      await this.runPythonCommand(code);
      this.createInputElement();
    }
  },
  mounted() {
    this.runPythonInterpreter();
  }
}
</script>