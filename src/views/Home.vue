<template>
  <h1>ToDos</h1>
  <div class="container-fluid">
    <to-do-modal @created="addToDo"></to-do-modal>
  </div>
  <to-do-table :toDos="this.toDos"></to-do-table>
</template>

<script>
import ToDoTable from '@/components/ToDoTable'
import ToDoModal from '@/components/ToDoModal'

export default {
  name: 'ToDos',
  components: {
    ToDoModal,
    ToDoTable
  },
  data () {
    return {
      toDos: []
    }
  },
  methods: {
    addToDo (toDoLocation) {
      const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + toDoLocation
      const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      }

      fetch(endpoint, requestOptions)
        .then(response => response.json())
        .then(toDo => this.toDos.push(toDo))
        .catch(error => console.log('error', error))
    }
  },
  mounted () {
    const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/todos'
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    }

    fetch(endpoint, requestOptions)
      .then(response => response.json())
      .then(result => result.forEach(toDo => {
        this.toDos.push(toDo)
      }))
      .catch(error => console.log('error', error))
  }
}
</script>

<style scoped>

</style>
