<template>
    
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home/index' }">
        首页
      </el-breadcrumb-item>
      <el-breadcrumb-item> 商品管理</el-breadcrumb-item>
      <el-breadcrumb-item> 分类参数</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-alert
        title="注意：只允许为第三级分类设置相关参数！"
        type="warning"
        show-icon
        effect="dark"
        :closable="false"
      >
      </el-alert>
        <el-form>
          <el-form-item label="选择商品分类">
            <el-select placeholder="请选择">
            </el-select>
          </el-form-item>
        </el-form>
    </el-card>
      
  </div>
</template>




<script>
export default {
  name: "",
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>


<style lang="scss" scoped>
.el-breadcrumb {
  margin-bottom: 20px;
}
.el-table {
  margin: 20px 0;
  font-size: 12px;
}
.el-alert{
    margin: 10px 0;
}
</style>