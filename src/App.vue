<template>
  <div id="app">
    <v-header :ss="seller"></v-header>
    <div class="tab border-bottom">
      <router-link class="tab-item" to="/">商品</router-link>
      <router-link class="tab-item" to="/rating">评论</router-link>
      <router-link class="tab-item" to="/seller">商家</router-link>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    
    <!-- <shopcar/> -->
  </div>
</template>

<script>
import header from "./components/header/header.vue";
import shopcar from "./components/shopcar/shopcar.vue";
import axios from "axios";
export default {
  name: "App",
  data() {
    return {
      seller: {}
    };
  },
  components: {
    "v-header": header,
    shopcar
  },
  created() {
    axios.get("/api/seller").then(data => {
      this.seller = data.data.seller;
    });
  }
};
</script>

<style lang='stylus' scope>
#app {
  .tab {
    width: 100%;
    height: 40px;
    line-height: 40px;
    display: flex;
     border-bottom: 3px solid #ccc;
    .tab-item {
      display: block;
      flex: 1;
      text-align: center;
      // color black
      font-size: 14px;

      &.active {
        color: rgb(240, 20, 20);
      }
    }
  }
}
</style>
