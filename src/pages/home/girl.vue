<template>
    <div>
        <div class="none"></div>
        <BarList />
        <BaseList :httpParams='httpParams'/>
    </div>
</template>
<script>
import BaseList from '../../components/base/BaseList'
import BarList from '../../components/base/BarList'
export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { BaseList, BarList },
  data () {
    return {
      httpParams: {
        url: `http://www.xiongmaoyouxuan.com/api/tab/${this.$route.params.id}?start=`,
        type: 'feeds',
        id: this.$route.params.id
      }
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.params.id !== from.params.id) {
        this.httpParams = {
          url: `http://www.xiongmaoyouxuan.com/api/tab/${to.params.id}?start=`,
          type: 'feeds',
          id: to.params.id
        }
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
