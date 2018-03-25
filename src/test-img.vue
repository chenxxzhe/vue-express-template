<template>
  <div class="container">
    <div>img1: <img class="img1" src="@/assets/single_dog.jpg" alt="dog"></div>
    <div>img2: <div class="img2"></div></div>
    <p>go home: <a href="/index.html">index.html</a></p>
  </div>
</template>

<script>
export default {
  components: {},
  props: {

  },
  data() {
    return {

    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {

  }
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
      width: 100px;
      height: 10px;
      background-color: url('@/assets/me_too.gif');
    }
  }
</style>

