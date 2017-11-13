<template>
  <section>
    <searchHead class="head" @getSearchData="getSearch" :number = 'allCount'></searchHead>
    <mt-loadmore
            :top-method="loadTop"
            :bottom-method="loadBottom"
            :bottomAllLoaded="allOver"
            :autoFill="true"
            class="listArea" ref="loadmore">
      <ul>
        <li @click="toDetail(list.memberId)" v-for="(list,index) in listData">
          <img v-lazy="list.avatar">
          <div class="info">
            <h3>{{list.name}}</h3>
            <p>{{list.unit}}</p>
          </div>
          <label>{{index}}</label>
        </li>
      </ul>
    </mt-loadmore>
    <p v-if="nodataShow"  @click="reload" class="loadedInfo">点击刷新</p>
    <p v-if="noMoreShow"  class="loadedInfo">没有更多了</p>
  </section>
</template>
<script type="text/javascript">
  import api from 'api/app'
  import { mapActions } from 'vuex'
  import { Indicator, Toast } from 'mint-ui';
  // import { Toast } from 'mint-ui'
  import searchHead from 'modules/app/personal/components/search'
  export default {
    data () {
      return {
        currentPage: 1,
        pageSize: 10,
        listData: [],
        allOver: false,
        allCount: 0,
        searchData: {},
        nodataShow: false,
        noMoreShow: false
      }
    },
    methods: {
      loadTop () {
        this.currentPage = 1
        this.listData = []
        this.searchData = {}
        let param = {
          pageNo: this.currentPage, pageSize: this.pageSize, ...this.searchData
        }
        this.getMemberList(param)
        this.$refs.loadmore.onTopLoaded();
        this.allOver = false
      },
      loadBottom () {
        this.currentPage++
        let param = {
          pageNo: this.currentPage, pageSize: this.pageSize, ...this.searchData
        }
        this.getMemberList(param)
      },
      getMemberList (param) {
        Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
        api.getMemberList(param).then(res => {
          console.log(res.tbody)
          this.listData.push(...res.tbody)
          this.allCount = res.dataCount
          if (res.tbody.length < this.pageSize) {
            this.allOver = true
            this.noMoreShow = true
          } else {
            this.noMoreShow = false
            this.allOver = false
          }
          this.$refs.loadmore.onBottomLoaded();
          this.nodataShow = false
          Indicator.close();
        }, error => {
          Indicator.close();
          Toast(error)
          this.nodataShow = true
        })
      },
      toDetail (id) {
        window.sessionStorage.memberId = id
        window.location.href = '#/Detail'
      },
      getSearch (data) {
        console.log(data)
        this.searchData = {...data}
        this.currentPage = 1
        let param = {
          pageNo: this.currentPage, pageSize: this.pageSize, ...data
        }
        this.listData = []
        this.getMemberList(param)
      },
      reload () {
        this.getMemberList({pageNo: this.currentPage, pageSize: this.pageSize})
      },
      ...mapActions(
        ['getBasicWiget']
      )
    },
    components: {
      searchHead
    },
    created () {
      this.getMemberList({pageNo: this.currentPage, pageSize: this.pageSize})
    },
    mounted () {
    }
  }
</script>
<style lang="scss" scoped>
  @import '~styles/app/mixin';
  li{
    padding: px2rem(20px) px2rem(24px);
    border-bottom: 1px solid #e4e4e4;
    display: flex;
    .info{
      width: 68%;
      margin-left: px2rem(24px);
      h3{
        font-size: px2rem(30px);
        font-weight: 100;
      }
      p{
        font-size: px2rem(28px);
        color: #626262;
        margin-top: px2rem(12px);
      }
    }
    label{
      font-style: px2rem(26px);
      color: #626262 ;
    }
  }
  .head{

  }
  .listArea{
    margin-top: px2rem(150px);
  }
  img{
    width: px2rem(116px);
    height: px2rem(170px);
  }
  img[lazy=loaded] {
    width: px2rem(116px);
    height: px2rem(170px);
  }
  img[lazy=loading] {
    width: px2rem(116px);
    height: px2rem(170px);
  }
  .loadedInfo{
    text-align: center;color: #626262;margin-top: px2rem(15px);margin-bottom: px2rem(15px);
  }
</style>
