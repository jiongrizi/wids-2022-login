<template>
  <el-card class="box-card" shadow="always" >
    <template #header>
      <div class="card-header clearfix text-align-center">
        <span class="font-size-20">登 录</span>
      </div>
    </template>
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="rules"
      label-position="top"
    >
      <el-form-item label="登录名" prop="user_name">
        <el-input v-model="loginForm.user_name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="user_password">
        <el-input v-model="loginForm.user_password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="图片校验码" prop="code">
        <el-row :gutter="10">
          <el-col :span="18">
            <el-input
              v-model="loginForm.code"
              @keyup.enter="onClickLogin('loginForm')"
            ></el-input>
          </el-col>
          <el-col :span="6" class="code-box">
            <img
              :src="srcCode"
              alt="图片校验码"
              class="code-img"
              @click="getCode()"
            />
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item>
        <div class="margin-2x"></div>
        <el-button
          type="primary"
          @click.prevent="onClickLogin('loginForm')"
          class="full-width"
          :loading="loading"
          >登 录</el-button
        >
        <el-row>
          
          <el-col :span="24" class="text-align-right">
            <a href="javascript:;" class="link-blue" @click="onClickForget">忘记密码</a>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import { JXAjax } from "../assets/scripts/common";

export default {
  data() {
    return {

      language: "English",
      srcCode: "",
      loading: false,
      loginForm: {
        user_name: "",
        user_password: "",
      },
    };
  },
  created(){
    this.getInit()
  },
  computed: {
    rules() {
      return {
        user_name: [{ required: true, message: '请输入您的账号', trigger: "blur" }],
        user_password: [{ required: true, message: '请输入您的密码', trigger: "blur" }],
        code: [{ required: true, message: '请输入图片校验码', trigger: "blur" }],
      };
    }
  },

  mounted() {
    
    this.getCode();
  },
  
  methods: {
    getInit() {
      var t = this;
      JXAjax(
        "get",
        "/account_init_check",
        {},
        function (response) {
          if (response.data.message && response.data.message == 'account_init_fail') {
             window.location.href = "/login.html#/register";
          } 
        },
        function () {

        },
        "no-massage"
      );
    },
    getCode() {
      var t = this;
      t.srcCode = "/captcha?" + Math.random();
      t.loginForm.code = "";
    },
    onClickLogin(loginForm) {
      var t = this;

      this.$refs[loginForm].validate((valid) => {
        if (valid) {
          t.loading = true;
          JXAjax(
            "post",
            "/login",
            t.loginForm,
            function (response) {
              t.loading = false;
              var admin = response.data.node_admin;
              var user = response.data.yun_user;
              if (admin == "true") {
                document.cookie = "node_admin = true; path=/";
              }
              if (user == "true") {
                document.cookie = "yun_user = true; path=/";
              }
              window.location.href = "/";
            },
            function () {
              t.loading = false;
              t.getCode();
            }
          );
        }
      });
    },
    onClickForget(){
      this.$alert('请直接操作数据库修改密码。', '提示', {
        confirmButtonText: '确定',
        callback: action => {
          
        }
      });
    }
  },
};
</script>
<style>
.el-form--label-top .el-form-item__label {
  padding: 0 12px 0 0;
}
.el-form-item {
  margin-bottom: 16px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.code-box {
  cursor: pointer;
  height: 40px;
}
.code-img {
  width: 100%;
  height: 100%;
}
</style>
