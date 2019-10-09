<template>
  <div class="scroll-wraper scroll-wraper-hook">
    <div>
      <div class="header">
        <div class="left">
          <div class="content">
            <div class="score">3.9</div>
            <div class="text">综合评分</div>
            <div class="desc">高于周边商家69%</div>
          </div>
        </div>
        <div class="right">
          <div class="content">
            <div class="attitude">
              <span class="text">服务态度</span>
              <star :score="8" :size="24" class="star"></star>
            </div>
            <div class="attitude">
              <span class="text">送餐速度</span>
              <star :score="8" :size="24"></star>
            </div>
            <div class="attitude">
              <span class="text">送达时间</span>
              <span class="time">40分钟</span>
            </div>
          </div>
        </div>
      </div>
      <div class="floor"></div>
      <div class="rate-concrol">
        <rate-select :desc="selectType"></rate-select>
      </div>

      <div class="ratings">
        <ul>
          <li class="rating-item">
            <div class="header-icon">
              <img src="" style='width:28px; height:28px'>
            </div>
            <div class="content">
              <div class="title"></div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import star from "../star/star";
import rateSelect from "../subcomponents/selectrate";
export default {
  data() {
    return {
      selectType: {
        all: "全部",
        positive: "喜欢",
        negative: "垃圾"
      }
    };
  },
  components: {
    rateSelect,
    star
  }
};
</script>

<style lang='stylus' scoped>
.scroll-wraper {
  width: 100%;
  position: absolute;
  top: 176px;
  bottom: 52px;
  overflow: hidden;
  z-index: 8;

  .header {
    padding: 18px;
    display: flex;

    .left {
      width: 120px;
      flex: 0 0 120px;
      text-align: center;
      border-right: 1px solid rgba(7, 17, 27, 0.1);
      padding: 10px 0px;

      .score {
        font-size: 32px;
        color: rgb(255, 153, 0);
        line-height: 46px;
      }

      .text {
        font-size: 20px;
        color: rgb(7, 17, 27);
        line-height: 26px;
      }

      .desc {
        font-size: 18px;
        color: rgb(147, 153, 159);
        line-height: 22px;
      }
    }

    .right {
      flex: 1;
      position: relative;

      .content {
        position absolute
        top 50%
        transform translateY(-50%)
        .attitude {
          margin-left: 24px;
          margin-bottom: 8px;

          &:last-child {
            margin-bottom: 0;
          }

          .star {
            display: inline-block;
          }
        }
      }
    }
  }
  .floor {
    width: 100%;
    height: 26px;
    background-color: #f3f5f7;
    border-top: 2px rgba(7, 17, 27, 0.1);
  }
  .rate-concrol{
    padding 18px
    border-bottom 2px solid rgba(7, 17, 27,.2)
  }
}
</style>