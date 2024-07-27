<template>
    <transition name="fade">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 class="text-2xl font-semibold text-center mb-6">Create your account</h1>
        <input type="text" v-model="username" placeholder="Email address" required
              class="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400">
        <input type="password" v-model="password" placeholder="Password" required
              class="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400">
        <button @click="register" class="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 transition duration-300">
          Sign up
        </button>
        <div class="text-center mt-4">
          <a href="#" @click.prevent="$emit('show-login')" class="text-gray-600 hover:underline">
            Already have an account? Log in
          </a>
        </div>
      </div>
  </transition>
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


.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

input, button {
  transition: all 0.3s ease;
}

input:focus {
  transform: scale(1.02);
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

button:active {
  transform: translateY(0);
  box-shadow: none;
}

</style>