<template>
  <div id="app">
    <Clock/>
  </div>
</template>

<script>
  import Clock from "@/components/Clock"

  export default {
    components: {
      Clock
    },
    name: 'App',
  }
</script>

<style lang="less">
  body {
    background-color: black;
    padding: 2rem;
  }

  #app {
  }
</style>
