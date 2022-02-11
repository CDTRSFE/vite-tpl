<template>
    <h1 class="hello">Welcome to Your Vue.js App</h1>
    <full-loading name="1"></full-loading>
    <tab-select></tab-select>
    <el-button type="primary">btn</el-button>
    <input v-focus type="text" />
    <div @click="() => toggle()">{{ value }}</div>
</template>

<script setup lang="ts">
// const name = ref('name');
const [value, toggle] = useToggle();
</script>

<style scoped lang="less">
.hello {
    margin-top: 100px;
    font-size: 30px;
    text-align: center;
}
</style>