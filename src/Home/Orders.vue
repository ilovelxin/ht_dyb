<template>
    
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <!-- 搜索 -->
      <div class="serach">
        <!-- 搜索输入框 -->
        <el-input
          placeholder="请输入内容"
          v-model.trim="ordersobj.query"
          clearable
          @clear="noserach"
        >
          <!-- 搜索按钮 -->
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="serach"
          ></el-button>
        </el-input>
      </div>
      <!-- 表格 -->
      <el-table :data="ordertable.goods" style="width: 100%" border>
        <el-table-column prop="index" label="#" min-width="50" type="index">
        </el-table-column>
        <el-table-column prop="order_number" label="订单编号" min-width="50">
        </el-table-column>
        <el-table-column label="是否付款" min-width="50">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.order_pay == 0" type="danger" effect="dark"
              >未付款</el-tag
            ><el-tag
              v-if="scope.row.order_pay != 0"
              type="success"
              effect="dark"
              >已付款</el-tag
            ></template
          >
        </el-table-column>
        <el-table-column prop="is_send" label="是否发货" min-width="50">
        </el-table-column>
        <el-table-column label="下单时间" min-width="50" :formatter="setTime">
        </el-table-column>
        <el-table-column label="操作" min-width="50">
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
            ></el-button>
            <!-- 物流 -->
            <el-button
              type="success"
              icon="el-icon-location"
              size="mini"
              @click="look(scope.row.order_id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="ordersobj.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="ordertable.total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>


<script>
import { getorders, looks } from "../utils/request";
export default {
  name: "",
  data() {
    return {
      // 参数
      ordersobj: {
        query: "",
        pagenum: 1,
        pagesize: 10,
      },
      //   表格数据
      ordertable: {},
    };
  },
  created() {},
  mounted() {
    this.getOrders();
  },
  methods: {
    // 获取订单列表
    async getOrders() {
      let { data: res } = await getorders(this.ordersobj);
      this.ordertable = res.data;
      console.log(this.ordertable);
    },
    // 搜索
    serach() {
      this.getOrders();
    },
    // 取消搜索
    noserach() {
      this.getOrders();
    },
    // 时间过滤
    setTime(row, cloum) {
      let oldDate = new Date(row.create_time);
      let newDate = new Date();
      var dayNum = "";
      var getTime = (newDate.getTime() - oldDate.getTime()) / 1000;
      let year = oldDate.getFullYear();
      let month = oldDate.getMonth() + 1;
      let day = oldDate.getDate();
      let hour = oldDate.getHours();
      let minute = oldDate.getMinutes();
      let second = oldDate.getSeconds();
      return `${dayNum} ${year}-${month}-${day} ${hour}:${minute}:${second}`;
    },
    // 获取订单物流信息
    async look(id) {
      // let {data} = await looks(id)
      console.log(id);
    },
    // 分页器
    handleSizeChange(val) {
      //   console.log(`每页 ${val} 条`);
      this.ordersobj.pagesize = val;
      this.getOrders();
    },
    handleCurrentChange(val) {
      //   console.log(`当前页: ${val}`);
      this.ordersobj.pagenum = val;
      this.getOrders();
    },
  },
};
</script>

<style scoped>
.el-card {
  margin-top: 15px;
}
.serach {
  width: 50%;
}
.serach > .el-button {
  margin-left: 10px;
}
.el-table {
  margin-top: 10px;
}
</style>