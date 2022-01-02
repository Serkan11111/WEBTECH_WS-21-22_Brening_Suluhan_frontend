<template>
  <h1>ToDos</h1>
  <div class="container-fluid">
    <to-do-modal v-if="isModalOpen" :modalData="modalData" :editTodo="editTodo" :closeModal="closeModal"></to-do-modal>
    <div class="container mt-3">
      <div class="row d-flex justify-content-between">
        <div class="col-3">
          <input class="form-control bg-dark text-white" v-model="searchInput" placeholder="Suche nach Modul oder Datum..."/>
        </div>
        <button class="btn btn-success col-auto px-4" @click="openModal">Erstellen</button>
      </div>
  </div>
    <div class="row mt-2">
      <p class="text-white h6">Noch zu erledigen:</p>
      <to-do-table :to-dos="checkToDos(false)" :deleteToDo="deleteToDo" :editTodo="editTodo" :openModal="openModal"></to-do-table>
    </div>
    <div class="row mt-2">
      <p class="text-white h6">Bereits erledigt:</p>
      <to-do-table :to-dos="checkToDos(true)" :deleteToDo="deleteToDo" :editTodo="editTodo"></to-do-table>
    </div>
  </div>
</template>

<script>
import ToDoTable from '@/components/ToDoTable'
import ToDoModal from '@/components/ToDoModal'

export default {
  name: 'ToDos',
  components: { ToDoModal, ToDoTable },
  data () {
    return {
      toDos: [], // { id: 1, titel: 'Test-Titel', description: 'Test-Beschreibung', module: 'Test-Modul', date: '31.12.2021', isFavorite: false, done: false }
      searchInput: '',
      isModalOpen: false,
      modalData: null
    }
  },
  methods: {
    checkToDos (isDone) {
      return this.toDos.filter(a => a.done === isDone && (a.date.includes(this.searchInput) || a.module.includes(this.searchInput))).sort((a) => a.isFavorite ? -1 : 1)
    },
    async deleteToDo (toDo) {
      const findIndex = this.toDos.findIndex(a => a.id === toDo.id)
      const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/todos/' + toDo.id
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      const requestOptions = {
        method: 'DELETE',
        headers: headers,
        redirect: 'follow'
      }
      const response = await fetch(endpoint, requestOptions)
      if (response.ok) {
        this.toDos.splice(findIndex, 1)
      }
    },
    async editTodo (toDo) {
      if (this.isModalOpen) {
        this.closeModal()
      }
      let endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/todos'
      const findIndex = this.toDos.findIndex(a => a.id === toDo.id)
      if (findIndex !== -1) {
        endpoint += '/' + toDo.id
      }

      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      const toDoStringify = JSON.stringify(toDo)
      const requestOptions = {
        method: 'POST',
        headers: headers,
        body: toDoStringify,
        redirect: 'follow'
      }
      const response = await fetch(endpoint, requestOptions)

      if (response.ok) {
        if (findIndex !== -1) {
          this.toDos[findIndex] = toDo
        } else {
          toDo.id = response.headers.get('location')
          this.toDos.push(toDo)
        }
      }
    },
    openModal (toDo = null) {
      this.isModalOpen = true
      this.modalData = toDo
    },
    closeModal () {
      this.isModalOpen = false
      this.modalData = null
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
