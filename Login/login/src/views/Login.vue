<template>
  <div class="login">
      <h1>登录界面</h1>
      <el-radio-group v-model="login" @change="toLogin">
            <el-radio-button label="message" >短信登录</el-radio-button>
            <el-radio-button label="password" >密码登录</el-radio-button>
      </el-radio-group>
      <router-view></router-view>
  </div>
</template>

<script>
export default {
    name:'login',
    data () {
        return {
            login:'message'      
        }
    },
    methods: {
        toLogin(){
            this.$router.push(`/${this.login}`)
        }

    }
}
</script>

<style scope>
    .login{
        width: 25%;
        margin: 0 auto;
        
    }
</style>