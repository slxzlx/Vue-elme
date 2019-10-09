<template>
  <transition>
    <div class="iscroll-container food-detail" v-show="showflag">
      <div>
        <div class="img-wraper">
          <img :src="food.image" class="img">
        </div>
        <div class="back">
          <i class="back-icon iconfont iconreturn" @click="hide"></i>
        </div>
        <div class="food-info">
          <h1 class="name">{{food.name}}</h1>
          <p class="sell-info">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="haoping">好评率{{food.rating}}%</span>
          </p>
          <p class="price">
            <span class="new">￥{{food.price}}</span>
            <span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
          </p>
          <add-button class="add-button" @ballpoint="add" :food="food"></add-button>
          <div v-show="food.count===0||!food.count" class="add-first" @click="addfirst">加入购物车</div>
        </div>
        <div class="floor" v-if="food.info"></div>
        <div class="description" v-if="food.info">
          <h1 class="title">商品介绍</h1>
          <p class="content">{{food.info}}</p>
        </div>
        <div class="floor"></div>
        <div class="rating-concrol">
          <h1 class="title">商品评价</h1>
          <select-rating  :desc='desctype' @changeType="changeType" @changeOnly="changeOnly" :ratings="food.ratings"></select-rating>
        </div>
        <div class="ratings">
          <ul class="ratings-list">
            <li class="rating-item" v-for="rate in ratingArr">
              <div class="header">
                <span class="time">{{rate.rateTime}}</span>
                <div class="user">
                  <span class="account">{{rate.username}}</span>
                  <img class="head-icon" :src="rate.avatar">
                </div>
              </div>
              <div class="content">
                <div class="zan iconfont icondianzan" v-if="rate.rateType===0"></div>
                <div class="cai iconfont iconcai" v-if="rate.rateType===1"></div>
                <div class="text">{{rate.text}}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Vue from "vue";
import addButton from "../subcomponents/addbutton";
import iscroll from "../../../node_modules/iscroll/build/iscroll-probe.js";
import selectRating from "../subcomponents/selectrate";
const GOOD = 0;
const BAD = 1;
const ALL = 2;
export default {
  data() {
    return {
      showflag: false,
      rateType: ALL,
      onlyContent: false,
      desctype:{
        all: "全部",
        positive: "喜欢",
        negative: "吐槽"
      }
    };
  },
  props: ["food"],
  computed: {
    ratingArr() {
      var temparr = [];
      //   if (this.food.ratings) {
      if (this.rateType == ALL) {
        temparr = this.food.ratings;
      } else {
        temparr = this.food.ratings.filter(rate => {
          return rate.rateType == this.rateType;
        });
      }
      if (this.onlyContent) {
        temparr = temparr.filter(rate => {
          return rate.text != "";
        });
      }
      return temparr;
    }
    // }
  },
  methods: {
    show() {
      this.showflag = true;
      this.$nextTick(() => {
        if (!this.iscroll) {
          this.iscroll = new iscroll(".iscroll-container", {
            mouseWheel: true,
            bounce: true,
            scrollbars: false,
            probeType: 2,
            click: true
          });
        }
        this.iscroll.refresh();
      });
    },
    hide() {
      this.showflag = false;
    },
    add(el) {
      this.$emit("ballpoint", el);
    },
    addfirst(e) {
      Vue.set(this.food, "count", 1);
      this.add(e.target);
    },
    changeType(type) {
      this.rateType = type;
      this.$nextTick(()=>{
        this.iscroll.refresh()
      }) 
    },
    changeOnly(only) {
      this.onlyContent = only;
      this.$nextTick(()=>{
        this.iscroll.refresh()
      }) 
    }
  },
  components: {
    addButton,
    selectRating
  }
};
</script>

<style lang="stylus" scoped>
.food-detail {
  position: fixed;
  width: 100%;
  top: 0;
  bottom: 52px;
  background-color: #fff;
  z-index: 14;

  .img-wraper {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 100%;

    .img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  .back {
    position: absolute;
    top: 0px;
    width: 100%;
    color: #fff;
    background-color: rgba(155, 155, 155, 0.2);

    .back-icon {
      // height 38px
      line-height: 38px;
      display: inline-block;
      padding: 0 15px;
      font-size: 26px;
    }
  }

  .food-info {
    padding: 18px;
    position: relative;

    .name {
      font-size: 24px;
      font-weight: 700;
      color: rgb(7, 17, 27);
      line-height: 30px;
      margin-bottom: 8px;
    }

    .sell-info {
      font-size: 16px;
      color: rgb(147, 153, 159);
      line-height: 20px;
      margin-bottom: 18px;

      .sell-count {
        margin-right: 12px;
      }
    }

    .price {
      font-size: 0;

      .new {
        font-size: 25px;
        font-weight: 700;
        color: rgb(240, 20, 20);
        margin-right: 12px;
        line-height: 32px;
        vertical-align: top;
      }

      .old {
        font-size: 20px;
        font-weight: 700;
        line-height: 32px;
        color: rgb(147, 153, 159);
        text-decoration: line-through;
      }
    }

    .add-button {
      position: absolute;
      bottom: 30px;
      right: 30px;
    }

    .add-first {
      position: absolute;
      bottom: 30px;
      right: 30px;
      line-height: 36px;
      border-radius: 12px;
      background-color: rgb(0, 160, 220);
      padding: 0 12px;
      color: #fff;
    }
  }

  .floor {
    width: 100%;
    height: 26px;
    background-color: #f3f5f7;
    border-top: 2px rgba(7, 17, 27, 0.1);
  }

  .description {
    padding: 18px;

    .title {
      font-size: 24px;
      font-weight: 400;
      color: rgb(7, 17, 27);
      line-height: 30px;
    }

    .content {
      font-size: 18px;
      font-weight: 200;
      color: rgb(77, 85, 93);
      line-height: 32px;
      margin-top: 8px;
    }
  }

  .rating-concrol {
    padding: 18px 12px;
    border-bottom: 2px solid rgba(7, 17, 27, 0.5);

    .title {
      margin-bottom: 18px;
      font-size: 26px;
    }
  }

  .ratings {
    padding: 0 12px;

    .rating-item {
      padding: 12px 0;
      border-bottom: 1px solid rgba(1, 17, 27, 0.1);

      .header {
        font-size: 16px;
        color: rgb(147, 153, 159);
        line-height: 26px;

        .time {
          // line-height 28px
        }

        .user {
          float: right;

          .account {
            // line-height 26px
            // vertical-align top
          }

          .head-icon {
            width: 26px;
            height: 26px;
            border-radius: 13px;
            vertical-align: top;
          }
        }
      }

      .content {
        margin-top: 10px;
        position: relative;

        .zan, .cai {
          position: absolute;
          display: inline-block;
          font-size: 20px;
          line-height: 20px;
          top: 0;
          left: 0;
        }

        .zan {
          color: rgb(0, 160, 220);
        }

        .cai {
          color: rgb(147, 153, 159);
        }

        .text {
          margin-left: 24px;
          color: rgb(7, 17, 27);
          display: inline-block;
          vertical-align: top;
          line-height: 26px;
        }
      }
    }
  }
}

.v-enter, .v-leave-active {
  transform: translateX(100%);
}

.v-enter-active, .v-leave-active {
  transition: all 0.3s;
}
</style>