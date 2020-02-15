<template>
    <div>
        <van-row>
            <van-col span="3" class="search-return" @click="goback">返回</van-col>
            <van-col span="18">
                <!-- 搜索框 -->
                <van-search background="#fdde4a" placeholder="搜索商品,发现更多优选"/>
            </van-col>
            <van-col span="3" class="search-search">搜索</van-col>
        </van-row>
        <!-- 搜索框下面的字 -->
        <div class="search_tag">
            <p>热门搜索</p>
            <van-tag round size="large">包包</van-tag>
            <van-tag round size="large" type="primary">口红</van-tag>
            <van-tag round size="large" type="success">泡面</van-tag>
            <van-tag round size="large" type="danger">螺狮粉</van-tag>
            <van-tag round size="large" type="warning">避孕套</van-tag>
            <van-tag round size="large">菜籽油</van-tag>
            <van-tag round size="large" type="primary">充气娃娃</van-tag>
            <van-tag round size="large" type="success">水果</van-tag>
            <van-tag round size="large" type="danger">震动棒</van-tag>
            <p class="shpping">商品分类</p>
            <van-tag round size="large">女装</van-tag>
            <van-tag round size="large" type="primary">男装</van-tag>
            <van-tag round size="large" type="success">美妆护肤</van-tag>
            <van-tag round size="large" type="danger">配饰</van-tag>
            <van-tag round size="large" type="warning">女鞋</van-tag>
            <van-tag round size="large">男鞋</van-tag>
            <van-tag round size="large" type="primary">零食</van-tag>
            <van-tag round size="large" type="success">内衣袜子</van-tag>
            <van-tag round size="large" type="danger">母婴用品</van-tag>
            <van-tag round size="large">箱包</van-tag>
            <van-tag round size="large" type="primary">个人洗护</van-tag>
            <van-tag round size="large" type="success">数码家电</van-tag>
            <van-tag round size="large" type="danger">成人用品</van-tag>
            <van-tag round size="large">日用家居</van-tag>
            <van-tag round size="large" type="primary">文体娱乐 </van-tag>
        </div>
    </div>
</template>
<script>
export default {
  methods: {
    goback () {
      this.$router.go(-1)
      console.log(this.$router)
    }
  }
}
</script>
<style lang="less" scoped>
    .search-return{
        display: block;
        height: 9.5vh;
        text-align: center;
        line-height: 9.5vh;
        background: #fdde4a;
    }
    .search-search{
        display: block;
        height: 9.5vh;
        text-align: center;
        background: #fdde4a;
        line-height: 9.5vh;
    }
    .van-search{
        padding: 10px 0;
    }
    .search_tag{
        padding: 12vw;
        p{
            font-size: 3vh;
            color: #877a73;
            margin-bottom: 4vh;
        }
        .shpping{
            margin-top: 16vh;
            margin-bottom: 4vh;
        }
    }
</style>
