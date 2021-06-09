//砍价列表

<template>
  <div>
    砍价状态：
    <el-select v-model="value" placeholder="请选择">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <el-button type="primary" icon="el-icon-search" @click="cha()">搜索</el-button>
    <el-table
      :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
      height="660"
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
      <el-table-column prop="kinfo" label="商品介绍" width="100"></el-table-column>
      <el-table-column prop="kprice" label="砍价价格" width="100"></el-table-column>
      <el-table-column prop="knum" label="总共砍价次数" width="150"></el-table-column>
      <el-table-column prop="ksheng" label="剩余砍价次数" width="150"></el-table-column>
      <el-table-column prop="katime" label="开始时间" width="180"></el-table-column>
      <el-table-column prop="ketime" label="结束时间" width="180"></el-table-column>
      <el-table-column label="砍价状态" width="100">
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
          <el-button size="mini" type="primary" @click="Edit(scope.row.mcid)">编辑</el-button>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
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
      options: [
        {
          value: "-1",
          label: "显示全部",
        },
        {
          value: "1",
          label: "开启",
        },
        {
          value: "0",
          label: "关闭",
        },
      ],
      value: "",
      fits: [""],
      url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
    };
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
      this.$http.get("https://localhost:44375/api/KanListShow").then((res) => {
        console.log(res);
        this.tableData = res.data.data;
        console.log(this.tableData);
      });
    },
    //查询
    cha: function () {
      var tid = this.value;
      this.axios({
        url: "https://localhost:44375/api/KanListShow?tid=" + tid,
        method: "get",
      }).then((res) => {
        this.tableData = res.data.data;
      });
    },
    //删除
    Del: function (s) {
      this.axios({
        url: "https://localhost:44375/api/KanListDel",
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
  },
  mounted() {
    this.getdatatable();
  },
};
</script>

<style>
</style>