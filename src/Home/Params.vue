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
            <el-table-column type="expand"> </el-table-column>
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
            <el-table-column type="expand"> </el-table-column>
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
      sel: "only",
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
        this.sel = "only";
        this.getParams(this.id, this.sel);
      } else {
        this.sel = "many";
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
</style>