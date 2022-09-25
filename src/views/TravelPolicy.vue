<template>
  <div>
    <van-sticky>
    <van-nav-bar
      title="出行政策"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    </van-sticky>
    <div class="bj">
      <div class="vell">
        <div class="content">
          <div class="title" :class="OutCitieData.classObj">
            <h4>
              出{{ OutCitieData.cityName }}
              <i v-text="riskAreas(OutCitieData)"></i>
            </h4>
          </div>
          <div class="minText">
            <div
              ref="listmenu1"
              :class="{ 'ellipsis-10': !title1.isShowTooltip }"
              class="textContent"
            >
              {{ OutCitieData.outDesc }}
            </div>
            <a
              @click="title1.isShowTooltip = !title1.isShowTooltip"
              v-show="!title1.isShowTooltip"
              >展开全部</a
            >
          </div>
        </div>
        <div class="content">
          <div class="title" :class="InCitieData.classObj">
            <h4>
              进{{ InCitieData.cityName }}
              <i v-text="riskAreas(InCitieData)"></i>
            </h4>
          </div>
          <div class="minText">
            <div
              ref="listmenu2"
              :class="{ 'ellipsis-10': !title2.isShowTooltip }"
              class="textContent"
            >
              {{ InCitieData.highInDesc }}
            </div>
            <a
              @click="title2.isShowTooltip = !title2.isShowTooltip"
              v-show="!title2.isShowTooltip"
              >展开全部</a
            >
          </div>
        </div>
        <div class="content">
          <div class="title" :class="InCitieData.classObj">
            <h4>
              出{{ InCitieData.cityName }}
              <i v-text="riskAreas(InCitieData)"></i>
            </h4>
          </div>
          <div class="minText">
            <div
              ref="listmenu3"
              :class="{ 'ellipsis-10': !title3.isShowTooltip }"
              class="textContent"
            >
              {{ InCitieData.outDesc }}
            </div>
            <a
              @click="title3.isShowTooltip = !title3.isShowTooltip"
              v-show="!title3.isShowTooltip"
              >展开全部</a
            >
          </div>
        </div>
        <div class="content">
          <div class="title" :class="OutCitieData.classObj">
            <h4>
              进{{ OutCitieData.cityName }}
              <i v-text="riskAreas(OutCitieData)"></i>
            </h4>
          </div>
          <div class="minText">
            <div
              ref="listmenu4"
              :class="{ 'ellipsis-10': !title4.isShowTooltip }"
              class="textContent"
            >
              {{ OutCitieData.lowInDesc }}
            </div>
            <a
              @click="title4.isShowTooltip = !title4.isShowTooltip"
              v-show="!title4.isShowTooltip"
              >展开全部</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // 出行政策
  name: 'TravelPolicy',
  data () {
    return {
      title1: {
        isShowTooltip: false
      },
      title2: {
        isShowTooltip: false
      },
      title3: {
        isShowTooltip: false
      },
      title4: {
        isShowTooltip: false
      },
      OutCitieData: {},
      InCitieData: {}
    }
  },
  methods: {
    onClickLeft () {
      this.$router.push({
        name: 'home'
      })
    },
    // 判断风险地区
    riskAreas (data) {
      // const OutCitieData = this.OutCitieData
      // console.log(OutCitieData)
      if (data.dangerAreas) {
        if (data.dangerAreas.length > 0 && data.dangerAreas.length < 10) {
          data.classObj.titleYellow = true
          return '中风险'
        }
        if (data.dangerAreas.length > 10) {
          data.classObj.titleRed = true
          return '高风险'
        }
      }
      return '低风险'
    }
  },
  watch: {
    OutCitieData: {
      // 垃圾代码 想不出好办法才只能土办法解决
      handler () {
        // console.log(this.$refs.listmenu)
        const ev1 = this.$refs.listmenu1
        const ev2 = this.$refs.listmenu2
        const ev3 = this.$refs.listmenu3
        const ev4 = this.$refs.listmenu4
        this.$nextTick(() => {
          const ev1Height = ev1.getBoundingClientRect().height
          const ev2Height = ev2.getBoundingClientRect().height
          const ev3Height = ev3.getBoundingClientRect().height
          const ev4Height = ev4.getBoundingClientRect().height
          if (ev1Height < 179) {
            // 实际宽度 > 可视宽度  文字溢出

            ev1.nextSibling.style.display = 'none'
          }
          if (ev2Height < 179) {
            // 实际宽度 > 可视宽度  文字溢出

            ev2.nextSibling.style.display = 'none'
          }
          if (ev3Height < 179) {
            // 实际宽度 > 可视宽度  文字溢出

            ev3.nextSibling.style.display = 'none'
          }
          if (ev4Height < 179) {
            // 实际宽度 > 可视宽度  文字溢出

            ev4.nextSibling.style.display = 'none'
          }
        })
      }
    }
  },
  beforeCreate () {
    // 接受出行政策
    this.$bus.$on('OutCitieData', (data) => {
      data.classObj = {
        titleGreen: false,
        titleYellow: false,
        titleRed: false
      }
      this.OutCitieData = data
    })
    this.$bus.$on('InCitieData', (data) => {
      data.classObj = {
        titleGreen: false,
        titleYellow: false,
        titleRed: false
      }
      this.InCitieData = data
    })
  },
  beforeDestroy () {
    // 离开组件需要销毁自定义事件
    this.$bus.$off(['InCitieData', 'OutCitieData'])
  }
}
</script>

<style lang="less" scoped>
.bj {
  // position: relative;
  width: 100%;
  height: 300px;
  background: url(@/assets/zcbj.png) no-repeat;
  // 背景样式合适
  background-size: cover;
}
.vell {
  padding-top: 130px;
}
.content {
  width: 358px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 5px;
  // height: 500px;
  padding: 15px 0;
}
.title {
  background-color: #40cca7;
  width: 308px;
  height: 42px;
  border-radius: 5px;
  margin: 0 auto;
}
.titleGreen {
  background-color: #40cca7;
}
.titleYellow {
  background-color: #fbb046;
}
.titleRed {
  background-color: #f57676;
}
.title h4 {
  font-size: 20px;
  color: #fff;
  line-height: 40px;
  margin-left: 20px;
}
h4 i {
  font-size: 10px;
  // padding-left: 5px;
  font-weight: 400;
}
.minText {
  width: 308px;
  background-color: #f7f7f7;
  color: #4d4d4d;
  font-size: 14px;
  border-radius: 5px;
  padding: 12px;

  margin: 10px auto;
  /*
  在css中white-space属性用来控制容器的文本中带有空白符、制表符、换行符等的显示，取值有：

  normal：默认，忽略文本中所有的空白、换行符；只有文本存在 <br> 或文本达到框的约束时，文本才会换行
  nowrap：和normal类似，忽略文本中所有的空白、换行符；遇到框的宽度约束时不会自动换行，文本只有在有 br 时才会换行
  pre：保留文本中的空白、换行符；遇到框的宽度约束时不会自动换行，文本存在 <br> 或文本中有换行符时，文本才会换行
  pre-wrap：和pre类似，保留文本中的空白、换行符；文本存在 <br> 或文本中有换行符时，或者遇到框的宽度约束时，文本都才会换行
  pre-line：会略文本中的空白符；文本存在 <br> 或文本中有换行符时，或者遇到框的宽度约束时，文本都才会换行
  */
  white-space: pre-wrap;
  // height: 220px;
}
.ellipsis-10 {
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 10;
  overflow: hidden;
}
.textContent {
  font-size: 14px;
}
</style>
