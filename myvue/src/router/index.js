import Vue from 'vue'
import VueRouter from 'vue-router'
//import { nextTick } from 'vue/types/umd';
//import store from '../store';

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: '登录',
    component: () => import('../views/Longin/Login.vue')   //大写的文件名
  },
  {
    path: '/',
    name: "indexpage",
    component: () => import('../views/IndexPage/IndexPage.vue'),
    children: [
      {
        path: '/workbench',
        name: "工作台",
      },
      {
        path: '/Commodity',
        children: [
          {
            path: "/commodity/goodsManger",
            name: "商品管理"
          },
          {
            path: "/commodity/goodsType",
            name: "商品分类"
          },
          {
            path: "/commodity/goodSevaluation",
            name: "商品规格"
          },
          {
            path: "/commodity/goodsSpecification",
            name: "商品评价"
          }
        ]
      },
      {
        path: "/marketing",
        component: () => import('../views/Marketing/index.vue'),
        children: [
          {
            path: "/marketing/makeingKill",
            component: () => import('../views/Marketing/MakeingKill/index.vue'),
            children: [
              {
                path: '/marketing/makeingKill/KillConfiguration',
                name: "秒杀配置",
                component: () => import('../views/Marketing/MakeingKill/KillConfiguration/KillConfiguration.vue')
              },
              {
                path: '/marketing/KillGoods/KillGoods.vue',
                name: "秒杀商品",
                component: () => import('../views/Marketing/MakeingKill/KillGoods/KillGoods.vue')
              }
            ]
          },
          {
            path: "/marketing/bargain",
            component: () => import('../views/Marketing/Bargain/index.vue'),
            children: [
              {
                path: "/marketing/bargain/bargainGood",
                name: "砍价商品",
                component: () => import('../views/Marketing/Bargain/BargainGood/BargainGoods.vue')
              },
              {
                path: "/marketing/bargain/bargainList",
                name: "砍价列表",
                component: () => import('../views/Marketing/Bargain/BargainList/BargainList.vue')
              }
            ]
          },
          {
            path:"/marketing/Live",
            component: () => import('../views/Marketing/Live/index.vue'),
            children:[
              {
                path: "/marketing/Live/LiveList",
                name: "直播列表",
                component:()=>import('../views/Marketing/Live/LiveList/LiveList.vue')
              },
              {
                path: "/marketing/Live/CreateLive",
                name: "创建直播",
                component:()=>import('../views/Marketing/Live/CreateLive/CreateLive.vue')
              }
            ]
          },
          {
            path: "/marketing/GroupBooking",
            children: [
                {
                    path: "/marketing/GroupBooking/commodity",
                    name: "拼团商品"
                },
                {
                    path: "/evaluate/groupwork/list",
                    name: "拼团列表"
                }
            ]
          }
        ]
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


// router.beforeEach((to, from, next) => {
//   const url = ['/', '/login'];
//   if (!url.some(item => item === to.path)) {
//     if (store.state.authPath.some(item => item === to.path)) {
//       next(); 
//     }
//   } else next();
// })
export default router;
