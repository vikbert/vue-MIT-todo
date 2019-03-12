<template>
  <input class="new-todo"
         autofocus autocomplete="off"
         placeholder="What needs to be done?"
         v-model="todoInput"
         @keyup.enter="keyupEnterHandler(todoInput)">
</template>

<script>
  export default {
    name: "TodoForm",
    data () {
      return {
        todoInput: '',
      }
    },
    methods: {
      keyupEnterHandler(todoInput) {
        let value = todoInput && todoInput.trim()
        if (!value) {
          return
        }
        this.$parent.addTodo(value)
        this.todoInput = ''
      }
    },
  };
</script>
