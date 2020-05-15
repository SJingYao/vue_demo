<template>
  <div class="weather-tag">
    <p>
      <i class="iconfont icon-date"></i>
      {{ cityInfo.date }} {{ cityInfo.week }}
    </p>
    <p>
      <i class="iconfont icon-icon-test"></i>
      {{ cityInfo.city }}
    </p>
    <p>
      <i class="iconfont icon-tianqi1"></i>
      {{ cityInfo.weather }}
    </p>
  </div>
</template>

<script>
import { getWeather } from '@/api/Home/getWeather'

export default {
  data() {
    return {
      // 天气预报接口的key
      appkey: '0109d5f9fed2525d',
      cityInfo: {
        // city: '',
        // cityid:'',
        // citycode:'',
        // date:'',
        // week:'',
        // weather:'',
        // temp:'',
        // temphigh:'',
        // templow:'',
        // winddirect:'',
        // windpower:'',
      }
    }
  },
  created() {
    this.getWeatherData()
  },
  methods: {
    getWeatherData() {
      getWeather({ appkey: this.appkey, city: '北京' }).then(response => {
        let { result } = response
        this.cityInfo = result
      })
    }
  }
}
</script>

<style scoped lang="scss">
.weather-tag {
  display: flex;
  flex-flow: column;
  line-height: normal;
  text-align: center;
  user-select: none;
  i {
    padding: 10px;
  }
}
</style>
