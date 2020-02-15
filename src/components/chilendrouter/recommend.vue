<template>
    <div>
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(item,index) in info" :key="index">
                <img v-lazy="item" />
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
      const { data: res } = await this.$http.get('/play')
      console.log(res)
      this.info = res
    }
  }
}
</script>
<style lang="less" scoped>
img{
    height: 30vh;
    width: 100vw;
}
</style>
