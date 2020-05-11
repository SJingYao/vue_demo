<template>
  <div>
    <h1>面试题2</h1>
    <el-row :gutter="20">
      <el-col :span="12">
        <h2 style="text-align: left">问题2</h2>
        <el-card>
          <el-form
            ref="ruleForm"
            :label-position="labelPosition"
            label-width="80px"
            :model="formLabelAlign"
          >
            <!-- 循环创建表单项 -->
            <div
              v-for="(item,index) in formLabelAlign.data"
              :key="index"
              class="clearfix form-item"
            >
              <el-col :span="10">
                <el-form-item label label-width="10" :prop="`data.${index}.text`" :rules="rules.text">
                  <span>文本:</span>
                  <el-input class="input-width" v-model="item.text"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="10">
                <el-form-item label label-width="10" :prop="`data.${index}.probability`" :rules="rules.probability">
                  <span>概率:</span>
                  <el-input class="input-width" v-model.number="item.probability"></el-input>
                  <span>%</span>
                </el-form-item>
              </el-col>
              <el-col :span="4" class="text-right">
                <i type="primary" class="el-icon-error" @click="delItem(index)"></i>
              </el-col>
            </div>
          </el-form>
          <div>
            <el-button @click="addItem()" style="width: 100%">
              <i class="el-icon-circle-plus"></i>
              新增
            </el-button>
          </div>
          <div style="margin-top: 15px;" class="text-left">
            <el-button type="primary" @click="saves()">保存</el-button>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <h2 class="text-left">代码预览窗</h2>
        <el-card>
          <el-input type="textarea" v-model="codeReview" :rows="10"></el-input>
          <div style="margin-top: 15px;" class="text-right">
            <el-button type="primary" @click="edits()">编辑</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      /**
       * 表单中label的位置
       */
      labelPosition: 'right',
      /**
       * 表单数据对象，此处由于需要动态添加表单项，所以需要写成这样的数据结构
       */
      formLabelAlign: {
        data: [
          {
            text: '',
            probability: 0.00
          }
        ]
      },
      /**
       * 代码预览窗
       */
      codeReview: '',
      PercentageCalculation: 100,
      /**
       * 表单校验
       */
      rules: {
        text: [
          { required: true, message: '请输入文本值', trigger: 'blur'},
        ],
        probability: [
          { required: true, message: '请输入概率值', trigger: ['blur', 'change'] },
        ]
      }
    }
  },
  methods: {
    addItem() {
      /**
       * 向表单数据中追加一项
       */
      this.formLabelAlign.data.push({
        text: '',
        probability: 0.00
      })
      /**
       * 调用平均分配概率比的函数
       */
      this.divideEqually()
    },
    /**
     * @MethodAuthor:  Yao
     * @MethodDescription: 方法名描述
     * @param {*} currentIndex 当前item项的索引
     * @return {*} *
     * @Date: 2020-03-16
     */
    delItem(currentIndex) {
      if (this.formLabelAlign.data.length == 1) {
        this.$confirm('至少保留一项！', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
      } else {
        this.$confirm('确定要删除当前项吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          /**
           * 截取删除当前项数据
           */
          // this.formLabelAlign.data = 
          this.formLabelAlign.data.splice(
            currentIndex,
            1
          )
          /**
           * 调用平均分配概率比的函数
           */
          this.divideEqually()
        }).catch(() => {
          return false
        })
      }
    },
    saves() {
      let isData = this.formLabelAlign.data
      /**
       * 调用函数校验概率总和
       */
      let percentage = this.checkPercentage(isData)
      console.log(percentage)
      if (percentage == 100) {
        this.$refs['ruleForm'].validate(valid => {
          if (valid) {
            /**
             * 如果概率总和等于100且 表单通过校验 将左侧表单中的数据解析为JSON字符串格式赋值给右侧代码块
             */
            this.codeReview = JSON.stringify(isData)
            /**
             * 重置form表单并将form中的项重置为只有一个
             */
            this.$refs.ruleForm.resetFields()
            this.formLabelAlign.data.length = 1
          } else {
            this.$confirm('请将内容填写完整', '提示', {
              confirmButtonText: '确定',
              type: 'warning'
            })
            return false
          }
        })
      } else {
        this.$confirm('概率总和需要等于100%，请重新填写', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
      }
    },
    edits() {
      /**
       * 获取代码预览窗中的数据
       */
      let isCode = this.codeReview
      /**
       * 调用校验JSON格式的方法校验代码预览窗中的数据
       */
      let res = this.isJSON(isCode)
      if (res) {
        /**
         * 校验通过后将 代码预览窗中的数据解析为JSON对象，并调用校验概率总和的方法校验概率总和
         */
        // let percentage = this.checkPercentage(JSON.parse(this.codeReview))
        let resData = JSON.parse(this.codeReview)
        let percentage = this.checkPercentage(resData)
        if (percentage == 100) {
          /**
           * 如果概率总和等于100，则将解析好的数据赋值给左侧form表单数据对象
           * 至此表单数据渲染完成
           */
          this.formLabelAlign.data = resData
          /**
           * 根据需求来设定，渲染完表单数据之后是否清空右侧代码预览窗
           */
          // this.codeReview = ''
        } else {
          this.$confirm('概率总和需要等于100%，请重新填写', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          })
        }
      }
    },
    /**
     * @MethodAuthor:  Yao
     * @MethodDescription: 平均分配概率
     * @param {*} * *
     * @return {*} *
     * @Date: 2020-03-16
     */
    divideEqually(){
      this.formLabelAlign.data.map(item => {
        item.probability = (
          this.PercentageCalculation / this.formLabelAlign.data.length
        ).toFixed(2)
      })
    },
    /**
     * @MethodAuthor:  Yao
     * @MethodDescription: 校验概率
     * @param {*} data 表单数据
     * @return {Number} 概率值
     * @Date: 2020-03-16
     */
    checkPercentage(data) {
      let percentage = 0
      /**
       * 计算概率之和
       */
      for (var i = data.length; i--; ) {
        percentage += parseFloat(data[i].probability)
      }
      return percentage
    },
    /**
     * @MethodAuthor:  Yao
     * @MethodDescription: 校验字符串是否符合JSON格式
     * @param {*} str 字符串
     * @return {*} *
     * @Date: 2020-03-16
     */
    isJSON(str) {
      if (typeof str == 'string') {
        try {
          var obj = JSON.parse(str)
          if (typeof obj == 'object' && obj) {
            return true
          } else {
            return false
          }
        } catch (e) {
          console.log('error：' + str + '!!!' + e)
          return false
        }
      }
      console.log('It is not a string!')
    }
  }
}
</script>

<style scoped lang="scss">
.text-left {
  text-align: left;
}
.text-right {
  text-align: right;
  .el-icon-error {
    cursor: pointer;
    font-size: 22px;
  }
}
.el-icon-circle-plus {
  cursor: pointer;
  font-size: 18px;
}
.el-form-item {
  margin: 0;
}
.form-item {
  padding: 10px;
  margin-bottom: 15px;
  border-bottom: 1px dashed #ccc;
  box-sizing: border-box;
}
.input-width {
  width: 80px;
}
.el-textarea {
  font-size: 18px;
}
</style>
