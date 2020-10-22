<template>
  <div class="box">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 表格内容 -->
    <el-card class="box-card">
      <div class="serach">
        <el-input
          placeholder="请输入内容"
          clearable
          style="width: 300px"
          v-model="userobj.query"
          @clear="setUsers(userobj)"
        >
          <template slot="append"
            ><el-button @click="setUsers(userobj)"
              ><i class="el-icon-search"></i></el-button
          ></template>
        </el-input>
        <!-- 添加用户 -->
        <el-button
          type="primary"
          style="margin-left: 30px"
          @click="dialogVisible = true"
          >添加用户</el-button
        >
      </div>

      <!-- 用户列表表格 -->
      <el-table :data="users.users" style="width: 100%" border stripe>
        <!-- 索引 -->
        <el-table-column
          label="#"
          min-width="50"
          type="index"
        ></el-table-column>
        <!-- 姓名 -->
        <el-table-column label="姓名" min-width="100" prop="username">
        </el-table-column>
        <!-- 邮箱 -->
        <el-table-column label="邮箱" min-width="100" prop="email">
        </el-table-column>
        <!-- 电话 -->
        <el-table-column label="电话" min-width="100" prop="mobile">
        </el-table-column>
        <!-- 角色 -->
        <el-table-column label="角色" min-width="100" prop="role_name">
        </el-table-column>
        <!-- 状态 -->
        <el-table-column label="状态" min-width="180">
          <template slot-scope="scope">
            <el-switch
              @change="changeState(scope.row.id, scope.row.mg_state)"
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @click="updata(scope.row.id, scope.row.mg_state)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作" min-width="200">
          <template slot-scope="scope">
            <!-- 修改用户信息-->
            <el-tooltip
              class="item"
              effect="dark"
              content="修改"
              placement="top-start"
            >
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="updata(scope.row.id, scope.row.mg_state)"
              ></el-button>
            </el-tooltip>
            <!-- 删除用户 -->
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              slot="reference"
              @click="dels(scope.row.id)"
            ></el-button>
            <!-- 分配角色用户 -->
            <el-tooltip
              class="item"
              effect="dark"
              content="分配权限"
              placement="top-start"
              ><el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
              ></el-button
            ></el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页器 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[1, 2, 3]"
        :page-size="userobj.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="users.total"
        style="margin-top: 10px"
      >
      </el-pagination>

      <!-- 添加用户信息的弹框 -->
      <el-dialog title="添加新用户" :visible.sync="dialogVisible" width="50%">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <!-- 新用户的信息 -->
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="ruleForm.email"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="mobile">
            <el-input v-model="ruleForm.mobile"></el-input>
          </el-form-item>
        </el-form>
        <!-- 确定添加和取消添加 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="noadd">取 消</el-button>
          <el-button type="primary" @click="add">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>

    <!-- 修改的弹框 -->
    <el-dialog title="修改用户信息" :visible.sync="dialogFormUpdata">
      <el-form :model="userObj" :rules="rules" ref="userObj">
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="userObj.username"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userObj.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="userObj.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="noUpdata()">取 消</el-button>
        <el-button type="primary" @click="okUpdata()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
import {
  users,
  adduser,
  del,
  updatas,
  getuser,
  axiosChangeState,
} from "../utils/request";
export default {
  name: "",
  data() {
    return {
      // 用户数据列表
      users: {},
      // 通过获取的数据进行分页
      userobj: {
        pagesize: 2, // 每页多少数据
        pagenum: 1, //当夜多少数据
        query: "", // 搜索的关键字
      },
      // 添加用户信息
      ruleForm: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      // 验证输入的内容
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "长度在 6 到 18 个字符",
            trigger: "blur",
          },
        ],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        mobile: [{ required: true, message: "请输入手机号", trigger: "blur" }],
      },
      // 添加用户信息弹框是否打开
      dialogVisible: false,
      // 修改弹框是否打开
      dialogFormUpdata: false,
      // 修改用户的信息
      userObj: {},
    };
  },
  created() {},
  mounted() {
    this.setUsers();
  },
  methods: {
    //   获取用户数据列表
    async setUsers() {
      let { data } = await users(this.userobj);
      this.users = data.data;
    },
    // 分页器
    // pagesize发生改变时调用
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.userobj.pagesize = val;
      this.setUsers(this.userobj);
    }, // pagenum发生改变时调用
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.userobj.pagenum = val;
      this.setUsers(this.userobj);
    },
    // 添加用户
    async add() {
      this.dialogVisible = false;
      let { data: res } = await adduser(this.ruleForm);
      if (res.meta.status == 201) {
        this.$message({
          type: "success",
          message: res.meta.msg,
        });
        this.setUsers();
      } else {
        this.$message({
          type: "error",
          message: res.meta.msg,
        });
      }
      console.log(res);
    },
    // 取消添加用户
    noadd() {
      this.dialogVisible = false;
      this.setUsers(this.userobj);
      this.ruleForm = {};
    },
    // 修改用户信息
    async updata(id, state) {
      // 查询用户信息
      let { data } = await getuser(id);
      // console.log(data)
      if (data.meta.status == 200) {
        this.dialogFormUpdata = true;
        this.userObj = data.data;
      } else {
        console.log(data.meta.msg);
      }
    },
    // 确认修改用户信息
    async okUpdata() {
      this.dialogFormUpdata = false;
      let { data } = await updatas(this.userObj.id, this.userObj);
      if (data.meta.status == 200) {
        this.$message({
          type: "success",
          message: data.meta.msg,
        });
        this.setUsers();
      } else {
        this.dialogFormUpdata = true;
        this.$message({
          type: "error",
          message: data.meta.msg,
        });
      }
    },
    // 取消修改用户信息
    noUpdata() {
      this.dialogFormUpdata = false;
      this.userObj = {};
    },
    // 删除单个用户
    dels(id) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          del(id).then((res) => {
            this.$message({
              type: "success",
              message: res.data.meta.msg,
            });
            this.setUsers(this.userobj);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 修改用户状态
    async changeState(id, state) {
      let { data: res } = await axiosChangeState({ id: id, state, state });
      if (res.meta.status == 200) {
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
    },
  },
  watch: {
    dialogVisible: {
      handler(val) {
        if (val) return false;
        // 清空表单
        this.ruleForm.username = "";
        this.ruleForm.password = "";
        this.ruleForm.email = "";
        this.ruleForm.mobile = "";
      },
      deep:true
    },
  },
};
</script>

<style scoped>
.box {
  width: 100%;
  box-sizing: border-box;
}
.serach {
  margin-bottom: 10px;
}
.box-card {
  margin: 15px;
}
</style>