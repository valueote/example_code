<template>
  <transition name="fade">
    <div class="bg-airou-light-cream p-8 rounded-xl shadow-md w-full max-w-md airou-bg">
      <h1 class="text-3xl font-bold text-center mb-6 airou-title">Welcome back, nya~!</h1>
      <input type="text" v-model="username" placeholder="Meow-mail address" required
            class="w-full px-4 py-2 mb-4 border-2 border-airou-brown rounded-full focus:outline-none focus:ring-2 focus:ring-airou-orange airou-input">
      <input type="password" v-model="password" placeholder="Paw-ssword" required
            class="w-full px-4 py-2 mb-4 border-2 border-airou-brown rounded-full focus:outline-none focus:ring-2 focus:ring-airou-orange airou-input">
      <button @click="login" class="w-full bg-airou-yellow text-airou-brown py-2 rounded-full hover:bg-airou-orange transition duration-300 airou-button">
        <i class="fas fa-paw mr-2"></i> Log In!
      </button>
      <div class="text-center mt-4">
        <a href="#" @click.prevent="$emit('show-register')" class="text-airou-brown hover:underline airou-link">
          New to here? Join us!
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
@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Varela+Round&display=swap');

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

@keyframes pawAnimation {
  0% { transform: rotate(0deg); }
  50% { transform: rotate(15deg); }
  100% { transform: rotate(0deg); }
}

.airou-button:hover i {
  animation: pawAnimation 0.5s ease-in-out infinite;
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