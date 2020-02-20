<template>
  <div>
    <div class="bar-list-bigbox">
      <div class="bar-list-title">
        <span class="line"></span>
        <span class="text">{{_.get(tarlist,'data.categoriesTitle')}}</span>
        <span class="line"></span>
      </div>
      <div class="list">
          <ul>
              <li v-for="item in tarlist.data.categories" :key="item.id" @click="jumphttp(item)">
                  <img :src="item.imageUrl"/>
                  <div class="listtext">{{item.title}}</div>
              </li>
          </ul>
      </div>
    </div>
  </div>
</template>
<script>
// import _ from 'lodash'
export default {
  data () {
    return {
      tarlist: { data: { categories: [] } },
      cateurls: []
    }
  },
  mounted () {
    this.Barlists()
  },
  watch: {
    '$route' (to, from) {
      if (to.params.id !== from.params.id) {
        this.Barlists()
      }
    }
  },
  methods: {
    async Barlists () {
      const { data: res } = await this.$http.get(
        `http://www.xiongmaoyouxuan.com/api/tab/${this.$route.params.id}?start=0`
      )
      this.tarlist = res
      this.cateurls = res.data.categories
    },
    jumphttp (val) {
      if (val.url.indexOf('column') === -1) {
        this.$router.push({ path: '/girllists', query: { port: val.url.substring(val.url.length - 4) } })
      } else {
        this.$router.push({ path: '/girlhome', query: { port: val.url.substring(val.url.length - 4) } })
      }
    }
  }
}
</script>
<style lang="less" scoped>
.bar-list-bigbox {
  width: 100vw;
  height: 47vh;
  background: #fff;
  .bar-list-title {
    line-height: 5vh;
    text-align: center;
  }
  .line {
    height: 1px;
    width: 20vw;
    background: #fdde4a;
    display: inline-block;
    margin-bottom: 0.3vh;
  }
  .text {
    font-size: 1.6vh;
    font-weight: 500;
    color: #877a73;
    &::before {
        content: '';
        border: 3px solid #fdde4a;
        width: 0;
        height: 0;
        display: inline-block;
        transform: rotate(45deg);
        margin-right: 3vh;
    }
    &::after{
        content: '';
        border: 3px solid #fdde4a;
        width: 0;
        height: 0;
        display: inline-block;
        transform: rotate(45deg);
        margin-left: 3vh;
    }
  }
}
.list{
    ul{
        margin-left: 2vw;
        li{
            width: 16vw;
            height: 7vh;
            float: left;
            margin: 4vw;
            img{
                width: 100%;
                height: 100%;
            }
            .listtext{
                font-size: 1vh;
                color: #877a73;
                width: 16vw;
                height: 2vh;
                text-align: center;
            }
        }
    }
}
</style>
