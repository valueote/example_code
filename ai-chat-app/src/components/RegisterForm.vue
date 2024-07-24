<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-96">
      <h1 class="text-2xl font-bold mb-6 text-center">Register</h1>
      <input type="text" v-model="username" placeholder="Username" required class="w-full px-4 py-2 mb-4 border border-gray-300 rounded">
      <input type="password" v-model="password" placeholder="Password" required class="w-full px-4 py-2 mb-4 border border-gray-300 rounded">
      <button @click="register" class="w-full px-4 py-2 bg-blue-500 text-white rounded">Register</button>
      <div class="text-center mt-4">
        <router-link to="/login" class="text-blue-500">Already have an account? Login</router-link>
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
    register() {
      fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: this.username, password: this.password }),
      })
      .then(response => response.json())
      .then(data => {
        alert(data.message);
        if (data.message === "注册成功") {
          this.$router.push({ name: 'Login' });
        }
      })
      .catch(error => console.error('Error:', error));
    },
  },
};
</script>