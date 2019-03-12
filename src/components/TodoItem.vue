<template>
  <li class="todo" :class="{ completed: todo.completed, editing: todo === editedTodo }">
    <div class="view">
      <input class="toggle" type="checkbox" v-model="todo.completed">
      <label @dblclick="doubleClickHandler(todo)">{{ todo.title }}</label>
      <button class="destroy" @click="deleteClickHandler(todo)"></button>
    </div>

    <!--double click on label text will hide label text and show this input element instead-->
    <input class="edit" type="text"
           v-model="todo.title"
           v-todo-focus="todo == editedTodo"
           @blur="doneEdit(todo)"
           @keyup.enter="doneEdit(todo)"
           @keyup.esc="cancelEdit(todo)">
  </li>
</template>

<script>
  export default {
    name: "TodoItem",
    props: ['todo'],
    data() {
      return {
        editedTodo: null,
        beforeEditCache: null,
      };
    },
    methods: {
      deleteClickHandler(todo) {
        this.$parent.removeTodo(todo);
      },
      doubleClickHandler(todo) {
        this.editedTodo = todo;
        this.beforeEditCache = todo.title;
      },
      cancelEdit(todo) {
        this.editedTodo = null;
        todo.title = this.beforeEditCache;
      },
      doneEdit(todo) {
        if (!this.editedTodo) {
          return;
        }
        this.editedTodo = null;
        todo.title = todo.title.trim();
        if (!todo.title) {
          this.$parent.removeTodo(todo);
        }
      },
    },
    // a custom directive to wait for the DOM to be updated
    // before focusing on the input field.
    // http://vuejs.org/guide/custom-directive.html
    directives: {
      'todo-focus': function (el, binding) {
        if (binding.value) {
          el.focus();
        }
      },
    },
  };
</script>
