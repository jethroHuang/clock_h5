<template>
  <div id="app">
    <Clock/>
    <n-co-v id="nCov"/>
    <weather id="weather"/>
  </div>
</template>

<script>
  import Clock from "@/components/Clock"
  import NCoV from "@/components/NCoV"
  import Weather from "@/components/Weather"

  export default {
    components: {
      Clock,NCoV, Weather
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
    color: white;
    margin: 0;
    padding: 0;
  }

  #app {
    position: fixed;
    height: 100vh;
    width: 100vw;
  }

  #nCov {
    position: absolute;
    bottom: 0;
    left: 0;
  }

  #weather {
    position: absolute;
    top: 0;
    right: 0;
  }
</style>
