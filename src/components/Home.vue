<template>
    <div>
        <!-- 头部搜索框 -->
        <div class="Home-search">
            <van-button to="search">
                <van-icon name="search" size="5vh"/>
                <span>搜索商品,发现更多优选</span>
            </van-button>
        </div>
        <!-- 导航 -->
        <div class="Home-nav">
            <div class="recommend">今日推荐</div>
            <div class="xian"></div>
            <van-tabs background="#fdde4a" :ellipsis="false">
                <van-tab v-for="(item,index) in title" :title="item.name" :key="index" to="item.type"></van-tab>
            </van-tabs>
            <div class="iconnav" @click="iconnav"><van-icon name="wap-nav" size="5vh"/></div>
        </div>
        <div class="float-tabs" ref="tabsooo" style="display:none">
            <div class="float-tabs-sou">
                    <div class="float-tabs-lei">全部分类</div>
                    <div class="float-tabs-cha" @click="tabsnone">x</div>
            </div>
            <ul>
                <li v-for="items in tabs" :key="items.id" class="float-tabs-lis">
                    <div class="float-tabs-div">
                        <img :src="items.imageUrl"/>
                        <div class="float-tabs-text">{{items.name}}</div>
                    </div>
                </li>
            </ul>
        </div>
        <!-- 三个广告部位 -->
        <router-view></router-view>
        <div class="grids">
            <div class="grid-left">
                <div class="gridv-lft">
                    <div class="gridv-title">{{_.get(gridsV,[0,'title'])}}</div>
                    <div class="gridv-text">{{_.get(gridsV,[0,'text'])}}</div>
                </div>
                <div class="gridv-img"><img :src="_.get(gridsV,[0,'imageUrl'])"/></div>
            </div>
            <div class="grid-right">
                <div class="grid-right-top">
                    <div class="grid-right-top-left">
                        <div class="grid-right-top-left-title">{{_.get(gridsV,[1,'title'])}}</div>
                        <div class="grid-right-top-left-text">{{_.get(gridsV,[1,'text'])}}</div>
                    </div>
                    <div class="grid-right-top-img"><img :src="_.get(gridsV,[1,'imageUrl'])"/></div>
                </div>
                <div class="grid-right-buttom">
                    <div class="grid-right-buttom-left">
                        <div class="grid-right-buttom-left-title">{{_.get(gridsV,[2,'title'])}}</div>
                        <div class="grid-right-buttom-left-text">{{_.get(gridsV,[2,'text'])}}</div>
                    </div>
                    <div class="grid-right-buttom-img"><img :src="_.get(gridsV,[2,'imageUrl'])"/></div>
                </div>
            </div>
        </div>
        <!-- 横向div -->
        <div class="top-swiper">
            <div class="hot-left">
                <img src="../assets/Hot.png"/>
            </div>
            <div class="hot-right">
                <swiper :options="swiperOption">
                    <swiper-slide v-for="(item,index) in toplist" :key="index">
                        <div class="hot-right-list">
                            <div v-if="index===_.size(toplist)-2">
                                <div class="see-more">
                                    <p class="moer">更多商品</p>
                                    <p class="see">see-more</p>
                                </div>
                            </div>
                            <div v-else-if="index===_.size(toplist)-1">
                            </div>
                            <div v-else>
                                <img :src='item.image'/>
                                <p>{{item.title}}</p>
                                <div class="iocn"><i>￥</i><span>{{item.price}}</span></div>
                            </div>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
        <!-- 小编精选，全场特惠 (ง •̀_•́)ง -->
        <div class="split-line">
            <span class="line"></span>
            <span class="text">小编精选，全场特惠 (ง •̀_•́)ง</span>
            <span class="line"></span>
        </div>
        <!-- 列表无限刷 -->
        <BaseList :httpParams='httpParams'/>

        <div class="toponscroll" style="display:none" @click="topnone"><img src="../assets/top.png"/></div>
    </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import BaseList from '../components/base/BaseList'
