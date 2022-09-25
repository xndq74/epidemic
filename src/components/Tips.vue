<template>
  <div style="height: 630px;">
    <h3 class="title">出行防护贴士</h3>
    <van-tabs type="card">
      <van-tab :title="tip.name" v-for="tip in tipData" :key="tip.key">
        <m-markdown-preview
          :markdown="tip.content"
          :options="{ html: false }"
        ></m-markdown-preview>
      </van-tab>
      <!-- <van-tab title="飞机">飞机</van-tab>
      <van-tab title="客运汽车">客运汽车</van-tab>
      <van-tab title="自驾">自驾</van-tab> -->
    </van-tabs>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  // 出行提示
  name: 'Tips',
  data () {
    return {
      tipData: []
    }
  },
  mounted () {
    this.getTips()
  },
  methods: {
    getTips () {
      axios
        .get('/2021/0126/525/8903235348490001643-135.json')
        .then((resolve) => {
          if (resolve.data.code === 'success') {
            this.tipData = resolve.data.data
          }
        })
    }
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

.m-markdown-preview {
  padding: 5px 5px;
  margin: 10px 15px 0 15px;
  background-color: #f7f7f7;
  font-size: 15px;
  line-height: 25px;
  border: 0.01rem solid #ebebeb;
  border-radius: 10px;
  box-shadow: 0 0.04rem 0.12rem 0 rgb(0 0 0 / 5%);
}
</style>
