<template>
    <div class="overflow-hidden">
        <vue-logo></vue-logo>
        <info-text></info-text>
        <div class="flex justify-center mt-30px items-center space-x-20px">
            <icons-vite></icons-vite>
            <icons-antdv width="30px"></icons-antdv>
            <icons-axios class="w-146px"></icons-axios>
            <icons-unocss class="w-50px h-28px"></icons-unocss>
            <icons-pinia class="h-30px w-auto"></icons-pinia>
            <icons-pnpm class="h-26px"></icons-pnpm>
            <icons-vueuse class="h-28px w-auto"></icons-vueuse>
        </div>
    </div>
</template>

<script setup lang="tsx">
import VueLogo from './VueLogo.vue';
</script>
