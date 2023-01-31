<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" font-size="20px">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>医生管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区  -->
    <el-card>
      <!-- 搜索框区域 -->
      <el-row :gutter="20">
        <el-col :span="9">
          <el-input
            placeholder="请输入内容"
            v-model="querySearch.info"
            clearable
            @clear="getUserList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="search"
            ></el-button> </el-input
        ></el-col>
        <!-- 添加按钮 -->
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true"
            >添加用户</el-button
          ></el-col
        >
      </el-row>

      <!-- 用户列表区域 -->
      <el-table :data="userList" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column prop="gender" label="性别"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="office" label="科室"></el-table-column>
        <el-table-column prop="duty" label="职务"></el-table-column>
        <el-table-column prop="time" label="任职时间"></el-table-column>

        <el-table-column prop="watch" label="值班"></el-table-column>
        <el-table-column label="管理员">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="userStateChanged(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="150px">
          <template slot-scope="scope">
            <!-- 编辑按钮  提示文本 -->
            <el-tooltip
              class="item"
              effect="dark"
              content="编辑"
              placement="top"
              :enterable="false"
            >
              <!-- 按钮 -->
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="showEditDialog(scope.row._id)"
              ></el-button>
            </el-tooltip>

            <!-- 删除按钮 提示文本 -->
            <el-tooltip
              class="item"
              effect="dark"
              content="删除"
              placement="top"
              :enterable="false"
            >
              <!-- 删除按钮 -->
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="removeUserById(scope.row._id)"
              ></el-button>
            </el-tooltip>

            <!-- 角色管理按钮  提示文本 -->
            <!-- <el-tooltip
              class="item"
              effect="dark"
              content="分配角色"
              placement="top"
              :enterable="false"
            >
            
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
                
              ></el-button>
            </el-tooltip> -->
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[4, 6, 8, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <!-- 添加用户对话框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <!-- 内容主体区域 -->
      <el-form
        ref="addFormRef"
        :model="addForm"
        :rules="addFormRules"
        label-width="70px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="addForm.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="addForm.gender">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>

        <el-form-item label="职务" prop="duty">
          <el-input v-model="addForm.duty"></el-input>
        </el-form-item>
        <el-form-item label="科室" prop="office">
          <el-input v-model="addForm.office"></el-input>
        </el-form-item>
        <el-form-item label="值班" prop="watch">
          <el-input v-model="addForm.watch"></el-input>
        </el-form-item>
        <el-form-item label="任职时间" prop="time">
          <el-input v-model="addForm.time"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部按钮区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改用户的对话框 -->
    <el-dialog
      title="编辑用户"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <!-- 主体内容 -->
      <el-form
        ref="editFormRef"
        :model="editForm"
        :rules="editFormRules"
        label-width="70px"
      >
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
         <el-form-item label="年龄" prop="age">
          <el-input v-model="editForm.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="editForm.gender">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- <el-form-item label="密码" prop="password">
          <el-input v-model="editForm.password"></el-input>
          </el-form-item> -->
        <el-form-item label="职务" prop="duty">
          <el-input v-model="editForm.duty"></el-input>
        </el-form-item>
        <el-form-item label="科室" prop="office">
          <el-input v-model="editForm.office"></el-input>
        </el-form-item>
        <el-form-item label="值班" prop="watch">
          <el-input v-model="editForm.watch"></el-input>
        </el-form-item>
        <el-form-item label="任职时间" prop="time">
          <el-input v-model="editForm.time"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "doctor",
  data() {
    // 自定义邮箱规则
    var checkEmail = (rule, value, callback) => {
      const regEmail = /^\w+@\w+(\.\w+)+$/;
      if (regEmail.test(value)) {
        // 合法邮箱
        return callback();
      }
      callback(new Error("请输入合法邮箱"));
    };
    // 自定义手机号规则
    var checkMobile = (rule, value, callback) => {
      const regMobile = /^1[34578]\d{9}$/;
      if (regMobile.test(value)) {
        return callback();
      }
      // 返回一个错误提示
      callback(new Error("请输入合法的手机号码"));
    };
    return {
      queryInfo: {
        query: "",
        /* 当前页面 */
        pagenum: 1,
        // 每页显示几条数据
        pagesize: 4,
      },
      // 控制添加用户框的显示和隐藏
      addDialogVisible: false,

      // 控制编辑用户对话框的显示和隐藏
      editDialogVisible: false,

      //   查询到的用户的信息对象
      editForm: {},

      // 修改用户的表单验证规则对象
      editFormRules: {
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" },
        ],
      },

      /* 添加用户的表单数据   */
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: "",
        watch: "",
        time: "",
        age: "",
        gender: "",
        duty: "",
        office: "",
      },
      // 添加表单的验证规则对象
      addFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "用户名的长度在2～10个字",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入用户密码", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "用户密码的长度在6～18个字",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" },
        ],
        age: [
          { required: true, message: "请输入年龄", trigger: "blur" },
          {
            min: 1,
            max: 3,
            message: "年龄的长度在1~3个字",
            trigger: "blur",
          },
        ],

        duty: [
          { required: true, message: "请输入职务", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "职务的长度在2～10个字",
            trigger: "blur",
          },
        ],
        office: [
          { required: true, message: "请输入科室", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "科室的长度在2～10个字",
            trigger: "blur",
          },
        ],
        time: [{ required: false, message: "请输入任职时间", trigger: "blur" }],
        watch: [
          { required: false, message: "请输入值班时间", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在2～10个字",
            trigger: "blur",
          },
        ],
      },

      total: 10,

      userList: [
        {
          id: 11,
          username: "木木康",
          email: "14444@qq.com",
          mobile: 12345555544,
          watch: "值班",
          time: "2年",
          mg_state: true,
          pagenum: 1,
          age: 11,
          gender: "男",
          duty: "医生",
          office: "内科",
        },
      ],
      //  搜索参数
      querySearch:{
        info:'',
      }
    };
  },

  created() {
    this.getUserList();
  },

  methods: {
    // getUserList() {},
    async getUserList() {
      const { data: res } = await this.$http.get("users", {
        params: this.queryInfo,
      });
      if (res.status !== 200) return this.$message.error("获取医生数据失败");
      console.log(res);
      this.userList = res.users;
      this.total = res.total;
      // console.log(userlist);
    },

    // 搜索功能
    async search(){
         const{ data:res} = await this.$http.get("users/search",{
           params:this.querySearch
         })
         if(res.status !=200) return this.$message.error('数据库中没有该用户')
          this.userList = res.users
    },

    /* 监听 pagesize 的改变 */
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getUserList();
    },

    /* 监听 页码值 的改变 */
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getUserList();
    },

    // 监听 switch开关 状态改变
    // userStateChanged(userInfo) {
    //   console.log(userInfo);
    // },
    async userStateChanged(userInfo) {
      // console.log(userInfo)

      const { data: res } = await this.$http.put(
        `users/${userInfo._id}/state/${userInfo.mg_state}`
      );
      if (res.status !== 200) {
        userInfo.mg_state = !userInfo.mg_state;
        return this.$message.error("更新用户状态失败");
      }
      // this.getUserList()
      this.$message.success("更新用户状态成功！");
    },

    //监听添加用户对话框关闭时清空
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },

    // 点击按钮，添加用户
    addUser() {
      // this.$refs.addFormRef.validate((valid) => {
      //   console.log(valid);
      //   this.addDialogVisible = false;
      // });
      this.$refs.addFormRef.validate(async (valid) => {
        // console.log(valid)
        // 表单预校验失败
        if (!valid) return;
        const { data: res } = await this.$http.post("users", this.addForm);
        if (res.status !== 201) {
          this.$message.error("添加用户失败！");
        }
        this.$message.success("添加用户成功！");
        // 隐藏添加用户对话框
        this.addDialogVisible = false;
        this.getUserList();
      });
    },

    // 编辑按钮的编辑对话框
    async showEditDialog(id) {
      // console.log(id);
      const { data: res } = await this.$http.get("users/" + id);

      if (res.status !== 200) {
        return this.$message.error("查询用户信息失败");
      }
      this.editForm = res.data.date;

      this.editDialogVisible = true;
    },

    //清除且重置修改表单的信息
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },

    //  修改用户信息的表单并提交
    editUserInfo() {
      this.$refs.editFormRef.validate(async (valid) => {
        console.log(valid);
        if (!valid) return;
        // 发起表单修改信息的提交
        const { data: res } = await this.$http.post("users/new", {
         data:this.editForm
        });
        if (res.status !== 200) {
          return this.$message.error("更新用户信息失败");
        }

        //   关闭用户修改对话框
        this.editDialogVisible = false;
        //  更新数据
        this.getUserList();
        // 提示更新成功
        this.$message.success("更新成功");
      });
    },

    //   根据用户id来 删除用户 函数
    async removeUserById(id) {
      const confirmResult = await this.$confirm(
        "此操作将永久删除该用户, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      // 点击确定 返回值为：confirm
      // 点击取消 返回值为： cancel
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消删除");
      }
      const { data: res } = await this.$http.delete("users/" + id);
      if (res.status !== 200) return this.$message.error("删除用户失败！");
      this.$message.success("删除用户成功！");
      this.getUserList();
    },
  },
};
</script>

<style  scoped>
/* #box1{
  width: 400px;
} */
.el-input {
  padding-left: 20px;
  width: 80%;
}
</style>