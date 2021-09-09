<template>
  <div >
      <div v-html="storyHtml.body" >
      </div>
      <zhihu-footer/>
  </div>
</template>

<script>
import ZhihuFooter from './ZhihuFooter.vue';
export default {
    name:'ZhihuContent',
    components: {
        ZhihuFooter
    },
    data () {
        return {
            storyHtml:'',
            storyId: this.$route.query.storyID,
        }
    },
    methods: {
      ZhihuConetntCss(){
            let head = document.getElementsByTagName('head')[0],
                cssURL = this.storyHtml.css[0], 
            linkTag = document.createElement('link');
            linkTag.href = cssURL;
            linkTag.setAttribute('rel','stylesheet');
            linkTag.setAttribute('media','all');
            linkTag.setAttribute('type','text/css');
            head.appendChild(linkTag);

      }  
    },
    async created () {
        try {
            let zhihuDaily = await this.$api.content(this.storyId);
            if(zhihuDaily){ 
                this.storyHtml = zhihuDaily.data;
                this.ZhihuConetntCss();
            }else{
                this.$message.error('null')
            }
            
        } catch (error) {
            this.$message.error(error)
        }  
    },

    watch: {
        storyHtml:function(){
            this.$nextTick(function(){
                let ContentImage = document.querySelector('.img-place-holder');
                ContentImage.style.background =  `url(${this.storyHtml.image}) no-repeat center/100% 100%` ;
                ContentImage.style.height = `7.8125rem`;

             })
        }  
    }
}
</script>

<style  scoped>

</style>
