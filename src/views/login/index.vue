<template>
  <div class="login">
    <el-card class="login-card">
      <div class="logo">
        <img src="../../assets/logo_index.png" alt="" />
      </div>
      <!-- 表单 -->
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        style="margin-top: 20px"
      >
        <el-form-item prop="mobile">
          <el-input
            v-model="loginForm.mobile"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="loginForm.code"
            placeholder="请输入验证码"
            style="width: 280px"
          ></el-input>
          <el-button style="float: right">发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="check">
          <el-checkbox v-model="loginForm.check"
            >我已阅读并同意用户协议和隐私条款</el-checkbox
          >
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login" style="width: 100%"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    const validator = function (rule, value, callback) {
      if (value) {
        callback();
      } else {
        callback(new Error("必须同意"));
      }
    };
    return {
      loginForm: {
        mobile: "",
        code: "",
        check: false,
      },
      loginRules: {
        mobile: [
          {
            required: true, //必填
            message: "手机号不能为空",
          },
          {
            pattern: /^1[23456789]\d{9}$/,
            message: "手机号格式不正确",
          },
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码格式不正确",
          },
        ],
        check: [
          {
            validator,
          },
        ],
      },
    };
  },
  methods: {
    login() {
      this.$refs.loginForm.validate(isOK=>{
        if(isOK){
          this.$http({
            url:'/authorizations',
            method:'post',
            data:this.loginForm
          }).then(result=>{
            console.log(result);
            window.localStorage.setItem('user-token',result.data.token);
            this.$router.push('/');
          })
        }else{
          alert('发送失败');
        }
      })
    },
  },
};
</script>

<style lang="less">
.login {
  background-image: url("../../assets/login_bg.jpg");
  height: 100vh;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-card {
    width: 440px;
    height: 340px;
    .logo {
      text-align: center;
      img {
        height: 40px;
      }
    }
  }
}
</style>