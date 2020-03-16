<template>
  <div class="home">
    <h1>Welcome to Home</h1>
    <div>
      <img alt="Vue logo" src="../assets/logo.png" />
    </div>
    <el-button type="primary" @click="gotoParent()">转到指定的父组件</el-button>
    <el-button type="primary" @click="gotoChild()">转到指定的子组件</el-button>
    <el-button type="success" @click="gotoInterview(0)">转到面试题1</el-button>
    <el-button type="success" @click="gotoInterview(1)">转到面试题2</el-button>
    <!-- <router-link to="/home/interview1">面试题1</router-link>
    <router-link to="/home/interview2">面试题2</router-link>-->
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  data() {
    return {}
  },
  mounted() {},
  methods: {
    gotoInterview(isFlag) {
      isFlag == 0
        ? this.$router.push('/interview1')
        : this.$router.push('/interview2')
    },
    gotoParent() {
      this.$router.push('/parent')
    },
    gotoChild() {
      this.$router.push('/child')
    }
  },
  created() {}
}
</script>
