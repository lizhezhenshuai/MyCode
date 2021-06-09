import axios from "axios";
import store from "../../../store";
import "./mock";
const state = {
    //直播列表数据
    LiveListData: [],
    copyLiveListData: [],
    //直播列表数据长度
    LiveListLen: null,
    //当前直播列表页数据
    nowLiveListData: [],
    //每页个数
    EveryPageNum: 12,
    //当前页下标
    nowIndex: 1,
    //存储详情页数据
    detailData: [],
    //进入直播/数据详情
    detailFlag: false
};
const getters = {
    public() {
        state.LiveListLen = state.LiveListData.length;
        state.nowIndex = 1;
        //开始下标
        let startInd = (state.nowIndex - 1) * state.EveryPageNum;
        //结束下标
        let endInd = startInd + state.EveryPageNum;
        state.nowLiveListData = state.LiveListData.slice(startInd, endInd);
    }
}
const mutations = {
    //所有直播列表数据
    setLiveListData(state, payload) {
        state.LiveListData = payload;
        state.copyLiveListData = payload;
        state.LiveListLen = state.LiveListData.length;
    },
    //当前直播页数据
    setNowPageData(state, payload) {
        payload ? state.nowIndex = payload : null;
        //开始下标
        let startInd = (state.nowIndex - 1) * state.EveryPageNum;
        //结束下标
        let endInd = startInd + state.EveryPageNum;
        state.nowLiveListData = state.LiveListData.slice(startInd, endInd);
    },
    //下拉筛选数据
    selectFilter(state, payload) {
        state.LiveListData = state.copyLiveListData;
        if (payload === 1) {
            state.LiveListData = state.LiveListData.filter((item) => {
                return item.flag === true;
            })
        } else if (payload === 2) {
            state.LiveListData = state.LiveListData.filter((item) => {
                return item.flag === false;
            })
        }
        getters.public();
    },
    //搜索筛选数据
    searchFilter(state, payload) {
        state.LiveListData = [...state.copyLiveListData];
        if (payload !== '') {
            console.log(22);
            state.LiveListData = state.LiveListData.filter((item) => {
                return item.id.includes(payload) || item.name.includes(payload);
            })
            getters.public();
        }
    },
    //详情页数据
    setDetailData(state, payload) {
        state.detailFlag = payload.flag;
        state.detailData = state.LiveListData.filter((item) => {
            return item.id * 1 === payload.id * 1;
        })[0];
    }
};
const actions = {
    //直播列表数据
    getLiveListData(store, payload) {
        axios.post("/api/liveStreaming/createList").then(val => {
            store.commit("setLiveListData", val.data.list);
            store.commit('setNowPageData');
        })
    }
}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}