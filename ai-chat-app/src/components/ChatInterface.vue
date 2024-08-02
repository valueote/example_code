<template>
  <div class="flex h-screen w-screen bg-airou-cream">
    <!-- 侧边栏 -->
    <transition name="slide-fade-show">
      <div v-show="showSidebar" class="w-1/5 bg-airou-light-brown border-r border-airou-brown flex flex-col rounded-r-xl shadow-lg">
        <!-- 新建对话按钮 -->
        <div class="p-4">
          <button @click="newConversation" class="w-full bg-airou-yellow text-airou-brown py-2 px-4 rounded-full hover:bg-airou-orange transition duration-300 flex items-center justify-center airou-button">
            <i class="fas fa-paw mr-2"></i> New Meow-venture
          </button>
        </div>
        
        <!-- 对话列表 -->
        <div class="flex-1 overflow-y-auto">
          <transition-group name="conversation" tag="div">
            <div v-for="(conversation, index) in conversations" :key="conversation.history_num" 
                class="p-3 hover:bg-airou-light-green cursor-pointer transition duration-300 flex items-center justify-between mb-2 mx-2 rounded-xl conversation-item"
                :class="{ 'bg-airou-brown text-white': currentConversationIndex === conversation.history_num }"
                @click="switchConversation(conversation.history_num)" 
                :disabled="isLoading"
                :style="{ '--i': index }">
              <div class="flex items-center flex-grow">
                <i class="fas fa-paw mr-3"></i>
                <span class="text-sm">{{ conversation.title || 'New Meow-venture' }}</span>
              </div>
              <button @click.stop="deleteConversation(conversation.history_num)" class="text-red-400 hover:text-red-600">
                <i class="fas fa-times"></i>
              </button>
            </div>
          </transition-group>
        </div>
        
        <!-- 用户信息和设置 -->
        <div class="p-4 border-t border-airou-brown flex items-center justify-between">
          <button @click="openSettings" class="text-left py-2 px-4 rounded-full hover:bg-airou-yellow transition duration-300 flex items-center text-sm airou-button">
            <i class="fas fa-cat mr-2"></i> Paw-settings
          </button>
          <button @click="toggleSidebar" class="p-2 rounded-full hover:bg-airou-yellow transition duration-300">
            <i class="fas fa-chevron-left"></i>
          </button>
        </div>
      </div>
    </transition>

    <!-- 主聊天界面 -->
    <div class="flex-1 flex flex-col" :class="{ 'w-full': !showSidebar, 'w-4/5': showSidebar }">
      <!-- 聊天消息区域 -->
      <div class="flex-1 overflow-y-auto px-4 py-6 bg-airou-light-cream" ref="chatMessages">
        <transition-group name="message-fade" tag="div">
          <div v-for="(message, index) in messages" :key="index" class="mb-6">
            <ChatMessageComponent :message="message" />
          </div>
        </transition-group>
      </div>
      
      <!-- 输入区域 -->
      <div class="border-t border-airou-brown p-4 bg-airou-light-brown">
        <div class="flex items-center bg-white rounded-full shadow-md">
          <!-- 侧边栏切换按钮 -->
          <button @click="toggleSidebar" v-if="!showSidebar" class="p-2 text-airou-brown" :class="{ 'transform rotate-180': !showSidebar }">
              <i class="fas fa-paw"></i>
          </button>
          
          <textarea v-model="userInput" @keyup.enter="sendMessage" placeholder="Meow your thoughts..."
                    class="flex-1 px-4 py-2 focus:outline-none resize-none rounded-full" rows="1"></textarea>
          <button @click="sendMessage" class="p-2 text-airou-brown hover:text-airou-orange">
            <i class="fas fa-paper-plane"></i>
          </button>
          <input type="file" ref="fileInput" @change="handleFileUpload" multiple style="display: none;">
          <button @click="$refs.fileInput.click()" class="p-2 text-airou-brown hover:text-airou-orange">
            <i class="fas fa-paperclip"></i>
          </button>
        </div>
        <div class="text-xs text-airou-brown mt-2 text-center">
          Airou may produce unexpected purrs. Use with caution!
        </div>
      </div>
    </div>

    <!-- 设置页面 -->
    <div v-if="showSettings" class="fixed inset-0 bg-airou-brown bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div class="bg-airou-light-cream p-5 rounded-xl shadow-xl w-1/3">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-airou-brown">Paw-settings</h2>
          <button @click="closeSettings" class="text-airou-brown hover:text-airou-orange">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="space-y-4">
          <button @click="logout" class="w-full bg-airou-pink text-airou-brown py-2 px-4 rounded-full hover:bg-airou-orange transition duration-300 flex items-center justify-center airou-button">
            <i class="fas fa-paw mr-2"></i> Cat-ch you later
          </button>
          <button @click="runPythonInterpreter" class="w-full bg-airou-light-green text-airou-brown py-2 px-4 rounded-full hover:bg-airou-yellow transition duration-300 flex items-center justify-center airou-button">
            <i class="fas fa-fish mr-2"></i> Python Purr-preter
          </button>
          <button @click="showCCompiler = true" class="w-full bg-airou-light-blue text-airou-brown py-2 px-4 rounded-full hover:bg-airou-yellow transition duration-300 flex items-center justify-center airou-button">
            <i class="fas fa-paw mr-2"></i> C Whisker Spells
          </button>
          <button @click="showCppCompiler = true" class="w-full bg-airou-orange text-airou-brown py-2 px-4 rounded-full hover:bg-airou-yellow transition duration-300 flex items-center justify-center airou-button">
            <i class="fas fa-fish mr-2"></i> C++ Compiler
          </button>
          <button @click="showJavaCompiler = true" class="w-full bg-airou-yellow text-airou-brown py-2 px-4 rounded-full hover:bg-airou-orange transition duration-300 flex items-center justify-center airou-button">
            <i class="fas fa-cat mr-2"></i> Java Compiler
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

    <!-- C Compiler -->
    <CCompiler :visible="showCCompiler" @close="showCCompiler = false" />
    <!--Cpp Compiler-->
    <CppCompiler :visible="showCppCompiler" @close="showCppCompiler = false"/>
    <JavaCompiler :visible="showJavaCompiler" @close="showJavaCompiler = false" />

  </div>
