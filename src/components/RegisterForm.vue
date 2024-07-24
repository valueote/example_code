<template>
    <div>
      <h1>Register</h1>
      <input type="text" v-model="username" placeholder="Username" required>
      <input type="password" v-model="password" placeholder="Password" required>
      <button @click="register">Register</button>
      <div>
        <a href="#" @click="showLoginForm">Already have an account? Login</a>
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
      register() {
        this.$store.dispatch('register', { username: this.username, password: this.password }).then(response => {
          alert(response.data.message);
          if (response.data.message === "注册成功") {
            this.$router.push('/login');
          }
        });
      },
      showLoginForm() {
        this.$router.push('/login');
      },
    },
  };
  </script>