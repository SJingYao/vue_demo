<template>
  <div>
    <el-table :data="datas.tbodyData" stripe border style="width: 100%">

      <template v-for="(item, index) in datas.theadData" >
        <el-table-column :prop="item.name" :key="index" :label="item.label" width="180"></el-table-column>
      </template>

      <!-- <el-table-column prop="date" :key="index" :label="item.label" width="180"></el-table-column>
      <el-table-column prop="name1" :key="index" :label="item.label" width="180"></el-table-column>
      <el-table-column prop="address" :key="index" :label="item.label" width="180"></el-table-column> -->
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Table',
  components: {},
  data() {
    return {
      datas: {
        theadData: [
          {
            name: 'date',
            label: '日期'
          },
          {
            name: 'name1',
            label: '姓名'
          },
          {
            name: 'address',
            label: '地址'
          },
        ],
        tbodyData: [
          {
            date: '2016-05-02',
            name1: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-04',
            name1: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }
        ]
      }
    }
  },
  created() {
    this.getTableData()
  },
  methods: {
    getTableData() {
      this.axios.post('/detail/tabledata').then(data => {
        console.log(data)
      })
    }
  }
}
</script>

<style scoped>
</style>
