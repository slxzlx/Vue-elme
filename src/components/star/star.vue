<template>
  <div class="stars-container clearfix">
    <span
      v-for="item in itemClass"
      :key="item.id"
      :class="[star_size,item.class]"
    ></span>
  </div>
</template>

<script>
const Length = 5;
const ON = "on";
const OFF = "off";
const HALF = "half";
export default {
  props: ["score", "size", "left"],
  data() {
    return {
      starType: "ddd"
    };
  },
  computed: {
    star_size() {
      return "star-size" + this.size;
    },
    itemClass() {
      var array = [];
      var id = 0;
      //   var score=Math.floor
      var onCount = Math.floor(this.score / 2);
      var half = this.score % 1 !== 0;
      for (let i = 0; i < onCount; i++) {
        array.push({ id: id++, class: ON });
      }
      if (half) array.push({ id: id, class: HALF });
      while (array.length < Length) {
        array.push({ id: ++id, class: OFF });
      }
      return array;
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~../../common/css/base.styl';

.stars-container {
  .star-size24 {
    display: inline-block;
    width: 20px;
    height: 19px;
    margin-left 10px

    &:first-child {
      margin-left: 0;
    }

    &.on {
      bg-image('./resources/star24_on');
    }

    &.half {
      bg-image('./resources/star24_half');
    }

    &.off {
      bg-image('./resources/star24_off');
    }
  }

  .star-size36 {
    display: inline-block;
    width: 30px;
    height: 29px;
    margin-left 20px
    &:first-child {
      margin-left: 0;
    }
    &.on {
      bg-image('./resources/star36_on');
    }

    &.half {
      bg-image('./resources/star36_half');
    }

    &.off {
      bg-image('./resources/star36_off');
    }
  }

  .star-size48 {
    
    display: inline-block;
    width: 40px
    height: 38px
    margin-left 40px
    &:first-child {
      margin-left: 0;
    }
    &.on {
      bg-image('./resources/star48_on');
    }

    &.half {
      bg-image('./resources/star48_half');
    }

    &.off {
      bg-image('./resources/star48_off');
    }
  }
}
</style>