<template>
    <a-config-provider :theme="theme">
        <router-view></router-view>
    </a-config-provider>
</template>
<script lang="ts" setup>
defineOptions({
    name: 'App',
});
const theme = {
    token: {
        // 组件库主题色
        colorPrimary: '#1F76E5',
    },
};
</script>
