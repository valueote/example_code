<template>
  <transition name="fade">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md anime-bg">
      <h1 class="text-3xl font-bold text-center mb-6 anime-title">Join Our Anime World!</h1>
      <input type="text" v-model="username" placeholder="Email address" required
            class="w-full px-4 py-2 mb-4 border-2 border-purple-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400 anime-input">
      <input type="password" v-model="password" placeholder="Password" required
            class="w-full px-4 py-2 mb-4 border-2 border-purple-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400 anime-input">
      <button @click="register" class="w-full bg-purple-500 text-white py-2 rounded-full hover:bg-purple-600 transition duration-300 anime-button">
        Sign up
      </button>
      <div class="text-center mt-4">
        <a href="#" @click.prevent="$emit('show-login')" class="text-purple-600 hover:underline anime-link">
          Already part of our crew? Log in!
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
@import url('https://fonts.googleapis.com/css2?family=Bangers&family=Varela+Round&display=swap');

.anime-bg {
  background-image: url('https://example.com/anime-background-2.jpg');
  background-size: cover;
  background-position: center;
}

.anime-title {
  font-family: 'Bangers', cursive;
  color: #8A2BE2;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
}

.anime-input {
  font-family: 'Varela Round', sans-serif;
}

.anime-button {
  font-family: 'Bangers', cursive;
  letter-spacing: 1px;
  font-size: 1.2em;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
}

.anime-link {
  font-family: 'Varela Round', sans-serif;
  color: #8A2BE2;
}

@keyframes pulseAnimation {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.anime-button:hover {
  animation: pulseAnimation 2s ease-in-out infinite;
}

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

button:active {
  transform: translateY(0);
  box-shadow: none;
}
</style>
