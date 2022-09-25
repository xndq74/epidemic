<template>
  <div>
    <van-field
      v-model="fieldValue"
      is-link
      readonly
      label="地区"
      placeholder="请选择所在地区"
      @click="show = true"
    />
    <van-popup v-model="show" round position="bottom">
      <van-cascader
        v-model="cascaderValue"
        title="请选择所在地区"
        :options="cities"
        @close="show = false"
        @finish="onFinish"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  // 出行政策
  name: 'SpringView',
  props: {
    cities: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      // 是否可见
      show: false,
      // 选中后的城市
      fieldValue: '',
      // 城市代码
      cascaderValue: '',
      // 选项列表，children 代表子选项，支持多级嵌套
      options: [
        {
          text: '浙江省',
          value: '330000',
          children: [{ text: '杭州市', value: '330100' }]
        },
        {
          text: '江苏省',
          value: '320000',
          children: [{ text: '南京市', value: '320100' }]
        }
      ]
    }
  },
  methods: {
    // 全部选项选择完毕后，会触发 finish 事件
    onFinish ({ selectedOptions }) {
      this.show = false
      this.fieldValue = selectedOptions.map((option) => option.text).join('/')
      this.$emit('OnInCitie', this.cascaderValue)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
