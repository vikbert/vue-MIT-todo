<template>
  <input class="new-todo"
         autofocus autocomplete="off"
         placeholder="What needs to be done?"
         v-model="todoInput"
         @keyup.enter="formSubmitHandler(todoInput)">
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
      formSubmitHandler(todoInput) {
        let value = todoInput && todoInput.trim()
        if (!value) {
          return
        }
        this.$parent.addTodo({
          id: this.$storage.uid++,
          title: todoInput,
          starred: 0,
          completed: false,
        })

        this.todoInput = ''
      }
    },
  };
</script>
