<template>
  <div id="app">
    <template class='login'>
      <router-view></router-view>
    </template>
    
  </div>
</template>

<script>
import login from './views/Login.vue'

export default {
  components: {
    login
  }
}
</script>

<style >
  *{

    margin: 0 ;
    padding: 0 ;
    text-decoration: none;
  }
  #app{
    text-align: center;
  }
</style>
