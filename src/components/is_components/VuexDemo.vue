<template>
  <div>
    <div>
      <h1>vuex</h1>
      <!-- <el-button @click="getData()">获取store中的数据</el-button> -->
      <el-input placeholder="请输入内容" v-model="$store.state.count" class="input-count">
        <el-button slot="prepend" @click="$store.commit('subtractCount')" icon="el-icon-remove-outline"></el-button>
        <el-button slot="append" @click="$store.commit('addCount')" icon="el-icon-circle-plus-outline"></el-button>
      </el-input>
    </div>
    <el-select v-model="value11" @change="getChangeData(value)" placeholder="请选择">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value11: ''
    }
  },
  methods: {
    getChangeData(val) {
      console.log(this.value11)
      let currentLabel = this.options.find((item, i) => {
        return item.value == val
      })
      console.log('currentLabel:::', currentLabel)
    },
    getData() {
      console.log(this.$store)
      console.log('vuex中的数据', this.$store.state.count)
    }
  }
}
</script>

<style scoped>
.input-count{
  width: 30%;
}
</style>