</template>

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

.slide-fade-show-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-show-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}

/* New styles for staggered entry of conversation items */
.conversation-move {
  transition: transform 0.5s;
}

.conversation-enter-active {
  transition: all 0.5s ease-out;
  transition-delay: calc(0.1s * var(--i));
}

/* 更丰富的色彩方案 */
.bg-airou-cream { background-color: #FFF9E6; }
.bg-airou-light-brown { background-color: #E6C9A8; }
.bg-airou-brown { background-color: #A67B5B; }
.bg-airou-yellow { background-color: #FFE156; }
.bg-airou-orange { background-color: #FFA94D; }
.bg-airou-light-green { background-color: #A8E6CF; }
.bg-airou-light-cream { background-color: #FFFAF0; }
.bg-airou-pink { background-color: #FFD3E0; }
.bg-airou-light-blue { background-color: #A8D8EA; }

.text-airou-brown { color: #8B4513; }
.text-airou-orange { color: #FFA94D; }

.airou-button {
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.airou-button:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

.airou-button:active {
  transform: translateY(-1px) scale(1.02);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}




@keyframes bounceIn {
  0% { transform: scale(0.9); opacity: 0; }
  70% { transform: scale(1.1); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
}

.message-fade-enter-active {
  animation: bounceIn 0.5s;
}

/* 添加毛茸茸的边框效果 */
.rounded-xl {
  position: relative;
  overflow: hidden;
}

.rounded-xl::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: 
    radial-gradient(circle at 100% 100%, transparent 8px, #A67B5B 9px, #A67B5B 10px, transparent 11px) 100% 100% / 14px 14px,
    radial-gradient(circle at 0 100%, transparent 8px, #A67B5B 9px, #A67B5B 10px, transparent 11px) 0 100% / 14px 14px,
    radial-gradient(circle at 100% 0, transparent 8px, #A67B5B 9px, #A67B5B 10px, transparent 11px) 100% 0 / 14px 14px,
    radial-gradient(circle at 0 0, transparent 8px, #A67B5B 9px, #A67B5B 10px, transparent 11px) 0 0 / 14px 14px;
  background-repeat: no-repeat;
  border-radius: 14px;
  z-index: -1;
}

/* 添加可爱的阴影效果 */
.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(166, 123, 91, 0.1), 0 4px 6px -2px rgba(166, 123, 91, 0.05);
}

/* 添加可爱的过渡效果 */
.transition {
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* 添加鼠标悬停时的可爱效果 */
.hover\:bg-airou-yellow:hover {
  background-color: #FFE156;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* 添加轻微的缩放效果 */
.scale-on-hover {
  transition: transform 0.3s ease;
}

.scale-on-hover:hover {
  transform: scale(1.05);
}
</style>

<script>
import axios from 'axios';
import ChatMessageComponent from './ChatMessageComponent.vue';
import PythonInterpreter from './PythonInterpreter.vue';
import CCompiler from './CCompiler.vue'; // 引入CCompiler组件
import {reactive } from 'vue';
import CppCompiler from './CppCompiler.vue';
import JavaCompiler from './JavaCompiler.vue';

export default {
  name: 'ChatInterface',
  data() {
    return {
      messages: [], // 存储消息的数组
      userInput: '', // 用户输入的消息
      conversations: reactive([]), // 存储会话的数组
      currentConversationIndex: 0, // 当前会话的索引
      isLoading: false, // 是否正在加载消息
      
      showPythonInterpreter: false,
      showSidebar: true,
      showSettings: false,
      showCCompiler: false, // 控制C语言编译器显示
      showCppCompiler: false,
      showJavaCompiler: false,
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
    CppCompiler,
    JavaCompiler,
  },
  mounted() {
    // 组件挂载时加载聊天历史记录并滚动到底部
    this.loadConversations();
    this.scrollToBottom();
  },
  methods: {
    async sendMessage() {
  if (this.userInput.trim() === '') return;
  
  const userMessage = { sender: 'user', content: this.userInput };
  this.messages.push(userMessage);
  this.userInput = '';
  this.scrollToBottom();

  this.isLoading = true;
  try {
    const response = await fetch('/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: userMessage.content }),
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let aiResponse = '';
    // eslint-disable-next-line
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      aiResponse += chunk;
      this.updateLastAIMessage(aiResponse);
      this.forceUpdateMessages();
    }

    // 更新对话标题
    await this.updateConversationTitle();

    this.scrollToBottom();
    this.forceUpdateMessages();
  } catch (error) {
    console.error('Error:', error);
  } finally {
    this.isLoading = false;
  }
},

async updateConversationTitle() {
  try {
    const response = await fetch('/update_conversation_title', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ history_num: this.currentConversationIndex }),
    });

    const data = await response.json();
    const { history_num, new_title } = data;

    const conversationIndex = this.conversations.findIndex(conv => conv.history_num === history_num);
    if (conversationIndex !== -1) {
      // 直接更新 title 属性
      this.conversations[conversationIndex].title = new_title;
    }
    console.log("now coversation", this.conversations[conversationIndex]);
    console.log("now title",this.conversations[conversationIndex].title);
    console.log("new title", this.conversations[conversationIndex].title);
    // 强制更新视图
    this.$forceUpdate();
  } catch (error) {
    console.error('Error updating conversation title:', error);
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
      this.$nextTick(() => {
        this.highlightCodeBlocks();
      });
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
    async loadConversations() {
      try {
        const response = await axios.get('/get_conversations');
        const newConversations = response.data.conversations.map(conversation => ({
          history_num: conversation.history_num,
          title: conversation.name || `New Chat`
        }));
        this.conversations = newConversations;
        
        if (this.conversations.length > 0) {
          // 如果当前选中的对话不在新的对话列表中，切换到第一个对话
          if (!this.conversations.some(conv => conv.history_num === this.currentConversationIndex)) {
            await this.switchConversation(this.conversations[0].history_num);
          } else {
            // 否则，刷新当前对话的消息
            await this.switchConversation(this.currentConversationIndex);
          }
        } else {
          this.messages = [];
          this.currentConversationIndex = null;
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
    // 将新会话的编号和名称添加到conversations数组
    this.conversations.push({
      history_num: response.data.history_num,
      title: '' // 初始化新对话的名称
    });
    // 切换到新会话
    console.log('num count', response.data.history_num);
    this.switchConversation(response.data.history_num);
  } catch (error) {
    // 如果创建新会话时发生错误，打印错误信息
    console.error('Error creating new conversation:', error);
  }
},

async switchConversation(historyNum) {
      if (this.currentConversationIndex === historyNum && this.messages.length > 0) return;
      this.currentConversationIndex = historyNum;
      this.isLoading = true;
      
      try {
        const response = await axios.post('/switch_conversation', { history_num: historyNum });
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
          this.forceUpdateMessages();
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

    async deleteConversation(historyNum) {
      try {
        await axios.post('/delete_conversation', { history_num: historyNum });
        
        const deletedIndex = this.conversations.findIndex(conv => conv.history_num === historyNum);
        this.conversations.splice(deletedIndex, 1);
        this.loadConversations();
        console.log("conversations length",this.conversations.length);
        console.log("delete num",historyNum);

        if (historyNum === this.currentConversationIndex) {
          if (this.conversations.length > 0) {
            if(historyNum === 0){
              this.currentConversationIndex = -1;
              await this.switchConversation(historyNum);
              console.log("deleteConversation hit case 1");
            }else if(historyNum === this.conversations.length){
              await this.switchConversation(historyNum - 1);
              console.log("deleteConversation hit case 2");
            }else{
              this.currentConversationIndex = -1;
              await this.switchConversation(historyNum);
              console.log("deleteConversation hit case 3");
            }
          } else {
            this.messages = [];
            this.currentConversationIndex = -1;
          }
        }else{
          this.switchConversation(this.currentConversationIndex - 1);
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


