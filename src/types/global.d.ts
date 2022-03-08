import type { AxiosInstance } from 'axios';

declare module 'axios' {
    export interface AxiosRequestConfig {
        loading?: boolean;
    }
}

declare global {
    interface Window {
        axios: AxiosInstance;
    }
    const axios: AxiosInstance;
    // type CustomizedHTMLElement<T> = HTMLElement & T
}

declare module 'vue' {
    export interface ComponentCustomProperties {
        $axios: AxiosInstance;
        axios: AxiosInstance;
    }
}
