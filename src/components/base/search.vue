<template>
    <div>
        <!-- 头部搜索框 -->
        <div class="Home-search">
            <van-button to="search">
                <van-icon name="search" size="5vh"/>
                <span>搜索商品,发现更多优选</span>
            </van-button>
        </div>
    </div>
</template>
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
</style>
