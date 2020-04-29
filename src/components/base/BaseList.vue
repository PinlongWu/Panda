/* eslint-disable space-before-function-paren */
<template>
    <div>
        <!-- 列表无限刷 -->
        <div class="wireless-list" >
            <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                loading-text='小二加载中...'
                @load="onLoad"
                >
                <div class="van-clearfix">
                <van-cell v-for="item in list" :key="item.id">
                    <div class="commodity-card float-item">
                        <div v-if='item.type===1'>
                          <div @click="type1(item)">
                            <div class="commodity-img"><img :src="item.image"/></div>
                            <div class="commodity-title">{{item.title}}</div>
                            <div class="commodity-platform-isFreePostage">
                                <div class="platform" :style="{background:item.platform===2?'#df2b2f':'#f40'}" >{{item.platform===2?'天猫':'淘宝'}}</div>
                                <div class="isFreePostage">{{item.isFreePostage === true ? '包邮' : '不包邮'}}</div>
                            </div>
                            <div class="commodity-price"><i>￥</i>{{item.price}}</div>
                            <div class="commodity-saleNum-couponValue">
                                <div class="saleNum">{{item.saleNum}}已卖</div>
                                <div class="couponValue">{{item.couponValue}}</div>
                            </div>
                          </div>
                        </div>
                        <div v-else>
                            <div class="commodity-else" @click="type2(item.url)"><img :src="item.image"/></div>
                        </div>
                    </div>
                </van-cell>
                </div>
            </van-list>
        </div>
        <div class="toponscroll" style="display:none" @click="topnone"><img src="../../assets/top.png"/></div>
    </div>
