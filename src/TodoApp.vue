<template>
  <div id="todo-demo">
    <section class="todoapp">
      <header class="header">
        <h1>M I T</h1>
        <TodoForm></TodoForm>
      </header>

      <section class="main" v-show="todos.length" v-cloak>
        <input id="toggle-all" class="toggle-all" type="checkbox" v-model="batchAll">
        <label for="toggle-all"></label>
        <ul class="todo-list">
          <TodoItem v-for="todo in filteredTodos" :key="todo.id" :todo="todo"></TodoItem>
        </ul>
      </section>

      <footer class="footer" v-show="todos.length" v-cloak>
        <TodoCounter :counter="remaining"></TodoCounter>
        <TodoControl></TodoControl>
      </footer>
    </section>
  </div>
</template>

<script>
  import _ from "lodash";
  import TodoItem from './components/TodoItem';
  import TodoForm from './components/TodoForm';
  import TodoCounter from './components/TodoCounter';
  import TodoControl from './components/TodoControl';

  export default {
    name: 'TodoApp',
    data() {
      return {
        todos: this.$storage.fetch(),
        visibility: 'all',
      };
    },
    components: {
      TodoItem,
      TodoForm,
      TodoCounter,
      TodoControl,
    },
    // watch todos change for localStorage persistence
    watch: {
      todos: {
        handler: function (todos) {
          this.$storage.save(todos);
        },
        deep: true,
      },
    },
    // http://vuejs.org/guide/computed.html
    computed: {
      filteredTodos: function () {
        switch (this.visibility) {
          case 'active':
            return this.activeTodos;
          case 'completed':
            return this.completedTodos;
          default:
            return this.todos;
        }
      },
      completedTodos: function () {
        return _.filter(this.todos, ['completed', true]);
      },
      activeTodos: function () {
        return _.filter(this.todos, ['completed', false]);
      },
      remaining: function () {
        return this.activeTodos.length;
      },
      batchAll: {
        get: function () {
          return this.remaining === 0;
        },
        set: function (value) {
          this.todos.forEach(function (todo) {
            todo.completed = value;
          });
        },
      },
    },
    methods: {
      addTodo(newTodoText) {
        this.todos.push({
          id: this.$storage.uid++,
          title: newTodoText,
          completed: false,
        });
      },

      removeTodo(todoObj) {
        this.todos.splice(this.todos.indexOf(todoObj), 1);
      },

      removeCompleted() {
        this.todos = this.activeTodos;
      },

      updateVisibility(visibility) {
        this.visibility = visibility;
      },
    },
  };
</script>
