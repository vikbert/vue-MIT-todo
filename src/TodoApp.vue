<template>
  <div id="todo-demo">
    <a href="https://github.com/vikbert/vue-MIT-todo" target="_blank">
      <avatar image="https://github.githubassets.com/images/modules/site/logos/desktop-logo.png"></avatar>
    </a>
    <section class="todoapp">
      <header class="header">
        <h1>M I T Todo</h1>
        <TodoForm></TodoForm>
      </header>

      <section class="main" v-show="todos.length" v-cloak>
        <input id="toggle-all" class="toggle-all" type="checkbox" v-model="batchAll">
        <label for="toggle-all"></label>
        <ul class="todo-list">
          <TodoItem v-for="todo in todosFiltered" :key="todo.id" :todo="todo"
                    :counterActiveStarred="counterActiveStarred"></TodoItem>
        </ul>
      </section>

      <footer class="footer" v-show="todos.length" v-cloak>
        <TodoCounter :counterActive="counterActive"></TodoCounter>
        <TodoControl :visibility="visibility"></TodoControl>
      </footer>
    </section>
    <span>CSS template powered by todomvc.com®</span>
  </div>
</template>

<script>
  import Avatar from 'vue-avatar-component';
  import * as FilterConfig from './constants/Filter';
  import TodoItem from './components/TodoItem';
  import TodoForm from './components/TodoForm';
  import TodoCounter from './components/TodoCounter';
  import TodoControl from './components/TodoControl';

  export default {
    name: 'TodoApp',
    data() {
      return {
        todos: this.$storage.fetch(),
        visibility: FilterConfig.VISIBILITY_ALL,
      };
    },
    components: {
      Avatar,
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
      todosFiltered: function () {
        switch (this.visibility) {
          case 'active':
            return this.todosActive;
          case 'completed':
            return this.todosCompleted;
          default:
            return this.todosAll;
        }
      },
      todosAll: function () {
        const activeTodos = this.todosActive;
        const completedTodos = this.todosCompleted;
        console.log(activeTodos, completedTodos);

        return activeTodos.concat(completedTodos);
        // return _.orderBy(this.todos, ['completed', 'starred'], ['asc', 'desc']);
      },
      todosCompleted: function () {
        let completedTodos = [...this.todos];
        completedTodos = completedTodos.filter(todo => todo.completed);

        return completedTodos.sort((a, b) => b.starred - a.starred);
      },
      todosActive: function () {
        let activeTodos = [...this.todos];
        activeTodos = activeTodos.filter(todo => !todo.completed);

        return activeTodos.sort((a, b) => b.starred - a.starred);
      },
      todosActiveStarred: function () {
        const todos = [...this.todos];

        return todos.filter(todo => !todo.completed && todo.starred);
      },
      counterActive: function () {
        return this.todosActive.length;
      },
      counterActiveStarred: function () {
        return this.todosActiveStarred.length;
      },
      batchAll: {
        get: function () {
          return this.counterActive === 0;
        },
        set: function (value) {
          this.todos.forEach(function (todo) {
            todo.completed = value;
          });
        },
      },
    },
    methods: {
      addTodo(todoObj) {
        this.todos = [todoObj, ...this.todos];
      },
      removeTodo(todoObj) {
        this.todos.splice(this.todos.indexOf(todoObj), 1);
      },
      removeCompletedTodos() {
        this.todos = this.todosActive;
      },
      updateVisibility(visibility) {
        this.visibility = visibility;
      },
    },
  };
</script>
