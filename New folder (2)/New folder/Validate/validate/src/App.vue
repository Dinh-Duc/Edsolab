<template>
    <date-pick v-model="date"></date-pick>
</template>

<script>
import DatePick from 'vue-date-pick'
import 'vue-date-pick/dist/vueDatePick.css'

export default {
  components: {DatePick},
  data: () => ({
    date: '18-2-2021'
  })
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
