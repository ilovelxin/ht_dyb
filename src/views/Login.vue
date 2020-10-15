<template>
    
  <div class="box">
    <div class="login">
      <el-form :model="formLabelAlign" :rules="rules">
        <el-form-item prop="name">
          <el-input
            v-model="formLabelAlign.name"
            placeholder="请输入用户名"
            clearable
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <el-form-item prop="region">
          <el-input
            v-model="formLabelAlign.region"
            type="password"
            placeholder="请输入密码"
            clearable
            show-password
            prefix-icon="el-icon-s-goods"
          ></el-input>
        </el-form-item>
        <div class="btn">
          <el-button type="primary" size="small" @click="login(formLabelAlign)"
            >登录</el-button
          >
          <el-button type="info" size="small">重置</el-button>
        </div>
      </el-form>
      <img src="@/assets/logo.png" alt="" class="logo" />
    </div>
  </div>
</template>


<script>
import { login } from "../utils/request";
export default {
  name: "",
  data() {
    return {
      formLabelAlign: {
        name: "admin",
        region: "123456",
      },
      // 表单验证规则
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
        region: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "长度在 6 到 18 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {},
  mounted() {},
  methods: {
    async login(obj) {
      let { data } = await login(obj);
      if (data.meta.status == 200) {
        //   将token写入sessionStorage
        sessionStorage.setItem("token", data.data.token);
        //   登录成功弹窗
        this.$message({
          type: "success",
          message: "登录成功",
          duration: "1000",
        });
        //   路由跳转
        this.$router.push("/home/index");
      } else {
        this.$message({
          type: "error",
          message: data.meta.msg,
          duration: "1000",
        });
      }
    },
  },
};
</script>

<style scoped>
.box {
  width: 100%;
  height: 100%;
  background: #2b4b6b;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login {
  width: 500px;
  height: 300px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  position: relative;
  box-shadow: 0px 0px 10px #fff;
}
.login .el-form {
  width: 300px;
  margin-top: 60px;
}
.btn {
  display: flex;
  justify-content: flex-end;
}
.logo {
  position: absolute;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  top: -100px;
  left: 50%;
  margin-left: -75px;
  border: 10px solid #fff;
  background: #eee;
  box-shadow: 0px 0px 10px #eee;
}
</style>