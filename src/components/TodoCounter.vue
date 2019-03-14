<template>
  <span class="todo-count">
    <strong>{{ counterActive }}</strong> {{ counterActive | pluralize }} left
  </span>
</template>

<script>
  export default {
    name: "TodoCounter",
    props: ['counterActive'],
    filters: {
      pluralize: function (n) {
        return n === 1 ? 'item' : 'items';
      },
    },
  };
</script>
