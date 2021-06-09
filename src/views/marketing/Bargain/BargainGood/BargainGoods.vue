//砍价商品
  <template>
  <div>
    是否显示：
    <el-select v-model="value" placeholder="请选择">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>秒杀名称：
    <el-input v-model="txtName" placeholder="请输入内容" style="width:200px"></el-input>
    <el-button type="primary" icon="el-icon-search" @click="cha()">搜索</el-button>
    <el-button type="primary" @click="dialogFormVisible = true">添加砍价商品</el-button>
    <el-table
      :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
      height="600"
      border
      style="width: 100%"
    >
      <el-table-column prop="kid" label="Id" width="100"></el-table-column>
      <el-table-column label="砍价图片" width="100">
        <div class="demo-image">
          <div class="block" v-for="fit in fits" :key="fit">
            <span class="demonstration">{{ fit }}</span>
            <el-image style="width: 100px; height: 100px" :src="url" :fit="fit"></el-image>
          </div>
        </div>
      </el-table-column>
      <el-table-column prop="kname" label="砍价名称" width="100"></el-table-column>
      <el-table-column prop="kprice" label="砍价价格" width="100"></el-table-column>
      <el-table-column prop="kzui" label="最低价" width="100"></el-table-column>
      <el-table-column prop="kpeople" label="参与人数" width="100"></el-table-column>
      <el-table-column prop="khelpe" label="帮忙砍价人数" width="130"></el-table-column>
      <el-table-column prop="ksuccess" label="砍价成功人数" width="130"></el-table-column>
      <el-table-column prop="kxian" label="限量" width="100"></el-table-column>
      <el-table-column prop="ksheng" label="限量剩余" width="100"></el-table-column>
      <el-table-column prop="ketime" label="结束时间" width="200"></el-table-column>
      <el-table-column prop="kstate" label="砍价状态" width="180">
        <template slot-scope="sel">
          <el-switch
            v-model="sel.row.kstate"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="Edit(scope.row.kid)">编辑</el-button>
          <el-button size="mini" type="danger" @click="Del(scope.row)">删除</el-button>
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

    <!-- Form -->
    <el-dialog title="添加砍价信息" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="商品图片">
          <el-input v-model="form.txtimg" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input type="textarea" v-model="form.txtname" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="砍价价格">
          <el-input v-model="form.txtprice" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="最低价">
          <el-input v-model="form.txtzui" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="参与人数">
          <el-input v-model="form.txtpeo" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="帮忙砍价人数">
          <el-input v-model="form.txtbang" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="砍价成功人数">
          <el-input v-model="form.txtcheng" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="限量">
          <el-input v-model="form.txtxian" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="限量剩余">
          <el-input v-model="form.txtsheng" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.txtdate"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="秒杀状态">
          <el-switch
            v-model="form.txtstate"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="1"
            inactive-value="0"
          ></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="Save()">保 存</el-button>
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
      formLabelWidth: "720px",
      //查询输入框
      txtName: "",
      //添加表单元素
      form: {
        txtimg: "",
        txtname: "",
        txtprice: "",
        txtzui: "",
        txtpeo: "",
        txtbang: "",
        txtcheng: "",
        txtxian: "",
        txtsheng: "",
        txtdate: "",
        txtstate: "",
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
      //查询状态id
      value: "",
      //查询关键字
      txtName: "",
      fits: [""],
      url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
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
      this.$http.get("https://localhost:44375/api/KanShow").then((res) => {
        console.log(res);
        this.tableData = res.data.data;
        console.log(this.tableData);
      });
    },
    //删除
    Del: function (s) {
      this.axios({
        url: "https://localhost:44375/api/KanDel",
        method: "post",
        params: { id: s.kid },
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
      if (this.k.ids == undefined) {
        var data = {};
        data.kimg = this.form.txtimg;
        data.kname = this.form.txtname;
        data.kprice = this.form.txtprice;
        data.kzui = this.form.txtzui;
        data.kpeople = this.form.txtpeo;
        data.khelpe = this.form.txtbang;
        data.ksuccess = this.form.txtcheng;
        data.kxian = this.form.txtxian;
        data.ksheng = this.form.txtsheng;
        data.ketime = this.form.txtdate;
        data.kstate = this.form.txtstate;
        console.log(data);

        this.axios({
          url: "https://localhost:44375/api/KanAdd",
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
      }
    },

    //查询
    cha: function () {
      var name = this.txtName;
      var tid = this.value;
      this.axios({
        url: "https://localhost:44375/api/KanShow?name=" + name + "&tid=" + tid,
        method: "get",
      }).then((res) => {
        this.tableData = res.data.data;
      });
    },
    //修改id
    k: function () {
      ids = 0;
    },
    //修改
    Edit: function (s) {
      this.k.ids = s.kid;
      alert(this.Eid.ids);
      this.dialogFormVisible = true;
    },
  },
};
</script>