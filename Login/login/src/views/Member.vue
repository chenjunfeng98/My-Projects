<template>
  <div>
      <h1>{{name}}</h1>
      <el-button type="primary" @click="login">登录</el-button>
  </div>
</template>

<script>
export default {
    name:'member',
    data () {
        return {
            name:'admin'
        }
    },
    methods: {
        login(){
            this.$router.push('/login')
        }
    }
}
</script>

<style scope>

</style>