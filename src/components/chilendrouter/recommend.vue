<template>
    <div>
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="item in info" :key="item.id">
                <img v-lazy="item.imageUrl" @click="imghttp(item)"/>
            </van-swipe-item>
        </van-swipe>
    </div>
</template>
<script>
export default {
  data () {
    return {
      info: []
    }
  },
  mounted () {
    this.play()
  },
  methods: {
    async play () {
      const { data: res } = await this.$http.get('http://www.xiongmaoyouxuan.com/api/tab/1?start=0')
      this.info = res.data.banners
    },
    imghttp (val) {
      this.$router.push({ path: '/girlhome', query: { port: val.url.substring(val.url.length - 4) } })
    }
  }
}
</script>
<style lang="less" scoped>
.my-swipe{
  margin-top: 16vh;
}
img{
    height: 140px;
    width: 100vw;
    display: block;
}
</style>
