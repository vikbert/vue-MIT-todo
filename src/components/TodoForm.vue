<template>
  <input class="new-todo"
         autofocus autocomplete="off"
         placeholder="What needs to be done?"
         v-model="newTodo"
         @keyup.enter="keyupEnterHandler(newTodo)">
</template>

<script>
  export default {
    name: "TodoForm",
    props: ['addNewTodo'],
    data () {
      return {
        newTodo: '',
      }
    },
    methods: {
      keyupEnterHandler(todo) {
        this.$parent.addNewTodo(todo)
        this.newTodo = ''
      }
    },
  };
</script>
