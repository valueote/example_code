<template>
  <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
    <h1 class="text-2xl font-semibold text-center mb-6">Welcome back</h1>
    <input type="text" v-model="username" placeholder="Email address" required
           class="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400">
    <input type="password" v-model="password" placeholder="Password" required
           class="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400">
    <button @click="login" class="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 transition duration-300">
      Log in
    </button>
    <div class="text-center mt-4">
      <a href="#" @click.prevent="$emit('show-register')" class="text-gray-600 hover:underline">
        Don't have an account? Sign up
      </a>
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

<style scoped>

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}


.animate-slide-up {
  animation: slideUp 0.5s ease-out;
}


</style>