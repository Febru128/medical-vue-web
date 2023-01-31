<template>
    <div>
     <!--    头皮屑 -->
<el-breadcrumb separator-class="el-icon-arrow-right" font-size="20px">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>网上会诊</el-breadcrumb-item>
   <el-breadcrumb-item>问题汇总</el-breadcrumb-item>
</el-breadcrumb>

<!-- 卡片视图 -->
<el-card class="box-card">

    <!-- 评论渲染区域 -->
<el-table
    :data="tableData"
    style="width: 100%"
    :row-class-username="tableRowClassusername">
    <el-table-column
      prop="date"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="username"
      label="昵称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="problem"
      label="全部问题">
    </el-table-column>

    <!-- 操作按钮 -->
     <el-table-column label="操作" width='150px'>
          <template slot-scope="scope">
                <!-- 编辑按钮  提示文本 -->
            <el-tooltip
              class="item"
              effect="dark"
              content="查看问题"
              placement="top"
              :enterable="false"
            >
              <!-- 按钮 -->
              <el-button
                type="primary"
                icon="el-icon-tickets"
                size="mini"
                @click="drawer = true"
              ></el-button>
            </el-tooltip>

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
                @click="removeById(scope.row._id)"
              ></el-button>
            </el-tooltip>
               </template>
        </el-table-column>
  </el-table>
</el-card>
 
  <el-drawer
      title="查看修改问题"
      :visible.sync="drawer"
      :direction="direction"
      @close="checkClosed"
    >
      <!-- 内容区域 -->
      <el-form ref="checkFormRef" :model="checkForm" label-width="70px">
        <el-form-item label="昵称">
          <el-input
            class="box"
            v-model="checkForm.userusername"
            disabled
            width="100px"
          ></el-input>
        </el-form-item>
        <el-form-item label="问题描述" prop="problem">
          <el-input v-model="checkForm.problem" disabled></el-input>
        </el-form-item>
        <el-form-item label="身高体重" prop="body">
          <el-input v-model="checkForm.body" disabled></el-input>
        </el-form-item>
        <el-form-item label="患病时间" prop="time">
          <el-input v-model="checkForm.time" disabled></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="checkForm.gender" disabled>
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="用药情况" prop="pill">
          <el-input v-model="checkForm.pill" disabled></el-input>
        </el-form-item>

        <el-form-item label="过敏史" prop="ago">
          <el-input v-model="checkForm.ago" disabled></el-input>
        </el-form-item>

        <!-- 底部按钮 -->
        <span class="drawer-footer">
          <el-button @click="drawer = false" style="margin-bottom:10px">取 消</el-button>
          <el-button type="primary" @click="checkHandle">确 定</el-button>
        </span>
<!--  指导建议部分 -->
          <el-form-item label="指导医生" prop="doctor" >
          <el-input v-model="checkForm.doctor" ></el-input>
        </el-form-item>

        <el-form-item label="建议指导" prop="suggest">
          <el-input v-model="checkForm.suggest" ></el-input>
        </el-form-item>
      </el-form>
    </el-drawer>
     </div>
</template>

<script>
    export default {
    username: '',
    data() {
        return {
            tableData: [   {
          date: "2021-05-02",
          username: "张三",
          problem: "经常手指抖动，声音沙哑",
        },
         {
          date: '2021-05-02',
          username: '李四',
          problem: '手脚反应太慢，跟不上脑子，手脚都会间歇性地抖动',
        },
        
        ],
         checkForm: {
        time: "",
        userusername: "",
        problem: "",
        body: "",
        gender: "",
        pill: "",
        date: "",
        ago: "",
        date: "",
        doctor:'',
        suggest:'',

      },
/*    抽屉参数  */
            drawer:false,
            direction: "rtl",
        }
    },
     methods: {
      tableRowClassusername({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
      /*  关闭抽屉函数 */
      checkClosed(){
        this.drawer = false
      },
      /*  确定表单提交交互函数 */
      checkHandle(){
this.drawer = false
      },
/*  删除 数据 */
      async removeById(id){
const confirmResult  =  await this.$confirm(
    "此操作将永久删除该问题, 是否继续?",
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
      // const { data: res } = await this.$http.delete("" + id);
      // if (res.status !== 200) return this.$message.error("删除失败！");
      this.$message.success("删除成功！");
      // this.getUserList();

      }

    },

    }
</script>

<style  scoped>
.el-input {
  padding-left: 20px;
  width: 80%;
}
/* .box{
  width: 300px;
} */

.el-form-item {
  margin-left: 10px;
}
.box1 {
  width: 90px;
  height: 40px;
}
.drawer-footer {
  margin-left: 500px;
}
</style>