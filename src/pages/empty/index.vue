<template>
    <div class='main'>
        <Search />
        <Nav />
        KONG
    </div>
</template>
<script>
import Search from '../../components/base/search'
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
</style>
