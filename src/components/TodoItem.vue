<script setup lang="ts">
import { nextTick, ref } from "vue";
import userStore from "../store";
import { ITodoItem } from "../types/data";
const { main } = userStore();
const { deleteTodo, updateTodo } = main;
const isEditing = ref(false);
const inputRef = ref<HTMLInputElement>(); //可以通过$下标.__proto__ 来获取元素Dom类型
const currentName = ref("");
const props = defineProps<{
  item: ITodoItem;
}>();

const hadleChangeInput = (item: ITodoItem) => {
  updateTodo(item.id, "done", !item.done);
};

const handleDblClick = () => {
  isEditing.value = true;
  currentName.value = props.item.name;
  nextTick(() => {
    //确保dom更新完成
    inputRef.value?.focus();
  });
};

const handleBlur = () => {
  isEditing.value = false;
  currentName.value = "";
};

const handleKeyUp = (e: KeyboardEvent) => {
  //KeyboardEvent:事件keyup的类型
  if (e.key === "Escape") {//键盘ESC键
    handleBlur();
    return;
  }
  if (e.key === "Enter") {//键盘回车键
    if(currentName.value.trim() === '') return alert('不能为空');
    updateTodo(props.item.id, "name", currentName.value);
    handleBlur();
  }
};
</script>
<template>
  <li :class="{ completed: item.done, editing: isEditing }">
    <div class="view">
      <input
        class="toggle"
        type="checkbox"
        :checked="item.done"
        @change="hadleChangeInput(item)"
      />
      <label @dblclick="handleDblClick">{{ item.name }}</label>
      <button class="destroy" @click="deleteTodo(item.id)"></button>
    </div>
    <input
      class="edit"
      ref="inputRef"
      @blur="handleBlur"
      v-model="currentName"
      @keyup="handleKeyUp"
    />
    <!-- e => handleKeyUp  可以方便获取到keyup事件的类型 -->
  </li>
</template>
