<template>
    <div class="mian">
        <!-- 搜索框下面的字 -->
        <div class="search_tag">
            <p>热门搜索</p>
            <van-tag round color="#f5f5f5" v-for="(item,index) in itemword" :key="index" :class="{'active':item.highlight === true}" @click="subword(item)">{{item.word}}</van-tag>
            <p class="shpping">商品分类</p>
            <van-tag round v-for="items in commoditytext" :key="items.id" @click="turngirl(items)">{{items.name}}</van-tag>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      itemword: [],
      commoditytext: []
    }
  },
  mounted () {
    this.httpword()
  },
  methods: {
    async httpword () {
      const { data: res } = await this.$http.get('http://www.xiongmaoyouxuan.com/api/search/home')
      this.itemword = res.data.hotWords
      const { data: commodityres } = await this.$http.get('http://www.xiongmaoyouxuan.com/api/tabs?sa=')
      commodityres.data.list.splice(0, 1)
      this.commoditytext = commodityres.data.list
    },
    subword (val) {
      console.log(val.word)
      this.$router.push({ path: 'commoditylist', query: { keyword: val.word, type: 'search' } })
    },
    turngirl (val) {
      this.$router.push({ name: 'girl', params: { id: val.id } })
      console.log(this.$router)
    }
  }
}
</script>
<style lang="less" scoped>
    .search_tag{
        padding: 7vw;
        p{
            font-size: 3vh;
            color: #877a73;
            margin-bottom: 4vh;
        }
        .shpping{
            margin-top: 4vh;
            margin-bottom: 4vh;
        }
    }
    .van-tag{
        color: black;
        height: 4vh;
        text-align: center;
        display: inline-block;
        line-height: 4vh;
        font-size: 2vh;
        margin-left: 2vh;
    }
    .active{
        color:#fa585a;
    }
    .mian{
        background: #fff;
    }
</style>
