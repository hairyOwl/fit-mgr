<!--
 * @Description: 弹性盒子两端对齐
 * @Author: hairyOwl
 * @Date: 2022-02-27 22:35:57
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-02-27 22:39:09
-->
<template>
    <div class="space-between">
        <!-- 插槽 -->
        <slot/>
    </div>
</template>

<style lang="scss" scoped>
    .space-between{
        display: flex;
        justify-content: space-between;
    }
</style>
