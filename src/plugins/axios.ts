import type { App } from 'vue';
import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import loading from './loading';

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const config: AxiosRequestConfig = {
    // baseURL: process.env.baseURL || process.env.apiUrl || '',
    // timeout: 3 * 1000, // Timeout
    // withCredentials: true, // Check cross-site Access-Control
};
const _axios = axios.create(config);

loading(_axios);

_axios.interceptors.request.use(
    config => {
        // 后端在接收post请求时，有接收json数据格式的情况，因此只有在content-type为如下情况下才转换数据格式
        const contentType = config.headers?.['Content-Type'];
        if (config.method === 'post' && ((!contentType && config.data.toString() === '[object Object]') || contentType === 'application/x-www-form-urlencoded')) {
            config.data = qs.stringify(config.data); // post请求格式化数据
        }
        return config;
    },
    error => {
        // Do something with request error
        return Promise.reject(error);
    },
);

// Add a response interceptor
_axios.interceptors.response.use(
    response => {
        // Do something with response data
        return response;
    },
    error => {
        error.message = '连接服务器失败';
        if (error.response) {
            const statusMap: Record<number, string> = {
                400: '错误请求',
                401: '未授权，请重新登录',
                403: '拒绝访问',
                404: '请求错误，未找到该资源',
                405: '请求方法未允许',
                408: '请求超时',
                500: '服务端出错',
                501: '网络未实现',
                502: '网络错误',
                503: '服务不可用',
                504: '网络超时',
                505: 'http版本不支持该请求',
            };
            const status: number = error.response.status;
            error.message = statusMap[status] || `连接错误${error.response.status}`;
        }
        return Promise.reject(error);
    },
);

const plugin = {
    install(app: App) {
        window.axios = _axios;
        Object.defineProperties(app.config.globalProperties, {
            axios: {
                get() {
                    return _axios;
                },
            },
            $axios: {
                get() {
                    return _axios;
                },
            },
        });
    },
};

export default plugin;
