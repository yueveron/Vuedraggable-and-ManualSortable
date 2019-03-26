<template>
  <div id="app">
    <!-- <SimpleDraggable></SimpleDraggable> -->
    <!-- <DynamaticStyleDraggable></DynamaticStyleDraggable> -->
    <ManualSortable></ManualSortable>
  </div>
</template>

<script>
import SimpleDraggable from './components/SimpleDraggable.vue'
import DynamaticStyleDraggable from './components/DynamaticStyleDraggable.vue'
import ManualSortable from './components/ManualSortable.vue'

export default {
  name: 'app',
  components: {
    SimpleDraggable,
    DynamaticStyleDraggable,
    ManualSortable
  }
}
</script>

<style lang="scss">
*, ::after, ::before {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
button {
  cursor: pointer;
  background-image: none;
  outline: none;
  text-decoration: none;
  border:0;
}
</style>
