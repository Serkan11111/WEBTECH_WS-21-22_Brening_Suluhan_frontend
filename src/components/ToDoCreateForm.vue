<template>
  <button class="btn btn-success sticky-button" data-bs-toggle="offcanvas" data-bs-target="#toDos-create-offcanvas" aria-controls="#toDo-create-offcanvas">
    <i class="bi bi-toDo-plus-fill"></i>
  </button>
  <div class="offcanvas offcanvas-end" tabindex="-1" id="toDo-create-offcanvas" aria-labelledby="offcanvas-label">
    <div class="offcanvas-header">
      <h5 id="offcanvas-label">Neue ToDo</h5>
      <button type="button" id="close-offcanvas" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <form class="text-start needs-validation" id="toDo-create-form" novalidate>
        <div class="mb-3">
          <label for="title" class="form-label">Titel</label>
          <input type="text" class="form-control" id="title" v-model="title" required>
          <div class="invalid-feedback">
            Bitte gib den Titel deiner ToDo ein.
          </div>
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">Beschreibung</label>
          <input type="text" class="form-control" id="description" v-model="description" required>
          <div class="invalid-feedback">
            Bitte gib eine nähere Beschreibung zu deiner ToDo ein.
          </div>
        </div>
        <div class="mb-3">
          <label for="module" class="form-label">Modul</label>
          <input type="text" class="form-control" id="module" v-model="module" required>
          <div class="invalid-feedback">
            Bitte gib das Modul deiner ToDo ein.
          </div>
        </div>
        <div class="mb-3">
          <label for="date" class="form-label">Datum</label>
          <input type="date" class="form-control" id="date" v-model="date" required>
          <div class="invalid-feedback">
            Bitte gib die Deadline deiner ToDo an.
          </div>
        </div>
        <div v-if="this.serverValidationMessages">
          <ul>
            <li v-for="(message, index) in serverValidationMessages" :key="index" style="color: red">
              {{ message }}
            </li>
          </ul>
        </div>
        <div class="mt-5">
          <button class="btn btn-primary me-3" type="submit" @click.prevent="createToDo">Create</button>
          <button class="btn btn-danger" type="reset">Reset</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToDoCreateForm',
  data () {
    return {
      title: '',
      description: '',
      module: '',
      date: '',
      done: false,
      isFavorite: false,
      serverValidationMessages: []
    }
  },
  emits: ['created'],
  methods: {
    async createToDo () {
      if (this.validate()) {
        const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/todos'

        const headers = new Headers()
        headers.append('Content-Type', 'application/json')

        const person = JSON.stringify({
          title: this.title,
          description: this.description,
          module: this.module,
          date: this.date,
          done: this.done,
          isFavorite: this.isFavorite
        })

        const requestOptions = {
          method: 'POST',
          headers: headers,
          body: person,
          redirect: 'follow'
        }

        const response = await fetch(endpoint, requestOptions)
        await this.handleResponse(response)
      }
    },
    async handleResponse (response) {
      if (response.ok) {
        this.$emit('created', response.headers.get('location'))
        document.getElementById('close-offcanvas').click()
      } else if (response.status === 400) {
        response = await response.json()
        response.errors.forEach(error => {
          this.serverValidationMessages.push(error.defaultMessage)
        })
      } else {
        this.serverValidationMessages.push('Unknown error occurred')
      }
    },
    validate () {
      const form = document.getElementById('toDo-create-form')
      form.classList.add('was-validated')
      return form.checkValidity()
    }
  }
}
</script>

<style scoped>
.sticky-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 15px;
  border-radius: 30px;
}
</style>
