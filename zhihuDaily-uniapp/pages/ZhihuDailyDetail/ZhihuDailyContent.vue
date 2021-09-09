<template>
	<view>
		<view v-html="zhihuStory.body"></view>
		<zhihu-daily-footer></zhihu-daily-footer>
	</view>
</template>

<script>
	import ZhihuDailyFooter from '../../components/ZhihuDailyFooter/ZhihuDailyFooter.vue'
	
	export default {
		components:{
			ZhihuDailyFooter
		},
		data() {
			return {
				zhihuStory: ''
			}
		},
		async onLoad(res) {
			const storyData = await this.$historyRequest({
				url:`${res.storyid}`
			})
			this.zhihuStory = storyData.data
		}
		
	}
</script>

<style>
</style>
