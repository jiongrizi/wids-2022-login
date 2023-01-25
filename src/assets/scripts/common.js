import axios from "axios";

import { ElMessage } from "element-plus";

let errMsg = require("./errMsg.json");
if (localStorage.getItem('jxwaf_language') == 'English') {
  errMsg = require("./errMsg-en.json");
}

export function JXAjax(method, url, params, success, fail, messageStatus) {
  let strMsg = errMsg[500];
  let detail = strMsg;
  let msgStatus = messageStatus || "has-massage";
  let detailMore = "查看报错详情"
  return axios({
    method: method,
    url: url,
    data: params
  })
    .then(function (response) {
      if (response.data.result) {
        if (method == "post" && msgStatus == "has-massage") {
          ElMessage({
            message: errMsg[200],
            type: "success",
          });
        }
        success(response);
      } else {
        if (response.data.errCode) {
          strMsg = errMsg[response.data.errCode];
        }
        if (response.data.message) { 
          detail = response.data.message;
        }
        ElMessage({
          duration: 0,
          showClose: true,
          message: strMsg + "<a href='javascript:;' class='error-message-btn' onclick='this.nextElementSibling.style.display=\"block\"'> " + detailMore + " </a> <p class='error-message-detail' style= 'display: none;'>" + detail + "</p>",
          type: "error",
          dangerouslyUseHTMLString: true,
        });
        fail();
      }
    })
    .catch(function (error) {
      ElMessage({
        duration: 0,
        showClose: true,
        message: error,
        type: "error",
      });
      fail();
    });
}

/***
 * date:new Date()
 * 2018-1-29-10:34:49
 */
export function formatterDate(date) {
  var strDate = date.getFullYear() + "-";
  strDate += date.getMonth() + 1 + "-";
  strDate += date.getDate() + "-";
  strDate += date.getHours() + ":";
  strDate += date.getMinutes() + ":";
  strDate += date.getSeconds();
  return strDate;
}


export const validatePort = (rule, value, callback) => {
  if (value < 1 || value > 65534) {
    callback(new Error('后端服务器端口需1~65534之间'));
  } else {
    callback();
  }
};

export const validatePositiveInt = (rule, value, callback) => {
  let r = /^\+?[1-9][0-9]*$/; //正整数
  let flag = r.test(value);
  if (!flag) {
    callback(new Error('请输入大于0的整数'));
  } else {
    callback();
  }
};

export const validateInt = (rule, value, callback) => {
  let r = /^(0|[1-9][0-9]*)$/; //正整数
  let flag = r.test(value);
  if (!flag) {
    callback(new Error('请输入大于等于0的正整数'));
  } else {
    callback();
  }
};

export const mixin = {
  created(){
    
  },
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    
    next()
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    next()
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    ElMessage && ElMessage.closeAll();
    // console.log(this.$message)
    // setTimeout(() => { 
    //   next()
    // },500)
    next()
   
  }
}
