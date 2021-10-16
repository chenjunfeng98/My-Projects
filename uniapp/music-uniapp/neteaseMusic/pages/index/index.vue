<template>
	<view class="index">
		<music-head :title="title" :icon="false"></music-head>
		<view class="container">
			<scroll-view scroll-y="true">
				<view class="search" @tap="handleToSearch">
					<text class="iconfont icon-fangdajing"></text>
					<input type="text" placeholder="搜索歌曲"/>
				</view>
				<view class="list">
					<view class="list-item" v-for="item in topData" :key="item.id" @tap="handletoList(item.id)">
						<view class="list-item-image">
							<image :src="item.coverImgUrl" ></image>
							<text>{{item.updateFrequency}}</text>
						</view>
						<view class="list-item-text" >
							<view v-for="(content,index) in item.tracks " :key="index">
								{{index+1}}.{{content.first}} - {{content.second}}
							</view>
						</view>
					</view>
					
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import '../../common/iconfont.css';
	import MusicHead from '../../components/MusicHead/MusicHead.vue';
	
	
	export default {
		data() {
			return {
				title:'网易云音乐',
				topData:[],
			}
		},
		components:{
			MusicHead
		},
		async onLoad() {
			try{
				const data = await this.$topList();
				if(data){
					this.topData = data;
					return
				};
				uni.showToast({
					error: () => {
						console.log('请求数据为空')
					}
				})
			}catch(e){
				uni.showToast({
					error: (e) => {
						console.log(e)
					}
				})
			}
			
		},
		methods: {
			handletoList(item){
				uni.navigateTo({
					url:`../list/list?id=${item}`,
					
				})
			},
			handleToSearch(){
				uni.navigateTo({
					url:`../search/search`,
					
				})
			}
		}
	}
</script>

<style scoped>
	.search{
		height: 70rpx;
		display: flex;
		align-items: center;
		background-color: #f7f7f7;
		margin: 70rpx 30rpx 30rpx;
		border-radius: 50rpx;
	}
	.search text{
		font-size: 34rpx;
		margin:0 20rpx;
	}
	.list{
		margin: 0 30rpx;
	}
	.list-item{
		display: flex;
		margin-bottom: 34rpx;
	}
	.list-item-image{
		width: 212rpx;
		height: 212rpx;
		border-radius: 30rpx;
		margin-right: 22rpx;
		overflow: hidden;
		position: relative;
	}
	.list-item-image image{
		width: 100%;
		height: 100%;
	}
	.list-item-image text{
		position: absolute;
		left: 22rpx;
		bottom: 16rpx;
		color: #fff;
		font-size: 20rpx;
		letter-spacing: 4rpx;
	}
	
	.list-item-text{
		width: 50vw;
		font-size: 24rpx;
		line-height: 66rpx;
		white-space: nowrap;
	}
</style>
