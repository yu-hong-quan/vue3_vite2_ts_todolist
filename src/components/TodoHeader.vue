<script setup lang="ts">
import { ref } from "vue";
import userStore from "../store";
const { main } = userStore()
const { addTodo } = main;

const name = ref("");
const handleKeyUp = ()=>{
  if(name.value.trim() === '') return alert('不能为空');
  addTodo(name.value)
  name.value = ''
}
</script>
<template>
  <header class="header">
    <h1>todos</h1>
    <input
      class="new-todo"
      placeholder="What needs to be done?"
      autofocus
      v-model="name"
      @keyup.enter="handleKeyUp"
    />
  </header>
</template>
