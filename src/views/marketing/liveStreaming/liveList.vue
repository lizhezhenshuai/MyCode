<template>
  <div class="getLiveListData">
    <div class="getLiveListData_header">
      <p>
        直播状态
        <select
          name=""
          id=""
          @change="
            (e) => {
              handleSelect(e.target.options.selectedIndex);
            }
          "
        >
          <option value="">请选择</option>
          <option value="">直播中</option>
          <option value="">已结束</option>
        </select>
      </p>
      <p>
        主播搜索<input
          type="text"
          v-model="searchInput"
          placeholder="姓名、ID"
        />
        <button @click="handleSearch">搜索</button>
      </p>
    </div>
    <div class="getLiveListData_main">
      <h3>全部直播</h3>
      <div class="getLiveListData_main_list">
        <dl v-for="(item, index) in nowLiveListData" :key="index">
          <dt><img :src="item.img" alt="" /></dt>
          <dd>{{ item.title }}</dd>
          <dd>
            <span>{{ item.name }}</span>
            <span>{{ item.date }}</span>
          </dd>
          <dd>
            <span @click="handleGoDetail(item.flag, item.id)">{{
              item.flag ? "进入直播" : "数据详情"
            }}</span>
            <span v-if="item.flag"
              ><van-switch v-model="item.status" size="24px"
            /></span>
            <span v-else-if="!item.flag">删除</span>
          </dd>
          <dd>
            <span :class="item.flag ? 'active' : ''">{{
              item.flag ? "直播中" : "已结束"
            }}</span>
          </dd>
        </dl>
      </div>
      <van-pagination
        @change="handlePage"
        v-model="currentPage"
        :total-items="LiveListLen"
        :show-page-size="5"
        force-ellipses
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
let timer = null;
export default {
  data() {
    return {
      checked: true,
      currentPage: 0,
      searchInput: "",
    };
  },
  created() {
    this.getLiveListData();
  },
  methods: {
    ...mapActions("LiveStreaming", ["getLiveListData"]),
    ...mapMutations("LiveStreaming", [
      "setNowPageData",
      "selectFilter",
      "searchFilter",
      'setDetailData'
    ]),
    //点击页数
    handlePage() {
      this.setNowPageData(this.currentPage);
    },
    //选择直播状态
    handleSelect(val) {
      this.selectFilter(val);
    },
    //搜索
    async handleSearch() {
      this.searchFilter(this.searchInput);
    },
    //点击进入直播/数据详情
    handleGoDetail(flag, id) {
      this.setDetailData({flag,id});
      this.$router.push({path:`/evaluate/live/detail`,query:{flag,id}})
    },
  },
  computed: {
    ...mapState("LiveStreaming", ["nowLiveListData", "LiveListLen"]),
  },
};
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  list-style: none;
  outline: none;
  box-sizing: border-box;
  user-select: none;
}
.getLiveListData {
  width: 100%;
  height: 100%;
  .getLiveListData_header {
    display: flex;
  }
  .van-switch__node {
    height: 26px;
  }
  .getLiveListData_main_list {
    dl {
      width: 15%;
      height: auto;
      position: relative;
    }
    dd {
      &:nth-of-type(1) {
        color: #000;
        font-weight: bold;
      }
      &:nth-of-type(2) {
        color: #ccc;
        display: flex;
        justify-content: space-between;
        span {
          margin-right: 40px;
        }
      }
      &:nth-of-type(3) {
        color: rgb(22, 136, 230);
        font-weight: bold;
        display: flex;
        justify-content: space-between;
        span {
          margin-right: 40px;
        }
      }
      &:nth-of-type(4) .active {
        color: #fff;
        background: rgba(30, 196, 113, 0.842);
        padding: 6px 14px;
        border-radius: 10px;
      }
      &:nth-of-type(4) {
        position: absolute;
        color: #fff;
        left: 10px;
        top: 120px;
        border-radius: 10px;
        background: rgba(78, 83, 81, 0.842);
      }
    }
    display: flex;
    flex-wrap: wrap;
    margin: 30px;
  }
  .van-pagination {
    width: 40%;
    float: right;
    margin-top: 20px;
  }
}
</style>