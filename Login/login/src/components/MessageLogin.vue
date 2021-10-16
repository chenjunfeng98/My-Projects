<template>
    <div>
        <el-form :model="messageForm" :rules="rules" >
            <el-form-item prop="phoneNum">
                <el-input placeholder="请输入手机号码" v-model.number="messageForm.phoneNum" ></el-input>
                <el-button v-show="isShow" type="primary" @click.prevent="getCode" >{{computeTime>0 ? `已发送(${computeTime}S)`:'获取验证码'}}</el-button>
                <el-button v-show="!isShow" type="primary" disabled>{{'获取验证码'}}</el-button>
            </el-form-item>
            <el-form-item>
                <el-input placeholder="请输入验证码" v-model="messageForm.phonecode" ></el-input>
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
    name:'messageLogin',
    computed: {
      //控制"发送验证码"按钮的内容
      isShow(){
          return /^1\d{10}$/.test(this.messageForm.phoneNum)
      }  
    },
    data () {
        return {
            computeTime:0,//倒计时
            messageForm:{
                phoneNum:'',//手机号码
                phonecode:'',//短信验证码
            },
            
            rules: {
                phoneNum: [
                    { required: true, message: '手机号码不能为空' , trigger: 'blur' },
                    { type: 'number', message: '手机号码必须为数字值'},                 
                ],
                }
        }
    },
    methods: {
        onSubmit(){
            console.log(this.messageForm)
            },
        getCode(){
            if(!this.computeTime){
                this.computeTime = 30;
                const intervalId = setInterval(() => {
                    this.computeTime--;
                    if(this.computeTime<=0){
                        clearInterval(intervalId)
                    }
                }, 1000);
            }
            ///发送异步请求
        }
    }
}
</script>

<style scope>

    .el-form .el-form-item__content:first-of-type{
        display: flex;
    }
    .el-form .el-form-item:first-of-type .el-input{
        flex: 1;
    }
    .el-form .el-form-item:first-of-type .el-button{
        margin: 0;
    }
</style>