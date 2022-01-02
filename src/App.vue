<template>
  <div class="background">
  <navbar></navbar>
  <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar'

export default {
  name: 'App',
  components: { Navbar }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.background  {
  background: #f6d365;
  background: -webkit-linear-gradient(to left, rgba(246, 211, 101, 1), rgba(253, 160, 133, 1));
  background: linear-gradient(to left, rgba(246, 211, 101, 1), rgba(253, 160, 133, 1));
  height: 100vh;
}
</style>
