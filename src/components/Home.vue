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
                <van-tab v-for="(item,index) in title" :title="item" :key="index"></van-tab>
            </van-tabs>
            <div class="iconnav"><van-icon name="wap-nav" size="5vh"/></div>
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
        <div class="wireless-list"></div>
    </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      title: ['女装', '男装', '美妆护肤', '配饰', '女鞋', '男鞋', '零食', '内衣袜子', '母婴用品', '箱包', '个人洗护', '数码家电', '成人用品', '日用家居', '文体娱乐'],
      gridsV: [],
      toplist: [],
      itemslist: [],
      swiperOption: {
        slidesPerView: 'auto',
        freeModeMomentum: true,
        spaceBetween: 10,
        loop: true,
        speed: 600 // config参数同swiper4,与官网一致
      }
    }
  },
  mounted () {
    this.gridsjs()
  },
  methods: {
    async gridsjs () {
      const { data: res } = await this.$http.get('http://www.xiongmaoyouxuan.com/api/tab/1?start=0')
      console.log(res.data.topList)
      this.gridsV = res.data.gridsV2
      this.toplist = [...res.data.topList, '']
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
        z-index: 100000000;
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
</style>
