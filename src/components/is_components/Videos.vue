<template>
  <div>
    <video class="video-tag" width="300" controls src="../../assets/audioandvideo/video-01.mp4">你的浏览器不支持video元素</video>
    <el-button @click="playVideo()">播放</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      playVideos: false
    }
  },
  methods: {
    playVideo() {
      var videos = document.querySelector('.video-tag')
      // 当前时间
      // videos.currentTime
      // 总时长
      // videos.duration
      this.playVideos = !this.playVideos
      this.playVideos ? videos.play() : videos.pause()
    }
  }
}
</script>

<style scoped>
</style>
