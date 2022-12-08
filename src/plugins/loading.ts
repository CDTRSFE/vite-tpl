import type { AxiosInstance } from 'axios';
// import 'element-plus/es/components/loading/style/css';
// import { ElLoading } from 'element-plus';

// let loadingInstance: ReturnType<typeof ElLoading.service>;

export default function(axios: AxiosInstance) {
    const loading = {
        num: 0,
        open() {
            if (this.num === 0) {
                // loadingInstance = ElLoading.service({
                //     text: '玩命加载中...',
                //     background: 'rgba(255, 255, 255, 0.6)',
                // });
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
        config => {
            if (config.loading !== false) {
                loading.open();
            }
            return config;
        },
        error => {
            return Promise.reject(error);
        },
    );
    axios.interceptors.response.use(
        response => {
            if (response.config.loading !== false) {
                loading.close();
            }
            return response;
        },
        error => {
            if (error.config.loading !== false) {
                loading.close();
            }
            return Promise.reject(error);
        },
    );
}
