<template>
  <span class="icon" :style='sizeClass'></span>
</template>

<script>
export default {
  props:['supType','size'],
  created() {
    this.icon_class = [
      "decrease",
      "discount",
      "guarantee",
      "invoice",
      "special"
    ];
    console.log('resources/'+this.icon_class[1]+'_'+this.size+'@2x.png')
  },
  computed:{
      sizeClass(){
         var calsstype=this.icon_class[this.supType]
         if(this.size===1){
             return {width:24+'px',height:24+'px',"background-image":'resources/'+calsstype+'_'+this.size+'@2x.png'}
         }
         else{
              return {width:32+'px',height:32+'px',backgroundImage:"url('resources/discount_2@2x.png')"}
         }
      }
  }
};
</script>

<style lang="stylus" scoped>
@import '~../../common/css/base.styl';
.icon {
  display: inline-block; 
  width 32px
  height 32px
  background-image:url('resources/discount_2@2x.png')
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
</style>