<template>
  <div id="app">
    <router-link :to='{name:"home",params:{name:"App"}}'>首页</router-link>
    <router-link to='/prolife'>个人</router-link>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  #app {
    margin: 0 auto;
  }
</style>
