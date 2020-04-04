<template>
  <div id="timer">
    <div class="time">
      <span>{{ now | dateFormat('HH:mm') }}</span>
      <span>{{ now | dateFormat('ss') }}</span>
    </div>
    <div class="date">
      {{ now | dateFormat('yyyy-MM-dd') }}<span class="week">{{ weekdayMap[now.getDay()] }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Time",
    data() {
      return {
        now: new Date(),
        interval: ''
      }
    },
    computed: {
      weekdayMap() {
        return {
          1: '星期一',
          2: '星期二',
          3: '星期三',
          4: '星期四',
          5: '星期五',
          6: '星期六',
          7: '星期天',
        }
      }
    },
    mounted() {
      this.interval = setInterval(this.runner, 1000)
    },
    destroy() {
      clearInterval(this.interval)
    },
    methods: {
      runner() {
        this.now = new Date();
      }
    }
  }
</script>

<style lang="less" scoped>
  #timer {
    color: white;
    display: inline-flex;
    flex-direction: column;

    .time {
      display: flex;
      align-items: flex-end;

      span:first-child {
        letter-spacing: 1rem;
        line-height: 0.85;
        font-size: 6rem;
      }

      span:nth-child(2) {
        line-height: 1;
        font-size: 2.5rem;
      }
    }

    .date {
      font-size: 2rem;
      padding-top: 1rem;
      letter-spacing: 0.2rem;
      .week {
        padding-left: 1rem;
      }
    }
  }
</style>