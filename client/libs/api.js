let navigateTo = ({path,data={}}) => {
  wx.navigateTo({
    url: `${path}${_dataToUrl(data)}` //这里的地址可采用相对地址 也可以采用绝对地址
  })
}
let reLaunch = ({ path, data = {} }) => {
  wx.reLaunch({
    url: `${path}${_dataToUrl(data)}`
  })
}

let redirectTo =({path,data={}})=>{
  wx.redirectTo({
    url: `${path}${_dataToUrl(data)}`
  })
}
let go = (num)=>{
  wx.navigateBack({
    delta: -num||1
  })
}
let _dataToUrl = (data) => {
  let str = _urlEncode(data);
  if (str) {
    str = str.replace('&', '?');  
  }
  return str;
}

let _urlEncode = function(param, key, encode) {
  if (param == null) return '';
  var paramStr = '';
  var t = typeof(param);
  if (t == 'string' || t == 'number' || t == 'boolean') {
    paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
  } else {
    for (var i in param) {
      var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i)
      paramStr += _urlEncode(param[i], k, encode)
    }
  }
  return paramStr;
}
// wx.navigateToMiniProgram 从当前小程序跳转到其他小程序 前提条件是必须关联同一个公众号
export default {
  navigateTo,
  go,
  redirectTo,
  reLaunch
}