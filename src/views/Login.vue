<template>
  <div>
    <el-card id="loginPage">
      <div class="login-logo">
        <h2>Login</h2>
        <!-- <img src="./assets/img/loginLogo.png" alt="" /> -->
      </div>
      <div class="login-form">
        <el-form
          :model="loginRuleForm"
          :rules="loginRules"
          ref="loginRuleForm"
        >
          <el-form-item
            label="用户名:"
            prop="isname"
            class="login-item"
          >
            <el-input
              v-model="loginRuleForm.isname"
              name="name"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="密码:"
            prop="ispsw"
            class="login-item"
          >
            <el-input
              v-model="loginRuleForm.ispsw"
              name="password"
              placeholder="请输入密码"
              @keyup.enter.native="logins()"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="login-handles">
          <el-button
            type="primary"
            @click="logins()"
          >登录</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import http from '../api/api'

export default {
  data () {
    return {
      loginRuleForm: {
        isname: '',
        ispsw: ''
      },
      loginRules: {
        isname: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        ispsw: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  created () {
    // sessionStorage.removeItem('authorization-token')
  },
  methods: {
    logins () {
      this.$refs['loginRuleForm'].validate(async valid => {
        if (valid) {
          let requestData = {
            name: this.loginRuleForm.isname,
            password: window.btoa(
              window.encodeURIComponent(this.loginRuleForm.ispsw)
            )
          }
          // this.axios.post('/logins', requestData).then((data) => { 
          //   console.log('then:',data)
          // })
          let { data: data } = await this.axios.post('/logins', requestData)
          if (data.code === 200) {
            this.$message.success('欢迎回来')
            sessionStorage.setItem('authorization-token', data.token)
            this.$router.push('/home')
          } else {
            this.$message.error(data.message)
          }
        } else {
          this.$message.error('请将登录信息填写完整！')
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.el-card /deep/ .el-card__body {
  padding: 0;
}
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
}
#loginPage {
  width: 600px;
  position: absolute;
  left: 50%;
  top: 10%;
  margin-left: -300px;
  /* margin: 0 auto; */
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 2px 1px 20px 2px #cfe0fc;
  opacity: 0.8;
  .el-form,
  .login-handles {
    /* width: 80%; */
    margin: 0 auto;
    text-align: center;
  }
  .login-logo {
    width: 100%;
    height: 55px;
    line-height: 55px;
    /* margin-bottom: 30px; */
    text-align: center;
    background-color: rgb(18, 187, 131);
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
    color: #fff;
    img {
      width: 60px;
      height: 100%;
    }
  }
  .login-form {
    padding: 30px;
  }
  .el-input {
    width: 80%;
    height: 40px;
    // text-indent: 0.2em;
    // border-radius: 5px;
    // border: 1px solid #a6c7ff;
  }
  .login-item {
    margin-bottom: 30px;
  }
  /deep/ .el-form-item__label {
    width: 100px;
    text-align: right;
    font-size: 18px;
    font-weight: bold;
  }
  .login-handles .el-button {
    color: #fff;
    background-color: rgb(18, 187, 131);
    border: none;
  }
}
.el-input {
  font-size: 18px;
}
</style>
