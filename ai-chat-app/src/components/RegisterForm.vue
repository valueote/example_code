<template>
  <div class="min-h-screen w-full flex items-center justify-center bg-airou-pattern">
    <div class="w-full max-w-4xl p-8 flex flex-col items-center">
      <h1 class="text-4xl font-bold text-airou-brown mb-8 airou-main-title">Airou Chat</h1>
      <transition name="fade">
        <div class="bg-airou-light-cream p-8 rounded-xl shadow-lg w-full max-w-md airou-bg">
          <h2 class="text-3xl font-bold text-center mb-6 airou-title">Join the Airou Crew!</h2>
          <input type="text" v-model="username" placeholder="Meow-mail address" required
                class="w-full px-4 py-2 mb-4 border-2 border-airou-brown rounded-full focus:outline-none focus:ring-2 focus:ring-airou-orange airou-input">
          <input type="password" v-model="password" placeholder="Paw-ssword" required
                class="w-full px-4 py-2 mb-4 border-2 border-airou-brown rounded-full focus:outline-none focus:ring-2 focus:ring-airou-orange airou-input">
          <button @click="register" class="w-full bg-airou-yellow text-airou-brown py-2 rounded-full hover:bg-airou-orange transition duration-300 airou-button">
            <i class="fas fa-cat mr-2"></i> Create your Account!
          </button>
          <div class="text-center mt-4">
            <a href="#" @click.prevent="$emit('show-login')" class="text-airou-brown hover:underline airou-link">
              Already have an account? Log in!
            </a>
          </div>
        </div>
      </transition>
      <div class="mt-8 text-center text-airou-brown">
        <p class="mb-2">Join our purr-fect community of cat lovers!</p>
        <p>Start your feline adventure today!</p>
      </div>
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
@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Varela+Round&display=swap');

.bg-airou-pattern {
  background-color: #FFF9E6;
  background-image: url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a67b5b' fill-opacity='0.1'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: auto;
}

.airou-main-title {
  font-family: 'Fredoka One', cursive;
  color: #8B4513;
  text-shadow: 3px 3px 6px rgba(0,0,0,0.2);
}

.airou-bg {
  background-color: #FFF9E6;
  border: 2px solid #A67B5B;
  position: relative;
  overflow: hidden;
}

.airou-bg::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: 
    radial-gradient(circle at 100% 100%, transparent 8px, #A67B5B 9px, #A67B5B 10px, transparent 11px) 100% 100% / 14px 14px,
    radial-gradient(circle at 0 100%, transparent 8px, #A67B5B 9px, #A67B5B 10px, transparent 11px) 0 100% / 14px 14px,
    radial-gradient(circle at 100% 0, transparent 8px, #A67B5B 9px, #A67B5B 10px, transparent 11px) 100% 0 / 14px 14px,
    radial-gradient(circle at 0 0, transparent 8px, #A67B5B 9px, #A67B5B 10px, transparent 11px) 0 0 / 14px 14px;
  background-repeat: no-repeat;
  z-index: -1;
}

.airou-title {
  font-family: 'Fredoka One', cursive;
  color: #8B4513;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
}

.airou-input {
  font-family: 'Varela Round', sans-serif;
}

.airou-button {
  font-family: 'Fredoka One', cursive;
  letter-spacing: 1px;
  font-size: 1.2em;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.airou-link {
  font-family: 'Varela Round', sans-serif;
  color: #8B4513;
}

@keyframes catTailAnimation {
  0% { transform: rotate(0deg); }
  50% { transform: rotate(-15deg); }
  100% { transform: rotate(0deg); }
}

.airou-button:hover i {
  animation: catTailAnimation 0.5s ease-in-out infinite;
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