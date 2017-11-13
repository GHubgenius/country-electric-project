<template>
  <div class="wrapper">
    <div class="container" >
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showPage: false
    }
  },
  created: function () {},
  mounted () {},
  methods: {},
  components: {}
}
</script>

<style lang="scss">
  @import '~styles/main';
  @import '~styles/app/mixin';
  .wrapper{
    height: 100%;
  }
  *{
    @include font-dpr(14px);
    list-style: none;
  }
</style>
