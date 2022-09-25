<template>
  <div>
    <p class="title"><i></i>疫情地图</p>
    <van-tabs v-model="active" :lazy-render='false'>
      <van-tab title="中国疫情"><div id="chinaMap"></div></van-tab>
      <van-tab title="世界疫情"><div id="worldMap"></div></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Map',
  data () {
    return {
      chinaData: [],
      active: 0,
      cityList: []
    }
  },
  mounted () {
    // 获得数据并创建中国地图
    this.getData()
  },
  methods: {
    getData () {
      // 调用网易的数据接口
      axios.get('news/wap/fymap2020_data.d.json').then((resolve) => {
        if (resolve.status === 200) {
          console.log(resolve)
          this.cityList = resolve.data.data.list
          const china = resolve.data.data.list.map((item) => {
            return {
              name: item.name,
              value: item.econNum
            }
          })
          const world = resolve.data.data.worldlist.map((item) => {
            return {
              name: item.name,
              value: item.value
            }
          })
          world.push({ name: '格陵兰', value: 0 })
          this.$echarts.chinaMap('chinaMap', china)
          this.$echarts.worldMap('worldMap', world)
        }
      })
    },
    // 获得tabs发送 来的id
    getIndex (id) {
      this.currentIndex = id
    }
  },
  // 我们知道bus的$on的监听应该位于$emit之前，如果在emit之前没有创建监听事件，那么肯定是得不到需要的数据
  // 在离开前发数据，组件2在创建前创建了on就可以接受事件了
  deactivated () {
    this.$bus.$emit('cityList', this.cityList)
  }
}
</script>

<style lang="less" scoped>
#chinaMap {
  // width: 375px;
  width: 100%;
  height: 400px;
}
#worldMap {
  width: 375px;
  // width: 100%;
  height: 400px;
}
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
}
.title::before {
  content: "";
  width: 5px;
  height: 20px;
  background: #4169e2;
  margin-right: 10px;
}
</style>
