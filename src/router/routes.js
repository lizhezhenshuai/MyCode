export default [
    {
        key: '/workbench',
        title: '工作台'
    },
    {
        key: '/commodity',
        title: '商品',
        children: [
            {
                key: '/commodity/admin',
                title: '商品管理'
            },
            {
                key: '/commodity/class',
                title: '商品分类'
            },
            {
                key: '/commodity/specs',
                title: '商品规格'
            },
            {
                key: '/commodity/evaluate',
                title: '商品评价'
            },
        ]
    },
    {
        key: '/evaluate',
        title: '营销',
        component: () => import('../views/marketing/index'),
        children: [
            {
                key: '/evaluate/kill',
                title: '秒杀管理',
                
                children: [
                    {
                        key: '/evaluate/kill/config',
                        title: '秒杀配置'
                    },
                    {
                        key: '/evaluate/kill/commodity',
                        title: '秒杀商品'
                    }
                ]
            },
            {
                key: '/evaluate/bargaining',
                title: '砍价管理',
                children: [
                    {
                        key: '/evaluate/bargaining/commodity',
                        title: '砍价商品'
                    },
                    {
                        key: '/evaluate/bargaining/list',
                        title: '砍价列表'
                    }
                ]
            },
            {
                key: '/evaluate/live',
                title: '直播管理',
                component: () => import('../views/marketing/liveStreaming/index'),
                children: [
                    {
                        key: '/evaluate/live/list',
                        title: '直播列表',
                        component: () => import(/* webpackChunkName: "about" */ '../views/marketing/liveStreaming/liveList'),
                    },
                    {
                        key: '/evaluate/live/create',
                        title: '创建直播',
                        component: () => import(/* webpackChunkName: "about" */ '../views/marketing/liveStreaming/createLive'),
                    }
                ]
            },
            {
                key: '/evaluate/groupwork',
                title: '拼团管理',
                children: [
                    {
                        key: '/evaluate/groupwork/commodity',
                        title: '拼团商品'
                    },
                    {
                        key: '/evaluate/groupwork/list',
                        title: '拼团列表'
                    }
                ]
            }
        ]
    },
    {
        key: '/order',
        title: '订单',
        children: [
            {
                key: '/order/admin',
                title: '订单管理'
            },
            {
                key: '/order/generalization',
                title: '订单概括'
            },
            {
                key: '/order/evaluate',
                title: '评价管理'
            },
            {
                key: '/order/delivery',
                title: '订单派送'
            }
        ]
    },
    {
        key: '/chief',
        title: '团长',
        children: [
            {
                key: '/chief/admin',
                title: '团长管理'
            },
            {
                key: '/chief/examine',
                title: '团长审核'
            },
            {
                key: '/chief/grade',
                title: '团长等级'
            },
            {
                key: '/chief/config',
                title: '设置'
            },
            {
                key: '/chief/route',
                title: '路线'
            }
        ]
    },
    {
        key: '/store',
        title: '门店',
        children: [
            {
                key: '/store/config',
                title: '配置'
            },
            {
                key: '/store/store',
                title: '门店'
            },
            {
                key: '/store/commodity',
                title: '商品'
            },
            {
                key: '/store/order',
                title: '订单'
            },
            {
                key: '/store/withdrawal',
                title: '提现'
            },
            {
                key: '/store/pay',
                title: '到店付款'
            },
        ]
    },
    {
        key: '/warehouse',
        title: '仓库',
        children: [
            {
                key: '/warehouse/admin',
                title: '仓库管理'
            },
            {
                key: '/warehouse/quarters',
                title: '配送小区'
            },
            {
                key: '/warehouse/warehousing',
                title: '入库管理'
            },
            {
                key: '/warehouse/query',
                title: '入库查询'
            },
            {
                key: '/warehouse/delivery',
                title: '出库管理'
            },
            {
                key: '/warehouse/read',
                title: '出库查询'
            },
            {
                key: '/warehouse/inventory',
                title: '盘点管理'
            },
            {
                key: '/warehouse/stock',
                title: '现有库存'
            }
        ]
    },
    {
        key: '/distribution',
        title: '分销',
        children: [
            {
                key: '/distribution/svip',
                title: '超级会员'
            },
            {
                key: '/distribution/proxy',
                title: '代理商'
            },
            {
                key: '/distribution/payinf',
                title: '佣金记录'
            },
            {
                key: '/distribution/set',
                title: '设置'
            }
        ]
    },
    {
        key: '/applets',
        title: '小程序',
        children: [
            {
                key: '/applets/pay',
                title: '支付'
            }
        ]
    },
    {
        key: '/auth',
        title: '权限',
        children: [
            {
                key: '/auth/user',
                title: '员工管理'
            },
            {
                key: '/auth/pos',
                title: '角色管理'
            },
            {
                key: '/auth/server',
                title: '客服管理'
            }
        ]
    },

];
