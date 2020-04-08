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
    interval: 0,
    mounted() {
      // 2小时刷新一次页面
      this.interval = setInterval(() =>{
        location.reload();
      }, 1000*60*60*2);
    },
    destroy() {
      clearInterval(this.interval)
    }
  }
</script>

<style lang="less">
  body {
    background-color: black;
    padding: 32px;
  }

  #app {
  }
</style>
