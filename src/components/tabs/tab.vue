
<script>
export default {
  // tab栏最里面的容器
  name: 'myTab',
  props: {
    label: {
      type: String,
      default: 'tab'
    },
    index: {
      type: [String, Number],
      default: 1
    }
  },
  // 用计算属性计算出是否高亮
  computed: {
    // 怎么获取父组件身上的属性就是需要用到$parent.currentIndex 和 自己的index 相比较
    isActive () {
      return this.$parent.currentIndex === this.index
    }
  },
  methods: {
    setIndex () {
      this.$parent.setCurrentIndex(this.index)
    }
  },
  mounted () {
    this.$parent.pans.push(this)
  },
  render () {
    // 如果父组件的currentIndex 和自己身上的index 相同就高亮
    const className = {
      tab: true,
      active: this.isActive
    }
    return (
      <li onClick={this.setIndex} class={className}>{this.label}</li>
    )
  }

}
</script>

<style lang="less" scoped>
.tab {
    flex: 1;
    list-style: none;
    line-height: 40px;
    margin-right: 30px;
    position: relative;
    text-align: center;
}

.tab.active {
    border-bottom: 2px solid blue;
}
</style>
