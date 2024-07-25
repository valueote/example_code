<template>
  <div class="app-container">
    <div class="content-wrapper">
      <transition name="fade" mode="out-in">
        <Login v-if="currentView === 'login'" @show-register="currentView = 'register'" @login-success="currentView = 'chat'" />
        <Register v-if="currentView === 'register'" @show-login="currentView = 'login'" />
        <Chat v-if="currentView === 'chat'" @logout="currentView = 'login'" />
      </transition>
    </div>
  </div>
</template>

<script>
import Login from './components/LoginForm.vue';
import Register from './components/RegisterForm.vue';
import Chat from './components/ChatInterface.vue';

export default {
  data() {
    return {
      currentView: 'login'
    };
  },
  components: {
    Login,
    Register,
    Chat
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

body {
  font-family: 'Roboto', sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.app-container {
  width: 100%;
  max-width: 480px;
  padding: 20px;
}

.content-wrapper {
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  padding: 40px;
}

h1 {
  text-align: center;
  color: #4a5568;
  margin-bottom: 30px;
  font-weight: 500;
}

input[type="text"], input[type="password"] {
  width: 100%;
  padding: 12px 16px;
  margin-bottom: 20px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  box-sizing: border-box;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

input[type="text"]:focus, input[type="password"]:focus {
  border-color: #667eea;
  outline: none;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #5a67d8;
}

.switch-form {
  text-align: center;
  margin-top: 20px;
}

.switch-form a {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.switch-form a:hover {
  color: #5a67d8;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>