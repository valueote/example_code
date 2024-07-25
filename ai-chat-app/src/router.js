import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/LoginForm.vue';
import Register from './components/RegisterForm.vue';
import Chat from './components/ChatInterface.vue';

const routes = [
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/chat', component: Chat },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
