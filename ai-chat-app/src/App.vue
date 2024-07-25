<template>
  <div class="container">
    <Login v-if="currentView === 'login'" @show-register="currentView = 'register'" @login-success="currentView = 'chat'" />
    <Register v-if="currentView === 'register'" @show-login="currentView = 'login'" />
    <Chat v-if="currentView === 'chat'" @logout="currentView = 'login'" />
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
body {
  font-family: Arial, sans-serif;
  background-color: #f0f2f5;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 800px;
  padding: 40px;
}
h1 {
  text-align: center;
  color: #1877f2;
  margin-bottom: 30px;
}
input[type="text"], input[type="password"] {
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #dddfe2;
  border-radius: 6px;
  box-sizing: border-box;
}
button {
  padding: 12px;
  background-color: #1877f2;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
}
button:hover {
  background-color: #166fe5;
}
.switch-form {
  text-align: center;
  margin-top: 20px;
}
.switch-form a {
  color: #1877f2;
  text-decoration: none;
}
</style>