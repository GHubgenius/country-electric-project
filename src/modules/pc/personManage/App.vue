<template>
  <div id="app" class="page-container">
      <LeftSide class="leftSide"></LeftSide>
      <transition
        mode="out-in"
        enter-active-class="fadeIn"
        leave-active-class="fadeOut"
        appear>
        <router-view class="animated"></router-view>
      </transition>
  </div>
</template>

<script>import { mapActions } from 'vuex'
import LeftSide from './components/leftSide.vue'
export default {
  data () {
    return {}
  },
  created: function () {
    this.getBasicWigetStruct()
    this.getBasicWiget()
    this.getAllchildrenGroups()
  },
  methods: {
    ...mapActions(['getBasicWigetStruct', 'getBasicWiget', 'getAllchildrenGroups'])
  },
  components: {
    LeftSide
  }
}
</script>

<style lang="scss">
  @import '~styles/main';
  *{
    font-family:微软雅黑, 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color:inherit;
    font-size: inherit;
  }
  html{
    background-color: #f5f5f5;
    font-size: 12px;
      color:#323232;
  }
  ul{list-style: none}
  .page-container {
      text-align: center;
      width: 1200px;
      min-height: 100vh;
      margin: 0 auto;
      overflow: hidden;
      background: white;
  }
  .leftSide{
    width: 200px;
    float: left;
    border: 1px solid #eeede9;
    border-right: 0;
    min-height: 100vh;
    //margin-right: 15px;
      margin-bottom:-9999px;
      padding-bottom:9999px;
    background: white;
  }
  .animated{
    float: left;
    width: calc(100% - 200px);
    border: 1px solid #eeede9;
    min-height: 100vh;
    background-color: #fff;
  }
</style>
