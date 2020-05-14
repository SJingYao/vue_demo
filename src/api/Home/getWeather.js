import jsonp from '@/utils/jsonp.js'

export function getWeather(reqData){
  let url = `https://api.jisuapi.com/weather/query`
  let datas = {
    appkey: reqData.appkey,
    city: reqData.city
  }
  return jsonp(url, datas,{})
}