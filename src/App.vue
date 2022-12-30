<template>
  <GameOfLife/>
</template>

<script>
import GameOfLife from './components/GameOfLife.vue'

export default {
  name: 'App',
  components: {
    GameOfLife
  }
}
</script>

<style>
@import "../node_modules/picnic/picnic.min.css";
body {
  background-color: #1c1c1c;
  color: #F72585;
}
</style>
