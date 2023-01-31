<template>
  <div class="register_container">
      <div class="register_box">
          <!-- 头像区 -->
            <div class="avatar_box">
        <img src="../assets/pd2.jpeg"  alt="avatar" />
      </div>
   
      <!-- 注册表单 -->
      <el-form 
      ref='registerFormRef'
      class="register_form"
      label-width="60px"
      :model="registerForm"
      :rules="registerFormRules"
      >
      <!-- 邮箱 -->
       <el-form-item prop='email'      
      label="邮箱"
      :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'}
    ]">
       <el-input
        prefix-icon="iconfont icon-user"
         v-model="registerForm.email"
        
         ></el-input>
           </el-form-item>
        <!-- 用户名 -->
      <el-form-item prop='username' label='昵称'>
       <el-input
        prefix-icon="iconfont icon-user"
         v-model="registerForm.username"
        
         ></el-input>
     </el-form-item>
      <!-- 密码 -->
      <el-form-item  prop='password' label='密码'  >
    <el-input
     prefix-icon="iconfont icon-3702mima"
     v-model="registerForm.password"
     type='password'
        
     ></el-input>
     </el-form-item>
<!-- 按钮区域 -->
      <el-form-item class='btns'>
     <el-button type="primary" @click="register">注册</el-button>
      <el-button type="info" @click="resetregisterForm">重置</el-button>
     </el-form-item>

     <!-- 登录链接 -->
       <el-link type="primary" @click="changeLogin" target="_blank">已有账号，前往登录</el-link>
      </el-form>
      </div>
  </div>
      
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      /* 登录表单绑定的数据对象 */
      registerForm: {
          email:"",
        username: "",
        password: "",
      },

      // 表单的验证规则
      registerFormRules: {
        // 验证用户是否合法
        username: [
          { required: true, message: "请输入登录名称", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3到 10 个字符", trigger: "blur" },
        ],
        // 密码是否合法
        password: [
          { required: true, message: "请输入用户密码", trigger: "blur" },
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


  //  注册方法函数
  methods: {
    // 表单重置按钮
    resetregisterForm() {
      this.$refs.registerFormRef.resetFields();
     
      
      // console.log(this);
    },

    // 注册发送表单数据
     register(){
        // console.log(this.registerForm);
       
          this.$refs.registerFormRef.validate(async (valid)=>{
         
          if(!valid)return  
           const {data:res}= await  this.$http.post('register',this.registerForm)
             // 根据响应体数据执行回调函数
       if (res.status!== 200) {
         console.log(res);
         
           return this.$message.error('注册失败'+res.message)
       }
       if(res.err_code===1){
           return this.$message.error(res.message)
       }
         console.log(this.registerForm);
         
        this.$message.success('注册成功')
      
     
      
      
        }) 
      },
      changeLogin(){
//   console.log(this.$router);
  this.$router.push('/login')
  
      },

  },
};
</script>

<style lang='less' scoped>
/* // lang="less" 支持less格式
// scoped vue的指令，只在当前组件生效 */
.register_container {
  background-color: #2b4b6b;
  height: 100%;
}
.register_box {
  width: 450px;
  height: 360px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.avatar_box {
  width: 130px;
  height: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}
.btns {
  display: flex;
  justify-content: flex-end;
}
.register_form {
  position: absolute;
  bottom: 20px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>