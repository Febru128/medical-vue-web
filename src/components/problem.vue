<template>
  <div>
    <!--    头皮屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" font-size="20px">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>网上会诊</el-breadcrumb-item>
      <el-breadcrumb-item>发表问题</el-breadcrumb-item>
    </el-breadcrumb>



    <!-- 按钮 -->
    <el-button
      type="primary"
      size="mini"
      class="box1"
      style="margin-left: 16px; margin-bottom: 10px"
      
      @click="drawer = true"
    >
      发表问题</el-button
    >

    <!-- 卡片视图 -->
    <el-card class="box-card">
      <!-- 评论渲染区域 -->
      <el-table
        :data="tableData"
        style="width: 100%"
        :row-class-name="tableRowClassName"
      >
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="username" label="昵称" width="180">
        </el-table-column>
        <el-table-column prop="problem" label="发表问题"> </el-table-column>

        <!-- 操作按钮 -->
        <el-table-column label="操作" width="200px">
          <template slot-scope="scope">
            <!-- 编辑按钮  提示文本 -->

            <el-tooltip
              class="item"
              effect="dark"
              content="查看和编辑"
              placement="top"
              :enterable="false"
            >
              <!-- 按钮 -->
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="editDrawer = true"
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

    <!-- 抽屉 -->
    <!-- <el-radio-group v-model="direction">
  <el-radio label="ltr">从左往右开</el-radio>
  <el-radio label="rtl">从右往左开</el-radio>
  <el-radio label="ttb">从上往下开</el-radio>
  <el-radio label="btt">从下往上开</el-radio>
</el-radio-group> -->

    <!-- 抽屉内容区域 -->
    <el-drawer
      title="问题发表"
      :visible.sync="drawer"
      :direction="direction"
      @close="addClosed"
    >
      <!-- 内容区域 -->
      <el-form ref="addFormRef" :model="addForm" label-width="70px">
        <el-form-item label="昵称">
          <el-input
            class="box"
            v-model="addForm.username"
            width="100px"
          ></el-input>
        </el-form-item>

         <el-form-item label="日期" prop="date">
          <el-input v-model="addForm.date"></el-input>
        </el-form-item>

        <el-form-item label="问题描述" prop="problem">
          <el-input v-model="addForm.problem"></el-input>
        </el-form-item>
        <el-form-item label="身高体重" prop="body">
          <el-input v-model="addForm.body"></el-input>
        </el-form-item>
        <el-form-item label="患病时间" prop="time">
          <el-input v-model="addForm.time"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="addForm.gender">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="用药情况" prop="pill">
          <el-input v-model="addForm.pill"></el-input>
        </el-form-item>

        <el-form-item label="过敏史" prop="ago">
          <el-input v-model="addForm.ago"></el-input>
        </el-form-item>

        <!-- 底部按钮 -->
        <span class="drawer-footer">
          <el-button @click="drawer = false">取 消</el-button>
          <el-button type="primary" @click="addHandle">确 定</el-button>
        </span>
<!--  指导建议部分 -->
          <!-- <el-form-item label="指导医生" prop="doctor">
          <el-input v-model="addForm.doctor"></el-input>
        </el-form-item>

        <el-form-item label="建议指导" prop="suggest">
          <el-input v-model="addForm.suggest"></el-input>
        </el-form-item> -->
      </el-form>
    </el-drawer>


    <!--   查看和编辑 抽屉框  -->
     <el-drawer
      title="查看修改问题"
      :visible.sync="editDrawer"
      :direction="direction"
      @close="editClosed"
    >
      <!-- 内容区域 -->
      <el-form ref="editFormRef" :model="editForm" label-width="70px">
        <el-form-item label="昵称">
          <el-input
            class="box"
            v-model="editForm.username"
            width="100px"
          ></el-input>
        </el-form-item>
        <el-form-item label="问题描述" prop="problem">
          <el-input v-model="editForm.problem"></el-input>
        </el-form-item>
        <el-form-item label="身高体重" prop="body">
          <el-input v-model="editForm.body"></el-input>
        </el-form-item>
        <el-form-item label="患病时间" prop="time">
          <el-input v-model="editForm.time"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="editForm.gender">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="用药情况" prop="pill">
          <el-input v-model="editForm.pill"></el-input>
        </el-form-item>

        <el-form-item label="过敏史" prop="ago">
          <el-input v-model="editForm.ago"></el-input>
        </el-form-item>

        <!-- 底部按钮 -->
        <span class="drawer-footer">
          <el-button @click="editDrawer = false" style="margin-bottom:10px">取 消</el-button>
          <el-button type="primary" @click="editHandle">确 定</el-button>
        </span>
<!--  指导建议部分 -->
          <el-form-item label="指导医生" prop="doctor" >
          <el-input v-model="editForm.doctor" disabled></el-input>
        </el-form-item>

        <el-form-item label="建议指导" prop="suggest">
          <el-input v-model="editForm.suggest" disabled></el-input>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      tableData: [
        {
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

      /* 抽屉参数 */
      drawer: false,

      editDrawer :false,

      direction: "rtl",
/*   加载图标 参数 */
      fullscreenLoading: false,

      /* 添加 表单 */
      addForm: {
        time: "",
        username: "",
        problem: "",
        body: "",
        gender: "",
        pill: "",
        date: "",
        ago: "",
        date: "",
        // doctor:'',
        // suggest:'',

      },
      editForm: {
        time: "",
        username: "",
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
    };
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    /*   添加问题抽屉关闭清空内容  */
    addClosed() {
      this.$refs.addFormRef.resetFields();
    },

 
    /* 处理添加问题和 后台的交互处理 */
    addHandle(){


 this.drawer = false
    },
 /*   编辑问题抽屉关闭清空内容  */
    editClosed() {
      this.$refs.editFormRef.resetFields();
    },
    /* 编辑问题 的 与后台交互处理 */
    editHandle(){
     this.editDrawer = false

    },
/*   删除问题 */
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
      // this.$message.success("删除成功！");
      // this.getUserList();

    }
  },
};
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