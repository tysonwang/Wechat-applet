const rp = require('request-promise');
const fs = require('fs');
const path = require('path');

_getToken = async () => {
  let options = {
    uri:'https://api.weixin.qq.com/cgi-bin/token',
    qs: {
      grant_type: 'client_credential',
      appid:'wxf761c23deebccd44',
      secret:'e6c610223978307fe25ae5cefa1fe688',
    },
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true
  };
  return await rp(options);
}


setToken = async (ctx)=>{
  let accesstoken = JSON.parse(fs.readFileSync(__dirname+"/accesstoken.json", 'utf-8')); //这里的数据建议存入redis
  console.log('acccesstoken',accesstoken);
  if (!accesstoken.access_token || accesstoken.expires_time <= new Date().getTime()) { //设置更新access_token
    let status = await _getToken();
    console.log('status',status);
    console.log('new Date().getTime()',new Date().getTime())
      let params = { 
        "access_token": status.access_token,
        "expires_time": new Date().getTime() + 60 * 50 * 2 * 1000
      }
      console.log('asdfasdfasdfasdfasfd',JSON.stringify(params));
      fs.writeFileSync(__dirname + "/accesstoken.json", JSON.stringify(params));

      ctx.state.access_token = params.access_token;
      ctx.state.expires_time = params.expires_time;
  }else{
    ctx.state.access_token = accesstoken.access_token;
    ctx.state.expires_time = accesstoken.expires_time;
  }
}
module.exports = {
  setToken,//设置token
}