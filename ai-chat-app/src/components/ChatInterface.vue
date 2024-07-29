<template>
  <div class="flex h-screen w-screen bg-gray-50">
    <!-- 侧边栏 -->
    <transition name="slide-fade-show">
      <div v-show="showSidebar" class="w-1/5 bg-white border-r border-gray-200 flex flex-col">
        <!-- 新建对话按钮 -->
        <div class="p-4">
          <button @click="newConversation" class="w-full bg-gray-100 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-200 transition duration-300 flex items-center justify-center">
            <i class="fas fa-plus mr-2"></i> New Chat
          </button>
        </div>
        
        <!-- 对话列表 -->
        <div class="flex-1 overflow-y-auto">
          <transition-group name="conversation">
            <div v-for="(conversation, index) in conversations" :key="index" 
                class="p-3 hover:bg-gray-100 cursor-pointer transition duration-300 flex items-center justify-between mb-2 mx-2 rounded-lg"
                :class="{ 'bg-gray-200': currentConversationIndex === index }"
                @click="switchConversation(index)" :disabled="isLoading">
              <div class="flex items-center flex-grow">
                <i class="far fa-comment-alt mr-3"></i>
                <span class="text-sm">{{ conversation.title || `Chat ${index + 1}` }}</span>
              </div>
              <button @click.stop="deleteConversation(index)" class="text-red-500 hover:text-red-700">
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </transition-group>
        </div>
        
        <!-- 用户信息和设置 -->
        <div class="p-4 border-t border-gray-200 flex items-center justify-between">
          <button @click="openSettings" class="text-left py-2 px-4 rounded-md hover:bg-gray-100 transition duration-300 flex items-center text-sm">
            <i class="fas fa-cog mr-2"></i> Settings
          </button>
          <button @click="toggleSidebar" class="p-2 rounded-full hover:bg-gray-100 transition duration-300">
            <i class="fas fa-chevron-left"></i>
          </button>
        </div>
      </div>
    </transition>

    <!-- 主聊天界面 -->
    <div class="flex-1 flex flex-col" :class="{ 'w-full': !showSidebar, 'w-4/5': showSidebar }">
      <!-- 聊天消息区域 -->
      <div class="flex-1 overflow-y-auto px-4 py-6" ref="chatMessages">
        <transition-group name="message-fade" tag="div">
          <div v-for="(message, index) in messages" :key="index" class="mb-6">
            <ChatMessageComponent :message="message" />
          </div>
        </transition-group>
      </div>
      
      <!-- 输入区域 -->
      <div class="border-t border-gray-200 p-4">
        <div class="flex items-center bg-white rounded-lg shadow-sm">
          <!-- 侧边栏切换按钮 -->
          <button @click="toggleSidebar" v-if="!showSidebar" class="p-2 text-gray-500" :class="{ 'transform rotate-180': !showSidebar }">
              <i class="fas fa-chevron-left"></i>
          </button>
          
          <textarea v-model="userInput" @keyup.enter="sendMessage" placeholder="Send a message..."
                    class="flex-1 px-4 py-2 focus:outline-none resize-none" rows="1"></textarea>
          <button @click="sendMessage" class="p-2 text-gray-500 hover:text-gray-700">
            <i class="fas fa-paper-plane"></i>
          </button>
          <input type="file" ref="fileInput" @change="handleFileUpload" multiple style="display: none;">
          <button @click="$refs.fileInput.click()" class="p-2 text-gray-500 hover:text-gray-700">
            <i class="fas fa-paperclip"></i>
          </button>
        </div>
        <div class="text-xs text-gray-500 mt-2 text-center">
          ChatGPT may produce inaccurate information about people, places, or facts.
        </div>
      </div>
    </div>

    <!-- 设置页面 -->
    <div v-if="showSettings" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div class="bg-white p-5 rounded-lg shadow-xl w-1/3">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold">Settings</h2>
          <button @click="closeSettings" class="text-gray-500 hover:text-gray-700">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="space-y-4">
          <button @click="logout" class="w-full bg-gray-100 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-200 transition duration-300 flex items-center justify-center">
            <i class="fas fa-sign-out-alt mr-2"></i> Log out
          </button>
          <button @click="runPythonInterpreter" class="w-full bg-gray-100 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-200 transition duration-300 flex items-center justify-center">
            <i class="fas fa-code mr-2"></i> Run Python Interpreter
          </button>
          <!-- 添加C语言编译器按钮 -->
          <button @click="showCCompiler = true" class="w-full bg-gray-100 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-200 transition duration-300 flex items-center justify-center">
            <i class="fas fa-code mr-2"></i> Run C Compiler
          </button>
        </div>
      </div>
    </div>

    <!-- Python解释器 -->
    <PythonInterpreter 
      :show="showPythonInterpreter" 
      @close="closePythonInterpreter"
      ref="pythonInterpreter"
    />

    <!-- C语言编译器 -->
    <CCompiler :visible="showCCompiler" @close="showCCompiler = false" />
  </div>
