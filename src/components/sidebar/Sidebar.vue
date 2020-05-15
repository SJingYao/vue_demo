<template>
  <div>
    <el-menu
      router
      class="el-menu-vertical-demo"
      default-active="/homePage"
      @open="handleOpen"
      @close="handleClose"
      :collapse="$store.state.isCollapse"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      active-background-color="#434a50"
    >
      <el-menu-item index="/homePage">
        <i class="el-icon-s-home"></i>
        <span>首页</span>
      </el-menu-item>
      <el-submenu :index="`${k}`" v-for="(items,k) in routeData" :key="k">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>My Demo</span>
        </template>
        <el-menu-item-group v-for="(item,i) in routeData[k].children" :key="i">
          <el-menu-item :index="item.path">{{ item.name }}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import routeData from '@/config/menu-config.js'
export default {
  data() {
    return {
      // 路由
      routeData
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>
.el-menu{
  border: none;
}
</style>
