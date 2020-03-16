<template>
  <div style="margin: 50px 0;">
    <h1>第二个子组件</h1>
    <el-button type="warning" @click="gotoOnePage()">点击向第一个子组件传值</el-button>
    <el-button type="warning" @click="getOneVal()">点击获取第一个子组件传过来的值</el-button>
  </div>
</template>

<script>
import Bus from '../../eventbus'
export default {
  data() {
    return {
      isStatement:
        '（一）坚持党对一切工作的领导。党政军民学，东西南北中，党是领导一切的。必须增强政治意识、大局意识、核心意识、看齐意识，自觉维护党中央权威和集中统一领导，自觉在思想上政治上行动上同党中央保持高度一致，完善坚持党的领导的体制机制，坚持稳中求进工作总基调，统筹推进“五位一体”总体布局，协调推进“四个全面”战略布局，提高党把方向、谋大局、定政策、促改革的能力和定力，确保党始终总揽全局、协调各方。'
    }
  },
  methods: {
    gotoOnePage() {
      Bus.$emit('comeFromTwo', this.isStatement)
    }
  }
}
</script>
