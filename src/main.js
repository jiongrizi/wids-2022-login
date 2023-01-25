import { createApp } from 'vue'
import loginApp from './loginApp.vue'
import router from './router'
import 'element-plus/lib/theme-chalk/index.css';
import "./assets/styles/reset.css";
import "./assets/styles/common.css";

import {
  ElRow,
  ElCol,
  ElCard,
  ElForm,
  ElFormItem,
  ElInput,
  ElButton,
  ElLoading,
  ElMessage,
  ElMessageBox,
} from 'element-plus';
const components = [
  ElRow,
  ElCol,
  ElCard,
  ElForm,
  ElFormItem,
  ElInput,
  ElButton,
  ElLoading,
  ElMessage,
  ElMessageBox,
]

const plugins = [
  ElLoading,
  ElMessage,
  ElMessageBox,
]


const app = createApp(loginApp)

components.forEach(component => {
  app.component(component.name, component)
})

plugins.forEach(plugin => {
  app.use(plugin)
})

app.use(router)

app.mount('#login-app')