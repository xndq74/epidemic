<template>
  <div>
    <van-sticky>
      <van-nav-bar
        title="城市疫情"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </van-sticky>
    <div id="cityMap"></div>
  </div>
</template>

<script>
export default {
  name: 'City',
  data () {
    return {
      cityList: []
    }
  },
  methods: {
    onClickLeft () {
      this.$router.push({
        name: 'home'
      })
    }
  },
  beforeCreate () {
    this.$bus.$on('cityList', (data) => {
      this.cityList = data
    })
  },
  watch: {
    cityList: {
      //   immediate: true,
      handler (newValue) {
        console.log(newValue)

        const list = newValue.find(
          (item) => item.name === this.$route.params.cityName
        )
        const arr = list.city.map((item) => {
          return {
            name: item.mapName,
            value: item.conNum
          }
        })
        this.$echarts.provinceMap('cityMap', this.$route.params.cityName, arr)
      }
    }
  },
  // 离开组件把全局事件总线解绑
  beforeDestroy () {
    this.$bus.$off('cityList')
  }
}
</script>

<style lang="less" scoped>
#cityMap {
  width: 100%;
  height: 600px;
}
</style>
