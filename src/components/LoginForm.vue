<template>
    <div>
      <h1>AI Chat Login</h1>
      <input type="text" v-model="username" placeholder="Username" required>
      <input type="password" v-model="password" placeholder="Password" required>
      <button @click="login">Login</button>
      <div>
        <a href="#" @click="showRegisterForm">Don't have an account? Register</a>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      login() {
        this.$store.dispatch('login', { username: this.username, password: this.password }).then(response => {
          if (response.data.message === "登录成功") {
            this.$router.push('/chat');
            this.$store.dispatch('loadChatHistory');
          } else {
            alert(response.data.message);
          }
        });
      },
      showRegisterForm() {
        this.$router.push('/register');
      },
    },
  };
  </script>