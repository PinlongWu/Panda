<template>
    <div>
         <!-- 导航 -->
        <div class="Home-nav">
            <div class="recommend" @click="recommendclick">今日推荐</div>
            <div class="xian"></div>
            <van-tabs v-model='activeName' background="#fdde4a" :ellipsis="false">
                <van-tab v-for="(item,index) in title" :title="item.name" :name='item.id' :key="index" :to="{ name: 'girl', params: { id: item.id }}"></van-tab>
            </van-tabs>
            <div class="iconnav" @click="iconnav"><van-icon name="wap-nav" size="5vh"/></div>
        </div>
        <div class="float-tabs" ref="tabsooo" style="display:none">
            <div class="float-tabs-sou">
                    <div class="float-tabs-lei">全部分类</div>
                    <div class="float-tabs-cha" @click="tabsnone">x</div>
            </div>
            <ul>
                <li v-for="items in tabs" :key="items.id" class="float-tabs-lis">
                    <div class="float-tabs-div">
                        <img :src="items.imageUrl"/>
                        <div class="float-tabs-text">{{items.name}}</div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="none"></div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      title: [{ name: '女装', id: 2 }, { name: '男装', id: 5 }, { name: '美妆护肤', id: 3 }, { name: '配饰', id: 4 }, { name: '女鞋', id: 13 }, { name: '男鞋', id: 19 }, { name: '零食', id: 10 }, { name: '内衣袜子', id: 16 }, { name: '母婴用品', id: 24 }, { name: '箱包', id: 14 }, { name: '个人洗护', id: 15 }, { name: '数码家电', id: 12 }, { name: '成人用品', id: 17 }],
      activeName: parseInt(this.$route.params.id) || 2,
      tabs: []
    }
  },
  mounted () {
    console.log(this.$route)
    this.gridsjs()
  },
  methods: {
    recommendclick () {
      this.$router.push('/recommend')
    },
    iconnav () {
      this.$refs.tabsooo.style.display = 'block'
    },
    tabsnone () {
      this.$refs.tabsooo.style.display = 'none'
    },
    async gridsjs () {
      const { data: tablist } = await this.$http.get('http://www.xiongmaoyouxuan.com/api/tabs?sa=')
      //   console.log(tablist.data.list)
      this.tabs = tablist.data.list
    }
  }
}
</script>
<style lang="less" scoped>
.Home-nav{
    width: 100vw;
    background-color: #fdde4a;
    display: flex;
    position: fixed;
    top: 9.9vh;
    z-index: 100;
    .recommend{
        width: 18vw;
        padding-top: 1.5vh;
        margin-left: 5vw;
    }
    .xian{
        border-right: 1px solid black;
        height: 5vh;
        margin: 1vh 1vh 0 1vh;
    }
    .van-tabs{
        width: 63vw;
        flex: 1;
    }
    .iconnav{
        z-index: 100;
        width: 10vw;
        margin-top: 0.7vh;
    }
}
.float-tabs{
    width: 100vw;
    height: 62vh;
    background: #fff;
    z-index: 1000;
    position: absolute;
    top: 10vh;
    border-bottom: 4vh solid #e2d7d7;
    .float-tabs-sou{
        height: 5vh;
        background: #fdde4a;
        line-height: 5vh;
        position: relative;
        .float-tabs-lei{
            text-align: center;
            color: #877a73;
            font-size: 2vh;
            font-weight: 500;
        }
        .float-tabs-cha{
            position: absolute;
            top: 0vh;
            right: 4vw;
            font-size: 3vh;
            color: #877a73;
        }
    }
    ul{
        width: 100%;
        height: 100%;
        padding-left: 2vh;
        .float-tabs-lis{
            width: 22vw;
            float: left;
            margin: 0 2vh;
            margin: 0 1vh 1vh 0;
            .float-tabs-div{
                width: 100%;
                height: 100%;
                text-align: center;
                img{
                    width: 20vw;
                    height: 10vh;
                }
                .float-tabs-text{
                    font-size: 1vh;
                    color: #877a73;
                }
            }
        }
    }
}
.none{
    margin-top: 16vh;
}
</style>
