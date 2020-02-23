<template>
    <div>
        <!-- 头部header -->
        <div class="head">
            <div class="title">{{_.get(headurl,'data.share.title')}}</div>
            <div class="return" @click="goreturn">
                <van-icon name="arrow-left" />
                <span>返回</span>
            </div>
        </div>
        <!-- 标签页 -->
        <div class="tabs">
            <div class="home" @click="homehttp(Deletevalue)">{{Deletevalue.name}}</div>
            <div class="xian"></div>
            <van-tabs @click="onClick" swipeable background="#fdde4a" :ellipsis="false" color="#6b4c10">
                <van-tab v-for="item in _.get(headurl,'data.subColumns')" :key="item.id" :name='item.id'  :title="item.name"></van-tab>
            </van-tabs>
        </div>
        <BaseList :httpParams='httpParams'/>
    </div>
</template>
<script>
import BaseList from '../base/BaseList'
export default {
  components: {
    BaseList
  },
  data () {
    return {
      headurl: [],
      Deletevalue: {},
      httpParams: {}
    }
  },
  mounted () {
    this.httpSpecial()
  },
  methods: {
    async httpSpecial () {
      const { data: res } = await this.$http.get(`http://www.xiongmaoyouxuan.com/api/column/${this.$route.query.port}`)
      const Delete = res.data.subColumns.shift(0, 1)
      this.Deletevalue = Delete
      console.log(this.Deletevalue)
      this.httpParams = {
        url: `http://www.xiongmaoyouxuan.com/api/sub_column/${this.Deletevalue.id}/items?start=`,
        type: 'fiil'
      }
      this.headurl = res
    },
    goreturn () {
      this.$router.go(-1)
    },
    onClick (name) {
      this.httpParams = {
        url: `http://www.xiongmaoyouxuan.com/api/sub_column/${name}/items?start=`,
        type: 'fiil'
      }
      console.log(this.Deletevalue.id)
    },
    homehttp (val) {
      this.httpParams = {
        url: `http://www.xiongmaoyouxuan.com/api/sub_column/${val.id}/items?start=`,
        type: 'fiil'
      }
    }
  }
}
</script>
<style lang="less" scoped>
.head{
    width: 100vw;
    height: 6vh;
    background: #fdde4a;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .title{
        font-weight: 600;
    }
    .return{
        position: absolute;
        top: 1.7vh;
        left: 3vw;
        .van-icon{
            vertical-align: -16%;
        }
    }
}
.tabs{
    display: flex;
    background: #fdde4a;
    .home{
        float: left;
        width: 14vw;
        line-height: 6.6vh;
        text-align: center;
        font-size: 2.4vh;
        background: #fdde4a;
    }
    .xian{
        width: 1px;
        height: 4vh;
        background: black;
        margin-top: 1.3vh;
        margin-right: 2vw;
    }
    .van-tabs{
        flex: 1;
    }
}
</style>
