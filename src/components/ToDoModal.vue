<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 v-if="modalData" class="modal-titel">ToDo bearbeiten</h5>
              <h5 v-else class="modal-titel">ToDo erstellen</h5>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label>Titel</label>
                <input type="text" class="form-control" v-model="title" placeholder="Bitte gebe einen Titel ein...">
              </div>
              <div class="form-group mt-3">
                <label>Beschreibung</label>
                <input type="text" class="form-control" v-model="description" placeholder="Bitte gebe eine Beschreibung ein...">
              </div>
              <div class="form-group mt-3">
                <label>Modul</label>
                <input type="text" class="form-control" v-model="module" placeholder="Bitte gebe das Modul ein...">
              </div>
              <div class="form-group mt-3">
                <label>Deadline</label>
                <input type="date" class="form-control" v-model="date">
              </div>
              <div class="form-group mt-3">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="isFavorite" v-model="isFavorite">
                  <label class="form-check-label" for="isFavorite">
                    Hohe Priorität?
                  </label>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="closeModal">Schließen</button>
              <button type="button" class="btn btn-primary" @click="saveData">Speichern</button>
            </div>
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
      isFavorite: false,
      response: {}
    }
  },
  methods: {
    saveData () {
      if (this.title.length && this.module.length && this.date.length) {
        this.response = {}
        if (this.modalData) {
          this.response = this.modalData
        } else {
          this.response.isFavorite = false
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

</style>
