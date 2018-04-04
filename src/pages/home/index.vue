<template>
  <div class="container">
    <p>Hello Vue</p>
    <p v-for="item in list" :key="item.name" class="emphasize">Hello {{item.name}}</p>
    <p>go see pictures <a href="/img-page">img page</a></p>
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
  data() {
    return {
      list: [],
    }
  },
  computed: {

  },
  mounted() {
    api.getList(123)
      .then(res => {
        console.log('get list res', res)
        this.list = res.data
      })

    console.log('test vconsole')
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

