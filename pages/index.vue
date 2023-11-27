<!--
 * @Author: Joe.Chen
 * @Date: 2023-11-27 17:32:22
 * @LastEditors: Joe.Chen joechen@tracle-tw.com
 * @LastEditTime: 2023-11-27 10:26:33
 * @Description: 
-->
<script lang="ts" setup>

definePageMeta({
  name: '首頁'
})

</script>

<template>
  <NuxtLayout name="base-layout">
    <template #content>
      <Tappay />
    </template>
  </NuxtLayout>
</template>