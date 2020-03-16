<template>
  <div>
    <h1>父组件</h1>
    <el-button type="primary" @click="gotoChild()">转到指定的子组件</el-button>
    <el-button type="primary" @click="gotoVal()">向子组件创智</el-button>
    <ochild :val3="isdata" @comeFromChild="getcomeFromChild" />
    <!-- val1="这是传到子组件的第一个值"
    val2="这是传的第二个值"-->
    <ochild2 />
  </div>
</template>

<script>
import ochild from './Child'
import ochild2 from './Child2'
export default {
  components: {
    ochild: ochild,
    ochild2: ochild2
  },
  data() {
    return {
      tableData: [],
      isdata: {
        name: '王小熊'
      }
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      let { data: data } = await this.axios.post('/detail')
      this.tableData = data.responseData
    },
    gotoChild() {
      this.$router.push('/child')
    },
    getcomeFromChild(val) {
      console.group('父组件接收到的值：-->>>')
      console.log(val)
    },
    gotoVal() {
      this.isdata = {
        name: '王大虎'
      }
      console.log(this.isdata)
    }
  }
}
</script>
