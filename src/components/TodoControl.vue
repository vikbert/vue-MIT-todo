<template>
  <div>
    <ul class="filters">
      <li><a href="#/all" @click="showAll">All</a></li>
      <li><a href="#/all" @click="showActive">Active</a></li>
      <li><a href="#/all" @click="showCompleted">Completed</a></li>
    </ul>
    <button class="clear-completed" @click="removeCompleted">
      Clear completed
    </button>
  </div>
</template>

<script>
  export default {
    name: "TodoControl",
    methods: {
      showAll() {
        this.$parent.updateVisibility('all');
      },
      showActive() {
        this.$parent.updateVisibility('active');
      },
      showCompleted() {
        this.$parent.updateVisibility('completed');
      },
      removeCompletedTodos() {
        this.$parent.removeCompletedTodos();
      },
    },
  };
</script>
