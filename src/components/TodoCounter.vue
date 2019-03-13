<template>
  <span class="todo-count">
    <strong>{{ counter }}</strong> {{ counter | pluralize }} left
  </span>
</template>

<script>
  export default {
    name: "TodoCounter",
    props: ['counter'],
    filters: {
      pluralize: function (n) {
        return n === 1 ? 'item' : 'items';
      },
    },
  };
</script>
