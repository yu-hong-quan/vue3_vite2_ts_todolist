<!--
 * @Author: XiaoYu
 * @Date: 2023-02-07 15:35:43
-->
<script setup lang="ts">

import { storeToRefs } from "pinia";
import userStore from "../store";
import TodoItem from "../components/TodoItem.vue";
const { main } = userStore();
const { getTodos, updatedAllStatus } = main;
const { renderList, mainRadioStatus } = storeToRefs(main); //获取store中的state
getTodos();


const handleChangeAll = (done: boolean) => {
  updatedAllStatus(done);
};

</script>
<template>
  <section class="main">
    <input
      id="toggle-all"
      class="toggle-all"
      type="checkbox"
      :checked="mainRadioStatus"
      @change="handleChangeAll(!mainRadioStatus)"
    />
    <label for="toggle-all">Mark all as complete</label>
    <ul class="todo-list">
      <TodoItem v-for="item in renderList" :key="item.id" :item="item"></TodoItem>
    </ul>
  </section>
</template>
