

<template> 
  <div id="app">
    <Layout class="">
      <!--      顶部头部-->
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <span>电商后台管理系统</span>
        </Menu>
      </Header>
      <Layout>
        <!--        左边栏-->
        <Sider hide-trigger theme="dark">
          <el-menu :default-active="active" background-color="#515a6e" text-color="#ffffff" active-text-color="#409EFF">
            <LeftMenu :list="item" :key="key" v-for="(item,key) in state.nav"/>
          </el-menu>
        </Sider>
        <!--        右面内容-->
        <Layout :style="{padding: '0 24px 24px'}">
          <Breadcrumb :style="{margin: '24px 3px'}">
            <BreadcrumbItem>Home</BreadcrumbItem>
            <BreadcrumbItem>Components</BreadcrumbItem>
            <BreadcrumbItem>Layout</BreadcrumbItem>
          </Breadcrumb>
          <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
            <router-view/>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import LeftMenu from '../../components/AppCompoent/LeftMenu';

export default{
    name:"IndexPage",
    components:{LeftMenu},
    data(){
        return {
            state:this.$store.state,
            active:window.location.pathname
        }
    }
}
</script>

<style lang="scss" scoped>
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  html,body,#app, .ivu-layout,.ivu-layout-has-sider{
      width: 100vw;
      height: 100vw;
      min-width: 1200px;
  }

  #app{
      border: 1px solid #d7dde4;
      background: #f5f7f9;
      position: relative;
      border-radius: 4px;
      overflow: hidden;
  }

.ivu-layout-header {
  background: rgba(67, 129, 230, 1) !important;

   .ivu-menu.ivu-menu-dark.ivu-menu-horizontal {
    background: rgba(67, 129, 230, 1) !important;
    font-family: '微软雅黑 Bold', '微软雅黑';
    font-weight: 700;
    font-style: normal;
    font-size: 20px;
    color: #FFFFFF; 
  } 
}

    .layout-nav {
        width: 420px;
        margin: 0 20px 0 auto;
    }
</style>
