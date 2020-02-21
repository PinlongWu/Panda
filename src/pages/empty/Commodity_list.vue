<template>
    <div>
        <div class="sort-nav">
            <div @click="colorclick(index)" v-for="(item,index) in text" :key="index" :class="{'active':textindex===index}">{{item}}</div>
        </div>
        <BaseList :httpParams='httpParams'/>
    </div>
</template>
<script>
import BaseList from '../../components/base/BaseList'
export default {
  components: { BaseList },
  data () {
    return {
      text: ['默认', '价格最低', '销量最高'],
      textindex: 0,
      httpParams: {
        url: `http://www.xiongmaoyouxuan.com/api/search?word=${this.$route.query.keyword}&start=0&sort=${this.textindex}&couponOnly=NaN&minPrice=0&maxPrice=99999`,
        type: 'fiil',
        indexvualue: 0
      }
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.query.keyword !== from.query.keyword || to.query.sort !== from.query.sort) {
        this.httpParams = {
          url: `http://www.xiongmaoyouxuan.com/api/search?word=${this.$route.query.keyword}&start=0&sort=${this.textindex}&couponOnly=NaN&minPrice=0&maxPrice=99999`,
          type: 'fiil'
        }
      }
    }
  },
  methods: {
    colorclick (index) {
      this.textindex = index
      this.$router.push({ path: 'commoditylist', query: { keyword: this.$route.query.keyword, type: 'search', sort: index } })
    }
  }
}
</script>
<style lang="less" scoped>
.sort-nav{
    width: 100vw;
    height: 7vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    div{
        width: 30.3vw;
        height: 7vh;
        text-align: center;
        line-height: 7vh;
        font-size: 2vh;
    }
}
.active{
    color: red;
}
</style>
