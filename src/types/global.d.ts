import type { AxiosInstance } from 'axios';

declare global {
    interface Window {
        axios: AxiosInstance;
    }
    // type CustomizedHTMLElement<T> = HTMLElement & T
}

declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
        $axios: AxiosInstance;
    }
}
