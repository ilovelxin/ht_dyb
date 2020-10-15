<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <!-- 提示区域 -->
      <el-alert
        title="添加商品信息"
        type="info"
        center
        show-icon
        :closable="false"
      ></el-alert>

      <!-- 步骤条区域 -->
      <el-steps
        :space="200"
        :active="activeIndex - 0"
        finish-status="success"
        align-center
      >
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>

      <!-- tab栏区域 -->
      <el-tabs
        :tab-position="'left'"
        v-model="activeIndex"
        :before-leave="beforeLeave"
        style="height: 100%"
      >
        <!-- 基本信息 -->
        <el-tab-pane label="基本信息" name="0">
          <el-form :model="goods" ref="goods">
            <!-- 商品名称 -->
            <el-form-item
              label="商品名称"
              prop="goods_name"
              :rules="[
                {
                  required: true,
                  message: '商品名称不能为空',
                  trigger: 'blur',
                },
              ]"
            >
              <el-input
                type="text"
                v-model="goods.goods_name"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <!-- 商品价格 -->
            <el-form-item
              label="价格"
              prop="goods_number"
              :rules="[
                {
                  required: true,
                  message: '商品数量不能为空',
                  trigger: 'blur',
                },
                {
                  type: 'number',
                  message: '商品数量必须是数值',
                  trigger: 'blur',
                },
              ]"
            >
              <el-input
                type="text"
                v-model.number="goods.goods_number"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <!-- 商品数量 -->
            <el-form-item
              label="价格"
              prop="goods_weight"
              :rules="[
                {
                  required: true,
                  message: '商品数量不能为空',
                  trigger: 'blur',
                },
                {
                  type: 'number',
                  message: '商品数量必须是数值',
                  trigger: 'blur',
                },
              ]"
            >
              <el-input
                type="text"
                v-model.number="goods.goods_weight"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <!-- 商品重量 -->
            <el-form-item
              label="价格"
              prop="goods_price"
              :rules="[
                {
                  required: true,
                  message: '商品价格不能为空',
                  trigger: 'blur',
                },
                {
                  type: 'number',
                  message: '商品价格必须是数值',
                  trigger: 'blur',
                },
              ]"
            >
              <el-input
                type="text"
                v-model.number="goods.goods_price"
                autocomplete="off"
              ></el-input>
            </el-form-item>

            <el-select v-model="value" placeholder="请选择">
              <el-option label="北京" value="北京"> </el-option>
              <el-option label="北京" value="北京"> </el-option>
            </el-select>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品参数" name="1">商品参数</el-tab-pane>
        <el-tab-pane label="商品属性" name="2">商品属性</el-tab-pane>
        <el-tab-pane label="商品图片" name="3">商品图片</el-tab-pane>
        <el-tab-pane label="商品内容" name="4">商品内容</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 步骤条进度
      activeIndex: "0",
      //   商品信息
      goods: {
        goods_name: "",
        goods_price: "",
        goods_weight: "",
        goods_number: "",
      },
    };
  },
  methods: {
    beforeLeave(activeName, oldActiveName) {},
  },
};
</script>

<style lang="scss" scoped>
.el-card {
  margin: 15px;
}
.el-steps {
  margin-top: 10px;
}
</style>
