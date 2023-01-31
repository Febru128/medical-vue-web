<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" font-size="20px">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>患者管理</el-breadcrumb-item>
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
            >添加患者</el-button
          ></el-col
        >
      </el-row>

      <!-- 用户列表区域 -->
      <el-table :data="userList" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="checkOffice" label="检查科室"></el-table-column>
        <el-table-column prop="checkDoctor" label="检查医生"></el-table-column>
        <el-table-column prop="checkType" label="检查类型"></el-table-column>
        <el-table-column prop="orgin" label="病人来源"></el-table-column>
        <el-table-column prop="room" label="病房"></el-table-column>
        <el-table-column prop="ago" label="病史"></el-table-column>
        <el-table-column prop="PPE" label="PPE"></el-table-column>
        <el-table-column prop="DFA" label="DFA"></el-table-column>
        <el-table-column prop="RPDE" label="RPDE"></el-table-column>

        <el-table-column label="是否患病">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="userStateChanged(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>

        <el-table-column label="操作" width='150px'>
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
              <!-- 按钮 -->
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
              ></el-button> -->
            </el-tooltip>
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
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
         <el-form-item label="检查科室" prop="checkOffice">
          <el-input v-model="addForm.checkOffice"></el-input>
        </el-form-item>
         <el-form-item label="检查医生" prop="checkDoctor">
          <el-input v-model="addForm.checkDoctor"></el-input>
        </el-form-item>
         <el-form-item label="检查类型" prop="checkType">
          <el-input v-model="addForm.checkType"></el-input>
        </el-form-item>
         <el-form-item label="来源" prop="orgin">
          <el-input v-model="addForm.orgin"></el-input>
        </el-form-item>
         <el-form-item label="病房" prop="room">
          <el-input v-model="addForm.room"></el-input>
        </el-form-item>
         <el-form-item label="病历" prop="ago">
          <el-input v-model="addForm.ago"></el-input>
        </el-form-item>
         <el-form-item label="PPE" prop="PPE">
          <el-input v-model="addForm.PPE"></el-input>
        </el-form-item>
         <el-form-item label="DFA" prop="DFA">
          <el-input v-model="addForm.DFA"></el-input>
        </el-form-item>
         <el-form-item label="RPDE" prop="RPDE">
          <el-input v-model="addForm.RPDE"></el-input>
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
          <el-input v-model="editForm.username" ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item> 
        <el-form-item label="检查科室" prop="checkOffice">
          <el-input v-model="editForm.checkOffice"></el-input>
        </el-form-item>
         <el-form-item label="检查医生" prop="checkDoctor">
          <el-input v-model="editForm.checkDoctor"></el-input>
        </el-form-item>
         <el-form-item label="检查类型" prop="checkType">
          <el-input v-model="editForm.checkType"></el-input>
        </el-form-item>
         <el-form-item label="来源" prop="orgin">
          <el-input v-model="editForm.orgin"></el-input>
        </el-form-item>
         <el-form-item label="病房" prop="room">
          <el-input v-model="editForm.room"></el-input>
        </el-form-item>
         <el-form-item label="病历" prop="ago">
          <el-input v-model="editForm.ago"></el-input>
        </el-form-item>
         <el-form-item label="PPE" prop="PPE">
          <el-input v-model="editForm.PPE"></el-input>
        </el-form-item>
         <el-form-item label="DFA" prop="DFA">
          <el-input v-model="editForm.DFA"></el-input>
        </el-form-item>
         <el-form-item label="RPDE" prop="RPDE">
          <el-input v-model="editForm.RPDE"></el-input>
        </el-form-item > 
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
        checkOffice: "",
        checkDoctor: "",
        checkType: "",
        orgin: "",
        room: "",
        ago: "",
        PPE: "",
        DFA: "",
        RPDE: "",
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
        checkDoctor: [
          { required: true, message: "请输入检查病人", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在2～10个字",
            trigger: "blur",
          },
        ],
         checkOffice: [
          { required: true, message: "请输入检查科室", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在2～10个字",
            trigger: "blur",
          },
        ],
         checkType: [
          { required: true, message: "请输入检查类型", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在2～10个字",
            trigger: "blur",
          },
        ],
         orgin: [
          { required: true, message: "请输入来源", trigger: "blur" },
          {
            min: 2,
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
          // role_name: "超级管理者",
          mg_state: true,
          pagenum: 1,
          checkOffice: "",
          checkDoctor: "",
          checkType: "",
          orgin: "",
          room: 201,
          age: "无",
          ago: "",
          PPE: "",
          DFA: "",
          RPDE: "",
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
      const { data: res } = await this.$http.get("patients", {
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
         const{ data:res} = await this.$http.get("patient/search",{
           params:this.querySearch
         })
         if(res.status !=200) return this.$message.error('数据库中没有该用户')
          this.userList = res.users
          console.log(res.users);
          
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
        `patients/${userInfo._id}/state/${userInfo.mg_state}`
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
        const { data: res } = await this.$http.post("patients", this.addForm);
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
      const { data: res } = await this.$http.get("patients/" + id);

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
        const { data: res } = await this.$http.post("patients/new", {
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
      const { data: res } = await this.$http.delete("patients/" + id);
      if (res.status !== 200) return this.$message.error("删除用户失败！");
      this.$message.success("删除用户成功！");
      this.getUserList();
    },
  },
};
</script>

<style  scoped>
</style>