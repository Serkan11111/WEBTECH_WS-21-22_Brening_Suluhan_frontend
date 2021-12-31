<template>
  <h1>Persons</h1>
  <div class="container-fluid">
    <to-do-card-list :toDos="this.toDos"></to-do-card-list>
  </div>
  <to-do-create-form @created="addtoDo"></to-do-create-form>
</template>

<script>
import PersonsCardList from '@/components/ToDoCardList'
import PersonsCreateForm from '@/components/ToDoCreateForm'
import ToDoCard from "@/components/ToDoCard";
import ToDoCardList from "@/components/ToDoCardList";
import ToDoCreateForm from "@/components/ToDoCreateForm";

export default {
  name: 'ToDos',
  components: {
    ToDoCreateForm,
    ToDoCardList,
    ToDoCard
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
        .then(person => this.persons.push(person))
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
