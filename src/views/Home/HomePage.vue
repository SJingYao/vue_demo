<template>
  <div class="home-map">
    <!-- <h2>首页</h2> -->
    <!-- <img :src="imgSrc" alt=""> -->
    <!-- <div class="search-bar"> -->
    <el-row>
      <el-col :span="12">
        <el-input
          placeholder="请输入需要搜索的内容"
          id="suggestId"
          clearable
          v-model="area"
          @keyup.enter="searchArea()"
        >
          <el-button type="primary" slot="append" icon="el-icon-search" @click="searchArea()"></el-button>
        </el-input>
        <el-button @click="downloadImage()">下载文件</el-button>
        <img :src="imgSrc" alt />
      </el-col>
    </el-row>
    <!-- </div> -->
    <div id="containers"></div>
  </div>
</template>

<script>
import { getFileImg } from '@/api/getData'
export default {
  data() {
    return {
      imgSrc: '',
      area: '',
      mapInstance: ''
    }
  },
  created() {
    // this.getImg()
  },
  mounted() {
    this.createMap()
  },
  methods: {
    async downloadImage() {
      let resdata = await getFileImg()
      console.log(resdata)
      let fileName = resdata.headers['content-disposition']
      fileName = fileName.slice(fileName.indexOf('=') + 1)
      console.log(fileName)
      let files = new FileReader()
      files.readAsDataURL(resdata.data)
      files.onload = e => {
        // console.log(e.target)
        // this.imgSrc = e.target.result

        let a = document.createElement('a')
        a.href = e.target.result
        a.setAttribute('download', fileName)
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      }
    },
    createMap() {
      // 创建地图实例
      var map = new BMap.Map('containers')
      map.enableScrollWheelZoom()
      map.centerAndZoom(new BMap.Point(116.404, 39.915), 14)

      var top_left_control = new BMap.ScaleControl({ anchor: BMAP_ANCHOR_TOP_LEFT }) // 左上角，添加比例尺

      map.addControl(top_left_control)
      var ac = new BMap.Autocomplete({ input: 'suggestId', location: map }) //建立一个自动完成的对象

      ac.addEventListener('onhighlight', function(e) {
        //鼠标放在下拉列表上的事件
        var str = ''
        var _value = e.fromitem.value
        var value = ''
        if (e.fromitem.index > -1) {
          value = _value.province + _value.city + _value.district + _value.street + _value.business
        }
        str = 'FromItem<br />index = ' + e.fromitem.index + '<br />value = ' + value

        value = ''
        if (e.toitem.index > -1) {
          _value = e.toitem.value
          value = _value.province + _value.city + _value.district + _value.street + _value.business
        }
        str += '<br />ToItem<br />index = ' + e.toitem.index + '<br />value = ' + value
      })

      var myValue
      ac.addEventListener('onconfirm', function(e) {
        //鼠标点击下拉列表后的事件
        var _value = e.item.value
        myValue = _value.province + _value.city + _value.district + _value.street + _value.business
        setPlace()
      })

      function setPlace() {
        map.clearOverlays() //清除地图上所有覆盖物
        function myFun() {
          var pp = local.getResults().getPoi(0).point //获取第一个智能搜索的结果
          map.centerAndZoom(pp, 14)
          map.addOverlay(new BMap.Marker(pp)) //添加标注
        }
        var local = new BMap.LocalSearch(map, {
          //智能搜索
          onSearchComplete: myFun
        })
        local.search(myValue)
      }

      this.mapInstance = map
      // this.searchArea(map)
    },
    searchArea(map) {
      if (this.mapInstance) {
        map = this.mapInstance
      }
      var local = new BMap.LocalSearch(map, {
        renderOptions: { map: map }
      })

      local.search(this.area)
    },
    async getImg() {
      let res = await getFileImg()
      var a = document.createElement('a')
      // download属性必须写
      // a.download = 'a.jpg'
      // var href = URL.createObjectURL(res.data)
      // a.href = href
      // document.body.appendChild(a)
      // a.click()
      // document.body.removeChild(a)

      // 如果需要回显可以写一下代码
      var readFile = new FileReader()
      readFile.readAsDataURL(res.data)
      readFile.onload = e => {
        // console.log(e.target.result)
        this.imgSrc = e.target.result
      }
    }
  }
}
</script>

<style scoped lang="scss">
$height: calc(100% - 50px);
$widthAndHeight: 50%;
.home-map {
  width: 100%;
  height: 100%;
}
#containers {
  margin-top: 10px;
  width: $widthAndHeight;
  height: $widthAndHeight;
}
</style>
