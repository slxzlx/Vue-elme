<template>
  <div class="goods-container">
    <div class="left">
      <ul class="goods-list" ref="leftGoods">
        <li
          class="goods-item"
          v-for="(goods,index) in goodsArr"
          :key="goods.name"
          @click="goodsClick(index)"
        >
          <div class="content">
            <!-- <icon v-if="goods.type>0" class="icon" :supType='goods.type' :size='2'></icon> -->
            <span class="text">{{goods.name}}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="right">
      
      <div class="goods-wraper">
        <ul class="goods-detail" ref="goods">
          <li class="goods-item" v-for="(goods,index) in goodsArr" :key="goods.name">
            <h2 class="h2-title" :class="[index==curIndex?'abs':'']">{{goods.name}}</h2>
            <ul class="foods-list">
              <li class="food-item" @click='showDetail(food)' v-for="food in goods.foods" :key="food.name">
                <img width="57" height="57" :src="food.icon" class="food-icon">
                <div class="content">
                  <h2 class="title">{{food.name}}</h2>
                  <p v-if="food.description" class="description">{{food.description}}</p>
                  <div class="sell-info">
                    <span class="sell-count">月售{{food.sellCount}}</span>
                    <span class="reputaion">好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="new">￥{{food.price}}</span>
                    <span v-if="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
                  </div>
                </div>
                <ad-button @ballpoint="addcar" class="add-button" :food="food"></ad-button>
              </li>
            </ul>
          </li>
        </ul>
        <h2 v-if="goodsArr.length>0" class="fix-title">{{goodsArr[curIndex].name}}</h2>
      </div>
    </div>
    <shopcar ref='shopcar' :selectFoods="selectedFoods"/>
    <food-detail :food='showfood' @ballpoint="addcar" ref='food_detail'></food-detail>
  </div>
</template>

<script>
import axios from "axios";
// import icon from '@/components/icon/icon'
// import iscroll from "../../../node_modules/iscroll/build/iscroll-probe.js";
import btScroll from 'better-scroll';
import shopcar from "./../shopcar/shopcar.vue";
import adButton from "./../subcomponents/addbutton.vue";
import foodDetail from "./../fooddetail/fooddetail.vue";
export default {
  components: { adButton, shopcar,foodDetail},
  data() {
    return {
      goodsArr: [],
      goodsHeightArr: [],
      // crrentHeight:0,
      curIndex: 0,
      showfood:{}
    };
  },
  methods: {
    iscrollInit() {
      this.left_iscroll = new btScroll(".left", {
        mouseWheel: true,
        bounce: true,
        scrollbars: false,
        click: true
      });
      this.right_iscroll = new btScroll(".goods-wraper", {
        // mouseWheel: true,
        bounce: true,
        scrollbars: false,
        probeType: 2,
        click: true
      });
    },
    calFoodsHeight() {
      var goodsList = this.$refs["goods"].querySelectorAll(".goods-item");
      var height = 0;
      // this.goodsHeightArr.push(0);
      for (var i = 0; i < goodsList.length; i++) {
        height += goodsList[i].offsetHeight;
        this.goodsHeightArr.push(height);
      }
    },
    goodsClick(index) {
      var el = this.$refs["goods"].querySelectorAll(".goods-item")[index];
      this.right_iscroll.scrollToElement(el, 300);
      this.curIndex = index;
      this.changeBg(index)
    },
    changeBg(index) {
      var left_els = this.$refs["leftGoods"].querySelectorAll(".goods-item");
      for (var i = 0; i < left_els.length; i++) {
        left_els[i].classList.remove("active");
        left_els[i].classList.remove("del-line");
      }
      if (index > 0) left_els[index - 1].classList.add("del-line");
      left_els[index].classList.add("active");
    },
    setIndex(curh) {
      var arr = this.goodsHeightArr;
      for (var i = 0; i < arr.length; i++) {
        if (-curh < arr[i]) {
          this.curIndex = i;
          return;
        }
      }
      this.curIndex = 0;
    },
    addcar(startel) {
      this.$refs.shopcar.add(startel);
    },
    showDetail(food){
      this.showfood=food
      this.$refs.food_detail.show()
    }
  },
  created() {
    axios.get("/api/goods").then(data => {
      this.goodsArr = data.data;
      this.$nextTick(() => {
        this.iscrollInit();
        this.calFoodsHeight();
        this.right_iscroll.on("scroll", (po) => {
          // this.crrentHeight=this.right_iscroll.y
          console.log(po)
          this.setIndex(po.y);
        });
      });
    });
  },
  watch: {
    curIndex: function(newindex) {
      this.changeBg(newindex);
    }
  },
  computed: {
    selectedFoods() {
      var sel = [];
      this.goodsArr.forEach(good => {
        good.foods.forEach(food => {
          if (food.count > 0) sel.push(food);
        });
      });
      return sel;
    }
  }
  // computed:{
  //   curIndex(){
  //     var arr=this.goodsHeightArr
  //     var h=this.crrentHeight
  //     for(var i=0;i<arr.length;i++){
  //       if(-h<arr[i]){
  //          return i
  //       }
  //     }
  //     return 0
  //   }
  // }
};
</script>

