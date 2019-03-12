<template>
  <li class="todo" :class="{ completed: todo.completed, editing: todo == editedTodo }">
    <div class="view">
      <input class="toggle" type="checkbox" v-model="todo.completed">
      <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
      <button class="destroy" @click="deleteClickHandler(todo)"></button>
    </div>
  </li>
</template>

<script>
  export default {
    name: "TodoItem",
    props: ['todo'],
    data() {
      return {
        editedTodo: null,
      }
    },
    methods: {
      deleteClickHandler(todo) {
        this.$parent.removeTodo(todo)
      },
      editTodo() {},
      doneEdit() {},
      cancelEdit() {},
    }
  };
</script>
