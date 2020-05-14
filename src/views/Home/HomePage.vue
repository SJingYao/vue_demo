<template>
  <div>
    <h2>首页</h2>
  </div>
</template>

<script>
import { getFileImg } from '@/api/getData'
export default {
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
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
      readFile.onload = e => {
        console.log(e.target.result)
        this.imgSrc = e.target.result
      }
    }
  }
}
</script>

<style scoped>
</style>
