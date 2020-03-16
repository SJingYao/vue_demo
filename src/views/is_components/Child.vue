<template>
  <div>
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column prop="goods_name" label="名称" width></el-table-column>
      <el-table-column prop="goods_price" label="单价" width="180"></el-table-column>
      <el-table-column prop="goods_vip_price" label="会员价"></el-table-column>
    </el-table>
    <el-button type="success" @click="gotoParentsPage()">点击向父组件传值</el-button>
    <el-button type="success" @click="getParentsVal()">获取父组件传的值</el-button>
    <el-button type="warning" @click="gotoTwoPage()">点击向第二个子组件传值</el-button>
    <el-button type="warning" @click="getTwoVal()">获取第二个子组件传的值</el-button>
  </div>
</template>

<script>
import eventBus from '../../eventbus'
export default {
  // 'val1', 'val2',
  props: ['val3'],
  data() {
    return {
      tableData: [],
      isparam1:
        '新华社北京3月6日电 中共中央总书记、国家主席、中央军委主席习近平6日在京出席决战决胜脱贫攻坚座谈会并发表重要讲话。他强调，到2020年现行标准下的农村贫困人口全部脱贫，是党中央向全国人民作出的郑重承诺，必须如期实现。这是一场硬仗，越到最后越要紧绷这根弦，不能停顿、不能大意、不能放松。各级党委和政府要不忘初心、牢记使命，坚定信心、顽强奋斗，以更大决心、更强力度推进脱贫攻坚，坚决克服新冠肺炎疫情影响，坚决夺取脱贫攻坚战全面胜利，坚决完成这项对中华民族、对人类都具有重大意义的伟业。',
      isparam2: [23, 45, 6, 8, 95],
      isdat: ''
    }
  },
  mounted() {
    // console.log('子组件输出父组件传的值：', this.val1)
    // console.log('子组件输出父组件传的值：', this.val2)
    // console.log('子组件输出父组件传的值：', this.val3)
    this.getData()
    eventBus.$on('comeFromTwo', function(isparam) {
      console.log('在第一个子组件中输出 第二个子组件传的值--》》》', isparam)
    })
  },
  methods: {
    getTwoVal() {
      eventBus.$on('comeFromTwo', function(isparam) {
        console.log('在第一个子组件中输出 第二个子组件传的值--》》》', isparam)
      })
    },
    async getData() {
      let { data: data } = await this.axios.post('/detail')
      this.tableData = data.responseData
    },
    async gotoParentsPage() {
      let { data: data } = await this.axios.post('/detail')

      this.$emit('comeFromChild', data.responseData)
    },
    getParentsVal() {
      console.log('子组件输出父组件传的值：', this.val3)
    }
  },
  beforeDestroy() {
    eventBus.$off('comeFromTwo')
  }
}
</script>
