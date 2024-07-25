<template>
  <div>
    <h1>AI Chat Login</h1>
    <input type="text" v-model="username" placeholder="Username" required>
    <input type="password" v-model="password" placeholder="Password" required>
    <button @click="login">Login</button>
    <div class="switch-form">
      <a href="#" @click.prevent="$emit('show-register')">Don't have an account? Register</a>
    </div>
  </div>
</template>

<script>
export default {
  name:'LoginForm',
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    login() {
      fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: this.username, password: this.password }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.message === "登录成功") {
            this.$emit('login-success');
          } else {
            alert(data.message);
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }
};
</script>
