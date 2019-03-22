<template>
  <div>
    <ul class="filters">
      <li><a href="#/all" :class="{ selected: isSetToAll(visibility) }" @click="setVisibilityToAll">All</a></li>
      <li><a href="#/all" :class="{ selected: isSetToActive(visibility) }" @click="setVisibilityToActive">Active</a></li>
      <li><a href="#/all" :class="{ selected: isSetToCompleted(visibility) }" @click="setVisibilityToCompleted">Completed</a></li>
    </ul>
    <button class="clear-completed" @click="removeCompletedTodos">
      Clear completed
    </button>
  </div>
</template>

<script>
  import * as FilterConfig from '../constants/Filter'

  export default {
    name: "TodoControl",
    props: ['visibility'],
    methods: {
      isSetToAll(visibility) {
        return FilterConfig.VISIBILITY_ALL === visibility;
      },
      isSetToActive(visibility) {
        return FilterConfig.VISIBILITY_ACTIVE === visibility;
      },
      isSetToCompleted(visibility) {
        return FilterConfig.VISIBILITY_COMPLETED === visibility;
      },
      setVisibilityToAll() {
        this.$parent.updateVisibility(FilterConfig.VISIBILITY_ALL);
      },
      setVisibilityToActive() {
        this.$parent.updateVisibility(FilterConfig.VISIBILITY_ACTIVE);
      },
      setVisibilityToCompleted() {
        this.$parent.updateVisibility(FilterConfig.VISIBILITY_COMPLETED);
      },
      removeCompletedTodos() {
        this.$parent.removeCompletedTodos();
      },
    },
  };
</script>
