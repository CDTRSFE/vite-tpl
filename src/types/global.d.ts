import type { AxiosInstance } from 'axios';
import type { MessageInstance, ModalStaticFunctions, ModalFuncWithRef } from 'ant-design-vue';

declare module 'axios' {
    export interface AxiosRequestConfig {
        loading?: boolean;
    }
}

declare global {
    interface Window {
        axios: AxiosInstance;
        getPopupContainer: (node: HTMLElement) => HTMLElement;
        $message: MessageInstance;
        $modal: Omit<ModalStaticFunctions<ModalFuncWithRef>, 'warn'>;
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
