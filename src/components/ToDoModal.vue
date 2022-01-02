<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 v-if="modalData" class="modal-titel">ToDo bearbeiten</h5>
              <h5 v-else class="modal-titel"> <strong>Erstelle eine neue To Do.</strong></h5>
            </div>
            <form class="needs-validation" id="to-do-create" novalidate>
            <div class="modal-body">
              <div class="form-group">
                <label>Titel</label>
                <input type="text" class="form-control" v-model="titel" placeholder="Bitte gebe einen Titel ein..." required>
                <div class="invalid-feedback">
                  Bitte gebe den Titel deiner ToDo ein.
                </div>
              </div>
              <div class="form-group mt-3 needs-validation" novalidate>
                <label>Beschreibung</label>
                <input type="text" class="form-control" v-model="description" placeholder="Bitte gebe eine Beschreibung ein..." required>
                <div class="invalid-feedback">
                  Bitte gebe eine Beschreibung ein.
                </div>
              </div>
              <div class="form-group mt-3 needs-validation" novalidate>
                <label>Modul</label>
                <input type="text" class="form-control" v-model="module" placeholder="Bitte gebe das Modul ein..." required>
                <div class="invalid-feedback">
                  Bitte gebe das Modul ein.
                </div>
              </div>
              <div class="form-group mt-3 needs-validation" novalidate>
                <label>Deadline</label>
                <input type="date" class="form-control" v-model="date" required>
                <div class="invalid-feedback">
                  Bitte gebe das heutige Datum oder ein Datum in der Zukunft ein.
                </div>
              </div>
              <div class="form-group mt-3">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="isFavorite" v-model="isFavorite">
                  <label class="form-check-label" for="isFavorite">
                    Hohe Priorität?
                  </label>
                </div>
              </div>
              <div v-if="this.serverValidationMessages">
                <ul>
                  <li v-for="(message, index) in serverValidationMessages" :key="index" style="color: red">
                    {{ message }}
                  </li>
                </ul>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="closeModal">Schließen</button>
              <button type="button" class="btn btn-primary" @click="createToDo">Speichern</button>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ToDoModal',
  props: {
    modalData: Object,
    editTodo: Function,
    closeModal: Function
  },
  data () {
    return {
      titel: '',
      description: '',
      module: '',
      date: '',
      isFavorite: false,
      done: false,
      response: {}
    }
  },
  mounted () {
    if (this.modalData) {
      this.title = this.modalData.titel
      this.description = this.modalData.description
      this.module = this.modalData.module
      this.date = this.modalData.date
    }
  },
  emits: ['created'],
  methods: {
    async createToDo () {
      if (this.validate()) {
        const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/todos'
        const headers = new Headers()
        headers.append('Content-Type', 'application/json')
        const toDo = JSON.stringify({
          titel: this.titel,
          description: this.description,
          module: this.module,
          date: this.date,
          done: this.done,
          isFavorite: this.isFavorite
        })
        const requestOptions = {
          method: 'POST',
          headers: headers,
          body: toDo,
          redirect: 'follow'
        }
        const response = await fetch(endpoint, requestOptions)
        await this.handleResponse(response)
      }
    },
    async handleResponse (response) {
      if (response.ok) {
        this.$emit('created', response.headers.get('location'))
        document.getElementById('close-modal').click()
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
      const form = document.getElementById('to-do-create')
      form.classList.add('was-validated')
      return form.checkValidity()
    }
  }
}
</script>

<style scoped>

</style>
