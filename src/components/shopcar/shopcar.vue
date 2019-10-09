<template>
  <div class="sc-container">
    <div class="car-bottom">
      <div class="icon-wraper">
        <div class="icon-bg">
          <span v-show="totalCount>0" class="count">{{totalCount}}</span>
          <i
            id="shopcar"
            class="icon iconfont iconhtmal5icon29"
            :class="{highlight:totalCount>0}"
            @click="isshow=!isshow"
          ></i>
        </div>
      </div>
      <div class="total-price">￥{{totalPrice}}</div>
      <div class="extra">
        <div class="content">
          <span>另需配送费￥{{sendPrice}}元</span>
        </div>
      </div>
      <div class="button" :class="{highlight:totalPrice>=minPrice}">{{minSendDescription}}</div>
    </div>

    <div v-show="isshow" class="enter-car">
      <div class="background"></div>
      <transition name="c">
        <div class="content">
          <div class="title">
            <span class="name">购物车</span>
            <span class="clear" @click = 'clear' >清空</span>
          </div>
          <div class="iscroll">
            <ul class="shoplist">
              <li class="shop-item" v-for="food in selectFoods" :key="food.name">
                <div class="item-content">
                  <span class="shop-name">{{food.name}}</span>
                  <div class="content-right">
                    <span class="price">{{food.price*food.count}}</span>
                    <!-- <span class="reduce iconfont iconprevent"></span>
                  <span class="count">{{food.count}}</span>
                    <span class="add iconfont iconaddto"></span>-->
                    <addbutton class="addbutton" :food="food"></addbutton>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition-group
      name="ball"
      tag="div"
      @before-enter="beforEnter"
      @enter="enter"
      @after-enter="afterEnter"
    >
      <div v-show="ball.show" class="ball" v-for="ball in balls" :key="ball.id"></div>
    </transition-group>
  </div>
</template>

<script>
import iscroll from "../../../node_modules/iscroll/build/iscroll-probe.js";
import addbutton from "../subcomponents/addbutton";
export default {
  props: {
    selectFoods: {
      type: Array,
      default() {
        return [{ price: 10, count: 3 }];
      }
    },
    sendPrice: {
      type: Number,
      default: 4
    },
    minPrice: {
      type: Number,
      default: 20
    }
  },
  data() {
    return {
      isshow: false,
      balls: [
        { id: 0, show: false },
        { id: 1, show: false },
        { id: 2, show: false },
        { id: 3, show: false },
        { id: 4, show: false }
      ],
      dropballs: []
    };
  },
  updated() {
    this.$nextTick(() => {
      
    });
    if(!this.iscroll){
      this.iscroll = new iscroll(".iscroll", {
        mouseWheel: true,
        bounce: true,
        scrollbars: false,
        probeType: 2
      });
    }
    this.iscroll.refresh()
  },
  computed: {
    totalCount() {
      let count = 0;
      this.selectFoods.forEach(food => {
        count += food.count;
      });
      return count;
    },
    totalPrice() {
      var total = 0;
      this.selectFoods.forEach(food => {
        total += food.count * food.price;
      });
      return total;
    },
    minSendDescription() {
      if (this.totalCount === 0) return "空空如也";
      if (this.totalPrice < this.minPrice) return `￥${this.minPrice}起送`;
      if (this.totalPrice >= this.minPrice) return "去结算";
    }
  },
  methods: {
    add(startel) {
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i];
        if (!ball.show) {
          ball.show = true;
          ball.startel = startel;
          this.dropballs.push(ball);
          console.log(i);
          return;
        }
      }
    },
    beforEnter(el) {
      let count = this.dropballs.length;
      let rect = this.dropballs[count - 1].startel.getBoundingClientRect();
      let startX = rect.left - 31;
      let startY = -(window.innerHeight-rect.top- 45);
      el.style.transform = `translate(${startX}px,${startY}px)`;
    },
    enter(el, done) {
      el.offsetHeight;
      el.style.transform = "translate(0,0)";
      el.style.transition = "all .3s cubic-bezier(0.49,-0.29,0.75,0.41)"
      done();
    },
    afterEnter(el) {
      let ball = this.dropballs.shift();
      if (ball) {
        ball.show = false;
      }
    },
    clear(){
      this.
    }
  },
  components: {
    addbutton
  }
};
</script>

