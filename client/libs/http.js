let app = getApp();
const Fly = require("./flyio/wx");
global.regeneratorRuntime = require('./regenerator/runtime-module');
const {
  regeneratorRuntime
} = global;

var fly = new Fly();

//测试
fly.config.baseURL ='https://tyson.mynatapp.cc/';
fly.interceptors.request.use((config) => {
  config.headers["X-Tag"] = "flyio";
  config.headers["contentType"] = 'application/json;charset=UTF-8';
  let token = wx.getStorageSync('token');  
  if(token){
    config.headers['Authorization'] = 'Bearer '+token;
  }
  return config;
})
fly.interceptors.response.use((res) => {
  let {
      data
  ,status} = res;
  console.log(res.status);
  if (data.msg == 'tokenError') {
      // 如果进入这里，表示token已经过期
      wx.clearStorageSync();
  }

//   switch(status){
//   case 200:
//  return data;
//  default:
//  Promise.reject()
//   }
})
let handleLogin = () => {
  return new Promise((resolve, reject) => {
      getToken(resolve, reject);
  })
}

let getToken = (resolve, reject) => {
  wx.login({
    success(res) {
      console.log('res',res);
      getHandle('wx/user/wxf761c23deebccd44/login',{
        code: res.code
      }).then(loginRes => {
        console.log('login',loginRes);
        wx.setStorageSync('token', loginRes.data.token);
        wx.setStorageSync('expireTime', loginRes.data.expireTime);
        wx.setStorageSync('appId', loginRes.data.appId);
        wx.setStorageSync('sessionKey', loginRes.data.sessionKey);
        wx.setStorageSync('hospistalId', loginRes.data.hospistalId);
        resolve()
      })
    }
  })
}

let getHandle = async (url, data) => {
  let expireTime = wx.getStorageSync('expireTime');
  if ((!expireTime || expireTime < new Date().getTime()) && url !== 'wx/user/wxf761c23deebccd44/login'){
    await handleLogin();
  }
  return fly.get(url, data)
}
let putHandle = async (url, data) => {
  let expireTime = wx.getStorageSync('expireTime');
  if ((!expireTime || expireTime < new Date().getTime()) && url !== 'wx/user/wxf761c23deebccd44/login') {
    await handleLogin();
  }
  return fly.put(url, data)
}
let postHandle = async (url, data) => {
  let expireTime = wx.getStorageSync('expireTime');
  if ((!expireTime || expireTime < new Date().getTime()) && url !== 'wx/user/wxf761c23deebccd44/login'){
    await handleLogin();
  }
  // return fly.post(url, {
  //   requestData: data
  // })
  return fly.post(url, data)
}

let $https = {
  get: getHandle,
  post: postHandle,
  put:putHandle,
  
}

export {
  $https
}