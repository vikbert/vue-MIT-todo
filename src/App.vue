<template>
  <div id="app">
    <section class="todoapp">
      <header class="header">
        <h1>MIT</h1>
        <TodoForm></TodoForm>
      </header>
      <section class="main" v-show="todos.length" v-cloak>
        <input id="toggle-all" class="toggle-all" type="checkbox" v-model="allDone">
        <label for="toggle-all"></label>
        <ul class="todo-list">
          <TodoItem v-for="todo in filteredTodos" :key="todo.id" :todo="todo"></TodoItem>
        </ul>
      </section>
      <footer class="footer" v-show="todos.length" v-cloak>
    <span class="todo-count">
      <strong>{{ remaining }}</strong> {{ remaining | pluralize }} left
    </span>
        <ul class="filters">
          <li><a href="#/all" :class="{ selected: visibility == 'all' }">All</a></li>
          <li><a href="#/active" :class="{ selected: visibility == 'active' }">Active</a></li>
          <li><a href="#/completed" :class="{ selected: visibility == 'completed' }">Completed</a></li>
        </ul>
        <button class="clear-completed" @click="removeCompleted" v-show="todos.length > remaining">
          Clear completed
        </button>
      </footer>
    </section>
    <footer class="info">
    </footer>
  </div>
</template>

<script>
  const STORAGE_KEY = 'todos-vuejs-2.0'
  const todoStorage = {
    fetch: function () {
      var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      todos.forEach(function (todo, index) {
        todo.id = index
      })
      todoStorage.uid = todos.length
      return todos
    },
    save: function (todos) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    }
  }

  // visibility filters
  var filters = {
    all: function (todos) {
      return todos
    },
    active: function (todos) {
      return todos.filter(function (todo) {
        return !todo.completed
      })
    },
    completed: function (todos) {
      return todos.filter(function (todo) {
        return todo.completed
      })
    }
  }

  import TodoItem from './components/TodoItem'
  import TodoForm from './components/TodoForm'

  export default {
    name: 'app',
    data() {
      return {
        todos: todoStorage.fetch(),
        newTodo: '',
        editedTodo: null,
        visibility: 'all',
      };
    },
    components: {
      TodoItem,
      TodoForm,
    },
    // watch todos change for localStorage persistence
    watch: {
      todos: {
        handler: function (todos) {
          todoStorage.save(todos)
        },
        deep: true
      }
    },
    // computed properties
    // http://vuejs.org/guide/computed.html
    computed: {
      filteredTodos: function () {
        return filters[this.visibility](this.todos)
      },
      remaining: function () {
        return filters.active(this.todos).length
      },
      allDone: {
        get: function () {
          return this.remaining === 0
        },
        set: function (value) {
          this.todos.forEach(function (todo) {
            todo.completed = value
          })
        }
      }
    },
    filters: {
      pluralize: function (n) {
        return n === 1 ? 'item' : 'items'
      }
    },
    // methods that implement data logic.
    // note there's no DOM manipulation here at all.
    methods: {
      addTodo: function (todo) {
        this.todos.push({
          id: todoStorage.uid++,
          title: todo,
          completed: false
        })
        this.newTodo = ''
      },

      removeTodo: function (todo) {
        this.todos.splice(this.todos.indexOf(todo), 1)
      },

      editTodo: function (todo) {
        this.beforeEditCache = todo.title
        this.editedTodo = todo
      },

      doneEdit: function (todo) {
        if (!this.editedTodo) {
          return
        }
        this.editedTodo = null
        todo.title = todo.title.trim()
        if (!todo.title) {
          this.deleteClickHandler(todo)
        }
      },

      cancelEdit: function (todo) {
        this.editedTodo = null
        todo.title = this.beforeEditCache
      },

      removeCompleted: function () {
        this.todos = filters.active(this.todos)
      }
    },

    // a custom directive to wait for the DOM to be updated
    // before focusing on the input field.
    // http://vuejs.org/guide/custom-directive.html
    directives: {
      'todo-focus': function (el, binding) {
        if (binding.value) {
          el.focus()
        }
      }
    }
  };
</script>
