<template>
  <!-- <h1>Welcome to Home</h1>
    <div>
      <img alt="Vue logo" src="../assets/logo.png" />
  </div>-->
  <el-container>
    <el-aside :width="$store.state.isCollapse ? '64px' : '200px'">
      <!-- <div class="logo">
        <img alt="Vue logo" src="../../assets/img/logo1.jpg" />
      </div> -->
      <sidebar />
    </el-aside>
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="16">
            <div class="grid-content header-text">
              <div class="switch-sidebar">
                <i
                  :class="[$store.state.isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold']"
                  @click="$store.commit('switchSideBar')"
                ></i>
              </div>
              <h2>Welcome to Vue Instance</h2>
            </div>
          </el-col>
          <el-col :span="8">
            <div>
              <el-col :span="12" :push="6">
                <weather></weather>
              </el-col>
              <el-col :span="6" :push="6">
                <logout></logout>
              </el-col>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <!-- <keep-alive> -->
        <router-view></router-view>
        <!-- </keep-alive> -->
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import sidebar from '@/components/sidebar/Sidebar'
import weather from '@/components/Weather'
import logout from '@/views/Login/Logout'
export default {
  name: 'Home',
  components: {
    sidebar,
    weather,
    logout
  },
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {},
  created() {}
}
</script>
<style lang="scss">
.el-container {
  width: 100%;
  height: 100%;
}
.el-header {
  // background-color: #66b1ff99;
  background: linear-gradient(to right bottom, white, #d6f3ff); /*渐变从左上角到右下角*/
  background: -ms-linear-gradient(to right bottom, white, #d6f3ff);
  background: -webkit-linear-gradient(to right bottom, white, #d6f3ff);
  background: -moz-linear-gradient(to right bottom, white, #d6f3ff);
  color: #333;
  line-height: 60px;
  .header-text {
    text-align: left;
  }
  h2 {
    display: inline-block;
    color: #409eff;
    user-select: none;
  }
  .switch-sidebar {
    display: inline-block;
    padding-right: 20px;
    color: #409eff;
    cursor: pointer;
    i {
      font-size: 28px;
    }
  }
}

.el-aside {
  overflow-x: hidden;
  // background-color: #cbe1f9;
  background-color: #545c64;
  color: #333;
  text-align: center;
  .logo {
    height: 60px;
    img {
      height: 100%;
    }
  }
}

.el-main {
  overflow-x: hidden;
  padding: 10px;
  background-color: #e9eef3;
  color: #333;
}

body > .el-container {
  margin-bottom: 40px;
}
</style>
