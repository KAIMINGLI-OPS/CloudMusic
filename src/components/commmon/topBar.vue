<template>
  <div id="app_topbar">
    <div id="left">
        <img class="logo" :src="uaerimge" alt="">
      <span class="aa" v-if="currentuserinfo">{{ currentuserinfo.nickname }}</span>
      <el-button type="text" @click="dialogVisable = true" v-else
        >登录</el-button
      >
      <el-dialog width="20%" title="请登录" :visible.sync="dialogVisable">
        <el-form v-bind="formData">
          <el-form-item>
            <el-input v-model="formData.phone" placeholder="手机"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="formData.password"
              type="password"
              placeholder="密码"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="confirmLogin">登录</el-button>
            <el-button type="danger">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <div id="middle"></div>
    <div id="right"></div>
  </div>
</template>
<script>
import { Login } from "../../network/login";
export default {
  data() {
    return {
      dialogVisable: false, //登录框
      formData: {
        password: "kzj2372966718",
        phone: "13479636407",
      },
      currentuserinfo: "",
      uaerimge:require("../../assets/img/logo.png")
    };
  },
  methods: {
    messageShow(message, msgtype) {
      this.$message({
        message: message,
        type: msgtype,
      });
    },
    confirmLogin() {
      this.getPhoneLogin(this.formData.phone, this.formData.password);
      console.log(this.formData.phone, this.formData.password);
    },
    getPhoneLogin(phone, password) {
      Login(phone, password).then((res) => {
        console.log(res);
        if (res === undefined) {
          this.dialogVisable = true;
           this.messageShow("登录失败！","error");
           return;
        }
        if(res.code!==200)
        {
            this.dialogVisable=true;
            this.messageShow(res.message,"success");
            return;
        }
        //存储用户信息
        window.localStorage.setItem(
          "currentuseinfo",
          JSON.stringify(res.profile)
        );
        this.currentuserinfo = res.profile;
        this.messageShow("成功登录！","success");
        this.uaerimge=res.profile.avatarUrl;
        console.log(res.profile.avatarUrl);
        this.dialogVisable=false;
      });
    },
  },
};
</script>
<style scoped>
#app_topbar {
  width: 100%;
  height: 120px;
  background-color: #f73131;
  padding-top: 20px;
}
#btn_login {
  color: white;
}
#left {
  width: 100px;
  height: 40px;
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
}
#custom {
  width: 10px;
}
.logo{
    width: 30px;
    float: left;
    border-radius: 50%;
}


</style>
