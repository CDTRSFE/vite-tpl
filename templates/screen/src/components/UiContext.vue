<template>
    <slot></slot>
</template>

<script setup lang="ts">
import { onUnmounted } from 'vue';
import { useMessage, useDialog } from 'naive-ui';

// 在 Provider 后代中初始化，供非组件代码使用。
const previousMessage = window.$message;
const previousDialog = window.$dialog;
window.$message = useMessage();
window.$dialog = useDialog();

onUnmounted(() => {
    window.$message = previousMessage;
    window.$dialog = previousDialog;
});
</script>
