<template>
  <router-view/>
</template>

<script>
import routes from "./router/routes";

export default {
  name: 'App',
  created() {
    //路由权限处理
    (() => {
      this.$store.dispatch('getAuth', 'token');
      function filterNav(arr = [], auth = []) {
        const nav = [];
        arr.forEach(item => {
          if (auth.some(item1 => item1 === item.key)) {
            if (item.children) {
              nav.push({
                key: item.key,
                title: item.title,
                children: filterNav(item.children, auth)
              })
            } else {
              nav.push(item)
            }
          }
        });
        return nav;
      }
      this.$store.commit('NAV', filterNav(routes, this.$store.state.authPath))
      const url = window.location.pathname;
      this.$router.push(url);
    })();
  }
}
</script>

<style lang="scss">
</style>
