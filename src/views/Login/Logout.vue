<template>
  <div>
    <span class="logout" @click="logout()">
      <i class="iconfont icon-dengchu"></i>
      <span>登出</span>
    </span>
  </div>
</template>

<script>
export default {
  methods: {
    logout(){
      sessionStorage.removeItem('authorization-token')
      sessionStorage.removeItem('loginName')
      this.$router.push('/login')
    }
  },
}
</script>

<style scoped>
.logout{
  cursor: pointer;
}
.icon-dengchu{
  font-size: 22px;
}
</style>
