<template>
  <div class="app-container">
    <div class="content-wrapper">
      <transition name="fade" mode="out-in">
        <Login v-if="currentView === 'login'" @login-success="onLoginSuccess" @show-register="showRegister" />
        <Register v-else-if="currentView === 'register'" @show-login="showLogin" />
        <ChatInterface v-else @logout="logout" />
      </transition>
    </div>
  </div>
</template>

<script>
import Login from './components/LoginForm.vue';
import Register from './components/RegisterForm.vue';
import ChatInterface from './components/ChatInterface.vue';

export default {
  name: 'App',
  components: {
    Login,
    Register,
    ChatInterface
  },
  data() {
    return {
      currentView: 'login'
    };
  },
  methods: {
    onLoginSuccess() {
      this.currentView = 'chat';
    },
    showRegister() {
      this.currentView = 'register';
    },
    showLogin() {
      this.currentView = 'login';
    },
    logout() {
      this.currentView = 'login';
    }
  }
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  background-color: #f0f2f5;
}

.app-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.content-wrapper {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

/* 登录和注册表单样式 */
.content-wrapper > div:not(.chat-container) {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  margin-bottom: 24px;
  color: #333;
}

input {
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #1877f2;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #166fe5;
}

.switch-form {
  text-align: center;
  margin-top: 16px;
}

.switch-form a {
  color: #1877f2;
  text-decoration: none;
}

.switch-form a:hover {
  text-decoration: underline;
}

/* 淡入淡出过渡效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>