<style lang="stylus" scoped>
.sc-container {
  position: fixed;
  width: 100%;
  bottom: 0;
  z-index: 15;

  .ball {
    position: fixed;
    bottom: 25px;
    left: 31px;
    width: 20px;
    height: 20px;
    background-color: red;
    border-radius: 50%;
    z-index: 20;
  }

  .car-bottom {
    display: flex;
    position: absolute;
    bottom 0
    z-index: 18;
    justify-content: space-between;
    height: 52px;
    width: 100%;
    background-color: #141d27;

    .icon-wraper {
      width: 78px;
      position: relative;
      flex: 0 0 78px;

      .icon-bg {
        position: absolute;
        width: 62px;
        height: 62px;
        border-radius: 50%;
        background-color: #141d27;
        left: 10px;
        bottom: 4px;

        .count {
          position: absolute;
          width: 28px;
          height: 18px;
          border-radius: 6px;
          background-color: rgb(240, 20, 20);
          box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.4);
          top: 0;
          left: 60%;
          font-size: 14px;
          line-height: 18px;
          text-align: center;
          color: #fff;
          z-index: 17;
        }

        .icon {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background-color: rgb(99, 99, 110, 0.2);
          text-align: center;
          font-size: 24px;
          line-height: 44px;
          color: rgb(255, 255, 255, 0.4);
          transform: translate(-50%, -50%);

          &.highlight {
            background-color: rgb(0, 160, 220);
            color: #fff;
          }
        }
      }
    }

    .total-price {
      flex: 0;
      padding-right: 12px;
      // height 52px
      line-height: 52px;
      font-size: 16px;
      font-weight: 700;
      color: rgb(255, 255, 255, 0.4);
    }

    .extra {
      flex: 5;
      padding: 10px 0;

      .content {
        // height 32px
        border-left: 1px solid rgb(255, 255, 255, 0.1);
        color: rgb(255, 255, 255, 0.4);
        font-size: 16px;
        line-height: 32px;
        padding-left: 5px;
      }
    }

    .button {
      flex: 0 0 105px;
      width: 105px;
      background-color: rgb(99, 99, 110, 0.2);
      text-align: center;
      line-height: 52px;
      font-size: 16px;
      font-weight: 600;
      color: rgb(255, 255, 255, 0.4);

      &.highlight {
        background-color: rgb(0, 160, 220);
        color: #fff;
      }
    }
  }

  .enter-car {
    position: fixed;
    width: 100%;
    top: 0;
    bottom: 52px;
    z-index: 14;

    .background {
      position: absolute;
      height: 100%;
      width: 100%;
      background-color: rgba(7, 17, 27, 0.6);
      filter: blur(50px);
    }

    .content {
      width: 100%;
      position: absolute;
      background-color: #fff;
      bottom: 0;
      padding-bottom: 20px;

      .title {
        height: 40px;
        border-bottom: 2px solid rgba(7, 17, 27, 0.1);
        line-height: 40px;
        padding: 0 18px;
        font-size: 16px;
        font-weight: 200;

        .clear {
          float: right;
          color: rgb(0, 160, 220);
        }
      }

      .iscroll {
        max-height: 350px;
        overflow: hidden;

        .shoplist {
          padding: 0 18px;

          .shop-item {
            border-bottom: 1px solid rgba(7, 17, 27, 0.1);

            .item-content {
              height: 58px;

              .shop-name {
                font-size: 14px;
                line-height: 58px;
                color: rgb(7, 17, 27);
              }

              .content-right {
                float: right;

                // height: 58px;
                .price {
                  font-size: 20px;
                  line-height: 58px;
                  color: rgb(240, 20, 20);
                  font-weight: 700;
                  margin-right: 10px;
                }

                .addbutton {
                  // position absolute
                  display: inline-block;
                  // line-height 58px
                  // margin-top 8px
                }
              }
            }
          }
        }
      }
    }

    .c-enter, .c-leave-to {
      transform: translateY(-100%);
    }

    .c-enter-active, .c-leave-active {
      transition: transform 0.4s;
    }
  }
}
</style>