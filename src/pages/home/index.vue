<template>
  <div class="container">
    <p>Hello Vue</p>
    <p class="emphasize">Hello {{name}}</p>
    <p>go see pictures <a href="/img-page.html">img page</a></p>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
import api from '@/api'

import FooterBar from './footer-bar.vue'
export default {
  components: { FooterBar },
  props: {

  },
  data () {
    return {
      name: 'Mae',
    }
  },
  computed: {

  },
  mounted () {
    api.getList(123)
      .then(res => {
        if (res.code !== 200) return
        this.name = res.data
      })
  },
  methods: {

  },
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

