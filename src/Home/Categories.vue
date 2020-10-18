<template>
    
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分類</el-breadcrumb-item>
    </el-breadcrumb>

      <el-card>
      <!-- 添加分类 -->
      <div class="add">
        <el-button type="primary" @click="dialogFormVisible = true"
          >添加分类</el-button
        >
      </div>
      <!-- 表格展示 -->
      <el-table
        :data="tableData"
        style="width: 100%"
        row-key="cat_name"
        border
        :tree-props="{ children: 'children' }"
      >
        <el-table-column type="index" label="#" width="50"> </el-table-column>
        <el-table-column prop="cat_name" label="分类名称" min-width="100">
        </el-table-column>
        <!-- 是否有效 -->
        <el-table-column label="是否有效">
          <template>
            <i class="el-icon-success"></i>
          </template>
        </el-table-column>
        <!-- 当前层级 -->
        <el-table-column label="当前层级">
          <template slot-scope="scope">
            <!-- <span>{{ scope.row.cat_level }}</span> -->
            <el-tag effect="dark" v-if="scope.row.cat_level == 0">
              一级
            </el-tag>
            <el-tag
              effect="dark"
              type="success"
              v-if="scope.row.cat_level == 1"
            >
              二级
            </el-tag>
            <el-tag
              effect="dark"
              type="warning"
              v-if="scope.row.cat_level == 2"
            >
              三级
            </el-tag>
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="update(scope.row.cat_id)"
              >编辑</el-button
            >
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="del(scope.row.cat_id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加分类的弹框 -->
    <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="分类名称">
          <el-input v-model="form.cat_name" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 联级选择器 -->
        <el-cascader
          v-model="value"
          :options="tableData"
          @change="handleChange"
          :props="props"
        ></el-cascader>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑弹框 -->
    <el-dialog title="修改分类" :visible.sync="upfromflag">
      <el-form :model="upform">
        <el-form-item label="分类名称">
          <el-input v-model="upform.cat_name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="upfromflag = false">取 消</el-button>
        <el-button type="primary" @click="okupdate">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>


<script>
import { getcategories, addCategories, Categories,OKupdate ,delcategories} from "../utils/request";
export default {
  name: "",
  data() {
    return {
      // 表格数据
      tableData: [],
      dialogFormVisible: false,
      value: "",
      // 添加分类的信息
      form: {
        cat_name: "", // 分类名字
        cat_pid: "", // 分类父层级
        cat_level: 0, // 分类层级
      },
      // 级联选择器的prop属性配置
      props: {
        value: "cat_id",
        label: "cat_name",
        children: "children",
      },
      // 编辑表单
      upform: {
        cat_name:''
      },
      upfromflag:false,
    };
  },
  created() {},
  mounted() {
    this.Categories();
  },
  methods: {
    // 获取数据
    async Categories() {
      let { data: res } = await getcategories();
      this.tableData = res.data;
    },
    // 添加分类
    handleChange(arr) {
      console.log(arr);
      // 三级分类
      if (arr.length == 2||arr.length==3) {
        this.form.cat_level = 2; // 分类等级三级
        this.form.cat_pid = arr[1]; //
      } else {
        if (arr.length == 1) {
          this.form.cat_level = 1; // 分类等级二级
          this.form.cat_pid = arr[0]; //
        } else {
          this.form.cat_level = 0; // 分类等级一级
          this.form.cat_pid = 0; //
        }
      }
    },
    // 确认添加分类
    async add() {
      let { data: res } = await addCategories(this.form);
      if (res.meta.status == 201) {
        this.$message({
          type: "success",
          message: res.meta.msg,
        });
        this.Categories();
        this.dialogFormVisible = false;
      }
    },
    // 编辑分类
    async update(id) {
      let { data: res } = await Categories(id);
      this.upfromflag=true,
      // console.log(res);
      this.upform=res.data
    },
    // 确认修改
    async okupdate(){
      let {data:res } = await OKupdate(this.upform.cat_id,this.upform.cat_name)
      console.log(res);
      if(res.meta.status==200){
        this.$message({
          type:"success",
          message:res.meta.msg
        })
        this.upfromflag=false
        this.Categories();
      }
    },
    // 删除
    async del(id){
      let {data:res} = await delcategories(id)
      console.log(res);
      if(res.meta.status=200){
        this.$message({
          type:"success",
          message:res.meta.msg
        })
        this.Categories()
      }else{
        this.$message({
          type:"error",
          message:res.meta.msg
        })
      }
    }
  },
};
</script>

<style scoped lang="scss">
.el-card {
  margin-top: 15px;
}
.el-icon-error {
  background: red;
  color: #fff;
}
.el-icon-success {
  color: green;
}
.el-table {
  margin-top: 10px;
}
</style>