<template>
  <div class="LiveStreamingDetail">
    <div class="liveBroadcast" v-if="detailFlag">
      <div class="liveBroadcast_header">
        <span>{{ detailData.name }}</span>
        <span>{{ detailData.title }}</span>
        <span></span>
      </div>
      <div class="liveBroadcast_main">
        <div class="liveBroadcast_left">
          <p>当前观看人数：{{ detailData.viewsNumber }}</p>
          <p>当前观看人数：{{ detailData.attentionNumber }}</p>
          <p>当前观看人数：{{ detailData.likeNumber }}</p>
          <p>当前观看人数：{{ detailData.orderNumber }}</p>
        </div>
        <img :src="detailData.img" alt="" />
        <div></div>
      </div>
      <div class="liveBroadcast_footer">
        <van-button type="info" @click="handleGoBack">返回</van-button>
        <van-button type="warning">强制关闭</van-button>
      </div>
    </div>
    <div v-else class="liveDataDetails">
      <div class="liveDataDetails_header">
        <div class="liveDataDetails_header_left">
          <img :src="detailData.img" alt="" />
          <div class="liveBroadcast_information">
            <p>{{ detailData.title }}</p>
            <p>开播时间：{{ detailData.date }}</p>
            <p>结束时间：{{ detailData.date }}</p>
            <p>直播时长：{{ detailData.date }}</p>
            <p>主播人：{{ detailData.name }}</p>
          </div>
        </div>
        <div class="liveDataDetails_header_right">
            <dl>
                <dt><van-icon name="award" /></dt>
                <dd>
                    <p>观看人数</p>
                    <p>{{detailData.viewsNumber}}</p>
                </dd>
            </dl>
            <dl>
                <dt><van-icon name="manager" /></dt>
                <dd>
                    <p>最高在线人数</p>
                    <p>{{detailData.bestHighNumber}}</p>
                </dd>
            </dl>
            <dl>
                <dt><van-icon name="cluster" /></dt>
                <dd>
                    <p>新增粉丝数</p>
                    <p>{{detailData.addFans}}</p>
                </dd>
            </dl>
            <dl>
                <dt><van-icon name="shopping-cart" /></dt>
                <dd>
                    <p>购物人数</p>
                    <p>{{detailData.buyNumber}}</p>
                </dd>
            </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState("LiveStreaming", ["detailData", "detailFlag"]),
  },
  methods: {
    ...mapMutations("LiveStreaming", ["setDetailData"]),
    handleGoBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss">
.LiveStreamingDetail,
.liveBroadcast,
.liveDataDetails {
  width: 100%;
  height: 100%;
  .liveBroadcast {
    display: flex;
    flex-direction: column;
    background: #000;
  }
  .liveBroadcast_main {
    display: flex;
    justify-content: space-between;
    margin: 20px;
    div {
      width: 20%;
    }
  }
  .liveBroadcast_header {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    background: rgb(75, 71, 71);
    padding: 0 30px;
  }
  .liveBroadcast_left {
    color: steelblue;
    p {
      line-height: 50px;
      margin: 20px;
      font-size: 22px;
    }
  }
  img {
    width: 40%;
    height: 400px;
  }
  .liveBroadcast_footer {
    display: flex;
    justify-content: center;
    height: 40px;
    align-items: center;
    button {
      width: 140px;
      height: 34px;
      border: none;
    }
  }
}
.liveDataDetails{
    display: flex;
    flex-direction: column;
    .liveDataDetails_header{
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 120px;
    }
    .liveDataDetails_header_left{
        display: flex;
        img{
            width: 180px;
            height: 120px;
        }
    }
    .liveBroadcast_information{
        p{
            &:nth-of-type(4),&:nth-of-type(5){
                color: steelblue;
                font-weight: bold;
            }
        }
    }
    .liveDataDetails_header_right{
        display: flex;
        dl{
            display: flex;
            dt{
                font-size: 28px;
                color: steelblue;
                font-weight: bold;
            }
        }
    }
}
</style>