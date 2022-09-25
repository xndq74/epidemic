<template>
    <div>
        <h3 class="title">出行政策</h3>
        <SpringOut :cities='cities' @OnOutCitie='OnOutCitie'/>
        <SpringIn :cities='cities' @OnInCitie='OnInCitie'/>
        <van-button type="info" round block @click="toTravelPolicy">查询</van-button>
    </div>
</template>

<script>
import axios from 'axios'
import SpringOut from '@/components/SpringOut.vue'
import SpringIn from '@/components/SpringIn.vue'
export default {
  // 出行政策
  name: 'Spring',
  components: {
    SpringOut, SpringIn
  },
  data () {
    return {
      // 处理后的城市数据
      cities: [],
      // 未处理的城市数据
      citieData: [],
      // 出去的政策
      OutCitieData: {},
      // 进入的政策
      InCitieData: {}
    }
  },
  mounted () {
    // 获得出行数据
    this.getTravelData()
  },
  methods: {
    // 获得出行数据
    getTravelData () {
      axios.get('/2021/0127/319/0185768311460321643-135.json').then((resolve) => {
        console.log(resolve.data.data)
        this.citieData = resolve.data.data
        const arr = resolve.data.data.map(item => {
          let children = []
          if (item.cities) {
            children = item.cities.map(option => {
              return {
                text: option.cityName,
                value: option.locationId
              }
            })
          }
          return {
            text: item.provinceShortName,
            value: item.locationId,
            children
          }
        })
        this.cities = arr
      })
    },
    // 出去的城市
    OnOutCitie (OutCitie) {
      let list = {}
      this.citieData.forEach(item => {
        if (item.cities) {
          item.cities.forEach(option => {
            if (option.locationId === OutCitie) {
              list = option
            }
          })
        }
      })
      this.OutCitieData = list
    },
    // 进入城市
    OnInCitie (inCitie) {
      let list = {}
      this.citieData.forEach(item => {
        if (item.cities) {
          item.cities.forEach(option => {
            if (option.locationId === inCitie) {
              list = option
            }
          })
        }
      })
      this.InCitieData = list
    },
    // 跳转到出行查询政策
    toTravelPolicy () {
      if (this.InCitieData.cityName && this.OutCitieData.cityName) {
        this.$router.push({
          name: 'travelPolicy'
        })
      }
    }

  },
  deactivated () {
    // 出行政策
    this.$bus.$emit('OutCitieData', this.OutCitieData)
    // 进入政策
    this.$bus.$emit('InCitieData', this.InCitieData)
  }

}
</script>

<style lang="less" scoped>
.title {
  border-top: 0.005rem solid #ebebeb;
  border-bottom: 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  height: 0.44rem;
  padding: 0 0.16rem;
  font-weight: 500;
  font-size: 0.17rem;
  line-height: 0.44rem;
  background: #fff;
  padding-top: 10px;
}
.title::before {
  content: "";
  width: 5px;
  height: 20px;
  background: #4169e2;
  margin-right: 10px;
}
</style>
