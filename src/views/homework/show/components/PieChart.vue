<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import * as echarts from 'echarts';
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import { mapGetters } from 'vuex'
import { getdata90, getdata80, getdata70, getdata60, getdatadown } from '@/api/course'

export default {
  computed: {
    ...mapGetters([
      'name',
      'roles',
      'sid',
      'teacher',
      'cid',
      'homeworkid'
    ])
  },
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '350px'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data () {
    return {
      chart: null,
      a: 1,
      b: 1,
      c: 1,
      d: 1,
      e: 1,
      pieData: [
        { value: 10, name: '90-100' },
        { value: 10, name: '80-90' },
        { value: 10, name: '70-80' },
        { value: 10, name: '60-70' },
        { value: 10, name: '60以下' }
      ]
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.fetchData()
    })
  },
  beforeDestroy () {
    if (!this.chart)
    {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    async fetchData () {
      try
      {
        const a = { wid: this.homeworkid, cid: this.cid }
        getdata90(a).then(response => {
          this.a = response.data//90-100的人数
          getdata80(a).then(response => {
            this.b = response.data//80-90的人数
            getdata70(a).then(response => {
              this.c = response.data//70-80
              getdata60(a).then(response => {
                this.d = response.data//60-70的人数 
                getdatadown(a).then(response => {
                  this.e = response.data//60一下的人数
                  // 模拟异步请求新数据
                  const newData = [
                    { value: this.a, name: '90-100' },
                    { value: this.b, name: '80-90' },
                    { value: this.c, name: '70-80' },
                    { value: this.d, name: '60-70' },
                    { value: this.e, name: '60以下' }
                  ];

                  // 更新数据并重新渲染图表
                  this.pieData = newData;
                  // 初始化图表
                  this.$nextTick(() => {
                    this.initChart()
                  })
                })
              })
            })
          })
        })

      } catch (error)
      {
        console.error("Error fetching data:", error);
      }
    },

    initChart () {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: ['90-100', '80-90', '70-80', '60-70', '60以下']
        },
        series: [
          {
            name: 'WEEKLY WRITE ARTICLES',
            type: 'pie',
            roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '38%'],
            data: this.pieData,
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
    }
  }
}
</script>
