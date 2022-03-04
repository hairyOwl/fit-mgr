<!--
 * @Description: 
 * @Author: hairyOwl
 * @Date: 2022-02-23 14:18:23
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-02 22:13:13
-->
<template>
  <!-- ant 组件中文化 -->
  <a-config-provider :locale="locale === 'en' ? enUS : zhCN">
    <router-view/>
  </a-config-provider>
</template>

<style lang="scss">
</style>

<script>
  import enUS from 'ant-design-vue/es/locale/en_US';
  import zhCN from 'ant-design-vue/es/locale/zh_CN';

  export default {
    setup(){
      return{
        enUS,
        zhCN,
      }
    },
  };
</script>