<template>
  <transition name="fade">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md anime-bg">
      <h1 class="text-3xl font-bold text-center mb-6 anime-title">Welcome back, Senpai!</h1>
      <input type="text" v-model="username" placeholder="Email address" required
            class="w-full px-4 py-2 mb-4 border-2 border-pink-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400 anime-input">
      <input type="password" v-model="password" placeholder="Password" required
            class="w-full px-4 py-2 mb-4 border-2 border-pink-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400 anime-input">
      <button @click="login" class="w-full bg-pink-500 text-white py-2 rounded-full hover:bg-pink-600 transition duration-300 anime-button">
        Log in
      </button>
      <div class="text-center mt-4">
        <a href="#" @click.prevent="$emit('show-register')" class="text-pink-600 hover:underline anime-link">
          New to our world? Join us!
        </a>
      </div>
    </div>
  </transition>
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
@import url('https://fonts.googleapis.com/css2?family=Bangers&family=Varela+Round&display=swap');

.anime-bg {
  background-image: url('https://example.com/anime-background.jpg');
  background-size: cover;
  background-position: center;
}

.anime-title {
  font-family: 'Bangers', cursive;
  color: #FF69B4;
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
  color: #FF69B4;
}

@keyframes floatAnimation {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

.anime-button:hover {
  animation: floatAnimation 2s ease-in-out infinite;
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