<template>
    <div>
        <el-form  :model="passwordForm">
            <el-form-item>
                <el-input placeholder="请输入手机/邮箱/用户名" v-model="passwordForm.userinfo"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input placeholder="请输入密码" v-model="passwordForm.password" show-password></el-input>
            </el-form-item>
            <el-form-item>
            <el-input placeholder="请输入验证码" v-model="code"></el-input>
            <img src="../assets/logo.png" alt="">
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
        
    </div>
</template>

<script>
export default {
    name:'passwordLogin',
    data () {
        return {
            passwordForm:{
                userinfo:'',
                password:''
            },
            
            code:''
        }
    },
    methods: {
        onSubmit(){
            console.log(this.passwordForm)
        }
    }
}
</script>

<style scope>
.el-form .el-form-item:nth-child(3) img{
    width: 30%;
    height: 40px;
}
</style>