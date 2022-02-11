<template>
    <div class="about">
        about {{ props.about }}
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    about: {
        type: String,
        default: 'ab',
    },
});
</script>

<style scoped lang="less">
.about {
    height: 1300px;
    background-color: #ddd;
}
</style>
