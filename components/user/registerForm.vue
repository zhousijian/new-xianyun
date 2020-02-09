<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户手机" v-model="form.username"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="captcha">
      <el-input placeholder="验证码" v-model="form.captcha">
        <template slot="append">
          <el-button @click="handleSendCaptcha">发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="nickname">
      <el-input placeholder="你的昵称" v-model="form.nickname"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="checkpass">
      <el-input placeholder="确认密码" type="password" v-model="form.checkpass"></el-input>
    </el-form-item>

    <el-button class="submit" type="primary" @click="handleRegSubmit">注册</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    var validateUserName = (rule, value, callback) => {
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback();
      } else {
        callback("请输入正确手机号码");
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.checkpass !== "") {
          this.$refs.form.validateField("checkpass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // 表单数据
      form: {
        username: "",
        captcha: "",
        nickname: "",
        password: "",
        checkpass: ""
      },
      // 表单规则
      rules: {
        username: [{ validator: validateUserName, trigger: "blur" }],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkpass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    // 发送验证码
    handleSendCaptcha() {
      this.$store
        .dispatch("user/captchas", { tel: this.form.username })
        .then(res => {
          // console.log(res);
          this.$message.success("验证码是:" + res.data.code);
          this.form.captcha = res.data.code;
        });
    },

    // 注册
    handleRegSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          //console.log(this.form);
          const { checkpass, ...data } = this.form;
          // console.log(data);
          this.$store.dispatch("user/registerUser", data).then(()=>{
              this.$message.success('注册成功')
              this.$router.push('/')
          })
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