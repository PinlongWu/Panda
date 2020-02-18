<template>
    <div>
        <div class="none"></div>
        <BaseList :httpParams='httpParams'/>
    </div>
</template>
<script>
import BaseList from '../../components/base/BaseList'
export default {
  components: { BaseList },
  data () {
    return {
      httpParams: {
        url: 'http://www.xiongmaoyouxuan.com/api/tab/2?start=',
        type: 'feeds'
      }
    }
  }
}
</script>
<style lang="less" scoped>
.none{
    margin-top: 16vh;
}
</style>
