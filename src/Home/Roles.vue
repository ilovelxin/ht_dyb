<template>
    
  <div class="box">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
      
    <!-- 角色管理表格 -->
    <el-card class="box-card">
      <div style="margin-bottom: 15px">
        <el-button type="primary" @click="dialogAddRole = true"
          >添加角色</el-button
        >
      </div>

      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column type="expand">
          <!-- 表格折叠 -->
          <template slot-scope="scope">
            <el-row
              v-for="(item, index) in scope.row.children"
              :key="index"
              style="width: 100%"
              type="flex"
            >
              <el-col :span="4" id="one"
                ><div class="grid-content bg-purple">
                  <el-tag
                    closable
                    type="primary"
                    effect="dark"
                    @close="delRig(scope.row.id, item.id)"
                  >
                    {{ item.authName }}
                  </el-tag>
                </div></el-col
              >
              <el-col :span="20" style="border: 1px solid #ddd"
                ><div class="grid-content bg-purple">
                  <!-- 局中局 -->
                  <el-row
                    v-for="(t, i) in item.children"
                    :key="i"
                    style="border-bottom: 1px solid #ddd"
                  >
                    <el-col :span="4"
                      ><div
                        class="grid-content bg-purple"
                        style="margin: 5px 0 0 40px"
                      >
                        <el-tag
                          closable
                          type="success"
                          effect="dark"
                          @close="delRig(scope.row.id, t.id)"
                        >
                          {{ t.authName }}
                        </el-tag>
                      </div></el-col
                    >
                    <el-col :span="20"
                      ><div class="grid-content bg-purple">
                        <el-tag
                          style="margin: 5px 5px"
                          closable
                          type="warning"
                          v-for="(k, j) in t.children"
                          :key="j"
                          effect="dark"
                          @close="delRig(scope.row.id, k.id)"
                        >
                          {{ k.authName }}
                        </el-tag>
                      </div></el-col
                    >
                  </el-row>
                </div></el-col
              >
            </el-row>
          </template>
                  
        </el-table-column>
        <el-table-column label="#" type="index"> </el-table-column>
        <el-table-column label="角色名称" prop="roleName"> </el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="props">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="getRolse(props.row.id)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="delRoles(props.row.id)"
              >删除</el-button
            >
            <el-button
              type="warning"
              icon="el-icon-setting"
              size="mini"
              @click="addRight(props.row.id)"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加角色的弹框 -->
    <el-dialog title="添加角色" :visible.sync="dialogAddRole">
      <el-form
        :model="role"
        ref="role"
        label-width="100px"
        class="demo-dynamic"
      >
        <el-form-item
          prop="roleName"
          label="角色名称"
          :rules="[
            { required: true, message: '请输入角色名称', trigger: 'blur' },
            {
              min: 3,
              max: 8,
              message: '长度在 3 到 8 个字符',
              trigger: 'blur',
            },
          ]"
        >
          <el-input v-model="role.roleName"></el-input>
        </el-form-item>
        <el-form-item
          prop="roleName"
          label="角色描述"
          :rules="[
            { required: true, message: '请输入角色描述', trigger: 'blur' },
          ]"
        >
          <el-input v-model="role.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddRole = false">取 消</el-button>
        <el-button type="primary" @click="addRoles('role')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 更改角色信息弹框 -->
    <el-dialog title="添加角色" :visible.sync="dialogUpdataRole">
      <el-form
        :model="getroles"
        ref="getroles"
        label-width="100px"
        class="demo-dynamic"
      >
        <el-form-item
          prop="roleName"
          label="角色名称"
          :rules="[
            { required: true, message: '请输入角色名称', trigger: 'blur' },
            {
              min: 2,
              max: 8,
              message: '长度在 2 到 8 个字符',
              trigger: 'blur',
            },
          ]"
        >
          <el-input v-model="getroles.roleName"></el-input>
        </el-form-item>
        <el-form-item
          prop="roleName"
          label="角色描述"
          :rules="[
            { required: true, message: '请输入角色描述', trigger: 'blur' },
          ]"
        >
          <el-input v-model="getroles.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUpdataRole = false">取 消</el-button>
        <el-button type="primary" @click="updataRoles('getroles')"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <!-- 分配权限的模态框 -->
    <el-dialog title="收货地址" :visible.sync="dialogJur">
      <el-tree
        :data="jurs"
        show-checkbox
        node-key="id"
        default-expand-all
        check-on-click-node
        current-node-key
        :default-checked-keys="[101]"
        ref="tree"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ data.authName }}</span>
        </span>
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogJur = false">取 消</el-button>
        <el-button type="primary" @click="getCheckedKeys">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
