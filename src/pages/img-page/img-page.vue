<template>
  <div class="container">
    <div>img1: <img class="img1" src="@/assets/me_too.gif" alt="gif"></div>
    <div>img2: <div class="img2"></div></div>
    <p>go home: <a href="/home.html">home</a></p>
  </div>
</template>

<script>
import img from '@/assets/me_too.gif'

export default {
  components: {},
  props: {

  },
  data () {
    return {

    }
  },
  computed: {

  },
  mounted () {
    console.log('me too gif:', img)
  },
  methods: {

  },
}
</script>

<style lang="scss" scoped>
  .container {
    padding: 20px;
    .img1 {
      width: 100px;
      height: 100px;
    }
    .img2 {
      width: 200px;
      height: 200px;
      // css 里引用图片要多加一个 ~ 来防止scss转义
      background: url('~@/assets/single_dog.jpg');
      background-size: cover;
    }
  }
</style>

