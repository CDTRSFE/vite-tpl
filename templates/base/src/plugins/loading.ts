import type { AxiosInstance } from 'axios';
export default function (axios: AxiosInstance) {
    const loading = {
        num: 0,
        open() {
            if (this.num === 0) {
                // 在此接入项目需要的全局 loading 展示。
            }
            this.num++;
        },
        close() {
            this.num--;
            if (this.num === 0) {
                // loadingInstance.close();
            }
        },
    };
    axios.interceptors.request.use(
        (config) => {
            if (config.loading !== false) {
                loading.open();
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        },
    );
    axios.interceptors.response.use(
        (response) => {
            if (response.config.loading !== false) {
                loading.close();
            }
            return response;
        },
        (error) => {
            if (error.config.loading !== false) {
                loading.close();
            }
            return Promise.reject(error);
        },
    );
}
