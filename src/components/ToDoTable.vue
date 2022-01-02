<template>
  <div>
    <table class="table table-striped table-bordered">
      <thead>
      <tr>
        <th scope="col">Titel</th>
        <th scope="col">Beschreibung</th>
        <th scope="col">Modul</th>
        <th scope="col">Deadline</th>
        <th scope="col">Aktionen</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="toDo in toDos" :key="toDo.id">
        <td>{{ toDo.title }}</td>
        <td>{{ toDo.description }}</td>
        <td>{{ toDo.module }}</td>
        <td>{{ toDo.date }}</td>
        <td v-if="toDo.done">
          <i role="button" class="bi bi-arrow-clockwise mx-1" @click="editDone(toDo)"></i>
          <i role="button" class="bi bi-archive-fill mx-1" @click="deleteToDo(toDo)"></i>
        </td>
        <td v-else class="">
          <i role="button" class="bi mx-1" :class="toDo.isFavorite ? 'bi-star-fill' : 'bi-star'" @click="editFavorite(toDo)"></i>
          <i role="button" class="bi bi-check-square mx-1" @click="editDone(toDo)"></i>
          <i role="button" class="bi bi-pencil-square mx-1" @click="openModal(toDo)"></i>
          <i role="button" class="bi bi-archive-fill mx-1" @click="deleteToDo(toDo)"></i>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ToDoTable',
  props: {
    toDos: {
      type: Array,
      required: true
    },
    deleteToDo: Function,
    editTodo: Function,
    openModal: Function
  },
  methods: {
    editFavorite (toDo) {
      toDo.isFavorite = !toDo.isFavorite
      this.editTodo(toDo)
    },
    editDone (toDo) {
      toDo.done = !toDo.done
      this.editTodo(toDo)
    }
  }
}
</script>

<style scoped>

</style>
