<template>
    <section>
        <ul>
            <router-link to="personList"><li :class="{ active: showObj.isActiveList }">人员列表</li></router-link>
            <router-link to="personCount"><li :class="{ active: showObj.isActiveCount }">人员统计</li></router-link>

            <li class="hasSub">模板配置
                <ul class="subNav">
                    <router-link to="dataConfig"><li :class="{ active: showObj.isActiveConfig }">数据项配置</li></router-link>
                    <router-link to="countConfig"><li :class="{ active: showObj.isActiveCountConfig}">统计配置</li></router-link>
                    <router-link to="wordConfig"><li :class="{ active: showObj.isActiveWordConfig}">文案配置</li></router-link>
                    <router-link to="modelConfig"><li :class="{ active: showObj.isActiveModelConfig}">模板配置</li></router-link>
                </ul>
            </li>
        </ul>
    </section>
</template>
<script>
    export default {
      data () {
        return {
          showObj: {
            isActiveList: false,
            isActiveCount: false,
            isActiveConfig: true,
            isActiveCountConfig: false,
            isActiveModelConfig: false
          }
        }
      },
      methods: {
        liActive (routeName) {
          for (let key in this.showObj) {
            this.showObj[key] = false
          }
          if (routeName === 'dataConfig') {
            this.showObj.isActiveConfig = true
          } else if (routeName === 'countConfig') {
            this.showObj.isActiveCountConfig = true
          } else if (routeName === 'wordConfig') {
            this.showObj.isActiveWordConfig = true
          } else if (routeName === 'personList' || routeName === 'importMore' || routeName === 'addPerson' || routeName === 'importDetail') {
            this.showObj.isActiveList = true
          } else {
            this.showObj.isActiveCount = true
          }
        }
      },
      watch: {
        '$route' (to) {
          this.liActive(to.name)
        }
      },
      created () {
        this.liActive(this.$route.name)
      }
    }
</script>
<style lang="scss" scoped>
    @import '~styles/base/vars.scss';
    ul{
        padding-top: 10px;
        li,p{
            margin: 4px 0;
            padding: 8px 0;
            text-align: left;
        }
        li:before,p:before{
            content: '';
            margin-left: 25px;
        }
        li:not(.hasSub):hover{
            cursor: pointer;
            background: $color-primary;
            color: white;
        }
        li.active{
            border-left: 2px solid $color-primary;
        }
    }
    ul.subNav{
        li{
            &:before{
                content: '';
                width: 5px;
                height: 5px;
                border-radius: 50%;
                display: inline-block;
                background: #dfe4ed;
                margin-right: 10px;
            }
        }
        li.active:before{
            content: '';
            width: 5px;
            height: 5px;
            border-radius: 50%;
            display: inline-block;
            background: #dfe4ed;
            margin-right: 10px;
            position: relative;
            left:-2px
        }

    }
</style>
