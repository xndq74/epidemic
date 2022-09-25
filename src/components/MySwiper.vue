<template>
  <div class="chart">
    <h3 class="title">全国疫情趋势</h3>
    <swiper class="swiper" :options="swiperOption" ref="mySwiper">
      <swiper-slide>
        <!-- 全国确诊 新增加趋势-->
        <div class="existingConfirmed" id="Confirmed"></div>
      </swiper-slide>
      <swiper-slide>
        <!-- 现有确诊 -->
        <div class="existingConfirmed" id="existing"></div>
      </swiper-slide>
      <swiper-slide>
        <!-- 累计死亡 -->
        <div class="existingConfirmed" id="cumulative"></div>
      </swiper-slide>
    </swiper>
    <ul class="navigator">
      <li
        class="navigatorItem"
        @click="onSlideChange(0)"
        :class="{ active: currentIndex === 0 }"
      >
        全国疫情新增趋势
      </li>
      <li
        class="navigatorItem"
        @click="onSlideChange(1)"
        :class="{ active: currentIndex === 1 }"
      >
        累计确诊现有确诊
      </li>
      <li
        class="navigatorItem"
        @click="onSlideChange(2)"
        :class="{ active: currentIndex === 2 }"
      >
        累计治愈累计死亡
      </li>
    </ul>
  </div>
</template>

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
// Import Swiper styles
import 'swiper/css/swiper.css'
export default {
  name: 'MySwiper',
  components: {
    Swiper,
    SwiperSlide
  },
  data () {
    const that = this
    return {
      currentIndex: 0,
      swiperOption: {
        // loop: true,
        allowTouchMove: false,
        on: {
          // 切换的时候触发
          slideChangeTransitionEnd: function () {
            that.currentIndex = this.activeIndex
            console.log(this.activeIndex)
          }
        }

      }
    }
  },
  mounted () {
    // 接受每日确诊人数
    this.$bus.$on('chinaDayList', (data) => {
      // 整理数据
      // 日期
      const date = data.map((item) => {
        return item.date
      })
      // 确诊
      const confirm = data.map((item) => {
        return item.today.confirm
      })
      // 疑似
      const suspect = data.map((item) => {
        return item.today.suspect
      })
      // 累计确诊
      const cumulativeConfirm = data.map((item) => {
        return item.total.confirm
      })
      // 现有确诊
      const storeConfirm = data.map((item) => {
        return item.total.storeConfirm
      })
      // 累计治愈
      const heal = data.map((item) => {
        return item.total.heal
      })
      // 累计死亡
      const dead = data.map((item) => {
        return item.total.dead
      })
      this.$echarts.lineEchar(
        'Confirmed',
        date,
        '确诊',
        '疑似',
        confirm,
        suspect
      )
      this.$echarts.lineEchar(
        'existing',
        date,
        '累计确诊',
        '现有确诊',
        cumulativeConfirm,
        storeConfirm
      )
      this.$echarts.lineEchar(
        'cumulative',
        date,
        '累计死亡',
        '累计治愈',
        dead,
        heal
      )
    })
  },
  methods: {
    onSlideChange (index) {
      this.currentIndex = index
      // console.log(this.swiper)
      // this.$refs.mySwiper.$swiper
      this.$refs.mySwiper.$swiper.slideTo(index, 1000, false)
    }
  }
}
</script>

<style lang="less" scoped>
.line {
  padding: 0 10px;
  width: 100%;
  height: 300px;
}
.chart {
  position: relative;
  background: #fff;
  padding: 0.16rem 0;
}
.chart .title {
  font-size: 0.16rem;
  // margin: 0 0 0.08rem 0.16rem;
}
.chart .swiper-pagination {
  position: absolute;
  text-align: center;
  -webkit-transition: 300ms opacity;
  -o-transition: 300ms opacity;
  transition: 300ms opacity;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  z-index: 10;
}
.chart .swiper-pagination-bullet {
  width: calc(20% - 0.02rem);
  text-align: center;
  background: #f7f7f7;
  padding: 0.045rem;
  box-sizing: border-box;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.02rem;
}
.navigator {
  font-size: 0.12rem;
  list-style: none;
  display: flex;
  padding: 0 0.16rem;
  justify-content: space-around;
  margin: 0.06rem 0 0;
}
.navigatorItem {
  color: #4169e2;
  background: #f1f5ff;
  position: relative;
  width: calc(30% - 0.02rem);
  height: 60px;
  text-align: center;
  background: #f7f7f7;
  padding: 0.045rem;
  box-sizing: border-box;
  color: #888;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.02rem;
  margin-left: 0.025rem;
  font-size: 16px;
}
.active {
  color: #4169e2;
  background: #f1f5ff;
  position: relative;
}
.existingConfirmed {
  width: 100%;
  height: 200px;
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
