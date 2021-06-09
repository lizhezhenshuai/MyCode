// 工作台
<template>
  <div>
    <div style="width:100% height:30% background:#F00; color:#FFF">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="" label="今日订单量" width="400"></el-table-column>
      <el-table-column prop="" label="今日支付金额" width="400"></el-table-column>
      <el-table-column prop="" label="今日访客数" width="400"></el-table-column>
      <el-table-column prop="" label="今日客单价" width="400"></el-table-column>
    </el-table>
    </div>
     
  </div>
</template>

+
<script>
export default {
  data(){
    return{
      tableData:[],
    }
  }
};
</script>

<style>
</style>