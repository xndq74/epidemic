<template>
  <div class="case-num">
    <div class="container">
      <div class="title">
        <span>截至 {{lastUpdateTime}} 全国数据统计</span>
      </div>
    </div>
    <div class="num" v-if="chinaTotal.today">
      <ul class="count" v-if='chinaTotal.today'>
        <li>
          <div class="create-item">
            <div class="create-count">
              <b>
                较昨日<em style="color: rgb(247, 76, 49)">{{Add(chinaTotal.today.storeConfirm)}}</em>
              </b>
            </div>
            <strong style="color: rgb(247, 76, 49)">{{existingConfirmed}}</strong>
            <span>现有确诊</span>
          </div>
        </li>

        <li>
          <div class="create-item">
            <div class="create-count">
              <b>
                较昨日<em style="color: rgb(247, 130, 7)">{{Add(chinaTotal.today.confirm)}}</em>
              </b>
            </div>
            <strong style="color: rgb(247, 130, 7)">{{chinaTotal.total.confirm}}</strong>
            <span>累计确诊</span>
          </div>
        </li>
        <li>
          <div class="create-item">
            <div class="create-count">
              <b>
                较昨日<em style="color: rgb(162, 90, 78)">{{Add(chinaTotal.today.input)}}</em>
              </b>
            </div>
            <strong style="color: rgb(162, 90, 78)">{{chinaTotal.total.input}}</strong>
            <span>累计境外输入</span>
          </div>
        </li>
        <li>
          <div class="create-item">
            <div class="create-count">
              <b>
                较昨日<em style="color: rgb(174, 33, 44)">{{Add(chinaTotal.today.heal)}}</em>
              </b>
            </div>
            <strong style="color: rgb(174, 33, 44)">{{chinaTotal.total.heal}}</strong>
            <span>累计治愈</span>
          </div>
        </li>
        <li>
          <div class="create-item">
            <div class="create-count">
              <b>
                较昨日<em style="color: rgb(93, 112, 146)">{{Add(chinaTotal.today.dead)}}</em>
              </b>
            </div>
            <strong style="color: rgb(93, 112, 146)">{{chinaTotal.total.dead}}</strong>
            <span>累计死亡</span>
          </div>
        </li>
        <li>
          <div class="create-item">
            <div class="create-count">
              <b>
                较昨日<em style="color: rgb(40, 183, 163)">{{Add(chinaTotal.extData.incrNoSymptom)}}</em>
              </b>
            </div>
            <strong style="color: rgb(40, 183, 163)">{{chinaTotal.extData.noSymptom}}</strong>
            <span>现存无症状</span>
          </div>
        </li>
      </ul>
    </div>
    <van-skeleton title :row="2" v-else/>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'VirusNum',
  data () {
    return {
      // 疫情数据
      chinaTotal: {},
      // 截止时间
      lastUpdateTime: ''
    }
  },
  mounted () {
    // 获取数据
    this.getData()
  },
  methods: {
    getData () {
      axios.get('ug/api/wuhan/app/data/list-total').then((resolve) => {
        if (resolve.data.code === 10000) {
          // console.log(resolve.data.data)
          this.chinaTotal = resolve.data.data.chinaTotal
          this.lastUpdateTime = resolve.data.data.lastUpdateTime
          this.$bus.$emit('chinaDayList', resolve.data.data.chinaDayList)
        }
      })
    },
    Add (num) {
      if (num >= 0) {
        return '+' + num
      } else {
        return num
      }
    }
  },
  computed: {
    existingConfirmed () {
      return this.chinaTotal.total.confirm - this.chinaTotal.total.dead - this.chinaTotal.total.heal
    }
  }
}
</script>

<style lang="less" scoped>
.case-num {
    padding: 0.16rem;
    background: #fff;
}
.container {
    margin: -0.16rem 0 0;
    font-size: 0.12rem;
}
.title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.08rem 0 0.07rem;
    line-height: 0.24rem;
}
.title span {
    color: #666;
}
.title em {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 0.24rem;
    margin-right: -0.16rem;
    padding: 0 0.08rem;
    color: #666;
    font-style: normal;
    background-color: #f7f7f7;
    border-radius: 0.12rem 0 0 0.12rem;
}
.title em img {
    width: 0.123rem;
    height: 0.123rem;
    margin-right: 0.037rem;
}
.num {
    position: relative;
    text-align: center;
    background: #fff;
}
.num::after {
    position: absolute;
    top: -0.01rem;
    left: -0.01rem;
    display: block;
    width: 200%;
    height: 200%;
    border: 0.01rem solid #ebebeb;
    border-radius: 0.08rem;
    box-shadow: 0 0.04rem 0.12rem 0 rgba(0, 0, 0, 0.05);
    transform: scale(0.5);
    transform-origin: 0 0;
    content: "";
}
.num ul {
    flex-flow: wrap;
    position: relative;
    display: flex;
    margin: 0;
    padding: 0.08rem 0 0.12rem;
}
.num ul li {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: 33.3333333%;
    margin: 10px 0;
}
.num ul li .create-item {
    position: relative;
    text-align: center;
}
.num ul li .create-item .create-count {
    display: flex;
    align-items: center;
    height: 0.12rem;
    margin-bottom: 0.02rem;
    color: #666;
    font-weight: 400;
    font-size: 0.15rem;
}
.num ul li .create-item .create-count em {
    font-weight: 400;
    font-style: normal;
}
.num ul li strong {
    margin-bottom: 0.01rem;
    font-weight: 700;
    font-size: 0.25rem;
    line-height: 0.30rem;
}
.num ul li span {
    display: block;
    color: #333;
    font-weight: 700;
    font-size: 0.11rem;
    line-height: 0.15rem;
}
</style>
