<template>
    <ScaleLayout :w="1920" :h="1080" fit="fill">
        <n-config-provider
            class="h-full"
            :theme="darkTheme"
            :theme-overrides="themeOverrides"
            :locale="zhCN"
            :date-locale="dateZhCN"
        >
            <n-dialog-provider to="#app">
                <n-message-provider to="#app">
                    <UiContext>
                        <router-view></router-view>
                    </UiContext>
                </n-message-provider>
            </n-dialog-provider>
        </n-config-provider>
    </ScaleLayout>
</template>

<script setup lang="ts">
import { darkTheme, zhCN, dateZhCN } from 'naive-ui';
import type { GlobalThemeOverrides } from 'naive-ui';
import ScaleLayout from './components/ScaleLayout.vue';

const themeOverrides: GlobalThemeOverrides = {
    common: {
        primaryColor: '#1F76E5',
        primaryColorHover: '#478FEB',
        primaryColorPressed: '#195EB7',
        primaryColorSuppl: '#1F76E5',
        bodyColor: '#061127',
        textColorBase: '#d1ecff',
    },
};
</script>
