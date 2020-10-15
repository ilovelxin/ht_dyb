
<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home/index' }">
        首页
      </el-breadcrumb-item>
      <el-breadcrumb-item> 商品管理</el-breadcrumb-item>
      <el-breadcrumb-item> 商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row>
        <el-col :span="24">
          <el-button type="primary">添加分类</el-button></el-col
        >
      </el-row>
      <el-table :data="list" border stripe style="width: 100%">
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column property="cat_name" type="expand" label="分类名称">
          <!-- <template #prop>
            </template> -->
          <template slot-scope="scope">
            <span>{{ scope.row.cat_name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="是否有效">
          <template slot-scope="scope">
            <i class="el-icon-success"></i>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="排序">
          <template slot-scope="scope">
            <el-tag size="mini" effect="dark">一级</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="update(scope.row.goods_id)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="del(scope.row.goods_id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
      
  </div>
</template>




<script>
import { getCategories } from "@/utils/request.js";
export default {
  name: "",
  data() {
    return {
      list: [],
    };
  },
  created() {},
  mounted() {
    this.getlist();
  },
  methods: {
    async getlist() {
      let { data } = await getCategories();
      // console.log(data);
      this.list = data.data;
    },
    update() {},
    del() {},
  },
};
</script>


<style lang="scss" scoped>
.el-breadcrumb {
  margin-bottom: 20px;
}
.el-table {
  margin: 20px 0;
  font-size: 12px;
  .el-icon-success {
    color: #39ce39;
  }
}
</style>