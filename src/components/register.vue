<template>
  <el-card class="box-card" shadow="always">
    <template #header>
      <div class="text-align-center">
        <span class="font-size-20">注 册</span>
      </div>
    </template>

    <el-form
      ref="registerForm"
      :model="registerForm"
      :rules="rules"
      label-position="top"
      v-if="active != 3"
    >
      <el-form-item label="账号" prop="user_name">
        <el-input v-model="registerForm.user_name" v-if="active == 0" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="user_password" >
        <el-input
          v-model="registerForm.user_password"
          placeholder="请输入6位字符及以上的密码"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item label="验证密码" prop="user_re_password" >
        <el-input
          v-model="registerForm.user_re_password"
          placeholder="请再次输入登录密码"
          autocomplete="off"
          type="password"
          @keyup.enter="onClickRegister('registerForm')"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click.prevent="onClickRegister('registerForm')"
          class="full-width"
          :loading="loading"
          >注 册</el-button
        >
        <el-row>
          <el-col :span="24" class="text-align-right">
            <a href="/login.html#/" class="link-blue">登录</a>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div v-else>
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="6">
          <div class="el-message el-message--success is-center">
            <i class="el-message__icon el-icon-success"></i>
            <p class="el-message__content">注册成功</p>
          </div>

          <div>
            <a
              type="success"
              round
              class="el-button el-button--success is-round"
              href="/login.html#/"
              >立即登录</a
            >
          </div>
          <div class="margin-4x"></div>
          <div class="margin-4x"></div>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>
<script>
import { JXAjax } from "../assets/scripts/common";

const validatePass2 = (rule, value, callback) => {
  if (value !== registerForm.user_password) {
    callback(new Error("两次输入密码不一致!"))
  } else {
    callback()
  }
};
const registerForm = {
  user_name: "",
  user_password: "",
};
export default {
  data() {
    
    return {
      loading: false,
      active: 0,
      registerForm: registerForm
    };
    
  },
  computed: {
    
    rules() {
      return {
        user_name: [{ required: true, message: '请输入您的账号', trigger: "blur" }],
        user_password: [
          { required: true, message: '请输入您的密码', trigger: "blur" },
          { min: 6, message: '请输入6位字符及以上的密码', trigger: "blur" },
        ],
        user_re_password: [
          { required: true, message: '请再次输入您的登录密码', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ],
      };
    }
  },
  mounted() {
    
  },
  methods: {
    
    onClickRegister(registerForm) {
      var t = this;

      this.$refs[registerForm].validate((valid) => {
        if (valid) {
          t.loading = true;
          JXAjax(
            "post",
            "/account_regist",
            t.registerForm,
            function (response) {
              t.loading = false;
              t.active = 3;
            },
            function () {
              t.loading = false;
            }
          );
        }
      });
    },
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
.el-step:first-child .is-success .el-step__icon:hover {
  cursor: pointer;
}
.row-bg .el-message {
  position: relative;
  margin: 40px 0;
  top: 0;
}
</style>
