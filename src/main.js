import Vue from 'vue'
import TodoApp from './TodoApp.vue'

Vue.config.productionTip = false

const STORAGE_KEY = 'VUE_APP_TODO_LIST';
const todoStorage = {
  uid: 0,
  fetch: function () {
    let todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    todoStorage.uid = todos.length;
    todos.forEach(function (todo, index) {
      todo.id = index;
    });

    return todos;
  },
  save: function (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  },
};

Vue.prototype.$storage = todoStorage

new Vue({
  render: h => h(TodoApp),
}).$mount('#app')
