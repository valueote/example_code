<template>
  <div class="flex h-screen w-screen bg-pastel-pink">
    <!-- 侧边栏 -->
    <transition name="slide-fade-show">
      <div v-show="showSidebar" class="w-1/5 bg-pastel-blue border-r border-pastel-purple flex flex-col rounded-r-xl shadow-lg">
        <!-- 新建对话按钮 -->
        <div class="p-4">
          <button @click="newConversation" class="w-full bg-pastel-yellow text-pastel-purple py-2 px-4 rounded-full hover:bg-pastel-orange transition duration-300 flex items-center justify-center kawaii-button">
            <i class="fas fa-star mr-2"></i> New Adventure
          </button>
        </div>
        
        <!-- 对话列表 -->
        <div class="flex-1 overflow-y-auto">
          <transition-group name="conversation" tag="div">
            <div v-for="(conversation, index) in conversations" :key="conversation.history_num" 
                class="p-3 hover:bg-pastel-green cursor-pointer transition duration-300 flex items-center justify-between mb-2 mx-2 rounded-xl"
                :class="{ 'bg-pastel-purple text-white': currentConversationIndex === conversation.history_num }"
                @click="switchConversation(conversation.history_num)" 
                :disabled="isLoading"
                :style="{ '--i': index }">
              <div class="flex items-center flex-grow">
                <i class="far fa-heart mr-3"></i>
                <span class="text-sm">{{ conversation.title || 'New Adventure' }}</span>
              </div>
              <button @click.stop="deleteConversation(conversation.history_num)" class="text-red-400 hover:text-red-600">
                <i class="fas fa-times"></i>
              </button>
            </div>
          </transition-group>
        </div>
        
        <!-- 用户信息和设置 -->
        <div class="p-4 border-t border-pastel-purple flex items-center justify-between">
          <button @click="openSettings" class="text-left py-2 px-4 rounded-full hover:bg-pastel-yellow transition duration-300 flex items-center text-sm kawaii-button">
            <i class="fas fa-cog mr-2"></i> Settings
          </button>
          <button @click="toggleSidebar" class="p-2 rounded-full hover:bg-pastel-yellow transition duration-300">
            <i class="fas fa-chevron-left"></i>
          </button>
        </div>
      </div>
    </transition>

    <!-- 主聊天界面 -->
    <div class="flex-1 flex flex-col" :class="{ 'w-full': !showSidebar, 'w-4/5': showSidebar }">
      <!-- 聊天消息区域 -->
      <div class="flex-1 overflow-y-auto px-4 py-6 bg-pastel-cream" ref="chatMessages">
        <transition-group name="message-fade" tag="div">
          <div v-for="(message, index) in messages" :key="index" class="mb-6">
            <ChatMessageComponent :message="message" />
          </div>
        </transition-group>
      </div>
      
      <!-- 输入区域 -->
      <div class="border-t border-pastel-purple p-4 bg-pastel-blue">
        <div class="flex items-center bg-white rounded-full shadow-md">
          <!-- 侧边栏切换按钮 -->
          <button @click="toggleSidebar" v-if="!showSidebar" class="p-2 text-pastel-purple" :class="{ 'transform rotate-180': !showSidebar }">
              <i class="fas fa-chevron-left"></i>
          </button>
          
          <textarea v-model="userInput" @keyup.enter="sendMessage" placeholder="Cast your spell..."
                    class="flex-1 px-4 py-2 focus:outline-none resize-none rounded-full" rows="1"></textarea>
          <button @click="sendMessage" class="p-2 text-pastel-purple hover:text-pastel-orange">
            <i class="fas fa-paper-plane"></i>
          </button>
          <input type="file" ref="fileInput" @change="handleFileUpload" multiple style="display: none;">
          <button @click="$refs.fileInput.click()" class="p-2 text-pastel-purple hover:text-pastel-orange">
            <i class="fas fa-paperclip"></i>
          </button>
        </div>
        <div class="text-xs text-pastel-purple mt-2 text-center">
          AI may produce unexpected results. Use with caution!
        </div>
      </div>
    </div>

    <!-- 设置页面 -->
    <div v-if="showSettings" class="fixed inset-0 bg-pastel-purple bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div class="bg-pastel-cream p-5 rounded-xl shadow-xl w-1/3">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-pastel-purple">Settings</h2>
          <button @click="closeSettings" class="text-pastel-purple hover:text-pastel-orange">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="space-y-4">
          <button @click="logout" class="w-full bg-pastel-pink text-pastel-purple py-2 px-4 rounded-full hover:bg-pastel-orange transition duration-300 flex items-center justify-center kawaii-button">
            <i class="fas fa-door-open mr-2"></i> Logout
          </button>
          <button @click="runPythonInterpreter" class="w-full bg-pastel-green text-pastel-purple py-2 px-4 rounded-full hover:bg-pastel-yellow transition duration-300 flex items-center justify-center kawaii-button">
            <i class="fas fa-wand-magic-sparkles mr-2"></i> Run Python Interpreter
          </button>
          <button @click="showCCompiler = true" class="w-full bg-pastel-blue text-pastel-purple py-2 px-4 rounded-full hover:bg-pastel-yellow transition duration-300 flex items-center justify-center kawaii-button">
            <i class="fas fa-hat-wizard mr-2"></i> Invoke C Spells
          </button>
          <button @click="showCppCompiler = true" class="w-full bg-pastel-orange text-pastel-purple py-2 px-4 rounded-full hover:bg-pastel-yellow transition duration-300 flex items-center justify-center kawaii-button">
            <i class="fas fa-wand-sparkles mr-2"></i> Run C++ Compiler
          </button>
          <button @click="showJavaCompiler = true" class="w-full bg-pastel-yellow text-pastel-purple py-2 px-4 rounded-full hover:bg-pastel-orange transition duration-300 flex items-center justify-center kawaii-button">
            <i class="fas fa-mug-hot mr-2"></i> Run Java Compiler
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



.bg-pastel-pink { background-color: #FFD1DC; }
.bg-pastel-blue { background-color: #A2D2FF; }
.bg-pastel-purple { background-color: #B39DDB; }
.bg-pastel-yellow { background-color: #FDFD96; }
.bg-pastel-orange { background-color: #FFB347; }
.bg-pastel-green { background-color: #B5EAD7; }
.bg-pastel-cream { background-color: #FEFAE0; }

.text-pastel-purple { color: #B39DDB; }
.text-pastel-orange { color: #FFB347; }

.kawaii-button {
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.kawaii-button:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

.kawaii-button:active {
  transform: translateY(-1px) scale(1.02);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

.conversation > div {
  animation: float 4s ease-in-out infinite;
  animation-delay: calc(var(--i) * 0.2s);
}

/* 为消息添加可爱的动画 */
.message-fade-enter-active {
  animation: bounceIn 0.5s;
}

@keyframes bounceIn {
  0% { transform: scale(0.9); opacity: 0; }
  70% { transform: scale(1.1); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
}
</style>