</template>
<script>
import _ from 'lodash'
export default {
  props: ['httpParams'],
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      start: 0,
      isEnd: false,
      tabs: [],
      keys: true,
      timer: null
    }
  },
  mounted () {
    this.listenerFunction() // 滚动监听
  },
  watch: {
    '$route' (to, from) {
      // console.log(to, from)
      if (to.path !== from.path) {
        this.list = []
        this.start = 0
        this.onLoad()
      }
      if (to.query.type === 'search' && (to.query.keyword !== from.query.keyword || to.query.sort !== from.query.sort)) {
        this.list = []
        this.onLoad()
      }
      if (to.params.id !== from.params.id) {
        this.list = []
        this.onLoad()
      }
    },
    httpParams: {
      handler: function (val, oldval) {
        if (val !== oldval) {
          this.list = []
          this.start = 0
          this.onLoad()
        }
      },
      immediate: true, // 关键
      deep: true
    }
  },
  beforeDestroy () { // 滚动监听
    document.removeEventListener('scroll', this.listenerFunction)
  },
  methods: {
    async onLoad () {
      const { url, type, isGirl = false } = this.httpParams
      this.loading = true
      this.finished = false
      let { data: res } = await this.$http.get(url + this.start)
      res = await this.responseDate(res, type)
      this.list = [...this.list, ..._.get(res, 'data.list')]
      this.loading = false
      this.start = _.get(res, 'data.nextIndex')
      this.isEnd = _.get(res, 'data.isEnd')
      if (isGirl && this.list.length === 0) {
        if (this.isEnd) {
          this.$router.push({ path: '/empty' })
        } else {
          this.onLoad()
        }
      }
      if (this.isEnd) {
        this.finished = true
      }
    },
    async responseDate (res, type) {
      // console.log(res, type)
      if (type === 'feeds') {
        return { data: { ...res.data.items } }
      } else if (type === 'fiil') {
        return { data: { ...res.data } }
      }
    },
    // 滚动监听
    listenerFunction (e) {
      document.addEventListener('scroll', this.handleScroll, true)
    },
    handleScroll () {
      var scrollUp = document.getElementsByClassName('toponscroll')[0]
      var scollTop = window.document.scollTop || document.documentElement.scrollTop
      if (scollTop >= 1500) {
        scrollUp.style.display = 'block'
      } else {
        scrollUp.style.display = 'none'
      }
    },
    topnone () {
      var scollTop = window.document.scrollTop || document.documentElement.scrollTop
      if (this.keys) {
        this.timer = setInterval(this.topnone, 10)
      }
      if (scollTop > 1) {
        window.document.scrollTop = document.documentElement.scrollTop = scollTop - scollTop / 10 // 减速运动
        this.keys = false // 关闭开关
      } else {
        window.document.scrollTop = 0
        clearInterval(this.timer)
        this.keys = true
      }
    },
    type2 (val) {
      console.log(val)
      console.log(val.substr(-4))
      // this.setQuery({ port: val.substring(val.length - 11, val.length - 7) })
      // this.$router.push({ path: '/girlhome' })
      this.$router.push({ path: '/girlhome', query: { port: val.substr(-4) } })
      // console.log(val.substring(val.length - 11, val.length - 7))
    },
    type1 (val) {
      console.log(val.id)
      this.$router.push({ path: '/purchase', query: { port: val.id } })
    }
  }
}
</script>
<style lang="less" scoped>
.split-line{
    text-align: center;
    height: 5vh;
    line-height: 5vh;
    vertical-align: middle;
    font-size: 0;
    .line{
        height: 1px;
        background-color: #fdde4a;
        width: 12%;
        display: inline-block;
        margin-bottom: 3px;
    }
    .text{
        font-size: 1vh;
        font-weight: 300;
        &::before{
            content: "";
            width: 0;
            height: 0;
            border: 3px solid #fdde4a;
            transform: rotate(45deg);
            display: inline-block;
            box-sizing: border-box;
            margin-top: -3px;
            margin-right: 20px;
        }
        &::after{
            content: "";
            width: 0;
            height: 0;
            border: 3px solid #fdde4a;
            transform: rotate(45deg);
            display: inline-block;
            box-sizing: border-box;
            margin-top: -3px;
            margin-left: 20px;
        }
    }
}
.van-cell{
    width: 49vw !important;
    float: left;
    margin-bottom: 1vh;
    height: 40vh;
    padding: 5px;
}
.van-cell:nth-child(2n+1){
    margin-right: 2vw;
}
.commodity-card{
    .commodity-img{
        width: 100%;
        height: 25vh;;
        img{
            width: 100%;
            height: 100%;
            display: block;
        }
    }
    .commodity-title{
        font-size: 1vh;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 44.9vw;
        line-height: 7vh;
    }
    .commodity-platform-isFreePostage{
        margin: -1vh 0 0.5vh 0;
        height: 2.7vh;
            .platform{
            font-size: 1vh;
            color: #fff;
            display: inline-block;
            border-radius: 3px;
            margin-left: 6px;
            line-height: 1.5;
            float: left;
        }
        .isFreePostage{
            font-size: 1vh;
            line-height: 1.5;
            float: right;
            color: #877a73;
            margin-right: 9px;
        }
    }
    .commodity-price{
        color: #fa585a;
        font-size: 2.14vh;
        font-weight: 500;
            i{
                font-size: 2.2vh;
                margin-left: -5px;
            }
    }
    .saleNum{
        font-size: 1.6vh;
        color: #877a73;
        line-height: 1;
        margin: -12px 0 0 56px;
    }
    .couponValue{
        float: right;
        color: red;
        font-size: 1.2vh;
        border: 1px solid red;
        line-height: 1;
        margin: -13px 0 0 0;
    }
    .commodity-else{
        img{
            width: 100%;
            height: 100%;
            display: block;
        }
    }
}
.toponscroll{
    width: 15vw;
    height: 7vh;
    position: fixed;
    right: 8vw;
    bottom: 8vh;
    z-index: 10;
    border-radius: 50%;
    img{
        width: 100%;
        display: block;
    }
}
</style>
