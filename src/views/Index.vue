<template>
    <!-- <div
        class="box transform"
        text="center size-30px hex-666"
        leading="100px"
        w="100px"
        h="100px"
        m="y-50px x-auto"
        transform="rotate-12 translate-x-30px"
        overflow="hidden"
        border="3 hex-f00 rounded-10px t-5"
        box="content"
    >
        123
    </div> -->
    <about-com text="red-400"></about-com>
    <full-loading></full-loading>
    <el-input></el-input>
</template>

<script setup lang="ts">
import AboutCom from './About.vue';
axios.get('/mock/70/bigscreen-wx/yq/areahotlist').then(res => {
    console.log(res);
});
</script>

<style scoped lang="less">
.box {
    @apply bg-red-100;
}
</style>
