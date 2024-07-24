import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginForm from './components/LoginForm.vue';
import RegisterForm from './components/RegisterForm.vue';
import ChatInterface from './components/ChatInterface.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/login', component: LoginForm },
  { path: '/register', component: RegisterForm },
  { path: '/chat', component: ChatInterface },
  { path: '*', redirect: '/login' },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;