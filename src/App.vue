<!--
 * @Author: XiaoYu
 * @Date: 2023-02-07 15:22:44
-->
<script setup lang="ts">
import TodoHeader from "./components/TodoHeader.vue";
import TodoMain from "./components/TodoMain.vue";
import TodoFooter from "./components/TodoFooter.vue";
</script>
<template>
  <section class="todoapp">
    <!-- TodoHeader -->
    <TodoHeader />
    <!-- TodoMain -->
    <TodoMain />
    <!-- TodoFooter -->
    <TodoFooter />
  </section>
</template>
