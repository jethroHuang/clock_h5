<template>
  <div class="weather" v-show="onOff">
    <icon :icon-name="weaImg" icon-color="white" icon-width="50px" icon-height="50px" class="icon"></icon>
    <div class="weather-info">
      <div class="temperature">
        {{wea}}&nbsp;{{temperature}} ℃
      </div>
      <div class="interval">
        {{lowTemperature}}&nbsp;~&nbsp;{{heightTemperature}} ℃
      </div>
    </div>
  </div>
</template>

<script>
  import '@/assets/weather/iconfont'

  export default {
    name: "weather",
    data() {
      return {
        onOff: false,
        wea: '',
        weaImg: '', // 图标
        temperature: 0, // 当前温度
        heightTemperature: 0, // 高温
        lowTemperature: 0 // 低温
      }
    },
    methods: {
      /**
       * 加载天气数据
       */
      async loadData() {
        try {
          const res = await this.$axios.get('https://tianqiapi.com/api', {
            params: {
              version: 'v6',
              appid: '64271232',
              appsecret: 'j89h1Ulo'
            }
          })
          if (res.status === 200) {
            const data = res.data
            this.wea = data['wea']
            this.weaImg = this.getImg(data['wea_img'])
            this.temperature = data['tem']
            this.heightTemperature = data['tem1']
            this.lowTemperature = data['tem2']
            this.onOff = true
          } else {
            this.onOff = false
          }
        } catch (e) {
          this.onOff = false
        }
      },

      /**
       * 根据api返回的 wea_img 字段获取图标 icon-name
       * @param wea_img
       * @returns string icon-name
       */
      getImg(wea_img) {
        const imgs = {
          'xue': 'icon-weather_baoxue',
          'lei': 'icon-weather_leizhenyu',
          'shachen': 'icon-weather_yangsha',
          'wu': 'icon-weather_mai',
          'bingbao': 'icon-bingbao',
          'yun': 'icon-weather_duoyun',
          'yu': 'icon-weather_dayu',
          'yin': 'icon-weather_yin',
          'qing': 'icon-weather_qing'
        }
        return imgs[wea_img]
      }
    },
    mounted() {
      this.loadData()
      // 3小时更新一次数据
      this.interval = setInterval(this.loadData, 1000*60*60*3)
    },
    destroy() {
      // 销毁定时器
      clearInterval(this.interval)
    }
  }
</script>

<style lang="less" scoped>
  .weather {
    display: inline-flex;
    padding: 32px;
    .icon {
      padding-right: 16px;
    }
    .weather-info {
      display: flex;
      flex-direction: column;
      .temperature {
        font-size: 24px;
      }
    }
  }
</style>