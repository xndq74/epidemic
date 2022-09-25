<template>
  <div>
    <Header />
    <!-- 新闻资讯 -->
    <VirusInof />
    <!-- 疫情数据统计 -->
    <VirusNum />
    <!-- 地图 -->
    <Maps />
    <!-- 轮播图 -->
    <MySwiper />
    <!-- 出行政策 -->
    <Spring />
    <!-- 出行提示 -->
    <Tips />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
// 疫情新闻
import VirusInof from '@/components/VirusInfo.vue'
// 疫情统计数据
import VirusNum from '@/components/VirusNum.vue'
// 地图
import Maps from '@/components/Maps.vue'
// 轮播图
import MySwiper from '@/components/MySwiper.vue'
// 出行政策
import Spring from '@/views/Spring.vue'
// 出行提示
import Tips from '@/components/Tips.vue'
export default {
  name: 'Home',
  // Spring, Tips
  components: { Header, VirusInof, VirusNum, Maps, MySwiper, Spring, Tips }
}
</script>

<style lang="scss" scoped>
</style>
