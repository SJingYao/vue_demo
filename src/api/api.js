var http = (method, url, paramsData) => {
  return new Promise(function(resolve, reject) {
    var xhr = null
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest()
    } else {
      xhr = new ActiveXobject('Microsoft.XMLHTTP')
    }
    method = method.toLocaleUpperCase() // 转换为大写
    xhr.open(method, url, JSON.stringify(paramsData))
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        resolve(JSON.parse(xhr.responseText))
      }
      // else if (xhr.status >= 400) {
      //   reject(xhr.responseType)
      // }
    }
    /**
     * 需要设置一个请求头，要不然后台拿不到请求的参数
     */
    xhr.setRequestHeader('content-Type', 'application/json; charset=utf-8')
    if (paramsData) {
      xhr.send(JSON.stringify(paramsData))
    } else {
      xhr.send(null)
    }
  })
}
module.exports = http
