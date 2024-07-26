<template>
  <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md transform transition-all duration-300 hover:shadow-xl">
    <h1 class="text-2xl font-semibold text-center mb-6 animate-fade-in">Login</h1>
    <input type="text" v-model="username" placeholder="Username" required
           class="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 animate-slide-up">
    <input type="password" v-model="password" placeholder="Password" required
           class="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 animate-slide-up">
    <button @click="login" class="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300 transform hover:-translate-y-1 hover:shadow-md animate-pulse">
      Login
    </button>
    <div class="text-center mt-4 animate-fade-in">
      <a href="#" @click.prevent="$emit('show-register')" class="text-indigo-600 hover:underline font-medium transition-colors duration-300">
        Don't have an account? Register
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
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}

.animate-slide-up {
  animation: slideUp 0.5s ease-out;
}


</style>