<template>
  <div id="todo-demo">
    <a href="https://github.com/vikbert/vue-MIT-todo" target="_blank">
      <avatar image="https://github.githubassets.com/images/modules/site/logos/desktop-logo.png" ></avatar>
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
          <TodoItem v-for="todo in todosFiltered" :key="todo.id" :todo="todo" :counterActiveStarred="counterActiveStarred"></TodoItem>
        </ul>
      </section>

      <footer class="footer" v-show="todos.length" v-cloak>
        <TodoCounter :counterActive="counterActive"></TodoCounter>
        <TodoControl :visibility="visibility"></TodoControl>
      </footer>
    </section>
  </div>
</template>

<script>
  import _ from "lodash";
  import Avatar from 'vue-avatar-component'
  import FilterConfig from './components/TodoFilter.conf'
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
        return _.orderBy(this.todos, ['completed', 'starred'], ['asc', 'desc'])
      },
      todosCompleted: function () {
        let result =  _.filter(this.todos, ['completed', true])

        return _.orderBy(result, ['starred'], ['desc'])
      },
      todosActive: function () {
        let result = _.filter(this.todos, ['completed', false]);

        return _.orderBy(result, ['starred'],  ['desc'])
      },
      todosActiveStarred: function() {
        return _.filter(this.todos, {'completed': false, 'starred': 1})
      },
      counterActive: function () {
        return this.todosActive.length;
      },
      counterActiveStarred: function () {
        return this.todosActiveStarred.length
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
      removeCompletedTodos() {
        this.todos = this.todosActive;
      },
      updateVisibility(visibility) {
        this.visibility = visibility;
      },
    },
  };
</script>
