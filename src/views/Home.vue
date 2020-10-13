<template>
  <div class="box">
    <el-container>
      <el-header>
        <h2>后台管理系统</h2>
        <el-button type="danger" @click="noLogin()">退出登录</el-button>
      </el-header>
      <el-container>
        <!-- 左侧导航 -->
        <el-aside width="200px">
          <el-menu
            :collapse="isCollapse"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            router
            unique-opened
            :default-active="path"
          >
            <el-radio-group v-model="isCollapse">
              <el-button @click="isCollapse = !isCollapse">|||</el-button>
            </el-radio-group>
            <el-submenu
              :index="index + ''"
              v-for="(item, index) in menu"
              :key="item.id"
            >
              <template slot="title">
                <i :class="iconMenu[index]"></i>
                <span slot="title">{{ item.authName }}</span>
              </template>
              <el-menu-item
                :index="`/home/${t.path}`"
                v-for="(t, i) in item.children"
                :key="i"
                ><i class="el-icon-menu"></i>{{ t.authName }}</el-menu-item
              >
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { menus } from "../utils/request";
import Vue from "vue";
export default {
  name: "",
  data() {
    return {
      // 左侧菜单是否折叠
      isCollapse: false,
      // 左侧菜单栏
      menu: [],
      // 左侧菜单对应的icon
      iconMenu: [
        "el-icon-user-solid",
        "el-icon-s-unfold",
        "el-icon-menu",
        "el-icon-s-order",
        "el-icon-s-marketing",
      ],
      // 当前打开的菜单
      path: "",
    };
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.menus();
    });
  },
  updated() {
    // 已经打开的左侧菜单
    this.path = sessionStorage.getItem("path");
  },
  methods: {
    // 获取左左侧菜单
    async menus() {
      let { data } = await menus();
      if (data.meta.status == 200) {
        this.menu = data.data;
      } else {
        console.log(data.meta.msg);
      }
    },
    // 退出登录
    noLogin() {
      sessionStorage.removeItem("token");
      this.$message({
        type: "success",
        message: "退出成功",
      });
      this.$router.push("/login");
      dialogVisible = false;
    },
  },
  watch: {
    // 判断左侧裁断是否折叠
    isCollapse: {
      deep: true,
      handler(val) {
        if (val) {
          document.getElementsByClassName("el-aside")[0].style.width = "65px";
        } else {
          document.getElementsByClassName("el-aside")[0].style.width = "200px";
        }
      },
    },
    // 验证路由
    $route: {
      handler(to, from) {
        this.path = to.path;
        sessionStorage.setItem("path", this.path);
      },
    },
  },
};
</script>

<style scoped>
.box {
  width: 100%;
  height: 100%;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  height: 100%;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  height: 100%;
}
.el-container {
  height: 100%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  min-height: 400px;
}
.el-header {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  align-items: center;
}
.el-header .el-button {
  width: 100px;
  height: 40px;
}
.el-menu {
  height: 100%;
  transition: all 0s !important;
}
.el-radio-group .el-button {
  width: 100%;
  background-color: rgb(84, 92, 100);
  border: none;
  color: #fff;
  border-bottom: 1px solid #fff;
}
.el-radio-group {
  width: 100%;
}
</style>