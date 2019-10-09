<template>
  <div class="detail">
    <div class="content-wrap clearfix">
      <div class="detail-main">
          <h1>{{cc.name}}</h1>
          <star class="star" :score='cc.score' :size='24' :left='10'></star>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul class="support" v-if="cc.supports">
            <li class="sup-item" v-for='item in cc.supports' :key="item.type">
              <span class="icon" :class="icon_class[item.type]"></span>
              <span class="des">{{item.description}}</span>
            </li>
          </ul> 
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <p class="bulletin">{{cc.bulletin}}</p>
      </div>
    </div>
    <div class="close" @click="$emit('detailClose')">
      <i class="iconfont iconclose"></i>
    </div>
  </div>
</template>

<script>
import star from '../star/star'
export default {
    props:['cc'],
    components:{star},
    created() {
      this.icon_class = [
        "decrease",
        "discount",
        "guarantee",
        "invoice",
        "special"
      ];
  },
};
</script>

<style lang="stylus" scoped>
@import '~../../common/css/base.styl';
.detail {
  position: fixed;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 20;
  overflow: auto;
  background-color: rgba(7, 17, 27, 0.8);
  color: #fff;
  font-size: 16px;

  .content-wrap {
    min-height: 95%;
    padding 8px 
    padding-bottom: 32px
    .detail-main {
      // overflow hidden    
      h1{
          margin-top 32px
          text-align center
          font-size 20px
          font-weight 400
      }
      .star{
        margin 8px auto
        text-align center
      }
      .title{
        width 80%
        display flex
        margin 25px auto
        .line{
          flex 1
          position relative
          top -9px
          border-bottom 1px solid #ccc
        }
        .text{
          padding 0 10px  
          font-size 18px
          font-weight bold
        }
      }
      .support{ 
        width 80%
        margin 25px auto
        .sup-item{
          margin-bottom 15px
          &:last-child{
            margin-bottom 0
          } 
          .icon{
            display inline-block
            width 16px
            height 16px
            background-size 16px 16px
            margin-right 5px
            &.decrease {
              bg-image('resources/decrease_2');
            }

            &.discount {
              bg-image('resources/discount_2');
            }

            &.guarantee {
              bg-image('resources/guarantee_2');
            }

            &.invoice {
              bg-image('resources/invoice_2');
            }

            &.special {
              bg-image('resources/special_2');
            }
          }
          .des{
           vertical-align top
           line-height 16px
           font-size 16px
           font-weight 200
          } 
        }
      }
      .bulletin{
       text-align left
       width 70%
       margin 25px auto
       font-size 18px
       line-height 24px
      }
    }
  }

  .close {
    color: #fff;
    // position: relative;
    width: 24px;
    height: 24px;
    // bottom 10px
    margin: -20px auto 0 auto;
    i {
      font-size: 32px;
    }
  }
}
</style>