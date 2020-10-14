<template>
    
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card"> </el-card>
  </div>
</template>


<script>
import { getcategories } from "../utils/request";
export default {
  name: "",
  data() {
    return {};
  },
  created() {},
  mounted() {this.getCategories()},
  methods: {
    // 获取商品分类列表
    async getCategories(){
        let {data}= await getcategories()
        console.log(data);
    }
  },
};
</script>

<style scoped>
.el-card{
    margin-top: 15px;
}
</style>