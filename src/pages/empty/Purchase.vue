<template>
    <div class="mian">
        <!-- 轮播 -->
        <div class="Purchase-rotation">
            <van-swipe :autoplay="3000" width="100vw" height="20vh">
                <van-swipe-item v-for="image in RotationImg" :key="image.id">
                    <img v-lazy="image.url" />
                </van-swipe-item>
            </van-swipe>
        </div>
        <!-- 返回标 -->
        <div class="Purchase-icon" @click="Return">
            <van-icon name="arrow-left" />
        </div>
        <!-- 商品名称 -->
        <div class="Purchase-title">
            <div v-if="Platform === 1">
                <span class="Purchase-platform" style="background:#f40">淘</span>
                <span class="Purchase-post"><img src="../../assets/post.png"/></span>
                <span class="Purchase-text">{{Title}}</span>
            </div>
            <div v-else>
                <span class="Purchase-platform" style="background:#df2b2f">猫</span>
                <span class="Purchase-post"><img src="../../assets/post.png"/></span>
                <span class="Purchase-text">{{Title}}</span>
            </div>
        </div>
        <!-- 商品的价格/月销量 -->
        <div class="Purchase-price">
            <span class="price"><i>￥</i>{{Price}}</span>
            <span class="salenum">月销量: {{SaleNum}}</span>
        </div>
        <!-- 淘宝图文详情 -->
        <div class="Purchase-details">
            <div class="line"></div>
            <div class="details-text">淘宝图文详情</div>
            <div class="line"></div>
        </div>
        <!-- 详细图片 -->
        <div class="Purchase-DescContentList">
            <ul>
                <li v-for="listImg in DescContentList" :key="listImg.image.id">
                    <img :src="listImg.image.url"/>
                </li>
            </ul>
        </div>
        <!-- toponscroll -->
        <div class="toponscroll" style="display:none" @click="topnone"><img src="../../assets/top.png"/></div>
        <div class="goBuy">
            <!-- <div @click="gono">去淘宝买</div> -->
            <van-cell is-link @click="gono">去淘宝买</van-cell>
            <van-popup v-model="show">目前只能观看还不能支持购买商品哦(-`~`-)</van-popup>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      RotationImg: [], // 轮播的图片
      Platform: '', // 判断商品的商家
      Title: '', // 商品的名字
      Price: '', // 商品的价格
      SaleNum: '', // 商品的销售量
      DescContentList: [], // 商品图文详情图
      keys: true,
      timer: null,
      show: false
    }
  },
  mounted () {
    this.httppurchase()
    this.listenerFunction() // 滚动监听
  },
  beforeDestroy () { // 滚动监听
    document.removeEventListener('scroll', this.listenerFunction)
  },
  methods: {
    async httppurchase () {
      const { data: res } = await this.$http.get(`http://www.xiongmaoyouxuan.com/api/detail?id=${this.$route.query.port}&normal=1&sa=`)
      console.log(res.data.detail.descContentList)
      this.Platform = res.data.shop.platform
      this.RotationImg = res.data.detail.photo
      this.Title = res.data.share.title
      this.Price = res.data.detail.price
      this.SaleNum = res.data.detail.saleNum
      this.DescContentList = res.data.detail.descContentList
    },
    listenerFunction (e) {
      document.addEventListener('scroll', this.handleScroll, true)
    },
    handleScroll () {
      var scrollUp = document.getElementsByClassName('toponscroll')[0]
      var scollTop = window.document.scollTop || document.documentElement.scrollTop
      if (scollTop >= 1000) {
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
    Return () {
      this.$router.go(-1)
    },
    gono () {
      this.show = true
    }
  }
}
</script>
<style lang="less" scoped>
.mian{
    .Purchase-rotation{
        width: 100vw;
        height: 60vh;
        .van-swipe{
            width: 100vw;
            height: 60vh;
            img{
                width:100%;
                height: 100%;
            }
        }
    }
    .Purchase-icon{
        width: 9vw;
        height: 5vh;
        background: rgba(0,0,0,.5);
        text-align: center;
        line-height: 5.7vh;
        border-radius: 50%;
        position: fixed;
        top: 3vh;
        left: 5vw;
        color: #fff;
    }
    .Purchase-title{
        padding: 1.6vh 2vh 2vh 2vh;
        font-size: 2vh;
        line-height: 1;
        background: #fff;
        .Purchase-platform{
            color: #fff;
            border-radius: 1vw;
            padding: 0.2vw;
            margin-right: 2vw;
        }
        .Purchase-post{
                width: 9vw;
                height: 2.8vh;
                display: inline-block;
                margin-right: 2vw;
                vertical-align: sub;
                img{
                    width: 100%;
                    height: 100%;
            }
        }
        .Purchase-text{
            font-size: 2.4vh;
            line-height: 3.5vh;
        }
    }
    .Purchase-price{
        overflow: hidden;
        padding: 0 3vw;
        background: #fff;
        .price{
            color: #fa585a;
            font-size: 4vh;
            font-weight: 700;
            i{
                font-size: 1vh;
            }
        }
        .salenum{
            color: #b1a9a5;
            font-size: 2vh;
            float: right;
            line-height: 6vh;
        }
    }
    .Purchase-details{
            display: flex;
            width: 100vw;
            justify-content: center;
            background: #fff;
            padding-top: 6vh;
        .line{
            background: #b1a9a5;
            height: 1px;
            width: 10vw;
            margin-top: 1.2vh;
        }
        .details-text{
            font-size: 2vh;
            color: #b1a9a5;
        }
    }
    .Purchase-DescContentList{
        width: 100vw;
        img{
            width: 100%;
        }
    }
    .toponscroll{
        width: 15vw;
        height: 11vh;
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
    .goBuy{
        width: 100vw;
        height: 8vh;
        position: fixed;
        bottom: 0;
        background: #f5f5f5;
        div{
            width: 39vw;
            background: #fa585a;
            float: right;
            font-size: 2.7vh;
            font-weight: 500;
            color: #fff;
            text-align: center;
        }
        i{
            margin-left: 0;
            min-width:0;
            &::before{
                content: '';
            }
        }
        .van-cell{
                    line-height: 5.5vh;
                    margin-left: 5vw;
        }
        .van-popup{
            width: 98vw;
            height: 22vh;
            border-radius: 10vw;
            line-height: 22vh;
            background: #fff;
            color: black;
        }
    }
}
</style>
