<template>
    <a-style-provider hash-priority="high" :transformers="[legacyLogicalPropertiesTransformer]">
        <a-config-provider :theme="theme" :locale="antLocal">
            <router-view></router-view>
            <component :is="MsgCtx"></component>
            <component :is="ModalCtx"></component>
        </a-config-provider>
    </a-style-provider>
</template>

<script lang="ts" setup>
import { legacyLogicalPropertiesTransformer, message, Modal } from 'ant-design-vue';
import antLocal from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

defineOptions({
    name: 'App',
});

dayjs.locale('zh-cn');
const theme = {
    token: {
        // 组件库主题色
        colorPrimary: '#1F76E5',
    },
};

const [messageApi, MsgCtx] = message.useMessage();
window.$message = messageApi;
const [modal, ModalCtx] = Modal.useModal();
window.$modal = modal;
</script>
