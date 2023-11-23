<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import * as echarts from 'echarts';
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import { mapGetters } from 'vuex'
import { getdata } from '@/api/course'

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
      a: "100",
      b: "200",
      c: "300",
      d: "400",
      e: "500",
    }
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

    initChart () {
      const a = { sid: this.sid, wid: this.homeworkid, cid: this.cid }
      getdata(a).then(response => {
        this.a = response.data[""]
        this.b = response.data[""]
        this.c = response.data[""]
        this.d = response.data[""]
        this.e = response.data[""]
      })
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
            data: [
              { value: this.a, name: '90-100' },
              { value: this.b, name: '80-90' },
              { value: this.c, name: '70-80' },
              { value: this.d, name: '60-70' },
              { value: this.e, name: '60以下' }
            ],
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initChart()
    })
  },
}
</script>
