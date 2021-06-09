//拼团商品

<template>
  <div>
    是否显示：
    <el-select v-model="value" placeholder="请选择">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>秒杀名称：
    <el-input v-model="txtName" placeholder="请输入内容" style="width:200px"></el-input>
    <el-button type="primary" icon="el-icon-search" @click="cha()">搜索</el-button>

    <el-button type="primary">添加砍价商品</el-button>
    <el-table :data="tableData" height="660" border style="width: 100%">
      <el-table-column prop="sgid" label="Id" width="100"></el-table-column>
      <el-table-column prop="spell" label="团长" width="100"></el-table-column>
      <el-table-column prop="sgid" label="商品Id" width="100"></el-table-column>
      <el-table-column label="商品图片" width="100">
        <div class="demo-image">
          <div class="block" v-for="fit in fits" :key="fit">
            <span class="demonstration">{{ fit }}</span>
            <el-image style="width: 100px; height: 100px" :src="url" :fit="fit"></el-image>
          </div>
        </div>
      </el-table-column>
      <el-table-column prop="goodimg" label="商品简介" width="100"></el-table-column>
      <el-table-column prop="goodyuan" label="原价" width="100"></el-table-column>
      <el-table-column prop="goodpin" label="拼团价" width="100"></el-table-column>
      <el-table-column prop="goupnum" label="成团人数" width="180"></el-table-column>
      <el-table-column prop="part" label="参与人数" width="180"></el-table-column>
      <el-table-column prop="etime" label="结束时间" width="200"></el-table-column>
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
          <el-button size="mini" type="primary" @click="Edit(scope.row.mcid)">编辑</el-button>
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
      txtName: "",
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
      this.$http.get("https://localhost:44375/api/SgroupShow").then((res) => {
        console.log(res);
        this.tableData = res.data.data;
      });
    },

    //查询
    cha() {
      var name = this.txtName;
      var tid = this.value;
      this.axios({
        url:
          "https://localhost:44375/api/SgroupShow?name=" + name + "&tid=" + tid,
        method: "get",
      }).then((res) => {
        this.tableData = res.data.data;
      });
    },

    //删除
    Del(s) {
      this.axios({
        url: "https://localhost:44375/api/SgroupDel",
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