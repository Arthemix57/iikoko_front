import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia';
import {  userStore } from './store/UserStore.js';
import VueAxios from 'vue-axios';
import axios from 'axios';
import router from './assets/router/router.js';

const app = createApp(App);
app.use(createPinia());

app.config.globalProperties.$store = userStore();
app.use(router).use(VueAxios, axios).mount('#app')
