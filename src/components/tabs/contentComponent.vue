
<script>
export default {
  // tabs的内容组件 这里要注意千万不要明名冲突不要和HTML5的元素明明冲突
  name: 'contentComponent',
  props: {
    pans: {
      type: Array,
      default: () => []
    }
  },
  render () {
    return (
      <div>
        {
          // 这里直接遍历 让后那出pans默认插槽的数据
          this.pans.map(item => {
            return <div style={{ display: item.isActive ? 'block' : 'none' }}>{item.$slots.default}</div>
          })
        }
      </div>
    )
  }
}
</script>

<style lang="less" scoped>

</style>
