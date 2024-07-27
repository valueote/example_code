<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center">
    <transition name="fade" mode="out-in">
      <Login v-if="currentView === 'login'" @login-success="onLoginSuccess" @show-register="showRegister" />
      <Register v-else-if="currentView === 'register'" @show-login="showLogin" />
      <ChatInterface v-else @logout="logout" />
    </transition>
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
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css');

@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: 'Inter', sans-serif;
  background-color: #f7fafc;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>