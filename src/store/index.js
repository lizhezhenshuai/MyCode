import Vue from 'vue'
import Vuex from 'vuex'
import LiveStreaming from "../views/marketing/liveStreaming/models";
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        nav: [],
        authPath: []
    },
    mutations: {
        NAV(state, payload) {
            state.nav = payload
        },
        AUTH_PATH(state, payload) {
            state.authPath = payload
        }
    },
    actions: {
        getAuth({commit}, token) {
            const auth = ['/workbench', '/commodity', '/commodity/admin', '/commodity/class', '/commodity/specs', '/commodity/evaluate', '/evaluate', '/evaluate/kill', '/evaluate/kill/config', '/evaluate/kill/commodity', '/evaluate/bargaining', '/evaluate/bargaining/commodity', '/evaluate/bargaining/list', '/evaluate/live', '/evaluate/live/list', '/evaluate/live/create', '/evaluate/groupwork', '/evaluate/groupwork/commodity', '/evaluate/groupwork/list', '/order', '/order/admin', '/order/generalization', '/order/evaluate', '/order/delivery', '/chief', '/chief/admin', '/chief/examine', '/chief/grade', '/chief/config', '/chief/route', '/store', '/store/config', '/store/store', '/store/commodity', '/store/order', '/store/withdrawal', '/store/pay', '/warehouse', '/warehouse/admin', '/warehouse/quarters', '/warehouse/warehousing', '/warehouse/query', '/warehouse/delivery', '/warehouse/read', '/warehouse/inventory', '/warehouse/stock', '/distribution', '/distribution/svip', '/distribution/proxy', '/distribution/payinf', '/distribution/set', '/applets', '/applets/pay', '/auth', '/auth/user', '/auth/pos', '/auth/server','/evaluate/live/detail']
            commit('AUTH_PATH', auth)
        }
    },
    modules: {
        LiveStreaming
    }
})
