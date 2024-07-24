import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // 确保路径正确
import './assets/tailwind.css'; // 确保路径正确
import store from './store'
createApp(App)
  .use(store)
  .use(router)
  .mount('#app');