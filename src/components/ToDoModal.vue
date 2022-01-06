<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 v-if="modalData.id" class="modal-title">ToDo bearbeiten</h5>
              <h5 v-else class="modal-titel"> <strong>Erstelle eine neue To Do.</strong></h5>
            </div>
            <form class="needs-validation" id="to-do-create" novalidate>
            <div class="modal-body">
              <div class="form-group">
                <label>Titel</label>
                <input type="text" class="form-control" v-model="title" placeholder="Bitte gebe einen Titel ein..." required>
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
              <button type="button" class="btn btn-primary" @click="saveData">Speichern</button>
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
      title: '',
      description: '',
      module: '',
      date: '',
      response: {}
    }
  },
  methods: {
    saveData () {
      //  if (this.validate()) {
      if (this.title !== '' && this.module !== '' && this.date !== '') {
        this.response = {}
        if (this.modalData.id) {
          this.response = this.modalData
        } else {
          this.response.favorite = false
          this.response.done = false
        }
        this.response.titel = this.title
        this.response.description = this.description
        this.response.module = this.module
        this.response.date = this.date
        this.editTodo(this.response)
      }
    }
  },
  // validate () {
  // let valid = true
  //  const forms = document.querySelectorAll('.needs-validation')

  //  Array.prototype.slice.call(forms)
  //    .forEach(function (form) {
  //      form.addEventListener('submit', function (event) {
  //        if (!form.checkValidity()) {
  //          valid = false
  //          event.preventDefault()
  //          event.stopPropagation()
  //        }

  //        form.classList.add('was-validated')
  //      }, false)
  //    })
  //  return valid
  // },
  mounted () {
    if (this.modalData) {
      this.title = this.modalData.titel
      this.description = this.modalData.description
      this.module = this.modalData.module
      this.date = this.modalData.date
    }
  }
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
</style>
