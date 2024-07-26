<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
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


.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}


body {
  font-family: 'Inter', sans-serif;
  background-color: #f7fafc;
}

.rounded-lg {
  border-radius: 1rem;
}

.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.transition {
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
  transition-duration: 300ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>