</template>

<script>
import axios from 'axios';
import ChatMessageComponent from './ChatMessageComponent.vue';
import PythonInterpreter from './PythonInterpreter.vue';
import CCompiler from './CCompiler.vue'; // 引入CCompiler组件

export default {
  name: 'ChatInterface',
  data() {
    return {
      messages: [], // 存储消息的数组
      userInput: '', // 用户输入的消息
      conversations: [], // 存储会话的数组
      currentConversationIndex: 0, // 当前会话的索引
      showPythonInterpreter: false,
      showSidebar: true,
      showSettings: false,
      isLoading: false, // 是否正在加载消息
      showCCompiler: false, // 控制C语言编译器显示
    };
  },
  
  provide() {
    return {
      runPythonCode: this.runPythonCode,
      showPythonInterpreter: () => this.showPythonInterpreter
    };
  },

  components: {
    ChatMessageComponent,
    PythonInterpreter,
    CCompiler, // 注册CCompiler组件
  },
  mounted() {
    // 组件挂载时加载聊天历史记录并滚动到底部
    this.loadConversations();
    this.scrollToBottom();
  },
  methods: {
    async sendMessage() {
      // 如果用户输入为空，则不发送消息
      if (this.userInput.trim() === '') return;
      
      // 创建用户消息对象并添加到消息数组中
      const userMessage = { sender: 'user', content: this.userInput };
      this.messages.push(userMessage);
      this.userInput = '';
      this.scrollToBottom();

      this.isLoading = true;
      try {
        // 发送用户消息到后端
        const response = await fetch('/ask', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question: userMessage.content }),
        });

        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let aiResponse = '';
        // 持续读取后端返回的流数据
        // eslint-disable-next-line
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value);
          aiResponse += chunk;
          this.updateLastAIMessage(aiResponse);
        }

      } catch (error) {
        console.error('Error:', error);
      } finally {
        this.isLoading = false;
        // 更新当前会话的消息数组
        this.conversations[this.currentConversationIndex] = [...this.messages];
        this.scrollToBottom();
      }
    },
    updateLastAIMessage(content) {
      // 更新最后一条AI消息的内容
      const lastMessage = this.messages[this.messages.length - 1];
      if (lastMessage.sender === 'ai') {
        lastMessage.content = content;
      } else {
        this.messages.push({ sender: 'ai', content: content });
      }
    },
    scrollToBottom() {
      // 滚动到聊天消息的底部
      this.$nextTick(() => {
        const chatMessages = this.$refs.chatMessages;
        chatMessages.scrollTop = chatMessages.scrollHeight;
      });
    },
    logout() {
      // 用户登出
      axios.get('/logout')
        .then(() => {
          this.$emit('logout');
        })
        .catch(error => {
          console.error('Logout error:', error);
        });
    },
    async loadChatHistory() {
      // 加载聊天历史记录
      try {
        // 发送GET请求到'/get_chat_history'端点以获取聊天历史记录
        const response = await axios.get('/get_chat_history');
        // 将获取到的聊天历史记录赋值给messages数组
        this.messages = response.data.chat_history;
        // 将messages数组复制到conversations数组的第一个元素
        this.conversations[0] = [...this.messages];
      } catch (error) {
        // 如果加载聊天历史记录时发生错误，打印错误信息
        console.error('Error loading chat history:', error);
      }
    },


    async loadConversations() {
      try {
        const response = await axios.get('/get_conversations');
        this.conversations = response.data.conversations;
        console.log('Conversations:', this.conversations);
        
        // 如果有对话，自动切换到第一个对话
        if (this.conversations.length > 0) {
          await this.switchConversation(0);
        }
      } catch (error) {
        console.error('Error loading conversations:', error);
      }
    },

    async newConversation() {
      // 创建新会话
      try {
        // 发送POST请求到'/new_conversation'端点以创建新会话
        const response = await axios.post('/new_conversation');
        // 将新会话的编号添加到conversations数组
        this.conversations.push(response.data.history_num);
        // 切换到新会话
        console.log('num conunt', response.data.history_num);
        this.switchConversation(response.data.history_num);
      } catch (error) {
        // 如果创建新会话时发生错误，打印错误信息
        console.error('Error creating new conversation:', error);
      }
    },

    async switchConversation(index) {
      if (this.currentConversationIndex === index && this.messages.length > 0) return;
      console.log("switch form", this.currentConversationIndex)
      console.log("switch to", index)
      this.currentConversationIndex = index;
      this.isLoading = true;
      
      try {
        const response = await axios.post('/switch_conversation', { history_num: index });
        if (response.data.chat_history) {
          this.messages = response.data.chat_history.map(message => ({
            sender: message.type === 'HumanMessage' ? 'user' : 'ai',
            content: message.content
          }));
        } else {
          this.messages = [];
        }
        this.$nextTick(() => {
          this.scrollToBottom();
          this.forceUpdateMessages(); // 强制重新渲染消息组件
        });
      } catch (error) {
        console.error('Error switching conversation:', error);
      } finally {
        this.isLoading = false;
      }
    },
    forceUpdateMessages() {
      this.messages = this.messages.map(message => ({ ...message }));
    },

    async getConversations() {
      // 获取所有会话
      try {
        // 发送GET请求到'/get_conversations'端点以获取所有会话
        const response = await axios.get('/get_conversations');
        // 将获取到的会话赋值给conversations数组
        this.conversations = response.data.conversations;
      } catch (error) {
        // 如果获取会话时发生错误，打印错误信息
        console.error('Error fetching conversations:', error);
      }
    },
    async handleFileUpload() {
      const files = this.$refs.fileInput.files;
      if (files.length === 0) return;

      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }

      try {
        const response = await axios.post('/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        console.log(response.data.message);
        this.messages.push({ sender: 'system', content: 'Files uploaded successfully' });
      } catch (error) {
        console.error('Error uploading files:', error);
        this.messages.push({ sender: 'system', content: 'File upload failed' });
      }
    },
    async deleteConversation(index) {
      try {
        await axios.post('/delete_conversation', { history_num: index });
        
        this.conversations.splice(index, 1);
        this.getConversations();
        if(index === 0 && this.currentConversationIndex === 0){
          if(this.conversations.length >= 1){
            this.currentConversationIndex = 1;
            this.switchConversation(0)
          }
        }else if(index === 0 && this.currentConversationIndex != 0){
          this.switchConversation(0)
        }

        // 如果删除的是当前对话，切换到第一个对话或清空消息
        if (index === this.currentConversationIndex) {
          if (this.conversations.length > 1) {
            this.switchConversation(0);
          } else {
            this.messages = [];
            this.currentConversationIndex = 0;
          }
        }
        // 如果删除的对话在当前对话之前，更新当前对话索引
        else if (index < this.currentConversationIndex) {
          this.currentConversationIndex--;
        }
      } catch (error) {
        console.error('Error deleting conversation:', error);
      }
    },
    toggleSidebar() {
      if (!this.showSidebar) {
        // 显示侧边栏时，使用 Vue 的 nextTick 来确保 DOM 更新后再设置 showSidebar
        this.$nextTick(() => {
          this.showSidebar = true;
        });
      } else {
        // 隐藏侧边栏时，立即设置 showSidebar 为 false
        this.showSidebar = false;
      }
    },
    openSettings() {
      this.showSettings = true;
    },
    closeSettings() {
      this.showSettings = false;
    },
    
    runPythonInterpreter() {
      this.showPythonInterpreter = true;
      this.$nextTick(() => {
        this.$refs.pythonInterpreter.runPythonInterpreter();
      });
    },

    runPythonCode(code) {
      this.showPythonInterpreter = true;
      this.$nextTick(() => {
        this.$refs.pythonInterpreter.runCode(code);
      });
    },
        
    closePythonInterpreter(){
      this.showPythonInterpreter = false;
    }
  }
  
};
</script>


<style scoped>
html, body {
  height: 100%;
  margin: 0;
}

.flex-1.flex.flex-col {
  transition: width 0.3s ease;
}

button {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

button:active {
  transform: translateY(0);
  box-shadow: none;
}

/* Animation for messages when switching conversations */
.message-fade-enter-active,
.message-fade-leave-active {
  transition: all 0.5s ease;
}

.message-fade-enter-from,
.message-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Animation for conversation items in the sidebar */
.conversation-enter-active,
.conversation-leave-active {
  transition: all 0.3s ease-out;
}

.conversation-enter-from,
.conversation-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.slide-fade-show-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-show-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}

</style>