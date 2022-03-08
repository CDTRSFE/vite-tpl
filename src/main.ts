import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import App from './App.vue';
import axios from '@/plugins/axios';

// windicss layers
import 'virtual:windi-base.css';
import 'virtual:windi-components.css';
// custom styles
import './assets/styles/main.less';
// windicss utilities should be the last style import
import 'virtual:windi-utilities.css';
// windicss devtools support (dev only)
import 'virtual:windi-devtools';

const pinia = createPinia();

createApp(App)
    .use(router)
    .use(pinia)
    .use(axios)
    .mount('#app');
