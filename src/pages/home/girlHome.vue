<template>
    <div class="main">
        <div class="picimg">
            <img :src="imgUrl"/>
        </div>
        <BaseList :httpParams='httpParams'/>
    </div>
</template>
<script>
import Search from '../../components/base/search'
import Nav from '../../components/base/Nav'
import BaseList from '../../components/base/BaseList'
export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { Search, Nav, BaseList },
  data () {
    return {
      imgUrl: '',
      httpParams: {
        url: `http://xiongmaoyouxuan.com/api/column/${this.$route.query.port}/items?start=`,
        type: 'fiil'
      }
    }
  },
  mounted () {
    this.imgbanner()
  },
  methods: {
    async imgbanner () {
      const { data: res } = await this.$http.get(`http://www.xiongmaoyouxuan.com/api/column/${this.$route.query.port}`)
      this.imgUrl = res.data.cover
    }
  }
}
</script>
<style lang="less" scoped>
.picimg{
    img{
        width: 100%;
    }
}
 .main {
       margin-top: 16vh
   }
</style>
