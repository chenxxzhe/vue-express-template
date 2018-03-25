<template>
  <div class="container">
    <p>Hello Vue</p>
    <p class="emphasize">Hello {{name}}</p>
    <p>go see pictures <a href="/test-img.html">test-img.html</a></p>
  </div>
</template>

<script>
export default {
  components: {},
  props: {

  },
  data() {
    return {
      name: 'Mae'
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
    font-size: 20px;
    .emphasize {
      color: red;
    }
  }
</style>

