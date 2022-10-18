import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import App from './App.vue';
import axios from '@/plugins/axios';
import directive from '@/directives';

// 重置样式
import 'tp-common.css';
// 'uno:[layer-name].css'
import 'uno:components.css';
// layers that are not 'components' and 'utilities' will fallback to here
import 'uno.css';
// your own CSS
import './assets/styles/main.less';
// "utilities" layer will have the highest priority
import 'uno:utilities.css';

const pinia = createPinia();

const app = createApp(App)
    .use(router)
    .use(pinia)
    .use(axios);
directive(app);
app.mount('#app');
