<template>
  <div id="app_topbar">
    <div id="left">
      <img class="logo" :src="uaerimge" alt="" />
      <span class="aa" style="color: white" v-if="currentuserinfo">{{
        currentuserinfo.nickname
      }}</span>
      <el-button
      class="login"
        style="color: white"
        type="text"
        @click="dialogVisable = true"
        v-else
        >登录</el-button
      >
      <el-button
      class="logout"
        style="color: white"
        type="text"
        @click="getphonelogout"
        v-if="currentuserinfo"
        >退出</el-button
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
            <el-button type="danger" @click="cancleLogin">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <div class="middle" >
      <el-form v-bind="searchform">
        <el-form-item>
             <el-input v-model="searchform.input_text" placeholder="关键字" @keyup.enter.native="search"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div id="right"></div>
  </div>
</template>
<script>
import { Login, logout } from "../../network/login";
export default {
  name:"TopBar",
  data() {
    return {
      dialogVisable: false, //登录框
      formData: {
        password: "kzj2372966718",
        phone: "13479636407",
      },
      searchform:{
        input_text:'',
      },
      currentuserinfo: window.localStorage.getItem("currentuseinfo"),
      uaerimge: require("../../assets/img/logo.png"),
    };
  },
  created() {
    
    if (this.currentuserinfo) {
       var curuser= JSON.parse(this.currentuserinfo);
      this.uaerimge = curuser.avatarUrl;
    }
  },
  methods: {
    search()
    {
      console.log(this.searchform.input_text);
      if(this.searchform.input_text==="") return;
      this.$router.push('/search'+this.searchform.input_text);
    },
    messageShow(message, msgtype) {
      this.$message({
        message: message,
        type: msgtype,
      });
    },
    getphonelogout() {
      logout().then((res) => {
        console.log(res);
      });
      this.currentuserinfo = null;
      window.localStorage.setItem("currentuseinfo", "");
      this.uaerimge = require("../../assets/img/logo.png");
    },
    cancleLogin() {
      this.dialogVisable = false;
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
          this.messageShow("登录失败！", "error");
          return;
        }
        if (res.code !== 200) {
          this.dialogVisable = true;
          this.messageShow(res.message, "success");
          return;
        }
        //存储用户信息
        window.localStorage.setItem(
          "currentuseinfo",
          JSON.stringify(res.profile)
        );
        this.currentuserinfo = res.profile;
        this.messageShow("成功登录！", "success");
        this.uaerimge = res.profile.avatarUrl;
        //console.log(res.profile.avatarUrl);
        this.dialogVisable = false;
      });
    },
  },
};
</script>
<style scoped>
#app_topbar {
  width: 1380px;
  height: 120px;
  background-color: #f73131;
  padding:60px 0px 0px 20px;
  display: flex;
  
}
#btn_login {
  color: white;
}
#left {
  width: 100px;
  height: 40px;
}
.logout{
  margin-left: 10px;
}
.login{
  margin-left: 10px;
}
.middle{
  width:500px;
  margin-left: 100px;
}
#custom {
  width: 10px;
}
.logo {
  width: 30px;
  float: left;
  border-radius: 50%;
}
</style>
