<template>
    <div>
        <Special :httpHards='httpHards'/>
        <BaseList :httpParams='httpParams'/>
    </div>
</template>
<script>
import Special from '../../components/base/Special'
import BaseList from '../../components/base/BaseList'
export default {
  components: { Special, BaseList },
  data () {
    return {
      httpHards: {
        httphead: `http://www.xiongmaoyouxuan.com/api/column/${this.$route.query.port}`
      },
      httpParams: {
        url: 'http://www.xiongmaoyouxuan.com/api/sub_column/7/items?start=0',
        type: 'fiil'
      }
    }
  },
  mounted () {
    console.log(this.$router)
  }
}
</script>
<style lang="less" scoped>

</style>
