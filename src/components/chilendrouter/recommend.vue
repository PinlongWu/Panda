<template>
    <div>
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(item,index) in info" :key="index">
                <img v-lazy="item.imageUrl" />
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
      console.log(res.data.banners)
      this.info = res.data.banners
    }
  }
}
</script>
<style lang="less" scoped>
img{
    height: 140px;
    width: 100vw;
    display: block;
}
</style>
