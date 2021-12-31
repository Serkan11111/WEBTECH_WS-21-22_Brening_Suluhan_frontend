<template>
  <div class="card h-100">
    <div class="card-body">
      <h5 class="card-title">{{ toDo.title }} {{ todo.description }}</h5>
      <p class="card-text">
        {{ toDo.title }} {{ todo.description }} ist {{ toDo.done ? 'erledigt' : 'nicht erledigt' }} und
        gehört zu {{ toDo.module }} mit Deadline {{ toDo.date }}.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToDoCard',
  props: {
    person: {
      type: Object,
      required: true
    }
  }
</script>

<style scoped>

</style>
