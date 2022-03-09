<template>
    <div class="text-5xl font-extrabold text-center">
        <span class="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
            {{ info }}
        </span>
    </div>
    <p text="center hex-bbb" font="italic" m="y-20px">
        Vite Starter Template
    </p>
    <div class="text-center text-blue-300 text-16px font-bold">
        {{ features }}
    </div>
</template>

<script lang="ts" setup>
const info = ref('Vue3 + Vite + TS');
const features = ref('Element-Plus / Axios / Windi CSS / Pinia / VueUse / component auto-import / Iconify');
</script>
