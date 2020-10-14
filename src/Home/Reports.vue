<template>
    
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 数据报表 -->
    <el-card class="box-card">
      <div id="chart"></div>
    </el-card>
      
  </div>
</template>


<script>
import { getChart } from "../utils/request";
export default {
  name: "",
  data() {
    return {};
  },
  created() {},
  mounted() {
    this.initChart();
  },
  methods: {
    //   获取图标数据
    async getchart() {},
    async initChart() {
      //   初始化chart
      let myChart = this.$echarts.init(document.getElementById("chart"));
      let { data: res } = await getChart();
      let obj = res.data;
      console.log(res);

      myChart.setOption({
        title: {
          text: "用户来源",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: obj.legend.data,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: obj.xAxis[0].data,
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: obj.series,
      });
    },
  },
};
</script>

<style scoped>
.el-card {
  margin-top: 15px;
}
#chart {
  width: 800px;
  height: 400px;
}
</style>