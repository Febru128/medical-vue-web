<template>
 
    <el-container class="home-container">

        <!-- 头部区域 -->
      <el-header>
          <div>
        <img src="../assets/pd2.jpeg" alt />
        <span>帕金森医疗管理后台管理系统</span>
      </div>
       <el-button type="info" @click="logout">退出</el-button>
      </el-header>

      <!-- 主体区域 -->
      <el-container>
          <!-- 侧边栏 -->
        <el-aside :width=" isCollaspe ?'64px':'200px'">
          <!-- 按钮收缩 -->
           <div class="toggle-button" @click="togleCollapse">|||</div>
          <!-- 导航栏 -->
           <el-menu 
            :unique-opened='true'  
       background-color="#5673978A"
      text-color="#fff"
      active-text-color="rgb(76,209,224)"
      :collapse=isCollaspe
     :collapse-transition='false'
     :router='true'
     >
      <!-- 一级菜单 -->
      <el-submenu index="1">
        <template slot="title">
          <!-- 图标 -->
          <i class="el-icon-user"></i>
          <!-- 文本 -->
          <span>信息管理</span>
        </template>
         <el-menu-item index="doctor">
           <i class="el-icon-user"></i>
        <span slot="title">医生信息</span>
      </el-menu-item>
       <el-menu-item index="patient">
           <i class="el-icon-user"></i>
        <span slot="title">患者信息</span>
      </el-menu-item>
      </el-submenu>
     <el-menu-item index="python">
        <i class="el-icon-menu"></i>
        <span slot="title">预约统计</span>
      </el-menu-item>


    <el-submenu index="2">
        <template slot="title">
          <!-- 图标 -->
          <i class="el-icon-shopping-cart-2"></i>
          <!-- 文本 -->
          <span>开单缴费</span>
        </template>
         <el-menu-item index="dairy">
           <i class="el-icon-document"></i>
        <span slot="title">处方</span>
      </el-menu-item>
     
      </el-submenu>

      <el-menu-item index="table">
        <i class="el-icon-document-copy"></i>
        <span slot="title">病情统计</span>
      </el-menu-item>

        <!-- <el-menu-item index="talk">
        <i class="el-icon-position"></i>
        <span slot="title">网上问诊</span>
      </el-menu-item> -->

        <el-submenu index="3">
        <template slot="title">
          <!-- 图标 -->
          <i class="el-icon-position"></i>
          <!-- 文本 -->
          <span>网上会诊</span>
        </template>
         <el-menu-item index="problem">
           <i class="el-icon-eleme"></i>
        <span slot="title">发表问题</span>
      </el-menu-item>
       <el-menu-item index="talk">
           <i class="el-icon-reading"></i>
        <span slot="title">问题汇总</span>
      </el-menu-item>
      </el-submenu>
      
    </el-menu>

       </el-aside>

        <!-- 右边的内容区 -->
        <el-main>
          <!-- 路由占位符 -->
          <router-view></router-view>

        </el-main>
      </el-container>
    </el-container>

</template>

<script>
export default {
  name: "home",
  data() {
    return {
   isCollaspe:false,

    };
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
     handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      togleCollapse(){
    this.isCollaspe= !this.isCollaspe
      }
  },
};  
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: rgba(34, 61, 61, 0.788);
  // background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 5px;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    img {
      height: 50px;
      border-radius:50%;
    }
    span {
      margin-left: 15px;
    }
  }
}
.el-aside{
    background-color:rgb(90,118,154);
    .el-menu{
      border-right:none
    }
}
.el-main{
     background-color:#eaedf1 ;
}
.toggle-button {
  background-color: rgb(90,118,154);
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  // 鼠标放上去变成小手
  cursor: pointer;
}

</style>
