<template>
    <slot></slot>
</template>
<script lang="ts" setup>
// 大屏用于缩放 <body> 的容器组件
const props = withDefaults(
    defineProps<{
        w?: number;
        h?: number;
        fit?: 'contain' | 'fill';
    }>(),
    {
        w: 1920,
        h: 1080,
        fit: 'fill',
    },
);

const init = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const scale = {
        w: w / props.w,
        h: h / props.h,
    };
    if (props.fit === 'contain') {
        scale.w = scale.w > scale.h ? scale.h : scale.w;
        scale.h = scale.w;
    }
    const html = document.documentElement;
    html.style.setProperty('--scale', `${scale.w}, ${scale.h}`);
    html.style.setProperty('--page-width', `${props.w}px`);
    html.style.setProperty('--page-height', `${props.h}px`);
    html.style.setProperty('--page-margin-left', `${(w - props.w * scale.w) / 2}px`);
    html.style.setProperty('--page-margin-top', `${(h - props.h * scale.h) / 2}px`);
    html.style.width = `${w}px`;
    html.style.height = `${h}px`;
    document.body.setAttribute('scale-container', '');
};

init();
watch(props, init);
window.addEventListener('resize', init);
</script>
<style lang="less">
[scale-container] {
    width: var(--page-width);
    height: var(--page-height);
    transform: scale(var(--scale));
    transform-origin: 0 0;
    background: #061127;
    color: #d1ecff;
    overflow: hidden;
    margin-left: var(--page-margin-left);
    margin-top: var(--page-margin-top);
}
</style>
