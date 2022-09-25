import echarts from 'echarts'
import nameMap from './name'
export default {
  install (Vue) {
    // 往vue原型对象上挂载一个数据
    Object.defineProperties(Vue.prototype, {
      $echarts: {
        get () {
          return {
            chinaMap (id, data) {
              const myEcharts = echarts.init(document.getElementById(id))
              const option = {
                // 提示信息
                tooltip: {
                  triggerOn: 'click', // 事件类型
                  enterable: true, // 鼠标是否可进入提示框浮层中，默认为false，如需详情内交互，如添加链接，按钮，可设置为 true。
                  formatter (data) {
                    return "<a href='/#/city/" + data.name + "' style='color:#fff'><div><p>" + data.name + '</p><p>现存确诊:' + data.value + '</p></div></a>'
                  }
                },
                visualMap: [{ // 映射-颜色值
                  orient: 'vertical', // 分段方向:horizontal水平
                  type: 'piecewise', // 分段
                  pieces: [ // 配置颜色区间
                    { min: 0, max: 0, color: '#FFFFFF' },
                    { min: 1, max: 10, color: '#FFF2CF' },
                    { min: 10, max: 100, color: '#FDD2A0' },
                    { min: 100, max: 500, color: '#FF8C71' },
                    { min: 500, max: 999, color: '#E64B45' },
                    { min: 1000, color: '#BD1316' }
                  ]
                }],
                series: [{
                  name: '省',
                  type: 'map', // 配置图表类型
                  map: 'china', // 中国地图
                  roam: false, // 是否允许自动缩放
                  zoom: 1.2, // 地图缩放比例
                  label: { // 配置字体
                    normal: {
                      show: true,
                      textStyle: {
                        fontSize: 10
                      }
                    }
                  },
                  itemStyle: { // 配置地图样式
                    normal: {
                      areaColor: 'rgba(0,255,236,0)',
                      borderColor: 'rgba(0,0,0,0.2)'
                    },
                    emphasis: { // 选中的区域颜色及阴影效果等
                      areaColor: 'rgba(255,180,0,0.8)',
                      shadowOffsetX: 0,
                      shadowOffsetY: 0,
                      shadowBlur: 20,
                      borderWidth: 0
                    }
                  },
                  // data:[
                  //     {name:"内蒙古",value:10,itemStyle:{ normal:{ areaColor:"#f00" } }}
                  // ]
                  data: data
                }]
              }
              myEcharts.setOption(option)
            },
            worldMap (id, data) {
              const myEcharts = echarts.init(document.getElementById(id))
              const option = {
                tooltip: {
                  formatter (data) {
                    return '<div><p>' + data.name + '</p><p>现存确诊:' + data.value + '</p></div>'
                  }
                },
                visualMap: [{ // 映射-颜色值
                  orient: 'vertical', // 分段方向:horizontal水平
                  type: 'piecewise', // 分段
                  pieces: [ // 配置颜色区间
                    { min: 0, max: 0, color: '#FFFFFF' },
                    { min: 1, max: 1000, color: '#FDFDCF' },
                    { min: 1000, max: 10000, color: '#FE9E83' },
                    { min: 10000, max: 500000, color: '#E55A4E' },
                    { min: 500000, color: '#4F070D' }
                  ]
                }],
                series: [{
                  name: '世界地图',
                  type: 'map', // 配置图表类型
                  map: 'world', // 中国地图
                  roam: true, // 是否允许自动缩放
                  zoom: 1.8, // 地图缩放比例
                  label: { // 配置字体
                    normal: {
                      show: false, // 控制地图显示名字
                      textStyle: {
                        fontSize: 8
                      }
                    }
                  },
                  nameMap,
                  itemStyle: { // 配置地图样式
                    normal: {
                      areaColor: 'rgba(0,255,236,0)',
                      borderColor: 'rgba(0,0,0,0.2)'
                    },
                    emphasis: { // 选中的区域颜色及阴影效果等
                      areaColor: 'rgba(255,180,0,0.8)',
                      shadowOffsetX: 0,
                      shadowOffsetY: 0,
                      shadowBlur: 20,
                      borderWidth: 0
                    }
                  },
                  data: data
                }]
              }
              myEcharts.setOption(option)
            },
            provinceMap (id, cityName, data) {
              const myEcharts = echarts.init(document.getElementById(id))
              const option = {
                tooltip: {
                  formatter (data) {
                    return '<div><p>' + data.name + '</p><p>累计确诊:' + data.value + '</p></div>'
                  }
                },
                visualMap: [{ // 映射-颜色值
                  orient: 'vertical', // 分段方向:horizontal水平
                  type: 'piecewise', // 分段
                  pieces: [ // 配置颜色区间
                    { min: 0, max: 0, color: '#FFFFFF' },
                    { min: 1, max: 500, color: '#FDFDCF' },
                    { min: 500, max: 1000, color: '#FE9E83' },
                    { min: 1000, max: 5000, color: '#E55A4E' },
                    { min: 5000, color: '#4F070D' }
                  ]
                }],
                series: [{
                  name: '市',
                  type: 'map', // 配置图表类型
                  map: cityName, // 必须写中文
                  roam: true, // 是否允许自动缩放
                  zoom: 1.4, // 地图缩放比例
                  label: { // 配置字体
                    normal: {
                      show: true,
                      textStyle: {
                        fontSize: 10
                      }
                    }
                  },
                  itemStyle: { // 配置地图样式
                    normal: {
                      areaColor: 'rgba(0,255,236,0)',
                      borderColor: 'rgba(0,0,0,0.2)'
                    },
                    emphasis: { // 选中的区域颜色及阴影效果等
                      areaColor: 'rgba(255,180,0,0.8)',
                      shadowOffsetX: 0,
                      shadowOffsetY: 0,
                      shadowBlur: 20,
                      borderWidth: 0
                    }
                  },
                  data
                }]
              }
              myEcharts.setOption(option)
            },
            lineEchar (id, DateData, name1, name2, data1, data2) {
              const myEcharts = echarts.init(document.getElementById(id))
              const option = {
                title: {
                  // text: 'Stacked Line'
                },
                tooltip: {
                  triggerOn: 'mousemove', // 事件类型
                  trigger: 'axis'
                },
                legend: {
                  // data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
                },
                grid: {
                  left: '3%',
                  right: '4%',
                  bottom: '3%',
                  containLabel: true
                },
                toolbox: {
                  feature: {
                    saveAsImage: {}
                  }
                },
                xAxis: {
                  type: 'category',
                  boundaryGap: false,
                  data: DateData
                },
                yAxis: {
                  type: 'value'
                },
                series: [
                  {
                    name: name1,
                    type: 'line',
                    stack: 'Total',
                    data: data1
                  },
                  {
                    name: name2,
                    type: 'line',
                    stack: 'Total',
                    data: data2
                  }
                ]
              }
              myEcharts.setOption(option)
            }
          }
        }
      }
    })
  }
}
