<template>
  <div>
      <van-row>
            <van-col span="3" class="search-return" @click="goback">返回</van-col>
            <van-col span="18">
                <!-- 搜索框 -->
                <van-search background="#fdde4a" placeholder="搜索商品,发现更多优选" v-model='keyword'/>
            </van-col>
            <van-col span="3" class="search-search" @click="Jump">搜索</van-col>
        </van-row>
        <router-view />
  </div>
</template>

<script>
export default {
  data () {
    return {
      keyword: ''
    }
  },
  methods: {
    goback () {
      this.$router.go(-1)
      // console.log(this.$router)
    },
    Jump () {
      this.$router.push({ path: 'commoditylist', query: { keyword: this.keyword, type: 'search' } })
    }
  }
}
</script>

<style lang="less" scoped>
.search-return{
        display: block;
        height: 10.4vh;
        text-align: center;
        line-height: 10.5vh;
        background: #fdde4a;
    }
    .search-search{
        display: block;
        height: 10.4vh;
        text-align: center;
        background: #fdde4a;
        line-height: 10.5vh;
    }
    .van-search{
        padding: 2.65vh 0;
    }
</style>
