<template>
    <div class="full-loading">
        {{ props.name }}
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    name: {
        type: String,
        default: 'leo',
    },
});
</script>

<style scoped lang="less">
</style>
