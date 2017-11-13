<template>
    <section>
      <h3 class="title">基本信息</h3>
      <div class="basicInfo">
          <span class="imgbox" :style="`background-image:url(${url})`"></span>
          <ul>
              <li v-for = "(value, key) in object" v-if="typeof(value) == 'string'&&key!= ''&&key!='avatar'">
                  <label>{{key}}：</label>
                  <span>{{value | handTime}}</span>
              </li>
          </ul>
      </div>
      <h3 class="title">更多</h3>
       <div class="moreInfo" v-for = "(value, key) in object" v-if="typeof(value) != 'string'&&key!= ''">
           <h4 class="listTitle"><p>{{key}}</p></h4>
           <ul>
               <li v-for="(item,index) in value">
                   <div class="childTitle">
                       <label>{{key}}：</label>
                       <span>第{{index+1}}条</span>
                       <i :class="{ expand: show[`child${key}_${index}`], 'icon-arrow': true}"
                          @click="expand(`child${key}_${index}`)"></i>
                   </div>
                   <transition-group name="fade" v-if="show[`child${key}_${index}`]">
                     <div class="childInfo" :key="`child${key}_${index}`">
                         <section v-for="(val , key2) in item">
                             <label>{{key2}}：</label>
                             <span>{{val | handTime}}</span>
                         </section>
                     </div>
                   </transition-group>
               </li>
           </ul>
       </div>
    </section>
</template>
<script>
    import api from 'api/app'
    import handTime from 'src/common/js/handleTime'
    import { Indicator, Toast } from 'mint-ui';
    export default{
      data () {
        return {
          url: '',
          show: {
          },
          object: {}
        }
      },
      methods: {
        expand (key) {
          this.show[key] = !this.show[key]
        }
      },
      created () {
        let param = {
          memberId: window.sessionStorage.memberId
        }
        Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
        api.getMemberInfo(param).then(res => {
          Indicator.close()
          this.object = res.memberInfo
          this.url = res.memberInfo.avatar
          for (let key in this.object) {
            if (typeof this.object[key] !== 'string') {
              this.object[key].map((res, i) => {
                this.$set(this.show, `child${key}_${i}`, false) // 像vue添加需要监听的数据
              })
            }
          }
        }, error => {
          Toast(error)
        })
      },
      filters: {
        handTime (val) {
          if (val.substring(val.length - 1, val.length) !== 'Z') {
            return val
          } else {
            return handTime(val)
          }
        }
      }
    }
</script>
<style lang="scss" scoped>
    @import '~styles/app/mixin';
    h3.title{
        height: px2rem(88px);
        line-height: px2rem(88px);
        background: #f7f7f7;
        padding-left: px2rem(24px);
        font-size: px2rem(32px);
        color: #333333;
        font-weight: 100;
        border-bottom: 1px solid #e4e4e4;
        border-top: 1px solid #e4e4e4;
    }
    .basicInfo{
        text-align: center;
        ul{
            width: 100%;
            margin-top: px2rem(48px);
            li{
                display: flex;
                color: #626262;
                font-size: px2rem(28px);
                margin: px2rem(30px) 0;
                label{
                    width: 30%;
                    text-align: right;
                }
                span{
                    width: 70%;
                    text-align: left;
                }
            }
        }
    }
    .imgbox{
        width: px2rem(192px);
        height: px2rem(265px);
        display: inline-block;
        background-size:auto 100%;
        background-position: center;
        margin-top: px2rem(24px);
    }
    h4.listTitle{
        height: px2rem(88px);
        align-items: center;
        display: flex;
        p{
        padding-left: px2rem(20px);
        margin-left: px2rem(24px);
        border-left: px2rem(6px) solid $primaryColor;
        }
    }
    .childTitle,.childInfo>section{
        display: flex;
        height: px2rem(72px);
        align-items: center;
        color: #626262;
        label{
            width: 30%;
            text-align: right;
        }
        span{
            width: 65%;
            text-align: left;
        }
        i.icon-arrow{
            background: url('~src/assets/images/arrow-b (1).png');
            width: px2rem(24px);
            height: px2rem(24px);
            display: inline-block;
            font-size: px2rem(24px);
            text-align: center;
            background-size: cover;
            &.expand{
                transform: rotateZ(180deg);
            }
        }
    }
    .fade-enter-active, .fade-leave-active {
        transition: all .3s
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
        opacity: 0;
        transform: translate3d(0px, -20px, 0px);
    }
    .moreInfo ul{
        background: #f7f7f7;
    }
</style>