import {
  getRoles,
  addrole,
  delrole,
  getrole,
  updatarole,
  delrights,
  addrights,
  rights,
} from "../utils/request";
export default {
  name: "",
  data() {
    return {
      // 表格数据
      tableData: [],
      // 添加角色
      role: {
        roleName: "",
        roleDesc: "",
      },
      //   添加角色的弹框
      dialogAddRole: false,
      //   获取到的角色信息
      getroles: {
        roleName: "",
        roleDesc: "",
      },
      // 编辑角色信息
      dialogUpdataRole: false,
      // 分配权限
      dialogJur: false,
      // 所有的权限列表
      jurs: [],
      // 修改用户权限
      jur_str: "",
      // 角色ID
      roleID: "",
    };
  },
  created() {},
  mounted() {
    this.roles();
  },
  methods: {
    //   获取表格数据
    async roles() {
      let { data } = await getRoles();
      //   console.log(data);
      this.tableData = data.data;
    },
    // 添加角色
    addRoles(role) {
      let that = this;
      this.$refs[role].validate(async (valid) => {
        if (valid) {
          let { data: res } = await addrole(that.role);
          console.log(res);
          if (res.meta.status == 201) {
            that.dialogAddRole = false;
            that.$message({
              type: "success",
              message: res.meta.msg,
            });
            that.roles();
          }
        } else {
          return false;
        }
      });
    },
    // 删除角色
    async delRoles(id) {
      let { data: res } = await delrole(id);
      this.roles();
      if (res.meta.status == 200) {
        this.$message({
          type: "success",
          message: res.meta.msg,
        });
      } else {
        this.$message({
          type: "success",
          message: res.meta.msg,
        });
      }
    },
    // 获取角色信息
    async getRolse(id) {
      this.dialogUpdataRole = true;
      let { data: res } = await getrole(id);
      console.log(res);
      if (res.meta.status == 200) {
        this.getroles = res.data;
      }
    },
    // 更改角色信息
    updataRoles(getroles) {
      let that = this;
      this.$refs[getroles].validate(async (valid) => {
        if (valid) {
          let { data: res } = await updatarole(
            that.getroles.roleId,
            that.getroles
          );
          console.log(res);
          if (res.meta.status == 200) {
            that.dialogUpdataRole = false;
            that.$message({
              type: "success",
              message: res.meta.msg,
            });
            that.roles();
          }
        } else {
          return false;
        }
      });
    },
    // 删除角色指定权限
    delRig(roleid, rightid) {
      let that = this;
      this.$confirm("此操作将永久删除该权限, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let { data: res } = await delrights(roleid, rightid);
          // console.log(res);
          if (res.meta.status == 200) {
            this.$message({
              type: "success",
              message: res.meta.msg,
            });
            that.roles();
          } else {
            this.$message({
              type: "error",
              message: res.meta.msg,
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    async addRight(id) {
      this.roleID = id;
      this.dialogJur = true;
      let { data: res } = await rights("tree");
      this.jurs = res.data;
    },
    // 修改用户权限
    async getCheckedKeys() {
      // console.log(this.$refs.tree.getCheckedKeys());
      this.jur_str = this.$refs.tree.getCheckedKeys().join(",");
      let { data: res } = await addrights(this.roleID, { rids: this.jur_str });
      if (res.meta.status == 200) {
        this.$message.success(res.meta.msg);
        this.roles()
      } else {
        this.$message.success(res.meta.msg);
      }
      this.dialogJur = false;
    },
  },
  watch: {
    dialogAddRole: {
      handler(val) {
        if (val) return false;
        this.role = {
          roleName: "",
          roleDesc: "",
        };
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
.box-card {
  width: 100%;
  margin-top: 15px;
}
.grid-content {
  justify-content: center;
  align-items: center;
}
spam {
  display: inline-block;
}
#one {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ddd;
}
</style>