<style lang='stylus' scoped>
.goods-container {
  width: 100%;
  display: flex;
  position: absolute;
  top: 176px;
  bottom: 52px;
  overflow: hidden;
  z-index: 8;

  .left {
    flex: 0 0 80px;
    touch-action: none;

    // height: 100%;
    .goods-list {
      .goods-item {
        height: 54px;
        background-color: #f3f5f7;
        padding: 0 12px;

        &.active {
          background-color: #fff;

          .content {
            border-bottom: none;
          }
        }

        &.del-line>.content {
          border-bottom: none;
        }

        &:last-child>.content {
          border-bottom: none;
        }

        .content {
          width: 56px;
          height: 51px;
          // margin 0 auto
          display: table;
          border-bottom: 1px solid #ccc;

          .text {
            font-size: 14px;
            color: rgb(20, 20, 20);
            line-height: 16px;
            display: table-cell;
            vertical-align: middle;
          }
        }
      }
    }
  }

  .right {
    flex: 1;
    height: 100%;
    position: relative;

    .fix-title {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 5;
      border-left: 3px solid #ccc;
      background-color: #f3f5f7;
      padding-left: 14px;
      color: rgb(147, 153, 159);
      font-size: 12px;
      height: 26px;
      line-height: 26px;
      width: 100%;
    }

    .goods-wraper {
      height: 100%;

      .h2-title, .fix-title {
        border-left: 3px solid #ccc;
        background-color: #f3f5f7;
        padding-left: 14px;
        color: rgb(147, 153, 159);
        font-size: 12px;
        height: 26px;
        line-height: 26px;
        width: 100%;
      }

      .food-item {
        border-bottom: 1px solid #ccc;
        margin: 18px;
        padding-bottom: 18px;
        position: relative;

        // overflow-x: hidden;
        // display flex
        &:last-child {
          border-bottom: none;
          margin-bottom: 0;
        }

        .food-icon {
          display: inline-block;
        }

        .content {
          // flex 1
          display: inline-block;
          margin-left: 5px;
          margin-right: 90px;
          font-size: 10px;
          color: rgb(147, 153, 159);
          line-height: 10px;

          .title {
            font-size: 14px;
            color: rgb(7, 17, 27);
            line-height: 14px;
            // vertical-align middle
          }

          .description {
            margin-top: 10px;
          }

          .sell-info {
            margin-top: 10px;

            .sell-count {
              margin-right: 5px;
            }
          }

          .price {
            margin-top: 10px;

            .new {
              font-size: 14px;
              color: rgb(240, 20, 20);
              font-weight: 700;
            }

            .old {
              text-decoration: line-through;
            }
          }
        }

        .add-button {
          position: absolute;
          bottom: 20px;
          right: 2px;
        }
      }
    }
  }
}
</style>