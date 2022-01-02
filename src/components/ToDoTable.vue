<template>
  <div>
    <table class="table table-striped table-bordered">
      <thead>
      <tr>
        <th role="button" scope="col" @click="sortBy('titel')">Titel
          <i v-if="sortedColumn === 'titel' && sortedState === 2" class="bi bi-caret-up-fill"></i>
          <i v-if="sortedColumn === 'titel' && sortedState === 1" class="bi bi-caret-down-fill"></i>
        </th>
        <th role="button" scope="col" @click="sortBy('description')">Beschreibung
          <i v-if="sortedColumn === 'description' && sortedState === 2" class="bi bi-caret-up-fill"></i>
          <i v-if="sortedColumn === 'description' && sortedState === 1" class="bi bi-caret-down-fill"></i>
        </th>
        <th role="button" scope="col" @click="sortBy('module')">Modul
          <i v-if="sortedColumn === 'module' && sortedState === 2" class="bi bi-caret-up-fill"></i>
          <i v-if="sortedColumn === 'module' && sortedState === 1" class="bi bi-caret-down-fill"></i>
        </th>
        <th role="button" scope="col" @click="sortBy('date')">Deadline
          <i v-if="sortedColumn === 'date' && sortedState === 2" class="bi bi-caret-up-fill"></i>
          <i v-if="sortedColumn === 'date' && sortedState === 1" class="bi bi-caret-down-fill"></i>
        </th>
        <th scope="col">Aktionen</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="toDo in toDosCopy" :key="toDo.id">
        <td>{{ toDo.titel }}</td>
        <td>{{ toDo.description }}</td>
        <td>{{ toDo.module }}</td>
        <td>{{ toDo.formatDate }}</td>
        <td v-if="toDo.done">
          <i role="button" class="bi bi-arrow-clockwise mx-1" @click="editDone(toDo)"></i>
          <i role="button" class="bi bi-archive-fill mx-1" @click="deleteToDo(toDo)"></i>
        </td>
        <td v-else class="">
          <i role="button" class="bi mx-1" :class="toDo.favorite ? 'bi-star-fill' : 'bi-star'" @click="editFavorite(toDo)"></i>
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
  data () {
    return {
      toDosCopy: this.toDos,
      sortedColumn: '',
      sortedState: 0
    }
  },
  watch: {
    toDos: function (newVal, oldVal) {
      this.toDosCopy = this.toDos
      this.sort()
    }
  },
  methods: {
    editFavorite (toDo) {
      toDo.favorite = !toDo.favorite
      this.editTodo(toDo)
    },
    editDone (toDo) {
      toDo.done = !toDo.done
      this.editTodo(toDo)
    },
    sortBy (column) {
      if (this.sortedColumn === column) {
        if (this.sortedState === 1) {
          this.sortedState = 2
        } else {
          this.sortedState = 0
          this.sortedColumn = ''
        }
      } else {
        this.sortedColumn = column
        this.sortedState = 1
      }
      this.sort()
    },
    sort () {
      if (this.sortedState === 0) {
        this.toDosCopy.sort((a, b) => a.id > b.id ? 1 : -1)
      } else if (this.sortedState === 1) {
        this.toDosCopy.sort((a, b) => a[this.sortedColumn] > b[this.sortedColumn] ? -1 : 1)
      } else {
        this.toDosCopy.sort((a, b) => a[this.sortedColumn] > b[this.sortedColumn] ? 1 : -1)
      }
    }
  }
}
</script>

<style scoped>

</style>
