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
            <van-tabs background="#fdde4a" :ellipsis="false">
                <van-tab v-for="(item,index) in title" :title="item" :key="index"></van-tab>
                <p class="iconnav"><van-icon name="wap-nav" size="5vh"/></p>
            </van-tabs>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
  data () {
    return {
      title: ['今日推荐', '女装', '男装', '美妆护肤', '配饰', '女鞋', '男鞋', '零食', '内衣袜子', '母婴用品', '箱包', '个人洗护', '数码家电', '成人用品', '日用家居', '文体娱乐']
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
    background-color: #fdde4a;
    padding-left: 4vw;
}
.iconnav{
    background: #fdde4a;
    position: fixed;
    z-index:100000000;
    left: 91vw;
    top: 11.5vh;
}
</style>
