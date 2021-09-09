<template>
  <div class="banner">
      <el-carousel height="10rem">
        <el-carousel-item v-for="item in ZhihuTopData" :key="item.id">
          <router-link :to="{path:'/story',query:{storyID:item.id}}" >
            <img :src="item.image" alt="">
            <div class="title">
              <h1>{{ item.title }}</h1>
              <span>{{item.hint}}</span>
            </div> 
          </router-link>            
        </el-carousel-item>
      </el-carousel>
  </div>
</template>

<script>
export default {
    name:'ZhihuHeader',
    props: {
      ZhihuTopData:{
        type:Array,
      }
    },
}
</script> 

<style scoped>
@import '../css/ZhihuBanner.css'
</style>