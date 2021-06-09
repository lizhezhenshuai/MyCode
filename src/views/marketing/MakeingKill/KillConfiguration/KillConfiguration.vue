// //秒杀配置
  <template>
  <div>
    是否显示：
    <el-select v-model="value" placeholder="请选择">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>秒杀名称：
    <el-input v-model="txtName" placeholder="请输入秒杀名称" style="width:200px "></el-input>
    <el-button icon="el-icon-search" @click="cha()" circle></el-button>
    <el-button type="primary" @click="dialogFormVisible = true" round>添加秒杀配置</el-button>

    <!-- 显示列表 -->
    <el-table
      style="width: 100%"
      :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
    >
      <el-table-column prop="screenId" label="Id" width="180"></el-table-column>
      <el-table-column label="轮播图" width="180">
        <div class="demo-image">
          <div class="block" v-for="fit in fits" :key="fit">
            <span class="demonstration">{{ fit }}</span>
            <el-image style="width: 100px; height: 100px" :src="url" :fit="fit"></el-image>
          </div>
        </div>
      </el-table-column>
      <el-table-column prop="screenName" label="秒杀名称" width="180"></el-table-column>
      <el-table-column prop="screenTime" label="秒杀时间"></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column prop="screenCode" label="状态" width="180">
        <template slot-scope="sel">
          <el-switch
            v-model="sel.row.screenCode"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            @click="Edit(scope.row)"
            :plain="true"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="Del(scope.row)"
            :plain="true"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="block" style="margin-top: 15px">
      <el-pagination
        align="left"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[3, 5, 10, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
      ></el-pagination>
    </div>

    <!-- 添加弹出页面 -->
    <el-dialog title="添加配置信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="秒杀名称">
          <el-input v-model="form.Name" style="width:268px"></el-input>
        </el-form-item>
        <el-form-item label="秒杀图片">
          <div class="demo-image">
            <div class="block" v-for="fit in fits" :key="fit">
              <span class="demonstration">{{ fit }}</span>
              <el-image style="width: 100px; height: 100px" :src="url" :fit="fit"></el-image>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.Time"
              style="width: 300px;"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="秒杀状态">
          <el-switch
            v-model="form.Code"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="0"
            inactive-value="1"
          ></el-switch>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.Create"
              style="width: 300px;"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="Save()">保存</el-button>
          <el-button type="danger" @click="Qv">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

 <script>
export default {
  data() {
    return {
      //显示数据表格
      tableData: [],
      //分页
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 3, // 每页的数据条数
      dialogVisible: false,
      dialogAdd: false,
      dialogStatus: false,
      UptdialogVisible: false,
      dialogTitle: "",

      //弹出框
      dialogFormVisible: false,

      //查询输入框
      txtName: "",
      //添加表单元素
      form: {
        Name: "",
        Show: "",
        Time: "",
        Time1: "",
        Code: true,
        Create: "",
        Create1: "",
      },
      //下拉数据
      options: [
        {
          value: "-1",
          label: "全部显示",
        },
        {
          value: "0",
          label: "关闭",
        },
        {
          value: "1",
          label: "开启",
        },
      ],
      value: "",
      fits: [""],
      url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      imageUrl: "",
    };
  },

  //页面预加载
  mounted() {
    this.getdatatable();
  },

  methods: {
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function (size) {
      this.pagesize = size;
      console.log(this.pagesize); //每页下拉显示数据
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage); //点击第几页
    },

    //显示
    getdatatable: function () {
      this.$http.get("https://localhost:44375/api/ScreenShow").then((res) => {
        console.log(res);
        this.tableData = res.data.data;
        console.log(this.tableData);
      });
    },
    //删除
    Del: function (s) {
      this.axios({
        url: "https://localhost:44375/api/ScreenDel",
        method: "post",
        params: { id: s.screenId },
      }).then((res) => {
        if (res.data.data > 0) {
          this.getdatatable();
          this.$message({
            message: "删除成功",
            type: "success",
          });
        } else {
          this.getdatatable();
          this.$message.error("删除失败");
        }
      });
    },
    //保存(添加+修改)
    Save: function () {
      //添加
      if (this.Eid.ids == undefined) {
        var data = {};
        data.screenName = this.form.Name;
        data.slideshow = this.form.Show;
        data.screenTime = this.form.Time;
        data.screenCode = this.form.Code;
        data.sreateTime = this.form.Create;
        this.axios({
          url: "https://localhost:44375/api/ScreenAdd",
          method: "post",
          data: data,
        }).then((res) => {
          this.dialogFormVisible = false;
          if (res.data.data > 0) {
            //添加后重新加载列表
            this.getdatatable();
            this.$message({
              message: "添加成功",
              type: "success",
            });
          } else {
            this.getdatatable();
            this.$message.error("添加失败");
          }
        });
      } else {
        var data = {};
        data.screenId = this.Eid.ids;
        data.screenName = this.form.Name;
        data.slideshow = this.form.Show;
        data.screenTime = this.form.Time;
        data.screenCode = this.form.screenCode;
        data.sreateTime = this.form.Create;
        this.axios({
          url: "https://localhost:44375/api/ScreenUpt",
          method: "post",
          data: data,
        }).then((res) => {
          this.dialogFormVisible = false;
          if (res.data.data > 0) {
            //添加后重新加载列表
            this.getdatatable();
            this.$message({
              message: "修改成功",
              type: "success",
            });
          } else {
            this.getdatatable();
            this.$message.error("修改失败");
          }
        });
      }
    },
    //取消
    Qv() {
      this.dialogFormVisible = false;
      this.getdatatable();
    },
    //查询
    cha: function () {
      var name = this.txtName;
      var tid = this.value;
      this.axios({
        url:
          "https://localhost:44375/api/ScreenShow?name=" + name + "&tid=" + tid,
        method: "get",
      }).then((res) => {
        this.tableData = res.data.data;
      });
    },
    //修改id
    Eid: function () {
      ids = 0;
    },
    //修改
    Edit: function (s) {
      this.Eid.ids = s.screenId;

      this.dialogFormVisible = true;
    },
  },
};
</script>

