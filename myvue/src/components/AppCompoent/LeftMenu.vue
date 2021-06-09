<template>
  <div>
      <el-submenu index="list.key" v-if="list.children">
            <template slot="title">
            <i class="el-icon-location" v-if="list.icon"/>
            <span>{{list.title}}</span>
            </template>
            <LeftMenu : list="item" :key="key" v-for="(item,key) in list.children">
         </el-submenu>
         <el-menu-item index="list.key" v-if="!list.children" @click="toRouter(list.key)">
            <i class="el-icon-location" v-if="list.icon"></i>
            <span slot="title">{{ list.title}}</span>
         </el-menu-item>  
  </div>
</template>

<script>
import LeftMenu from './LeftMenu';

export default {
    name:"LeftMenu",
    components:{LeftMenu},
    props:['list'],
    methods:{
        toRouter(path){
            window.location.pathname !== path?this.$router.push(path):history.go(0);
        }
    }
}
</script>

<style>

</style>