<template>
  <div class="info">
    <p class="title">
      <i></i>
      病毒信息
    </p>
    <div class="content" v-if="newslist.news">
      <p v-for="itmes in newslist.news" :key="itmes.id"><a :href="itmes.sourceUrl">{{itmes.title}}</a></p>
    </div>
    <van-skeleton title :row="3" v-else  />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'VirusInfo',
  data () {
    return {

    }
  },
  mounted () {
    this.getNews()
  },
  methods: {
    getNews () {
      this.$store.dispatch('getNews')
    }
  },
  computed: {
    ...mapState(['newslist'])
  }
}
</script>

<style lang="less" scoped>
.info {
  padding: 0.16rem;
  background: #fff;
  border-bottom: 1px solid #f1f1f1;
}
.title {
  font-size: 0.17rem;
}

.title i {
  display: inline-block;
  width: 0.04rem;
  height: 0.16rem;
  margin-right: 0.03rem;
  vertical-align: middle;
  background: #4169e2;
}
.content {
  padding: 0.06rem 0.16rem;
}
.content p {
  margin-bottom: 8px;
}
.content p a {
  font-size: 16px;
  margin: 5px 0;
  color: #000;
}
.content p::before{
  content: '最新';
  background-color: #f74c31;
  font-size: 14px;
  color: #fff;
  border-radius: 2px;
  margin-right: 5px;

}
.content p::after{
  content: '>';
  float: right;
}
</style>
