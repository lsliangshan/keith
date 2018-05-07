<template>
  <div id="app">
    <router-view name="HomeRouter"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    outline: none;
    -webkit-appearance: none;
  }
  html, body {
    height: 100%;
  }
  #app {
    width: 100%;
    height: 100%;
  }
</style>
