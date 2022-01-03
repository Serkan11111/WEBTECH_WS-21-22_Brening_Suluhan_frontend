<template>
  <div class="container mt-3">
  <h1>ToDos</h1>
  </div>
  <to-do-modal v-if="isModalOpen" :modalData="modalData" :editTodo="editTodo" :closeModal="closeModal"></to-do-modal>
  <div class="container mt-3">
    <div class="row d-flex justify-content-between">
      <div class="col-3">
        <input class="form-control bg-dark text-white" v-model="searchInput" placeholder="Filter nach Modul oder Datum..."/>
      </div>
      <button class="btn btn-success col-auto px-4" @click="openModal">Erstellen</button>
    </div>
    <div class="row mt-2">
      <p class="h6 text-decoration-underline">Noch zu erledigen:</p>
      <to-do-table :toDos="checkToDos(false)" :deleteToDo="deleteToDo" :editTodo="editTodo" :openModal="openModal"></to-do-table>
    </div>
    <div class="row mt-2">
      <p class="text-decoration-underline h6">Bereits erledigt:</p>
      <to-do-table :toDos="checkToDos(true)" :deleteToDo="deleteToDo" :editTodo="editTodo"></to-do-table>
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
      toDos: [], // { id: 1, titel: 'Test-Titel', description: 'Test-Beschreibung', module: 'Test-Modul', date: '31.12.2021', favorite: false, done: false }
      searchInput: '',
      isModalOpen: false,
      modalData: null
    }
  },
  methods: {
    checkToDos (isDone) {
      return this.toDos.filter(a => a.done === isDone && (a.formatDate.includes(this.searchInput) || a.module.includes(this.searchInput))).sort((a) => a.favorite ? -1 : 1)
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
      let method = 'POST'
      const findIndex = this.toDos.findIndex(a => a.id === toDo.id)
      if (findIndex !== -1) {
        endpoint += '/' + toDo.id
        method = 'PUT'
      }

      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      const date = toDo.date.toString().split('-')
      console.log(date)
      date[0] = parseInt(date[0])
      date[1] = parseInt(date[1])
      date[2] = parseInt(date[2])
      toDo.date = date
      const toDoStringify = JSON.stringify(toDo)
      const requestOptions = {
        method: method,
        headers: headers,
        body: toDoStringify,
        redirect: 'follow'
      }
      const response = await fetch(endpoint, requestOptions)

      if (response.ok) {
        const year = toDo.date[0]
        let month = toDo.date[1]
        let day = toDo.date[2]
        if (month < 10) {
          month = '0' + month
        }
        if (day < 10) {
          day = '0' + day
        }
        toDo.date = year + '-' + month + '-' + day
        toDo.formatDate = day + '.' + month + '.' + year
        if (findIndex !== -1) {
          this.toDos[findIndex] = toDo
        } else {
          toDo.id = parseInt(response.headers.get('location'))
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
        const year = toDo.date[0]
        let month = toDo.date[1]
        let day = toDo.date[2]
        if (month < 10) {
          month = '0' + month
        }
        if (day < 10) {
          day = '0' + day
        }
        toDo.date = year + '-' + month + '-' + day
        toDo.formatDate = day + '.' + month + '.' + year
        this.toDos.push(toDo)
      }))
      .catch(error => console.log('error', error))
  }
}
</script>

<style scoped>

</style>
