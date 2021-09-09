<template>
	<view>
	
		<zhihu-daily-header :zhihuDate="zhihuDate"></zhihu-daily-header>
		<zhihu-daily-banner :zhihuTopData="zhihuTopData"></zhihu-daily-banner>
		<view v-for="item in zhihuData" :key="item.id" class='zhihuItem' @click="jump(item)" >
				<view class="zhihuHomeTitle">
					<text>{{item.title}}</text>
					<view>{{item.hint}}</view>
				</view>
				<view class="zhihuHomeImage">
					<image :src="item.images" mode="scaleToFill"></image>
				</view>
		</view>
	</view>
</template>

<script>
	import ZhihuDailyBanner from '../../components/ZhihuDailyHome/ZhihuDailyBanner.vue';
	import ZhihuDailyHeader from '../../components/ZhihuDailyHome/ZhihuDailyHeader.vue';

	export default {
		name:"ZhihuDailyHome",
		components:{
			ZhihuDailyBanner,
			ZhihuDailyHeader
		},
		data() {
			return {
				zhihuData: [],
				zhihuTopData:[],
				zhihuDate:'',
				zhihuHistoryDate:''
			}
		},
		
		onLoad() {
			this.getData()
		},
		
		async onReachBottom(){
			try{
				const res = await this.$historyRequest({
						url:`before/${this.zhihuHistoryDate || this.zhihuDate}`
					});
				if(res?.data?.stories){
					this.zhihuData.push(...res.data.stories);
					this.zhihuHistoryDate = res.data.date;
					return
				}
				uni.showToast({
					title:`数据不存在`
				})
			}catch(e){
				uni.showToast({
					title:`${e}`
				})
			}
			
		},
		methods: {
			async getData() {
				try{
					const res = await this.$latestRequest({
							url:'stories/latest'
						});
					if(res?.data?.stories){
						this.zhihuData.push(...res.data.stories);
						this.zhihuTopData = res.data.top_stories;
						this.zhihuDate = res.data.date;
						return
					}
					uni.showToast({
						title:`数据不存在`
					})
				}catch(e){
					uni.showToast({
						title:`${e}`
					})
				}
			},
			
			jump(item){
				uni.navigateTo({
					url:`../ZhihuDailyDetail/ZhihuDailyContent?storyid=${item.id}`
				})
			}
		},
	}
</script>

<style>
	.zhihuItem{
		display: flex;
		justify-content: space-between;
		margin: 40rpx 30rpx;
	}
	.zhihuHomeTitle text{
		font-size: 30rpx;
		font-weight: 800;
	}
	.zhihuHomeTitle view{
		font-size: 25rpx;
		margin-top: 10rpx;
	}
	.zhihuHomeImage{
		margin-left: 50rpx;
	}
	.zhihuHomeImage image{
		width: 150rpx;
		height: 150rpx;
		border-radius: 10rpx;
	}
</style>
