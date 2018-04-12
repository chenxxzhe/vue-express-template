<template>
  <div class="container">
    <p>Hello Vue</p>
    <p v-for="item in list" :key="item.name" class="emphasize">Hello {{item.name}}</p>
    <p>go see pictures <a href="/img-page">img page</a></p>
    <footer-bar></footer-bar>
    <button @click="sayHello">say hi ~</button>
    <input type="text" v-model="number">
    <span>v-model number: {{number}}</span>
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
      list: [{name: 1}],
      number: 0,
    }
  },
  computed: {

  },
  created() {
    console.log('vue created')
    // 这里会导致预渲染错误？v-for 不停渲染
    api.getList(123)
      .then(res => {
        if (res.status === 200) {
          console.log('get list res', res)
          this.list = res.data
        }
      })

    console.log('test vconsole')
  },
  methods: {
    sayHello() {
      console.log('hi')
    },
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

