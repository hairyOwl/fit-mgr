<!--
 * @Description: 弹性盒子两端对齐
 * @Author: hairyOwl
 * @Date: 2022-02-27 22:35:57
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-06 23:02:05
-->
<template>
    <div class="flex-end">
        <!-- 插槽 -->
        <slot/>
    </div>
</template>

<style lang="scss" scoped>
    .flex-end{
        display: flex;
        justify-content: flex-end;
    }
</style>
