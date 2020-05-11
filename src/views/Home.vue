<template>
  <div class="home">
    <h1>Welcome to Home</h1>
    <div>
      <img alt="Vue logo" src="../assets/logo.png" />
    </div>
    <div>
      <el-button type="success" @click="gotoInterview(0)">转到面试题1</el-button>
      <el-button type="success" @click="gotoInterview(1)">转到面试题2</el-button>
      <el-button type="primary" plain @click="gotoTable()">转到表格Table</el-button>
      <el-button type="success" @click="getImg()">点击下载文件</el-button>
      <el-button type="primary" @click="gotoVuex()">转到VUEX Demo</el-button>
    </div>
    <div>
      <img :src="imgSrc" alt="" />
    </div>
  </div>
</template>

<script>
import { getFileImg } from '../api/getData'
export default {
  name: 'Home',
  components: {},
  data() {
    return {
      imgSrc: ''
    }
  },
  mounted() {},
  methods: {
    gotoVuex(){
      this.$router.push('/VuexDemo')
    },
    async getImg() {
      let res = await getFileImg()
      var a = document.createElement('a')
      // download属性必须写
      // a.download = 'a.jpg'
      // var href = URL.createObjectURL(res.data)
      // a.href = href
      // document.body.appendChild(a)
      // a.click()
      // document.body.removeChild(a)

      // 如果需要回显可以写一下代码
      var readFile = new FileReader()
      readFile.readAsDataURL(res.data)
      readFile.onload = (e) => {
        console.log(e.target.result)
        this.imgSrc = e.target.result
      }
    },
    gotoTable() {
      this.$router.push('/table')
    },
    gotoInterview(isFlag) {
      isFlag == 0
        ? this.$router.push('/interview1')
        : this.$router.push('/interview2')
    },
  },
  created() {}
}
</script>
