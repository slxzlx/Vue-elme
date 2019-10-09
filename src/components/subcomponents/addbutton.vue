<template>
  <div class="ad-button">
    <transition name="move">
      <i class="reduce iconfont iconprevent" @click.stop.prevent="reduce" v-if="food.count>0"></i>
    </transition>
    <div class="count" v-show="food.count>0">{{food.count}}</div>
    <i class="add iconfont iconaddto" @click.stop.prevent="add"></i>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  //   data() {
  //     return {
  //       count: 0
  //     };
  //   },
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    add(e) {
      //   if (!e._constructed) return;
      if (!this.food.count)
        //不能直接这样设置
        // this.food.count = 1;
        Vue.set(this.food, "count", 1);
      else {
        this.food.count++;
      }
      //将点击的
      this.$emit('ballpoint',e.target)

    },
    reduce() {
      this.food.count--;
    }
  }
};
</script>

<style lang="stylus" scoped>
.ad-button {
  // height: 32px;
  font-size: 0;
  
  .reduce,.add {
    display: inline-block;
    // width: 32px;
    font-size: 32px;
    line-height: 32px;
    color: rgb(0, 160, 220);
    font-weight: bold;
  }

  .count {
    display: inline-block;
    text-align: center;
    width: 20px;
    font-size: 16px;
    line-height: 32px;
    
    vertical-align: top;
  }
  .move-enter-active,.move-leave-active{
      transition transform .2s linear
  }
  .move-enter,.move-leave-to{
      opacity 0
      transform  translateX(50px) rotate(180deg)
  }
}
</style>