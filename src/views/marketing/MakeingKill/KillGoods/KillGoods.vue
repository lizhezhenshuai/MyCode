// //秒杀商品
  <template>
  <div>
    是否显示：
    <el-select v-model="value" placeholder="请选择">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>配置名称：
    <el-select v-model="value" placeholder="请选择">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>商品搜索：
    <el-input v-model="txtName" placeholder="请输入商品Id名称" style="width:200px "></el-input>
    <el-button icon="el-icon-search" @click="cha()" circle></el-button>

    <!-- 显示列表 -->
    <el-table
      style="width: 100%"
      :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
    >
      <el-table-column prop="shopid" label="Id"></el-table-column>
      <el-table-column prop="screenName" label="配置"></el-table-column>
      <el-table-column prop="screenTime" label="秒杀时段" width="180"></el-table-column>
      <el-table-column label="商品图片">
        <div class="demo-image">
          <div class="block" v-for="fit in fits" :key="fit">
            <span class="demonstration">{{ fit }}</span>
            <el-image style="width: 100px; height: 100px" :src="url" :fit="fit"></el-image>
          </div>
        </div>
      </el-table-column>
      <el-table-column prop="shoptitle" label="活动标题"></el-table-column>
      <el-table-column prop="shopinfo" label="活动简介"></el-table-column>
      <el-table-column prop="shopyuan" label="原价"></el-table-column>
      <el-table-column prop="shopmiao" label="秒杀价"></el-table-column>
      <el-table-column prop="shopxian" label="限量"></el-table-column>
      <el-table-column prop="shopsheng" label="限量剩余"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="180"></el-table-column>
      <el-table-column prop="shopstate" label="秒杀状态" width="130">
        <template slot-scope="sel">
          <el-switch
            v-model="sel.row.Shopstate"
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

    <!-- 分页 组件-->
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

      //查询输入框
      txtName: "",

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
      this.$http.get("https://localhost:44375/api/ShopKillShow").then((res) => {
        console.log(res);
        this.tableData = res.data.data;
        console.log(this.tableData);
      });
    },
    //删除
    Del: function (s) {
      this.axios({
        url: "https://localhost:44375/api/ShopKillDel",
        method: "post",
        params: { id: s.shopid },
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
    //查询
    cha: function () {
      var name = this.txtName;
      var tid = this.value;
      this.axios({
        url:
          "https://localhost:44375/api/ShopKillShow?name=" +
          name +
          "&tid=" +
          tid,
        method: "get",
      }).then((res) => {
        this.tableData = res.data.data;
      });
    },
  },
};
</script>