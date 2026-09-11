import type { MessageInstance, ModalStaticFunctions, ModalFuncWithRef } from 'ant-design-vue';

declare global {
    interface Window {
        $message: MessageInstance;
        $modal: Omit<ModalStaticFunctions<ModalFuncWithRef>, 'warn'>;
    }
}
