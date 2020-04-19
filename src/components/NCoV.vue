<template>
  <div class="nCov" v-show="provinceName !== ''">
    <div><span class="province-name">{{ provinceName }}</span>新冠疫情！！！</div>
    <div class="item">
      <span class="label">现存确诊</span>
      <span class="val">{{currentConfirmedCount | thousand}}</span>
    </div>
    <div class="item">
      <span class="label">累计确诊</span>
      <span class="val">{{confirmedCount | thousand}}</span>
    </div>
    <div class="item">
      <span class="label">死亡人数</span>
      <span class="val">{{deadCount | thousand}}</span>
    </div>
    <div class="item">
      <span class="label">治愈人数</span>
      <span class="val">{{curedCount | thousand}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "NCoV",
    filters: {
      // 按万进行分割
      thousand(value) {
        return value.toString().replace(/(\d)(?=(?:\d{4})+$)/g, '$1,');
      }
    },
    data() {
      return {
        provinceName: '',
        currentConfirmedCount: 0,
        confirmedCount: 0,
        deadCount: 0,
        curedCount: 0
      };
    },
    mounted() {
      // 初始化数据
      this.dataList = []
      this.currentIndex = 0
      this.followCountry = ['美国', '日本', '意大利', '印度']
      this.loadData(true)
      // 1小时刷新以下数据
      this.getDateInterval = setInterval(this.loadData, 1000 * 60 * 60)
      // 1分钟切换一次地区
      this.showDataInterval = setInterval(this.next, 1000 * 60)
    },
    destroy() {
      clearInterval(this.getDateInterval)
      clearInterval(this.showDataInterval)
    },
    methods: {
      async loadData(isInit = false) {
        const api = 'http://api.tianapi.com/txapi/ncovabroad/index'
        const query = '?key=ef19c3b85bdaaab8be8b9a1d7f9be232'
        const res = await this.$axios.get(api + query)
        if (res.data.code === 200) {
          // 取出希望查看的国家列表
          this.dataList = res.data.newslist.filter(item => this.followCountry.includes(item.provinceName))
        }
        if (isInit) {
          this.next()
        }
      },
      // 取出数据到当前数据
      next() {
        if (this.dataList === undefined || this.dataList === null || this.dataList.isEmpty) {
          return
        }
        const item = this.dataList[this.currentIndex]
        this.provinceName = item.provinceName
        this.currentConfirmedCount = item.currentConfirmedCount
        this.confirmedCount = item.confirmedCount
        this.deadCount = item.deadCount
        this.curedCount = item.curedCount
        // 设置下一条的指针
        if (this.currentIndex + 1 > this.dataList.length - 1) {
          this.currentIndex = 0;
        } else {
          this.currentIndex++
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .nCov {
    padding: 32px;

    .province-name {
      padding-right: 4px;
      padding-bottom: 8px;
      display: inline-block;
    }

    .item {
      .label {
        width: 100px;
        display: inline-block;
      }
    }
  }
</style>