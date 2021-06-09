import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store';
Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login/Login')
    },
    {
        path: '/',
        name: 'indexpage',
        component: () => import('../views/IndexPage/IndexPage'),
        children: [
            {
                path: "/workbench",
                name: "工作台",
                component:()=>import('../views/workbench/workbench.vue')
            },
            {
                path: "/commodity",
                component:()=>import('../views/Commodity/index.vue'),   
                children: [
                    {
                        path: "/commodity/admin",
                        name: "商品管理",
                        component:()=>import('../views/Commodity/GoodsManger/Show.vue'),
                    },
                    {
                        path: "/commodity/class",
                        name: "商品分类",
                        component:()=>import('../views/Commodity/GoodsType/Show.vue'),
                    },
                    {
                        path: "/commodity/specs",
                        name: "商品规格",
                        component:()=>import('../views/Commodity/GoodsSpecification/Show.vue'),
                    },
                    {
                        path: "/commodity/evaluate",
                        name: "商品评价",
                        component:()=>import('../views/Commodity/GoodSevaluation/Show.vue'),
                    }
                ]
            },
            {
                path: "/evaluate",
                component: () => import('../views/marketing/index.vue'),
                children: [
                    {
                        path: "/evaluate/kill",
                        component: () => import('../views/marketing/MakeingKill/index.vue'),
                        children: [
                            {
                                path: "/evaluate/kill/config",
                                name: "秒杀配置",
                                component:()=>import('../views/marketing/MakeingKill/KillConfiguration/KillConfiguration.vue'),
                            },
                            {
                                path: "/evaluate/kill/commodity",
                                name: "秒杀商品",
                                component:()=>import('../views/marketing/MakeingKill/KillGoods/KillGoods.vue'),
                            }
                        ]
                    },
                    {
                        path: "/evaluate/bargaining",
                        component:()=>import('../views/marketing/Bargain/index.vue'),
                        children: [
                            {
                                path: "/evaluate/bargaining/commodity",
                                name: "砍价商品",
                                component:()=>import('../views/marketing/Bargain/BargainGood/BargainGoods.vue'),
                            },
                            {
                                path: "/evaluate/bargaining/list",
                                name: "砍价列表",
                                component:()=>import('../views/marketing/Bargain/BargainList/BargainList.vue'),
                            }
                        ]
                    },
                    {
                        path: "/evaluate/live",
                        component: () => import('../views/marketing/liveStreaming/index'),
                        children: [
                            {
                                path: "/evaluate/live/list",
                                name: "直播列表",
                                component: () => import( '../views/marketing/liveStreaming/liveList'),
                            },
                            {
                                path: "/evaluate/live/create",
                                name: "创建直播",
                                component: () => import('../views/marketing/liveStreaming/createLive'),
                            },
                            {
                                path:'/evaluate/live/detail',
                                component: () => import(/* webpackChunkName: "about" */ '../views/marketing/liveStreaming/detail')
                            }
                        ]
                    },
                    {
                        path: "/evaluate/groupwork",
                        component:()=>import('../views/marketing/GroupBooking/index.vue'),
                        children: [
                            {
                                path: "/evaluate/groupwork/commodity",
                                name: "拼团商品",
                                component:()=>import('../views/marketing/GroupBooking/GroupGoods/GoodsGroup.vue'),
                            },
                            {
                                path: "/evaluate/groupwork/list",
                                name: "拼团列表",
                                component:()=>import('../views/marketing/GroupBooking/GroupList/GroupList.vue'),
                            }
                        ]
                    }
                ]
            },
            {
                path: "/order",
                component: () => import('../views/Order/index.vue'),
                children: [
                    {
                        path: "/order/admin",
                        name: "订单管理",
                        component:()=>import('../views/Order/OrderManger/Show.vue')
                    },
                    {
                        path: "/order/generalization",
                        name: "订单概括",
                        component:()=>import('../views/Order/OrderSummarize/Show.vue')
                    },
                    {
                        path: "/order/evaluate",
                        name: "评价管理",
                        component:()=>import('../views/Order/OrderEvaluate/Show.vue')
                    },
                    {
                        path: "/order/delivery",
                        name: "订单派送",
                        component:()=>import('../views/Order/OrderSend/Show.vue')
                    }
                ]
            },
            {
                path: "/chief",
                component:()=>import('../views/Colonel/index.vue'),
                children: [
                    {
                        path: "/chief/admin",
                        name: "团长管理",
                        component:()=>import('../views/Colonel/ColonelManger/ColonelManger.vue')
                    },
                    {
                        path: "/chief/examine",
                        name: "团长审核",
                        component:()=>import('../views/Colonel/ColonelCheck/ColonelCheck.vue')
                    },
                    {
                        path: "/chief/grade",
                        name: "团长等级",
                        component:()=>import('../views/Colonel/ColonelGrade/ColonelGrade.vue')
                    },
                    {
                        path: "/chief/config",
                        name: "设置",
                        component:()=>import('../views/Colonel/ColonelSet/ColonelSet.vue')
                    },
                    {
                        path: "/chief/route",
                        name: "路线",
                        component:()=>import('../views/Colonel/ColonelRoute/ColonelRoute.vue')
                    }
                ]
            },
            {
                path: "/store",
                component:()=>import('../views/Store/index.vue'),
                children: [
                    {
                        path: "/store/config",
                        name: "配置",
                        component:()=>import('../views/Store/StoreConfiguration/Show.vue')
                    },
                    {
                        path: "/store/store",
                        name: "门店",
                        component:()=>import('../views/Store/StoreShop/Show.vue')
                    },
                    {
                        path: "/store/commodity",
                        name: "商品",
                        component:()=>import('../views/Store/StoreGoods/Show.vue')
                    },
                    {
                        path: "/store/order",
                        name: "订单",
                        component:()=>import('../views/Store/StoreOrder/Show.vue')
                    },
                    {
                        path: "/store/withdrawal",
                        name: "提现",
                        component:()=>import('../views/Store/StoreWithdraw/Show.vue')
                    },
                    {
                        path: "/store/pay",
                        name: "到店付款",
                        component:()=>import('../views/Store/StorePay/Show.vue')
                    }
                ]
            },
            {
                path: "/warehouse",
                component:()=>import('../views/Warehouse/index.vue'),
                children: [
                    {
                        path: "/warehouse/admin",
                        name: "仓库管理",
                        component:()=>import('../views/Warehouse/CheckManger/Show.vue'),
                    },
                    {
                        path: "/warehouse/quarters",
                        name: "配送小区",
                        component:()=>import('../views/Warehouse/WarehouseSend/Show.vue'),
                    },
                    {
                        path: "/warehouse/warehousing",
                        name: "入库管理",
                        component:()=>import('../views/Warehouse/WarehouseInter/Show.vue'),
                    },
                    {
                        path: "/warehouse/query",
                        name: "入库查询",
                        component:()=>import('../views/Warehouse/WarehouseSeach/Show.vue'),
                    },
                    {
                        path: "/warehouse/delivery",
                        name: "出库管理",
                        component:()=>import('../views/Warehouse/WarehouseOut/Show.vue'),
                    },
                    {
                        path: "/warehouse/read",
                        name: "出库查询",
                        component:()=>import('../views/Warehouse/OutSeach/Show.vue'),
                    },
                    {
                        path: "/warehouse/inventory",
                        name: "盘点管理",
                        component:()=>import('../views/Warehouse/CheckManger/Show.vue'),
                    },
                    {
                        path: "/warehouse/stock",
                        name: "现有库存",
                        component:()=>import('../views/Warehouse/Inventory/Show.vue'),
                    }
                ]
            },
            {
                path: "/distribution",
                component:()=>import('../views/Distribution/index.vue'),
                children: [
                    {
                        path: "/distribution/svip",
                        name: "超级会员",
                        component:()=>import('../views/Distribution/Svip/Svip.vue'),
                    },
                    {
                        path: "/distribution/proxy",
                        name: "代理商",
                        component:()=>import('../views/Distribution/Agent/Agent.vue'),
                    },
                    {
                        path: "/distribution/payinf",
                        name: "佣金记录",
                        component:()=>import('../views/Distribution/Brokerage/Brokerage.vue'),
                    },
                    {
                        path: "/distribution/set",
                        name: "设置",
                        component:()=>import('../views/Distribution/Set/Set.vue'),
                    }
                ]
            },
            {
                path: "/applets",
                component:()=>import('../views/APP/Index'),
                children: [
                    {
                        path: "/applets/pay",
                        name: "支付",
                        component:()=>import('../views/APP/Pay/Pay.vue'),
                    }
                ]
            },
            {
                path: "/auth",
                component:()=>import('../views/Jurisdiction/index.vue'),
                children: [
                    {
                        path: "/auth/user",
                        name: "员工管理",
                        component:()=>import('../views/Jurisdiction/Employee/Employee.vue'),
                    },
                    {
                        path: "/auth/pos",
                        name: "角色管理",
                        component:()=>import('../views/Jurisdiction/Roles/Roles.vue'),
                    },
                    {
                        path: "/auth/server",
                        name: "客服管理",
                        component:()=>import('../views/Jurisdiction/Customer/Customer.vue'),
                    }
                ]
            },

        ]
    },
 
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    const url = ['/', '/login'];
    if (!url.some(item => item === to.path)) {
        if (store.state.authPath.some(item => item === to.path)) {
            next();
        }
    } else next();
})

export default router;
