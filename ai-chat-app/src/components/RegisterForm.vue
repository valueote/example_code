<template>
  <div>
    <h1>Register</h1>
    <input type="text" v-model="username" placeholder="Username" required>
    <input type="password" v-model="password" placeholder="Password" required>
    <button @click="register">Register</button>
    <div class="switch-form">
      <a href="#" @click.prevent="$emit('show-login')">Already have an account? Login</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterForm',
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    register() {
      fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: this.username, password: this.password }),
      })
        .then(response => response.json())
        .then(data => {
          alert(data.message);
          if (data.message === "注册成功") {
            this.$emit('show-login');
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }
};
</script>
