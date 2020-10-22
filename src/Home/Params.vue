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
      <!-- 顶部警示文字 -->
      <el-alert
        title="注意：只允许为第三级分类设置相关参数！"
        type="warning"
        show-icon
        effect="dark"
        :closable="false"
      >
      </el-alert>
      <!-- 选择商品分类 -->
      <el-cascader
        v-model="value"
        :options="options"
        @change="handleChange"
        :props="props"
      ></el-cascader>

      <!-- 选择静态参数和动态参数 -->
      <el-tabs type="border-card" @tab-click="handleClick">
        <!-- 动态参数 -->
        <el-tab-pane label="动态参数">
          动态参数：<el-button type="primary" @click="onlyflag = true"
            >添加参数</el-button
          >
          <el-table :data="tabarr" style="width: 100%">
            <!-- tag标签 -->
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-tag
                  v-show="scope.row.attr_vals != ''"
                  :key="index"
                  v-for="(item, index) in scope.row.attr_vals.split(',')"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(scope.row, index)"
                >
                  {{ item }}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="inputVisible"
                  v-model="inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                >
                </el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput(scope.row)"
                  >+ New Tag</el-button
                >
              </template>
            </el-table-column>
            <el-table-column label="分类参数ID" prop="attr_id">
            </el-table-column>
            <el-table-column label="分类参数名称" prop="attr_name">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="mini"
                  @click="upParams(scope.row.attr_id)"
                >
                  编辑</el-button
                >
                <el-button
                  type="danger"
                  size="mini"
                  @click="delParams(scope.row.attr_id)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- 静态属性 -->
        <el-tab-pane label="静态属性">
          <el-button type="primary" @click="onlyflag = true"
            >添加属性</el-button
          >
          <el-table :data="tabarr" style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-tag
                  v-show="scope.row.attr_vals != ''"
                  :key="index"
                  v-for="(item, index) in scope.row.attr_vals.split(',')"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(scope.row, index)"
                >
                  {{ item }}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="inputVisible"
                  v-model="inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                >
                </el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput(scope.row)"
                  >+ New Tag</el-button
                >
              </template>
            </el-table-column>
            <el-table-column label="分类参数ID" prop="attr_id">
            </el-table-column>
            <el-table-column label="分类参数名称" prop="attr_name">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="mini"
                  @click="upParams(scope.row.attr_id)"
                  >编辑</el-button
                >
                <el-button
                  type="danger"
                  size="mini"
                  @click="delParams(scope.row.attr_id)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
      
    <!-- 添加动态参数 -->
    <el-dialog title="添加参数" :visible.sync="onlyflag">
      <el-input v-model="inputvalue" autocomplete="off"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onlyflag = false">取 消</el-button>
        <el-button type="primary" @click="addonly">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑 -->
    <el-dialog title="修改参数" :visible.sync="upflag">
      <el-input v-model="upobj.attr_name" autocomplete="off"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="upflag = false">取 消</el-button>
        <el-button type="primary" @click="okup">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>




<script>
import {
  getcategories,
  getparams,
  addparams,
  delparams,
  params,
  okupparams,
  putparams,
} from "../utils/request";
export default {
  name: "",
  data() {
    return {
      value: "",
      props: {
        label: "cat_name",
        value: "cat_id",
      },
      // 分类列表
      options: [],
      // 参数列表
      tabarr: [],
      // 参数id
      id: "",
      // 属性还是参数
      sel: "many",
      // 添加的input
      inputvalue: "",
      // 是否打开添加的弹框
      onlyflag: false,
      // 是否打开修改的弹框
      upflag: false,
      // 修改的参数对象
      upobj: {
        attr_name: "",
      },
      // tag标签
      inputVisible: false,
      inputValue: "",
    };
  },
  created() {},
  mounted() {
    this.getCategories();
  },
  methods: {
    async getCategories() {
      let { data: res } = await getcategories();
      this.options = res.data;
    },
    // 封装获取参数列表的接口
    async getParams(id, sel) {
      let { data: res } = await getparams(id, sel);
      // console.log(res);
      if (res.meta.status == 200) {
        this.tabarr = res.data;
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
    // 在下拉菜单发生变化时调用
    handleChange(value) {
      this.id = value[value.length - 1];
      this.getParams(this.id, this.sel);
    },
    // 在tabs发生变化时调用
    handleClick(tab, event) {
      // console.log(tab, event);
      if (tab.index == 0) {
        this.sel = "many";
        this.getParams(this.id, this.sel);
      } else {
        this.sel = "only";
        this.getParams(this.id, this.sel);
      }
    },
    // 添加动态参数或者静态属性
    async addonly() {
      if (this.inputvalue == "") {
        return false;
      }
      let { data: res } = await addparams(this.id, {
        attr_name: this.inputvalue,
        attr_sel: this.sel,
      });
      this.onlyflag = false;
      if (res.meta.status == 201) {
        this.$message({
          type: "success",
          message: res.data.meta,
        });
        this.getParams(this.id, this.sel);
      }
    },
    // 删除
    async delParams(id) {
      let { data: res } = await delparams(this.id, id);
      // console.log(res);
      if (res.meta.status == 200) {
        this.$message({
          type: "success",
          message: res.meta.msg,
        });
        this.getParams(this.id, this.sel);
      } else {
        this.$message({
          type: "error",
          message: res.meta.msg,
        });
      }
    },
    // 编辑
    async upParams(id) {
      this.upflag = true;
      let { data: res } = await params({
        id: this.id,
        attr_id: id,
        attr_sel: this.sel,
      });
      // console.log(res);
      if (res.meta.status == 200) {
        this.$message({
          type: "success",
          message: res.meta.msg,
        });
        this.upobj = res.data;
      }
    },
    // 确定修改
    async okup() {
      let { data: res } = await okupparams(this.upobj);
      console.log(this.upobj);
      console.log(res);
      this.upflag = false;
      if (res.meta.status == 200) {
        this.$message({
          type: "success",
          message: res.meta.msg,
        });
        this.getParams(this.id, this.sel);
      }
    },
    // tag标签
    // 删除 tag 标签
    async handleClose(tag, index) {
      let arr = tag.attr_vals.split(",");
      arr.splice(index, 1);
      let obj = {
        cat_id: tag.cat_id,
        attr_name: tag.attr_name,
        attr_sel: tag.attr_sel,
        attr_vals: arr.join(","),
        attr_id: tag.attr_id,
      };
      let { data: res } = await putparams(obj);
      // console.log(res);
      this.getParams(this.id, this.sel);
    },
    // 添加tag标签的input框打开
    showInput(arr) {
      // console.log(arr);
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    // 添加tag标签的input框关闭
    async handleInputConfirm(obj) {
      let inputValue = this.inputValue;
      if (inputValue) {
        obj.attr_vals = obj.attr_vals + "," + inputValue;
      }
      // console.log(obj);
      let { data: res } = await putparams(obj);
      if (res.meta.status == 200) {
        this.$message({
          type: "success",
          message: res.meta.msg,
        });
      }
      this.inputVisible = false;
      this.inputValue = "";
      this.getParams(this.id, this.sel);
    },
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
}
.el-alert {
  margin: 10px 0;
}
.el-tabs {
  margin-top: 15px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>