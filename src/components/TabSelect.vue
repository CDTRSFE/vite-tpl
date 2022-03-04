<template>
    <div class="tab-select">
        tab {{ value }}
    </div>
</template>

<script lang="ts">
export default defineComponent({
    name: 'TabSelect',
    props: {
        value: {
            type: String,
            default: '',
        },
    },
});
</script>

<style scoped lang="less">
</style>
