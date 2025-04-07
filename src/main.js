// import './bootstrap';
import {createApp} from 'vue';
import Main from './App.vue';
import router from '@/router/index.js';
import { createPinia } from 'pinia';

import process from 'process';
window.process = process;

const app = createApp(Main);
app.use(router);
app.use(createPinia()); // Initialize Pinia

app.mount('#app');