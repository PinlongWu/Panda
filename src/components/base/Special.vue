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
                <van-tab v-for="(item, index) in _.get(headurl,'data.subColumns')" :key="item.id" :name="item.id+'&'+index"  :title="item.name"></van-tab>
            </van-tabs>
        </div>
        <div v-if="this.$route.query.type">
          <div class="title-update">
            <div class="crowntitle">
              <img src="../../assets/crown.png"/>
              <span>{{this.subColumns[this.currentIndex].name}}</span>
            </div>
            <div>{{_.get(this.subColumns[this.currentIndex],'desc')}}</div>
          </div>
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
      subColumns: [],
      httpParams: {},
      currentIndex: 0
    }
  },
  mounted () {
    this.httpSpecial()
    console.log(this.$router)
  },
  methods: {
    async httpSpecial () {
      const { data: res } = await this.$http.get(`http://www.xiongmaoyouxuan.com/api/column/${this.$route.query.port}`)
      this.subColumns = [...res.data.subColumns]
      const Delete = res.data.subColumns.shift(0, 1)
      this.Deletevalue = Delete
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
      name = name.split('&')
      this.httpParams = {
        url: `http://www.xiongmaoyouxuan.com/api/sub_column/${parseInt(name[0])}/items?start=`,
        type: 'fiil'
      }
      this.currentIndex = parseInt(name[1]) + 1
    },
    homehttp (val) {
      this.httpParams = {
        url: `http://www.xiongmaoyouxuan.com/api/sub_column/${val.id}/items?start=`,
        type: 'fiil'
      }
      this.currentIndex = 0
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
.title-update{
  width: 100vw;
  height: 14vh;
  background: #fff;
  font-size: 1vh;
  padding: 5vw;
  box-sizing: border-box;
  color: #877a73;
  .crowntitle{
    padding-bottom: 0.5vh;
    img{
      width: 7vw;
    }
    span{
      font-weight: 600;
      font-size: 2.3vh;
    }
  }
}
</style>
