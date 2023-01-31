<template>
    <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" font-size="20px">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>预约信息</el-breadcrumb-item>
    
    </el-breadcrumb> 

    <!-- 卡片 -->
    <el-card class="box-card">
          <!-- 搜索框区域 -->
      <el-row :gutter="20">
        <el-col :span="9">
          <el-input
            placeholder="请输入内容"
            clearable
            @clear="getUserList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUserList"
            ></el-button> </el-input
        ></el-col>
        <!-- 添加按钮 -->
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true"
            >添加</el-button
          ></el-col
        >
      </el-row>
   <!-- 用户列表区域 -->
      <el-table :data="userList" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="username" label="病人"></el-table-column>
          <el-table-column prop="doctor" label="预约医生"></el-table-column>
        <el-table-column prop="item" label="预约项目"></el-table-column>
        <el-table-column prop="time" label="预约时间"></el-table-column> 
        <el-table-column prop="date" label="预约日期"></el-table-column> 
         
        <el-table-column prop="mobile" label="医生电话"></el-table-column>
        <el-table-column prop="office" label="预约科室"></el-table-column>


        <el-table-column label="诊断中">
          <template slot-scope="scope">
            <el-switch
             v-model="scope.row.mg_state"
             
            ></el-switch>
          </template>
        </el-table-column>

        <el-table-column label="操作" style="width:200px;">
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
                
              ></el-button>
            </el-tooltip> -->
          </template>
        </el-table-column>
      </el-table>
</el-card>
     </div>
</template>

<script>
    export default {
    name: '',
    data() {
        return {
            userList: [
        {
          doctor: '李康',
          username: "李四",
          item: "2025444@qq.com",
          mobile: 18059593610,
          mg_state:true,
          time: '12-14',      
          pagenum:1,   
          date:'5月4日'    ,
          office:'内科',
        },
         {
          doctor: '凌任',
          username: "张三",
          item: "4555577@qq.com",
          mobile: 18051243610,
          time: '9-10', 
          mg_state:true,     
          pagenum:1,   
          date:'5月5日'    ,
          office:'外科',
        },
         {
          doctor:'李顺',
          username: "林航",
          item: "1448946487@qq.com",
          mobile: 18649593610,
          time: '10-11',  
          mg_state:true,    
          pagenum:1,   
          date:'5月7日'    ,
          office:'儿科',
        },
         {
          doctor: '吴云',
          username: "蒋依依",
          item: "1448946487@qq.com",
          mobile:18059483610,
          time: '13-14',      
          pagenum:1,   
          mg_state:true,
          date:'5月4日'    ,
          office:'内科',
        },
        
      ],
        }
    },
    }
</script>

<style  scoped>

</style>