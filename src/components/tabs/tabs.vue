
<script>
import contentComponent from './contentComponent.vue'
export default {
  // tab栏的切换的组件
  name: 'myTabs',
  data () {
    return {
      // li中显示的数据 需要从tab中获取 往tab的pans中添加 让后在contentComponent中遍历
      pans: []
    }
  },
  props: {
    // 当前该高亮的tabs 是哪个
    currentIndex: {
      type: [String, Number],
      default: 1
    }
  },
  methods: {
    setCurrentIndex (index) {
      this.$emit('click', index)
    }
  },
  render () {
    return (
      <div>
        <ul class='tabs-header'>
          {this.$slots.default}
        </ul>
        <contentComponent pans={this.pans} />
      </div>
    )
  }

}
</script>

<style lang="less" scoped>
.tabs-header {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    border-bottom: 2px solid #ededed;
}
</style>
