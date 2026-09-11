import type { AxiosInstance } from 'axios';

declare module 'axios' {
    export interface AxiosRequestConfig {
        loading?: boolean;
    }
}

declare global {
    interface Window {
        axios: AxiosInstance;
        getPopupContainer: (node: HTMLElement) => HTMLElement;
    }
    const axios: AxiosInstance;
    const getPopupContainer: (node: HTMLElement) => HTMLElement;
    // type CustomizedHTMLElement<T> = HTMLElement & T
}

declare module 'vue' {
    export interface ComponentCustomProperties {
        $axios: AxiosInstance;
        axios: AxiosInstance;
        getPopupContainer: (node: HTMLElement) => HTMLElement;
    }
}
