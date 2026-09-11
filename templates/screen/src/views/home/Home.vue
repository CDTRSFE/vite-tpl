<template>
    <main class="h-full flex flex-col items-center justify-center gap-24px p-48px box-border">
        <h1 class="text-40px font-semibold m-0">大屏工程已就绪</h1>
        <p class="text-20px m-0 text-[var(--screen-text-secondary)]">Vue 3 · Vite · TypeScript · Naive UI</p>
        <div class="flex items-center gap-16px">
            <n-button type="primary" size="large" @click="showMessage"> 消息示例 </n-button>
            <n-button size="large" @click="showDialog"> 对话框示例 </n-button>
        </div>
    </main>
</template>

<script setup lang="ts">
import { useMessage, useDialog } from 'naive-ui';

const message = useMessage();
const dialog = useDialog();
const showMessage = () => message.success('Naive UI 消息已接入');
const showDialog = () => {
    dialog.info({
        title: '大屏模板',
        content: '这是基础对话框示例，可在此基础上开发大屏页面。',
        positiveText: '知道了',
    });
};
</script>
