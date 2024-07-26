<template>
  <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md transform transition-all duration-300 hover:shadow-xl">
    <h1 class="text-2xl font-semibold text-center mb-6 animate-fade-in">Register</h1>
    <input type="text" v-model="username" placeholder="Username" required
           class="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 animate-slide-up">
    <input type="password" v-model="password" placeholder="Password" required
           class="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 animate-slide-up">
    <button @click="register" class="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300 transform hover:-translate-y-1 hover:shadow-md animate-pulse">
      Register
    </button>
    <div class="text-center mt-4 animate-fade-in">
      <a href="#" @click.prevent="$emit('show-login')" class="text-indigo-600 hover:underline font-medium transition-colors duration-300">
        Already have an account? Login
      </a>
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

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
</style>