<!--
 * @Author: srcheng 17755456856@163.com
 * @Date: 2023-04-14 15:10:10
 * @LastEditors: srcheng 17755456856@163.com
 * @LastEditTime: 2023-04-17 14:31:01
 * @FilePath: \blog\docs\.vuepress\components\BlogHome.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="home-container">
    <!-- <div>Hello World</div> -->
    <img :src="imageSrc" alt="" srcset="">
    <!-- <div>我写下很多描述文字，最后还是只留下了，Hello World</div> -->
  </div>
</template>

<script>
export default {
  name: 'BlogHome',
  data () {
    return {
      pcImageSrc: '/home/home-background-pc.jpg',
      mobileImageSrc: '/home/home-background-mobile.jpg',
      deviceType: null,
    }
  },
  computed: {
    imageSrc() {
      return this.deviceType === 'pc' ? this.$withBase(this.pcImageSrc) : this.$withBase(this.mobileImageSrc)
    }
  },
  mounted() {
    this.detectDeviceType();
  },
  methods: {
    detectDeviceType() {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        this.deviceType = 'mobile';
      } else {
        this.deviceType = 'pc';
      }
      console.log(this.deviceType)
    },
  },
}
</script>

<style lang="less" scoped>
.home-container {
  display: flex;
  align-content: center;
  justify-content: center;
  img {
    // 3.6rem头部高度
    margin-top: 3.6rem;
    width: 100%;
    max-width: 965px;
  }
}
</style>