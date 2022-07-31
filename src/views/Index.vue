<template>
    <vue-logo></vue-logo>
    <info-text></info-text>
    <div class="flex justify-center items-center space-x-20px">
        <icons-vite></icons-vite>
        <icons-element></icons-element>
        <icons-axios text="size-50px"></icons-axios>
        <icons-unocss></icons-unocss>
        <icons-pinia class="h-28px w-auto"></icons-pinia>
        <icons-pnpm class="text-size-22px"></icons-pnpm>
        <icons-vueuse class="h-24px w-auto"></icons-vueuse>
        <icons-iconify class="h-80px w-auto"></icons-iconify>
    </div>
</template>

<script setup lang="ts">
import VueLogo from './VueLogo.vue';
</script>
