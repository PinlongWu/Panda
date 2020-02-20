<template>
    <div class="main">
        <BaseList :httpParams='httpParams'/>
    </div>
</template>
<script>

import BaseList from '../../components/base/BaseList'
export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { BaseList },
  data () {
    return {
      httpParams: {
        url: `http://www.xiongmaoyouxuan.com/api/category/${this.$route.query.port}/items?start=`,
        type: 'feeds',
        isGirl: true
      }
    }
  }
}
</script>
<style lang="less" scoped>
   .main {
       margin-top: 16vh
   }
</style>
