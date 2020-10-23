<template>
  <div class="login">
    <div class="first">
      登录
      <div v-show="err_msg">账号或密码输入错误！</div>
    </div>
    <el-input
      style="margin-bottom: 16px"
      placeholder="账号"
      v-model="uname"
      clearable
    ></el-input>
    <el-input
      style="margin-bottom: 16px"
      placeholder="密码"
      v-model="upwd"
      show-password
    ></el-input>
    <el-checkbox style="margin-bottom: 20px" v-model="checked"
      >记住密码</el-checkbox
    >
    <div style="text-align: center">
      <el-button
        @click="login"
        style="width: 50%; font-size: 14px"
        type="primary"
        :disabled="!test"
        size="small"
        >登录</el-button
      >
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      uname: "",
      upwd: "",
      test: false,
      checked: true,
      err_msg: false, //错误提示
    };
  },
  mounted(){
    this.uname=localStorage.getItem('uname')||'',
    this.upwd=localStorage.getItem('upwd')||''
  },
  watch: {
    uname() {
      if (this.uname.trim() !== "" && this.upwd.trim() !== "") {
        this.test = true;
      }
    },
    upwd() {
      if (this.uname.trim() !== "" && this.upwd.trim() !== "") {
        this.test = true;
      }
    },
  },
  methods: {
    login() {
      if (this.uname.trim() == "极客移动" && this.upwd.trim() == 123456) {
        if (this.checked == true) {
          localStorage.setItem("uname", this.uname);
          localStorage.setItem("upwd",this.upwd);
        }else{
          localStorage.removeItem("uname");
          localStorage.removeItem("upwd");
        }
        this.err_msg == false;
        this.$message({
          message: "登录成功",
          type: "success",
        });
        this.$router.push("/index");
      } else {
        this.err_msg = false;
        setTimeout(() => {
          this.err_msg = true;
        }, 100);
      }
    },
  },
};
</script>
<style scoped>
.login {
  position: fixed;
  width: 364px;
  height: 285px;
  padding: 24px 32px;
  box-sizing: border-box;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  border-radius: 6px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.login .first {
  text-align: center;
  font-size: 16px;
  line-height: 22px;
  font-weight: 400;
  margin-bottom: 24px;
  position: relative;
}
.login .first > div {
  position: absolute;
  left: 12px;
  bottom: -25px;
  font-size: 12px;
  color: #f55;
}
</style>