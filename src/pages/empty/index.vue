<template>
    <div class='main'>
        <Search />
        <Nav />
        <div class="nonebox">
          <div class="goxiong">
            <P>去熊猫优秀app,看更多商品</P>
          </div>
        </div>
    </div>
</template>
<script>
import Search from '../../components/search/search'
import Nav from '../../components/base/Nav'
export default {
  components: { Search, Nav },
  mounted () {
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL)
      window.addEventListener('popstate', this.goBack, false)
    }
  },
  destroyed () {
    window.removeEventListener('popstate', this.goBack, false)
  },
  methods: {
    goBack () {
      this.$router.go(-2)
    }
  }
}
</script>
<style lang="less" scoped>
.main{
    margin-top: 16vh;
}
.nonebox{
  width: 100vw;
  height: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .goxiong{
    width: 60vw;
    height: 4vh;
    p{
      text-align: center;
      line-height: 4vh;
      font-size: 2vh;
      border: 1px solid #fa521e;
      border-radius: 10px;
      color: #fa521e;
    }
  }
}
</style>
