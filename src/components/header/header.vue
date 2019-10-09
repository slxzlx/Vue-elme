<template>
  <div class="header-wrap">
    <div class="seller-info">
      <img width="64px" height="64px" :src="ss.avatar" @click="detail_show=true">
      <div class="disc">
        <div class="dis-title">
          <span class="pp-icon"></span>
          <span class="sl-name">{{ss.name}}</span>
        </div>
        <div class="dis-express">{{ss.description}}/{{ss.deliveryTime}}分钟送达</div>
        <div class="dis-discount" v-if="ss.supports">
          <span class="j-icon" :class="icon_class[ss.supports[1].type]"></span>
          <span class="j-disc">{{ss.supports[1].description}}</span>
        </div>
      </div>
    </div>
    <div class="support-count">
      <span v-if="ss.supports" class="count">{{ ss.supports.length}}个</span>
      <i class="arrow iconfont iconnext"></i>
    </div>
    <div class="bulletin">
      <span class="bul-icon"></span>
      <span class="bul-text">{{ss.bulletin}}</span>
      <i class="iconfont iconnext arrow"></i>
    </div>
    <div class="background">
      <img :src="ss.avatar">
    </div>
    <detail :cc='ss' @detailClose='detail_show=false' v-show="detail_show">
    </detail>
  </div>
</template>

<script>
import detail from './detail'
export default {
  data() {
    return {
      // icon_class: [],
      detail_show:false
    };
  },
  props: {
    ss: { type: Object, required: true }
  },
  methods:{
  },
  created() {
    this.icon_class = [
      "decrease",
      "discount",
      "guarantee",
      "invoice",
      "special"
    ];
  },
  components:{
    detail
  }
};
</script>
<style lang='stylus' scoped>
@import '~../../common/css/base.styl';
.header-wrap {
  width: 100%;
  overflow hidden
  position relative
  background-color rgba(7,17,27,.5)
  .seller-info {
    font-size: 0;
    margin: 24px 0 0 24px;
    img {
      display: inline-block;
      border-radius: 4px;
    }
    .disc {
      color: #fff;
      display: inline-block;
      vertical-align: top;
      margin-left: 16px;
      .dis-title {
        margin-top: 2px;
        margin-bottom: 8px;
        .pp-icon {
          display: inline-block;
          width: 30px;
          height: 18px;
          background-size 30px 18px
          bg-image: 'resources/brand';
          vertical-align: top;
        }
        .sl-name {
          // vertical-align top
          font-weight: bold;
          line-height: 18px;
          font-size: 16px;
          margin-left: 6px;
        }
      }
      .dis-express {
        font-size: 12px;
        font-weight: 200;
        margin-bottom: 10px;
      }
      .dis-discount {
        .j-disc {
          font-size: 10px;
          line-height: 12px;
          font-weight: 200;
          vertical-align: top;
        }
        .j-icon {
          display: inline-block;
          width: 12px;
          height: 12px;
          background-size: 12px 12px;
          margin-right: 10px;

          &.decrease {
            bg-image('resources/decrease_1');
          }

          &.discount {
            bg-image('resources/discount_1');
          }

          &.guarantee {
            bg-image('resources/guarantee_1');
          }

          &.invoice {
            bg-image('resources/invoice_1');
          }

          &.special {
            bg-image('resources/special_1');
          }
        }
      }
    }
  }
  .bulletin {
    width: 100%; 
    height: 28px;
    background-color: rgba(7, 17, 27, 0.2);
    color #fff
    margin-top 18px
    padding 0 18px 0 10px 
    overflow:hidden
    white-space:nowrap
    text-overflow:ellipsis
    position relative
    line-height 28px
    .bul-icon{
      display  inline-block
      width 22px
      height 12px
      background-size 22px 12px
      vertical-align top 
      margin-top 8px 
      bg-image('resources/bulletin')
    }
    .bul-text{    
      // line-height 28px
      font-size 10px
      margin 0 2px
    }
    .arrow{
      position absolute
      right 10px
      top 50%
      transform translateY(-50%)
      font-size 12px

    }
  }
  .support-count{
    position absolute
    border-radius 8px
    width 50px
    height 30px
    background-color rgba(0,0,0,.2)
    right 10px
    bottom 46px
    color #fff
    line-height 30px
    text-align center
    font-size 0
    font-weight 200
    .count{
      font-size 15px
    }
    .arrow{
      font-size 15px
      margin-left 3px
    }
  }
  .background{
    position absolute
    width 100%
    height 100%
    top 0
    left 0
    z-index -1
    filter blur(10px)
    img{
      width 100%
      height 100%
    }
  }
}
</style>