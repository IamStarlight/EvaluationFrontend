<template>
  <div>
    <!-- 作业平均成绩 -->
    <div class="title"><span>作业平均成绩</span></div>
    <div id="barChart" style="width: 800px; height: 400px;"></div>
    <!-- 作业分布图 -->
    <div class="title"><span>作业成绩分布</span></div>
    <div class="chart-wrapper">
      <div class="chart-column" v-for="(chartData, index) in chartDataArray" :key="index">
        <div :id="'pieChart' + index" class="pie-chart"></div>
        <div class="chart-title">{{ chartData.title }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import {mapGetters} from "vuex";
//echarts超过5.xx版本要用这个引入方式
export default {
  computed: {
    ...mapGetters([
      'cid',
      'cname',
      'teacher',
    ])
  },
  data() {
    return {
      scores: [
        { assignment: '作业1', score: 90 },
        { assignment: '作业2', score: 80 },
        { assignment: '作业3', score: 70 },
        { assignment: '作业4', score: 80 },
        // { assignment: '作业5', score: 60 },
        // { assignment: '作业6', score: 70 },
        // { assignment: '作业7', score: 80 },
        // { assignment: '作业8', score: 83 },
        // { assignment: '作业9', score: 77 },
      ],
      selectHomework:'',
      homeworks:[
        { wid: 1, title: '语文' },
        { wid: 2, title: '数学' },
        { wid: 3, title: '英语' },
        // 其他课程...
      ],
      chartDataArray: [
        {
          title:'作业1',
          hwScore: [
            { grade: '0-20', count: 1 },
            { grade: '21-40', count: 2 },
            { grade: '41-60', count: 2 },
            { grade: '61-80', count: 10 },
            { grade: '81-100', count: 30 },
          ] },
        {
          title:'作业2',
          hwScore: [
            { grade: '0-20', count: 1 },
            { grade: '21-40', count: 2 },
            { grade: '41-60', count: 2 },
            { grade: '61-80', count: 13 },
            { grade: '81-100', count: 25 },
          ] },
        {
          title:'作业3',
          hwScore: [
            { grade: '0-20', count: 1 },
            { grade: '21-40', count: 2 },
            { grade: '41-60', count: 2 },
            { grade: '61-80', count: 10 },
            { grade: '81-100', count: 30 },
          ] },
        {
          title:'作业4',
          hwScore: [
            { grade: '0-20', count: 1 },
            { grade: '21-40', count: 2 },
            { grade: '41-60', count: 3 },
            { grade: '61-80', count: 17 },
            { grade: '81-100', count: 18 },
          ] }
      ]
    };
  },
  mounted() {
    this.renderPieChart();
    this.renderBarChart();
  },
  methods: {
    renderPieChart() {
      this.chartDataArray.forEach((chartData, index) => {
        const pieChartElement = document.getElementById('pieChart' + index);
        const pieChart = echarts.init(pieChartElement);

        const option = {
          color: ['#ff6384', '#36a2eb', '#ffce56'],
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)',
          },
          series: [
            {
              name: '作业平均成绩',
              type: 'pie',
              radius: '70%',
              data: chartData.hwScore.map((item) => ({
                name: item.grade,
                value: item.count,
              })),
            },
          ],
        };

        pieChart.setOption(option);
      });
    },
    renderBarChart() {
      const barChartElement = document.getElementById('barChart');
      const barChart = echarts.init(barChartElement);

      const option = {
        color: '#00adb5',
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: this.scores.map((item) => item.assignment),
          axisTick: {
            alignWithLabel: true,
          },
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: '作业成绩',
            type: 'bar',
            barWidth: '60%',
            data: this.scores.map((item) => item.score),
          },
        ],
      };

      barChart.setOption(option);
    },
    choose(){
      const wid = this.selectHomework
      const cid = this.cid
      const data ={
        wid,
        cid
      }
      console.log(this.selectHomework)
    }
  },
};
</script>

<style scoped>
#barChart {
  margin: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.select{
  margin-left: 20px;
}
.chart-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
  margin-top: 20px;
}

.chart-column {
  width: calc(33.33% - 20px);
}

.pie-chart {
  width: 100%;
  height: 400px;
}
.chart-title {
  text-align: center;
  margin-top: 10px;
}
.title {
  position: relative;
  padding-left: 13px;
  //margin: 24px 0;
  margin-left: 40px;
  font-weight: bold;
  font-size: x-large;
}
.title:before {
  content: "";
  background-color: #3796EC;
  width: 4px;
  height: 14px;
  position: absolute;
  left: 0;
  top: 50%;
  margin-top: -8px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  font-family: "Source Han Sans-Bold",serif;
}
</style>
