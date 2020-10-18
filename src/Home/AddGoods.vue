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
      </el-steps>

      <!-- tab栏区域 -->
      <el-tabs
        :tab-position="'left'"
        v-model="activeIndex"
        style="height: 100%"
        :before-leave="beforeLeave"
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
            <p>商品分类</p>
            <el-cascader
              v-model="value"
              :options="options"
              @change="handleChange"
              :props="props"
            ></el-cascader>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品参数" name="1">
          <p v-for="(item, index) in only" :key="index">{{ item.attr_name }}</p>
        </el-tab-pane>
        <el-tab-pane label="商品属性" name="2">
          <p v-for="(item, index) in many" :key="index">{{ item.attr_name }}</p>
        </el-tab-pane>
        <el-tab-pane label="商品图片" name="3">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="商品内容" name="4">
          <el-input v-model="goods.goods_introduce"></el-input>
          <el-button type="primary" @click="add">添加</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { getcategories, getparams, addgoods } from "../utils/request";
export default {
  data() {
    return {
      // 图片路径
      imageUrl: "",
      // 步骤条进度
      activeIndex: "0",
      //   商品信息
      goods: {
        goods_name: "",
        goods_price: "",
        goods_weight: "",
        goods_number: "",
        goods_cat: "",
        pics: {
          pic: this.imageUrl || "",
        },
        goods_introduce: "",
        attrs: [],
      },
      value: "",
      props: {
        label: "cat_name",
        value: "cat_id",
      },
      // 分类列表
      options: [],
      // 动态参数
      only: [],
      many: [],
    };
  },
  methods: {
    handleChange(value) {
      console.log(value);
      this.goods.goods_cat = value.join(",");
      // console.log(this.goods.goods_cat);
    },
    // 获取分类
    async getCategories() {
      let { data: res } = await getcategories();
      this.options = res.data;
      console.log(this.options);
    },
    // 进行下一步的时候进行 验证
    async beforeLeave(index) {
      if (this.goods.goods_cat == "") return false;
      // 获取属性和参数
      if (index == 1) {
        let { data: res } = await getparams(
          this.goods.goods_cat[this.goods.goods_cat.length - 1],
          "only"
        );
        this.only = res.data;
        console.log(res);
      }
      if (index == 2) {
        let { data: res } = await getparams(
          this.goods.goods_cat[this.goods.goods_cat.length - 1],
          "many"
        );
        this.many = res.data;
      }
    },
    // 上传图片的路径
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(this.imageUrl);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    async add() {
      console.log(this.goods);
      let { data: res } = await addgoods(this.goods);
      if (res.meta.status == 201) {
        this.$router.push("/home/goods");
        this.$message({
          type: "success",
          message: res.meta.msg,
        });
      } else {
        this.$message({
          type: "error",
          message: res.meta.msg,
        });
      }
      // console.log(res);
    },
  },
  mounted() {
    this.getCategories();
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
