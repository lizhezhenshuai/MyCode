//拼团列表

<template>
  <div>
    是否显示：
    <el-select v-model="value" placeholder="请选择">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <el-button icon="el-icon-search" @click="cha()" circle></el-button>
    <el-table :data="tableData" height="660" border style="width: 100%">
      <el-table-column prop="sgid" label="Id" width="100"></el-table-column>
      <el-table-column label="头像" width="100">
        <div class="demo-image">
          <div class="block" v-for="fit in fits" :key="fit">
            <span class="demonstration">{{ fit }}</span>
            <el-image style="width: 100px; height: 100px" :src="url" :fit="fit"></el-image>
          </div>
        </div>
      </el-table-column>
      <el-table-column prop="stuan" label="开团团长" width="100"></el-table-column>
      <el-table-column prop="sktime" label="开团时间" width="180"></el-table-column>
      <el-table-column prop="spgood" label="热销商品" width="180"></el-table-column>
      <el-table-column prop="stpeo" label="几人团" width="180"></el-table-column>
      <el-table-column prop="spart" label="参与人数" width="180"></el-table-column>
      <el-table-column prop="setime" label="结束时间" width="200"></el-table-column>
      <el-table-column label="活动状态" width="100">
        <template slot-scope="sel">
          <el-switch
            v-model="sel.row.state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="Edit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="Del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],

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
      fits: ["contain"],
      url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
    };
  },

  methods: {
    //显示
    getdatatable: function () {
      this.$http
        .get("https://localhost:44375/api/SGList/api/SGListShow")
        .then((res) => {
          console.log(res);
          this.tableData = res.data.data;
        });
    },

    //查询
    cha() {
      var tid = this.value;
      this.axios({
        url: "https://localhost:44375/api/SGList/api/SGListShow?tid=" + tid,
        method: "get",
      }).then((res) => {
        this.tableData = res.data.data;
      });
    },

    //删除
    Del(s) {
      this.axios({
        url: "https://localhost:44375/api/SGList/api/SGListDel",
        method: "post",
        params: { id: s.sgid },
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