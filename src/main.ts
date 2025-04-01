import { createApp } from 'vue';
import { createPinia } from 'pinia';
import pkg from '../package.json';
import router from './router';
import App from './App.vue';
import axios from '@/plugins/axios';
import directive from '@/directives';

// 重置样式
import 'tp-common.css';
import 'virtual:uno.css';
import './assets/styles/main.less';

const pinia = createPinia();

const app = createApp(App).use(router).use(pinia).use(axios);
directive(app);
app.mount('#app');

if (pkg.tag) {
    const script = document.createElement('script');
    script.innerHTML = `
        console.log(
            ' %c 当前版本：%c ${pkg.tag} ',
            'background: #606060; color: #fff; border-radius: 3px 0 0 3px;',
            'background: #1475B2; color: #fff; border-radius: 0 3px 3px 0;'
        );
    `;
    document.body.appendChild(script);
}
