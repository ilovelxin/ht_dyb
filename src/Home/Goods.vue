<template>
    
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <!-- 搜索和添加商品 -->
      <div class="serach">
        <!-- 搜索输入框 -->
        <el-input
          placeholder="请输入内容"
          v-model.trim="paramsobj.query"
          clearable
          @clear="noserach"
        >
          <!-- 搜索按钮 -->
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="serach"
          ></el-button>
        </el-input>
        <!-- 添加商品 -->
        <el-button type="primary" @click="$router.push('/home/addgoods')">添加商品</el-button>
      </div>
      <!-- 商品列表表格 -->
      <el-table :data="Goods.goods" border style="width: 100%" stripe>
        <el-table-column prop="index" label="#" width="50" type="index">
        </el-table-column>
        <el-table-column prop="goods_name" label="商品名称" min-width="300">
        </el-table-column>
        <el-table-column prop="goods_price" label="商品价格" width="80">
        </el-table-column>
        <el-table-column prop="goods_weight" label="商品重量" width="80">
        </el-table-column>
        <el-table-column
          prop="add_time"
          label="创建时间"
          width="180"
          :formatter="setTime"
        >
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="Good(scope.row.goods_id)"
            ></el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="del(scope.row.goods_id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="paramsobj.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="Goods.total"
      >
      </el-pagination>
    </el-card>
    <!-- 编辑商品的弹框 -->
    <el-dialog title="编辑商品" :visible.sync="dialogFormVisible">
      <el-form :model="goodobj" ref="goodobj" class="demo-dynamic">
        <el-form-item
          label="商品名称"
          label-width="100px"
          prop="goods_name"
          :rules="[
            { required: true, message: '请填写商品名称', trigger: 'blur' },
          ]"
        >
          <el-input v-model="goodobj.goods_name"></el-input>
        </el-form-item>
        <el-form-item
          label="商品价格"
          label-width="100px"
          prop="goods_price"
          :rules="[
            { required: true, message: '请填写商品价格', trigger: 'blur' },
            { type: 'number', message: '价格必须是数值', trigger: 'blur' },
          ]"
        >
          <el-input v-model.number="goodobj.goods_price"></el-input>
        </el-form-item>
        <el-form-item
          label="商品数量"
          label-width="100px"
          prop="goods_number"
          :rules="[
            { required: true, message: '请填写商品数量', trigger: 'blur' },
            { type: 'number', message: '数量必须是数值', trigger: 'blur' },
          ]"
        >
          <el-input v-model.number="goodobj.goods_number"></el-input>
        </el-form-item>
        <el-form-item
          label="商品重量"
          label-width="100px"
          prop="goods_weight"
          :rules="[
            { required: true, message: '请填写商品重量', trigger: 'blur' },
            { type: 'number', message: '重量必须是数值', trigger: 'blur' },
          ]"
        >
          <el-input v-model.number="goodobj.goods_weight"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitFrom('goodobj')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>


<script>
import { getgoods, deleted, good, upgood } from "../utils/request";
export default {
  name: "",
  data() {
    return {
      paramsobj: {
        pagesize: 10, // 每页数量
        pagenum: 1, // 当前第几页
        query: "", // 查询参数
      },
      // 所有商品数据
      Goods: [],
      //   编辑商品
      goodobj: {}, // 要编辑的商品
      dialogFormVisible: false, // 修改的弹框是否打开
      //   修改表单验证规则
    };
  },
  created() {},
  mounted() {
    this.getGoods();
  },
  methods: {
    // 获取商品列表
    async getGoods() {
      let { data } = await getgoods(this.paramsobj);
      this.Goods = data.data;
    },
    // 时间过滤
    setTime(row, cloum) {
      let oldDate = new Date(row.add_time);
      let newDate = new Date();
      var dayNum = "";
      var getTime = (newDate.getTime() - oldDate.getTime()) / 1000;
      let year = oldDate.getFullYear();
      let month = oldDate.getMonth() + 1;
      let day = oldDate.getDate();
      let hour = oldDate.getHours();
      let minute = oldDate.getMinutes();
      let second = oldDate.getSeconds();
      return `${dayNum} ${year}-${month}-${day} ${hour}:${minute}:${second}`;
    },
    // 分页器
    handleSizeChange(val) {
      //   console.log(`每页 ${val} 条`);
      this.paramsobj.pagesize = val;
      this.getGoods();
    },
    handleCurrentChange(val) {
      //   console.log(`当前页: ${val}`);
      this.paramsobj.pagenum = val;
      this.getGoods();
    },
    // 搜索
    serach() {
      this.getGoods();
    },
    // 取消搜索
    noserach() {
      this.getGoods();
    },
    // 删除
    del(id) {
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let { data } = await deleted(id);
          if (data.meta.status == 200) {
            this.$message({
              type: "success",
              message: data.meta.msg,
            });
            this.getGoods();
          } else {
            this.$message({
              type: "error",
              message: data.meta.msg,
            });
            this.getGoods();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 获取商品信息
    async Good(id) {
      this.dialogFormVisible = true;
      let { data: res } = await good(id);
      this.goodobj = res.data;
    },
    // 修改完成提交
    submitFrom(goodobj) {
      this.$refs[goodobj].validate(async (valid) => {
        if (!valid) {
          return false;
        }
        this.dialogFormVisible = false;
        let { data: res } = await upgood(this.goodobj.goods_id, this.goodobj);
        if (res.meta.status == 200) {
          this.$message({
            type: "success",
            message: res.meta.msg,
          });
          this.getGoods();
        } else {
          this.$message({
            type: "success",
            message: res.meta.msg,
          });
        }
      });
    },
    // 添加商品
    
  },
};
</script>

<style scoped>
.box {
  width: 100%;
  height: 100%;
}
.el-card {
  margin-top: 15px;
}
.serach {
  width: 50%;
  display: flex;
  justify-content: space-between;
}
.serach > .el-button {
  margin-left: 10px;
}
.el-table {
  margin-top: 10px;
}
</style>