<template>
  <div class="rating">
    <div class="select-type">
      <div class="all" :class='{"active":selecedType===2}' @click="changeRating(2)">
        <span class="text">{{desc.all}}</span>
        <span v-if='ratings' class="count">{{ratings.length}}</span>
      </div>
      <div class="positive" :class="{active:selecedType===0}" @click="changeRating(0)">
        <span class="text">{{desc.positive}}</span>
        <span  v-if='ratings' class="count">{{goodRateCount}}</span>
      </div>
      <div class="negative" :class="{active:selecedType===1}" @click="changeRating(1)">
        <span class="text">{{desc.negative}}</span>
        <span v-if='ratings' class="count">{{badRateCount}}</span>
      </div>
    </div>
    <div class="only-content" @click='changeOnly'>
      <span class="only-icon iconfont iconduigou " :class="{active:only}"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
const GOOD=0
const BAD=1
const ALL=2
export default {
  data() {
    return {
        selecedType:2,
        only:false
    };   
  },
  props: {
    desc: {
      type: Object,
      default() {
        return {
          all: "全部",
          positive: "满意",
          negative: "不满意"
        };
      }
    },
    ratings:{
        type:Array
    }
  },
  methods: {
    changeRating(type) {
      this.selecedType = type;
      this.$emit('changeType',type)
    },
    changeOnly(){
        this.only=!this.only
        this.$emit('changeOnly',this.only)
    }
  },
  computed:{
    goodRateCount(){
       return this.ratings.filter((rate)=>{
           return rate.rateType==GOOD
       }).length
    },
    badRateCount(){
       return this.ratings.filter((rate)=>{
           return rate.rateType==BAD
       }).length
    }
  }
};
</script>

<style lang="stylus" scoped>
.rating {
   .select-type {
    // width: 100%;
    padding-bottom: 18px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);

    .all, .positive, .negative {
      display: inline-block;
      font-size: 18px;
      line-height: 26px;
      padding: 6px 10px;
      margin-right: 10px;

      .count {
        margin-left: 5px;
        font-size: 14px;
      }
    }

    .all {
      background-color: rgba(0, 16, 220, 0.2);

      &.active {
        background-color: rgb(0, 16, 220);
        color: #fff;
      }
    }

    .positive {
      background-color: rgba(0, 16, 220, 0.2);

      &.active {
        background-color: rgb(0, 16, 220);
        color: #fff;
      }
    }

    .negative {
      background-color: rgba(77, 85, 93, 0.2);

      &.active {
        background-color: rgb(77, 85, 93);
        color: #fff;
      }
    }
  }

  .only-content {
    font-size: 18px;
    line-height: 26px;
    margin-top: 12px;
    display inline-block;
    color: rgb(147, 153, 159);

    .only-icon {
      font-size: 18px;
      margin-right: 2px;

      &.active {
        color: blue;
      }
    }
  }
}
</style>