<template>
    
  <div class="box">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <el-table :data="tableData" style="width: 100%" fit border>
        <el-table-column label="#" width="50" type="index"> </el-table-column>
        <el-table-column prop="authName" label="权限名称"> </el-table-column>
        <el-table-column prop="path" label="路径"> </el-table-column>
        <el-table-column prop="level" label="权限等级">
          <template slot-scope="scope"
            ><el-tag v-if="scope.row.level == 0">一级</el-tag
            ><el-tag v-if="scope.row.level == 1" type="success">二级</el-tag
            ><el-tag v-if="scope.row.level == 2" type="warning">三级</el-tag
            ></template>
        </el-table-column>
      </el-table>
    </el-card>
      
  </div>
</template>


<script>
import { rights } from "../utils/request";
export default {
  name: "",
  data() {
    return {
      tableData: [],
    };
  },
  created() {},
  mounted() {
    this.Right();
  },
  methods: {
    async Right() {
      let { data: res } = await rights("list");
      this.tableData = res.data;
    },
  },
};
</script>

<style scoped>
.box {
  width: 100%;
  height: 100%;
}
.box-card {
  margin-top: 15px;
}
</style>