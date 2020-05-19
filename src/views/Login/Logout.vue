<template>
  <div>
    <span class="logout" @click="logout()">
      <i class="iconfont icon-dengchu"></i>
      <span>退出</span>
    </span>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      sessionStorage.removeItem('authorization-token')
      sessionStorage.removeItem('loginName')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped lang="scss">
.logout {
  display: block;
  width: 60px;
  height: 60px;
  cursor: pointer;
  .icon-dengchu {
    font-size: 28px;
  }
}
.logout:hover {
  animation: identifier 1s linear;
  // infinite
}
@keyframes identifier {
  0% {
    font-weight: bold;
    color: red;
    transform: rotate(30deg);
  }
  30% {
    font-weight: bold;
    color: #409eff;
    transform: rotate(-30deg);
  }
  50% {
    font-weight: bold;
    transform: rotate(30deg);
  }
  100% {
    font-weight: bold;
    transform: rotate(-30deg);
  }
}
</style>
