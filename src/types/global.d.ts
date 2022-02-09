import { AxiosInstance } from 'axios';
import { createApp } from 'vue';

declare global {
    interface Window {
        axios: AxiosInstance
    }
    // type CustomizedHTMLElement<T> = HTMLElement & T
}

declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
        $axios: AxiosInstance
    }
}
