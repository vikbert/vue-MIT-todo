<template>
  <li class="todo" :class="{ completed: todo.completed, editing: todo === editedTodo, starred_todo: todo.starred }">
    <div class="view">
      <input class="toggle" type="checkbox" v-model="todo.completed">
      <label @dblclick="doubleClickHandler(todo)">{{ todo.title }}</label>
      <TodoStarIcon :todo="todo" :counterActiveStarred="counterActiveStarred"></TodoStarIcon>
    </div>

    <!--double click on label text will hide label text and show this input element instead-->
    <input class="edit" type="text"
           v-model="todo.title"
           v-todo-focus="todo === editedTodo"
           @blur="completeEdit(todo)"
           @keyup.enter="completeEdit(todo)"
           @keyup.esc="cancelEdit(todo)">
  </li>
</template>

<script>
  import TodoStarIcon from './TodoStarIcon'

  export default {
    name: "TodoItem",
    props: ['todo', 'counterActiveStarred'],
    data() {
      return {
        editedTodo: null,
        cachedTodoTitle: null,
      };
    },
    components: {
      TodoStarIcon,
    },
    methods: {
      doubleClickHandler(todo) {
        this.editedTodo = todo;
        this.cachedTodoTitle = todo.title;
      },
      cancelEdit(todo) {
        this.editedTodo = null;
        todo.title = this.cachedTodoTitle;
      },
      completeEdit(todo) {
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
