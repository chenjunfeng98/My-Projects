<template>
  <div class='main'>
    <!-- 头部 -->
      <zhihu-header></zhihu-header>

    <!-- 轮播图 -->
      <zhihu-banner :ZhihuTopData="ZhihuTopData"></zhihu-banner>
      
    <!-- 下拉列表  -->
      <el-scrollbar style="height:100%">
      <ul v-infinite-scroll="scroll"
          infinite-scroll-delay='1000'
          infinite-scroll-distance='200'
          infinite-scroll-immediate="false"
          >
          <li v-for="item in ZhihuDailyData" :key="item.id" >
            <div class='ContentItem'>
              <router-link :to="{path:'/story',query:{storyID:item.id}}">
              <div class='ItemTitle'>
                <h3>{{item.title}}</h3>
                <span>{{item.hint}}</span>
              </div>
              <img :src="item.images" alt="">
            </router-link>
            </div>
            
            </li>
      </ul>
      </el-scrollbar>
  </div>
  
</template>

<script>
import ZhihuHeader from './ZhihuHeader.vue';
import ZhihuBanner from './ZhihuBanner.vue';
import moment from 'moment';

export default {
    name:'ZhihuMain',
    components: {
      ZhihuHeader,
      ZhihuBanner
    },
    data () {
      return {
        ZhihuDailyData:[],
        ZhihuTopData:[],
        Date:moment().format('YYYYMMDD'),
      }
    },
    
    methods: {
      async scroll(){
        try {
          let HistoryData = await this.$api.history(this.Date);
          this.ZhihuDailyData.push(...HistoryData.data.stories);
          this.Date = HistoryData.data.date;
        } catch (error) {
          this.$message.error(error)
        }
      },
    },

    async mounted(){
      try {
          let ZhihuData = await this.$api.latest();
          let ZhihuHistoryData = await this.$api.history(this.Date);
          if(ZhihuData?.data?.stories || ZhihuHistoryData?.data?.stories){
            this.ZhihuDailyData.push(...ZhihuData.data.stories,...ZhihuHistoryData.data.stories);
            this.ZhihuTopData.push(...ZhihuData.data.top_stories);
            this.Date = ZhihuHistoryData.data.date;
          }else{
            this.$message.error('null')
          };
      } 
      catch (error) {
          this.$mressage.error(error) 
      };

      
    }
}


</script>

<style scoped>
@import '../css/ZhihuMain.css'
</style>