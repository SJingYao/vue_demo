import request from '@/utils/request'

// let requests = {
export function getFileImg() {
  return request({
    method: 'post',
    url: '/getFile',
    // 如果是下载的二进制文件
    // 必须在responseType中表明返回的数据类型是二进制，不然会导致下载完成之后文件无法打开的情况
    responseType: 'blob'
  })
}
// }
// export default requests