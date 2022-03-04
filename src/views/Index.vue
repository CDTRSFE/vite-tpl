<template>
    <p class="h-full">
        123
    </p>
    <div
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
    </div>
    <ul divide="y-1px hex-f00">
        <li>11</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
    </ul>
    <button outline="">
        tb
    </button>
    <p>
        <input type="checkbox" class="hover:(bg-red-200 font-bold text-black)" accent="red-500" />
    </p>
    <div display="flex justify-center" h="200px" space="x-10px">
        <div class="item1 bg-red-300 w-100px h-100px"></div>
        <div class="item2 bg-red-500 w-100px h-100px"></div>
    </div>
    <div w="400px" h="100px" class="relative" border="1px black">
        <div w="50px" h="50px" bg="red-200" position="absolute top-20px left-20px"></div>
    </div>
    <div w="100px" bg="red-200"></div>
    <div bg="red-300" w="100px" class="aspect-square"></div>
    <p class="line-clamp-2 w-1/5" w="40p">
        When building frontend applications, we often have the need to reuse logic for common tasks. For example, we may need to format dates in many places, so we extract a reusable function for that. This formatter function encapsulates stateless logic: it takes some input and immediately returns expected output. There are many libraries out there for reusing
    </p>
    <textarea id="e" name="3" cols="30" rows="10"></textarea>
    <about-com text="red-400"></about-com>
    <full-loading></full-loading>
</template>

<script setup lang="ts">
import AboutCom from './About.vue';
</script>

<style scoped lang="less">
.hello {
    // margin-top: 100px;
    // font-size: 30px;
    // text-align: center;
}
.box {
    @apply bg-red-100;
}
</style>
