<template>
  <el-form :model="userInfo" :rules="rules" ref="ruleForm" class="form">
    <el-form-item prop="username">
      <el-input v-model="userInfo.username" placeholder="用户名/手机"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="userInfo.password" type="password" placeholder="密码"></el-input>
    </el-form-item>
    <p class="form-text">
      <nuxt-link to="#">忘记密码</nuxt-link>
    </p>
    <el-form-item>
      <el-button class="submit" type="primary" @click="submitForm">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        username: "13800138000",
        password: "123456"
      },
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm() {
      //   console.log(this.userInfo);
      // this.$axios({
      //     method : 'post',
      //     url : '/accounts/login',
      //     data : this.userInfo
      // }).then(res=>{
      //     // console.log(res);
      //     通过commit调用mutations中的方法
      //     this.$store.commit('user/setUserInfo',res.data)
      // })
      // el-form都有一个validate的方法用于验证的
      this.$refs.ruleForm.validate(valid => {
          // 参数也是返回值，结果是true或false
        if (valid) {
          // 通过commit调用actions中的方法
          this.$store.dispatch("user/login", this.userInfo).then(() => {
            this.$message.success("登录成功");
            // this.$router.push("/");
            this.$router.replace(this.$route.query.returnUrl || '/')
          });
        } else {
          this.$message.error("请正确输入账号或密码");
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>