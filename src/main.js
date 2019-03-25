import Vue from 'vue'
import TodoApp from './TodoApp.vue'

// Element UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

require('./assets/css/customized.css');

const STORAGE_KEY = 'VUE_APP_TODO_LIST';
const todoLocalStorage = {
  uid: 0,
  fetch: function () {
    let todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    todoLocalStorage.uid = todos.length;
    todos.forEach(function (todo, index) {
      todo.id = index;
    });

    return todos;
  },
  save: function (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  },
};

Vue.config.productionTip = false
Vue.prototype.$storage = todoLocalStorage

new Vue({
  render: h => h(TodoApp),
}).$mount('#app')
