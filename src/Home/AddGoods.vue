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
            <!-- 商品数量 -->
            <el-form-item
              label="数量"
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
            <!-- 商品重量 -->
            <el-form-item
              label="重量"
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
            <!-- 商品价格 -->
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
        <!-- 商品参数 -->
        <el-tab-pane label="商品参数" name="1">
          <div v-for="(item, index) in only" :key="index">
            <h3>{{ item.attr_name }}</h3>
            <el-checkbox-group
              @change="checkedChang"
              :value="item.attr_vals.split(',')"
            >
              <el-checkbox
                v-for="(t, i) in item.attr_vals.split(',')"
                :key="i"
                :label="t"
                border
                size="small"
                >{{ t }}</el-checkbox
              >
            </el-checkbox-group>
          </div>
        </el-tab-pane>
        <!-- 商品属性 -->
        <el-tab-pane label="商品属性" name="2">
          <div v-for="(item, index) in many" :key="index">
            <p style="margin: 20px 0 5px 0">{{ item.attr_name }}</p>
            <el-input
              v-model="item.attr_vals"
              placeholder="请输入内容"
            ></el-input>
          </div>
        </el-tab-pane>
        <!-- 商品图片 -->
        <el-tab-pane label="商品图片" name="3">
          <el-upload action="#" list-type="picture-card" :auto-upload="false">
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{ file }">
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url"
                alt=""
              />
              <!-- 操作 -->
              <span class="el-upload-list__item-actions">
                <!-- 查看 -->
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <i class="el-icon-zoom-in"></i>
                </span>
                <!-- 下载 -->
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleDownload(file)"
                >
                  <i class="el-icon-download"></i>
                </span>
                <!-- 删除 -->
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
        </el-tab-pane>
        <!-- 商品内容 -->
        <el-tab-pane label="商品内容" name="4">
          <quill-editor
            v-model="goods.goods_introduce"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @change="onEditorChange($event)"
          >
          </quill-editor>
          <el-button type="primary" @click="add" class="add">添加</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { getcategories, getparams, addgoods } from "../utils/request";
import { quillEditor } from "vue-quill-editor";
export default {
  data() {
    return {
      // 图片路径
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
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
          pic: "",
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
      good_cat: [],
      // 文本框
      editorOption: {},
    };
  },
  methods: {
    handleChange(value) {
      this.good_cat = value;
      this.goods.goods_cat = value.join(",");
      // console.log(this.goods.goods_cat);
    },
    // 获取分类
    async getCategories() {
      let { data: res } = await getcategories();
      this.options = res.data;
    },
    // 进行下一步的时候进行 验证
    async beforeLeave(index) {
      if (this.goods.goods_cat == " ") return false;
      // 获取属性和参数
      if (index == 1) {
        let { data: res } = await getparams(
          this.good_cat[this.good_cat.length - 1],
          "many"
        );
        this.only = res.data;
        res.data.forEach((item) => {
          this.goods.attrs.push({
            attr_id: item.attr_id,
            attr_value: item.attr_vals,
          });
        });
      }
      if (index == 2) {
        let { data: res } = await getparams(
          this.good_cat[this.good_cat.length - 1],
          "only"
        );
        this.many = res.data;
        res.data.forEach((item) => {
          this.goods.attrs.push({
            attr_id: item.attr_id,
            attr_value: item.attr_vals,
          });
        });
      }
    },
    // 上传图片的路径
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.goods.pics.pic=file.url
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
    // 添加商品
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
    // 文本框事件
    onEditorBlur(editor) {
      //失去焦点事件
    },
    onEditorFocus(editor) {
      //获得焦点事件
    },
    onEditorChange({ editor, html, text }) {
      //编辑器文本发生变化
      //this.content可以实时获取到当前编辑器内的文本内容
      // console.log(this.content);
    },
    // 商品参数多选
    checkedChang(value) {
      console.log(value);
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
.el-checkbox-group {
  margin-top: 15px;
}
.quill-editor {
  min-height: 300px;
}
.ql-editor {
  height: 300px;
}
.add {
  margin-top: 10px;
}
</style>
