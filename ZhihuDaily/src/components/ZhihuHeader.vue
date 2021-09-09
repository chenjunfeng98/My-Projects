<template>
  <div class='header'>
        <el-row>
          <el-col>
            <div class='date'>
              <h1>{{day.getDate()}}</h1>
              <div>{{month}}月</div>
            </div>
            <div class='greet'>
              <h2>知乎日报</h2>
            </div>
          </el-col>
        </el-row>
  </div>
    
</template>

<script>
export default {
    name:'ZhihuHeader',
    data () {
      return {
        Month:['一','二','三','四','五','六','七','八','九','十','十一','十二'],
        day:new Date(),
      }
    },
    computed: {
      month(){
        return this.Month[new Date().getMonth()]
      },
    }

}
</script>

<style scoped>
@import "../css/ZhihuHeader.css"
</style>