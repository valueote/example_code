<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-96">
      <h1 class="text-2xl font-bold mb-6 text-center">AI Chat Login</h1>
      <input type="text" v-model="username" placeholder="Username" required class="w-full px-4 py-2 mb-4 border border-gray-300 rounded">
      <input type="password" v-model="password" placeholder="Password" required class="w-full px-4 py-2 mb-4 border border-gray-300 rounded">
      <button @click="login" class="w-full px-4 py-2 bg-blue-500 text-white rounded">Login</button>
      <div class="text-center mt-4">
        <router-link to="/register" class="text-blue-500">Don't have an account? Register</router-link>
      </div>
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
      fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: this.username, password: this.password }),
      })
      .then(response => response.json())
      .then(data => {
        if (data.message === "登录成功") {
          localStorage.setItem('isLoggedIn', 'true');
          this.$router.push({ name: 'Chat' });
        } else {
          alert(data.message);
        }
      })
      .catch(error => console.error('Error:', error));
    },
  },
};
</script>