export default {
  components: {
    swiper,
    swiperSlide,
    BaseList
  },
  data () {
    return {
      title: [{ name: '女装', type: '/girl' }, { name: '男装', type: '/' }, { name: '美妆护肤', type: '/girl' }, { name: '配饰', type: '/girl' }, { name: '女鞋', type: '/girl' }, { name: '男鞋', type: '/girl' }, { name: '零食', type: '/girl' }, { name: '内衣袜子', type: '/girl' }, { name: '母婴用品', type: '/girl' }, { name: '箱包', type: '/girl' }, { name: '个人洗护', type: '/girl' }, { name: '数码家电', type: '/girl' }, { name: '成人用品', type: '/girl' }],
      gridsV: [],
      toplist: [],
      itemslist: [],
      swiperOption: {
        slidesPerView: 'auto',
        freeModeMomentum: true,
        spaceBetween: 10,
        loop: true,
        speed: 600 // config参数同swiper4,与官网一致
      },
      tabs: [],
      keys: true,
      timer: null,
      httpParams: {
        url: 'http://www.xiongmaoyouxuan.com/api/tab/1?start=',
        type: 'feeds'
      }
    }
  },
  mounted () {
    this.gridsjs()
    this.listenerFunction() // 滚动监听
  },
  beforeDestroy () { // 滚动监听
    document.removeEventListener('scroll', this.listenerFunction)
  },
  methods: {
    async gridsjs () {
      const { data: res } = await this.$http.get('http://www.xiongmaoyouxuan.com/api/tab/1?start=0')
      console.log(res.data.topList)
      this.gridsV = res.data.gridsV2
      this.toplist = [...res.data.topList, '']
      const { data: tablist } = await this.$http.get('http://www.xiongmaoyouxuan.com/api/tabs?sa=')
      console.log(tablist.data.list)
      this.tabs = tablist.data.list
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
    tabsnone () {
      this.$refs.tabsooo.style.display = 'none'
    },
    iconnav () {
      this.$refs.tabsooo.style.display = 'block'
    }
  }
}
</script>
<style lang="less" scoped>
.Home-search{
    width: 100vw;
    height: 10vh;
    background-color: #fdde4a;
    line-height: 10.5vh;
    text-align: center;
    position: fixed;
        top: 0;
        z-index: 123;
    .van-button{
        width: 90vw;
        height: 7vh;
        background-color: #fff;
        border-radius: 10px;
        .van-icon{
            line-height: 8vh;
            margin-left: 2vw;
            vertical-align:middle;
            color: #acacac;
        }
        span{
            font-size: 2.5vh;
            color: #9c918b;
        }
    }
}
.Home-nav{
    width: 100vw;
    background-color: #fdde4a;
    display: flex;
    position: fixed;
    top: 9.9vh;
    z-index: 100;
    .recommend{
        width: 18vw;
        padding-top: 1.5vh;
        margin-left: 5vw;
    }
    .xian{
        border-right: 1px solid black;
        height: 5vh;
        margin: 1vh 1vh 0 1vh;
    }
    .van-tabs{
        width: 63vw;
        flex: 1;
    }
    .iconnav{
        z-index: 100;
        width: 10vw;
        margin-top: 0.7vh;
    }
}
.grids{
    width: 100%;
    height: 20vh;
    display: flex;
    justify-content: space-around;
    padding: 10px 0;
    box-shadow: 0 1px 0 0 #d9d9d9;
    background: #fff;
    .grid-left{
        width: 40%;
        height: 100%;
        background: #fdf4e6;
        border-radius: 10px;
        position: relative;
        .gridv-lft{
            position: relative;
            float: left;
            z-index: 10;
            .gridv-title{
                margin: 13px 9px;
                font-size: 2.4vh;
                font-weight: 500;
            }
            .gridv-text{
                font-size: 1vh;
                margin: -9px 9px;
                color: #ff9e55;
            }
        }
        .gridv-img{
                width: 79%;
                position: absolute;
                right: 0;
        }
        img{
            width:100%;
            height: 100%;
            border-radius: 10px;
        }
    }
    .grid-right{
        width:55%;
        height: 100%;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content : center;
        align-items: center;
        justify-content: space-evenly;
        .grid-right-top{
            width: 90%;
            height: 40%;
            background: #fff3f1;
            border-radius: 10px;
            position: relative;
            .grid-right-top-left{
                position: relative;
                .grid-right-top-left-title{
                    font-size: 2.4vh;
                    margin: 9px 11px;
                    font-weight: 500;
                }
                .grid-right-top-left-text{
                    font-size: 1.1vh;
                    margin: -9px 12px;
                    color: #ff9e55;
                }
            }
            .grid-right-top-img{
                position: absolute;
                width: 41%;
                height: 100%;
                right: 0;
                top: -5px;
                img{
                    width: 94%;
                    height: 123%;
                }
            }
        }
        .grid-right-buttom{
            width: 90%;
            height: 40%;
            background: #eef9fc;
            border-radius: 10px;
            position: relative;
            .grid-right-buttom-left{
                position: relative;
                .grid-right-buttom-left-title{
                    font-size: 2.4vh;
                    margin: 9px 11px;
                    font-weight: 500;
                }
                .grid-right-buttom-left-text{
                    font-size: 1.1vh;
                    margin: -9px 12px;
                    color: #ff9e55;
                }
            }
            .grid-right-buttom-img{
                position: absolute;
                width: 41%;
                height: 100%;
                right: 0;
                top: -5px;
                img{
                    width: 94%;
                    height: 123%;
                }
            }
        }
    }
}
.top-swiper{
    margin-top: 2vh;
    height: 20vh;
    width: 100vw;
    background: #fff;
    padding-top:14px;
    .hot-left{
        float: left;
        width: 10%;
        height: 90%;
        background: #fee44e;
        text-align: center;
        margin-right: 10px;
        img{
            width: 70%;
            height: 65%;
            margin-top:20px;
        }
    }
    .hot-right{
        .hot-right-list{
            width: 20vw;
            height: 20wh;
            .see-more{
                width: 21vw;
                height: 23vw;
                border: 1px solid #d9d9d9;
                text-align: center;
                padding: 10px;
                .moer{
                    font-size: 2.5vh;
                    color: #fda900;
                    padding: 21px 0 5px 0;
                    border-bottom: 1px solid;
                }
                .see{
                    font-size: 2vh;
                    color: #877a73;
                    padding-top: 5px;
                }
            }
            img{
                width: 100%;
                height: 100%;
            }
            p{
                font-size: 0.1vh;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                width: 22.4vw;
            }
            .iocn{
                text-align: center;
                color: #fa585a;
                margin-top: 5px;
                margin-left: -12px;
                font-weight: 600;
            }
        }
    }
}
.swiper-slide{
    width: 25%;
}
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
    height: 270px;
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
.float-tabs{
    width: 100vw;
    height: 58vh;
    background: #fff;
    z-index: 1000;
    position: absolute;
    top: 10vh;
    border-bottom: 4vh solid #e2d7d7;
    .float-tabs-sou{
        height: 5vh;
        background: #fdde4a;
        line-height: 5vh;
        position: relative;
        .float-tabs-lei{
            text-align: center;
            color: #877a73;
            font-size: 2vh;
            font-weight: 500;
        }
        .float-tabs-cha{
            position: absolute;
            top: 0vh;
            right: 4vw;
            font-size: 3vh;
            color: #877a73;
        }
    }
    ul{
        width: 100%;
        height: 100%;
        padding-left: 2vh;
        .float-tabs-lis{
            width: 22vw;
            float: left;
            margin: 0 2vh;
            margin: 0 1vh 1vh 0;
            .float-tabs-div{
                width: 100%;
                height: 100%;
                text-align: center;
                img{
                    width: 20vw;
                    height: 10vh;
                }
                .float-tabs-text{
                    font-size: 1vh;
                    color: #877a73;
                }
            }
        }
    }
}
</style>
