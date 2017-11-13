<template>
    <section>
        <div class="title">
           <span>数量（{{number}}）</span>
            <button class="app-btn" @click="rightSlide"><i class="icon-search"></i>搜索</button>
        </div>
        <mt-popup
                v-model="popupVisible"
                position="right"
               class="rightSlide"
                >
                <h3>搜索筛选</h3>
                <ul>
                    <li>
                        <label>姓名</label>
                        <input type="text" placeholder="请输入关键字" v-model="search.name"/>
                    </li>
                    <li>
                        <label>单位名称</label>
                        <input type="text" placeholder="请输入关键字" v-model="search.unit"/>
                    </li>
                    <li>
                        <label>所在党支部</label>
                        <input type="text" placeholder="请输入关键字" v-model="search.groups"/>
                    </li>
                    <li>
                        <label>电话</label>
                        <input type="text" placeholder="请输入关键字" v-model="search.phone"/>
                    </li>
                </ul>
                <footer>
                    <button class="app-btn" @click="sure">确定</button>
                    <button class="app-btn" @click="popupVisible = false">取消</button>
                </footer>
        </mt-popup>
    </section>
</template>
<script>
// import api from 'api'
export default {
  data () {
    return {
      popupVisible: false,
      search: {
        name: '',
        unit: '',
        phone: '',
        groupName: ''
      }
    }
  },
  props: {
    number: {
      type: Number,
      default: 0
    }
  },
  methods: {
    rightSlide () {
      this.popupVisible = true
    },
    sure () {
      this.popupVisible = false
      this.$emit('getSearchData', this.search)
    }
  },
  components: {
  },
  created () {}
}
</script>
<style lang="scss" scoped>
@import '~styles/app/mixin';
section{
    background: #f7f7f7;
    color:#626262;
    z-index: 1;
    position: fixed;
    top:0;
    left:0;
    width: 100%;
    padding: 0px px2rem(12px);
    height: px2rem(100px);
    display: flex;
    align-items:center;
}
    .title{
        overflow: hidden;
        width: 100%;
        span{
            display: inline-block;
            float: left;
            padding: px2rem(12px) px2rem(24px);
        }
        button{
            float: right;
        }
    }
    .rightSlide{
        width: 100%;
        height: 100%;
        h3{
            height: px2rem(72px);
            background:#f7f7f7 ;
            line-height:px2rem(72px);
            padding: 0px 5%;
            font-weight: 100;
        }
        footer{
            position: absolute;
            width: 100%;
            left:0;
            bottom: px2rem(20px);
            text-align: center;
            button{
                width: px2rem(350px);
                height: px2rem(88px);
            }
            button:first-child{
                margin-right: px2rem(10px);
                background: $primaryColor;
                color: white;
            }
        }
    }
    .icon-search{
        font-size: px2rem(24px);
        margin-right: px2rem(12px);
    }
ul{
    width: 100%;
    li{
        padding: 0 5%;
        border-bottom: 1px solid #e4e4e4;
        height: px2rem(88px);
        line-height: px2rem(88px);
        display: flex;
        label{
            font-size: px2rem(28px);
            width: 25%;
            text-align: right;
        }
        input{
            width: 75%;
            text-align: left;
            padding-left: 5%;
            border: none;
            outline: none;

        }
    }
}
</style>
