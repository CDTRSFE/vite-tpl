import type { AxiosInstance } from 'axios';

const open = () => {
    //
};
const close = () => {
    //
};

export default function(axios: AxiosInstance) {
    const loading = {
        num: 0,
        open() {
            if (this.num === 0) open();
            this.num++;
        },
        close() {
            this.num--;
            if (this.num === 0) close();
        },
    };

    axios.interceptors.request.use(
        (config) => {
            if (config.loading === false) {
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
            loading.close();
            return response;
        },
        (error) => {
            loading.close();
            return Promise.reject(error);
        },
    );
}
