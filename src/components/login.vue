<template>
  <div class="login_container" >
      <div class="login_box">
          <!-- 头像区 -->
            <div class="avatar_box">
        <img src="../assets/pd2.jpeg" alt="avatar" />
      </div>
   
      <!-- 登录表单 -->
      <el-form 
      ref='loginFormRef'
      class="login_form"
      :model="loginForm"
      :rules="loginFormRules"
      label-width='60px'
      >
        <!-- 用户名 -->
      <el-form-item prop='username' label='昵称'>
       <el-input
        prefix-icon="iconfont icon-user"
         v-model="loginForm.username"
        
         ></el-input>
     </el-form-item>
      <!-- 密码 -->
      <el-form-item  prop='password' label='密码'>
    <el-input
     prefix-icon="iconfont icon-3702mima"
     v-model="loginForm.password"
     type='password'
    
     ></el-input>
     </el-form-item>
<!-- 按钮区域 -->
      <el-form-item class='btns'>
     <el-button type="primary" @click="login">登录</el-button>
      <el-button type="info" @click="resetLoginForm">重置</el-button>
     </el-form-item>

       <!-- 注册链接 -->
       <el-link type="primary" @click="changeregister" target="_blank">没有账号，前往注册</el-link>
     
      </el-form>
      </div>
  </div>
      
</template>

<script>
export default {
  name: "login",
  data(){
    return{
      /* 登录表单绑定的数据对象 */
      loginForm:{
        username:'',
        password:''
      },

      // 表单的验证规则
      loginFormRules:{
        // 验证用户是否合法
        username:[
          {required:true,message:'请输入登录名称',trigger:'blur'},
           { min: 3, max: 10, message: '长度在 3到 10 个字符', trigger: 'blur' }
        ],
        // 密码是否合法
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ]
    },

    
  }
},

//  方法函数
methods: {
    // 表单重置按钮
      resetLoginForm(){
        this.$refs.loginFormRef.resetFields()
        // console.log(this);
        
      },

      // 登录回调函数 
      login(){
        this.$refs.loginFormRef.validate(async (valid)=>{
          // console.log(valid);
          // console.log(this.loginForm);
          //  console.log(111);
          if(!valid)return 
        const {data:res}= await  this.$http.post('login',this.loginForm)
             // 根据响应体数据执行回调函数
       if (res.status !== 200) return this.$message.error(res.message)
        this.$message.success('登录成功')
        // console.log(this.loginForm);
        
          // 1、将登陆成功之后的token, 保存到客户端的sessionStorage中; localStorage中是持久化的保存
        //   1.1 项目中出现了登录之外的其他API接口，必须在登陆之后才能访问
        //   1.2 token 只应在当前网站打开期间生效，所以将token保存在sessionStorage中
        window.sessionStorage.setItem('isLogin', res.data.isLogin)

        window.sessionStorage.setItem('user',res.data.user )
        // console.log(res.data.user);
        
        // 2、通过编程式导航跳转到后台主页, 路由地址为：/home
        this.$router.push('/home')
      
     
      
      
        })
      },
      changeregister(){
        this.$router.push('/register')
      }
    },
}
</script>

<style lang='less' scoped>
/* // lang="less" 支持less格式
// scoped vue的指令，只在当前组件生效 */
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
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
.btns{
   display: flex;
  justify-content: flex-end;
}
.login_form{
  position: absolute;
   bottom: 60px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

</style>