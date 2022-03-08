<template>
    <div class="about-demo">
        {{ name }}
    </div>
</template>

<script lang="ts">
export default defineComponent({
    name: 'AboutCom',
    data() {
        return {
            name: '',
        };
    },
    methods: {
        fn() {
            this.axios('/abc');
        },
    },
});
</script>

<style scoped lang="less">
</style>
