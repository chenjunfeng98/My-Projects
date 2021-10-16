<template>
	<view class="list">
		<!-- 头部导航栏 -->
		<music-head :title="title" :icon="true" titleColor="white"></music-head>
		<!-- 背景 -->
		<view class="background" :style="{'background-image':`url(${listContent.playlist.coverImgUrl})`}"></view>
		<!-- 歌单 -->
		<view class="container">
			<scroll-view scroll-y="true">
				<!-- 飙升榜图片(左侧) -->
				<view class="list-head">
					<view class="list-head-img">
						<image :src="listContent.playlist.coverImgUrl" mode=""></image>
						<text class="iconfont icon-yousanjiao">{{listContent.playlist.playCount | formatNumber}}</text>
					</view>
					<!-- 飙升榜描述(右侧) -->
					<view class="list-head-text">
						<view>云音乐{{listContent.playlist.name}}</view>
						<view>
							<image src="../../static/timg.jpg" mode=""></image>
							<text>网易云音乐</text>
						</view>
						<view>{{listContent.playlist.description}}</view>
					</view>
				</view>
				<!-- 分享按钮 -->
				<!-- #ifdef MP-WEIXIN -->
				<button open-type="share" class="list-share">
					<text class="iconfont icon-fenxiang"></text>分享给微信好友
				</button>
				<!-- #endif -->
				<view class="list-music">
					<view class="list-music-head">
						<!-- 歌单列表头部 -->
						<text class="iconfont icon-bofang"></text>
						<text>播放全部</text>
						<text>(共{{listContent.playlist.tracks.length}}首)</text>
					</view>
					<!-- 歌单列表单曲部分 -->
					<view class="list-music-list">
						<view class="list-music-content" v-for="(item,index) in listContent.playlist.tracks" :key="item.id" @tap="handleToDetail(item.id)">
							<!-- 歌曲排名 -->
							<view class="list-music-num">{{index+1}}</view>
							<!-- 歌手/歌曲名称 -->
							<view class="list-music-name">
								<view>{{item.name}}</view>
								<view>
									{{item.name}} - {{item.ar[0].name}}
								</view>
							</view>
							<!-- 单曲右侧按钮 -->
							<view class="list-music-icon">
								<text class="iconfont icon-bofang"></text>
							</view>
							
						</view>
					</view>
				</view>
			</scroll-view>
			
		</view>		
	</view>
</template>

<script>
	import MusicHead from '../../components/MusicHead/MusicHead.vue';
	import '../../common/iconfont.css';
	export default {
		data() {
			return {
				title:'歌单',
				listContent:{
					playlist:{
						coverImgUrl:'',
						tracks:[]
					}
				},
			}
		},
		components:{
			MusicHead
		},
		async onLoad(res) {
			uni.showLoading({
				title:'加载中...'
			});
			try{
				const data = await this.$ListContent(res.id);
				
				if(data){
					this.listContent = data.data;
					uni.hideLoading();
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
		
		methods:{
			handleToDetail(id){
				uni.navigateTo({
					url:`../detail/detail?title=${id}`
				})
			}
		}
	}
</script>

<style scoped>
	.list-head{
		display: flex;
		margin: 30rpx;
	}
	.list-head-img{
		width: 264rpx;
		height: 264rpx;
		border-radius: 30rpx;
		position: relative;
		margin-right: 42rpx;
		
	}
	.list-head-img image{
		width: 100%;
		height: 100%;
		border-radius: 30rpx;
	}
	.list-head-img text{
		position: absolute;
		top: 8rpx;
		left: 140rpx;
		color: #fff;
		font-size: 26rpx;
	}
	.list-head-text view:nth-child(1){
		font-size: 34rpx;
		color: #fff;
	}
	.list-head-text view:nth-child(2){
		display: flex;
		align-items: center;
		margin: 20rpx 0;
		font-size: 24rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.list-head-text view:nth-child(3){
		width: 50vw;
		height: 100rpx;
		word-wrap: break-word;
		word-break: normal;
	}
	.list-head-text view:nth-child(2) image{
		width: 54rpx;
		height: 54rpx;
		border-radius: 50%;
		margin-right: 14rpx;
	}
	.list-head-text view:nth-child(2) text{
		color: #fff;
	}
	.list-head-text view:nth-child(3){
		flex:1;
		line-height: 32rpx;
		font-size: 24rpx;
		color: #fff;
	}
	
	.list-share{
		width: 330rpx;
		height: 74rpx;
		margin: 0 auto;
		background: rgba(0,0,0,0.4);
		border-radius: 37rpx;
		color: #fff;
		line-height: 74rpx;
		text-align: center;
		font-size: 28rpx;
	}
	.list text{
		margin-right: 16rpx;
	}
	.list-music{
		background-color: #fff;
		border-radius: 50rpx;
		margin-top: 40rpx;
		
	}
	.list-music-head{
		height: 50rpx;
		padding: 30rpx 44rpx 0;
	}
	.list-music-head text:nth-child(1){
		height: 50rpx;
		font-size: 50rpx;
	}
	.list-music-head text:nth-child(2){
		font-size: 30rpx;
		margin-right:10rpx
	}
	.list-music-head text:nth-child(3){
		font-size: 30rpx;
		color: #b2b2b2;
	}
	.list-music-list{
		margin-top: 70rpx;
	}
	.list-music-content{
		display: flex;
		margin: 0 32rpx 66rpx 46rpx;
		align-items: center;
		
	}
	.list-music-icon text{
		font-size: 50rpx;
		color: #b2b2b2;
	}
	.list-music-num{
		width:58rpx;
		font-size: 30rpx;
		color: #b2b2b2;
		line-height: 50rpx;
	}
	.list-music-name{
		font-size: 28rpx;
		flex: 1;
	}
	.list-music-name view:nth-child(1){
		width: 70vw;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.list-music-name view:nth-child(2){
		margin-top: 10rpx;
		width: 70vw;
		color: #b2b2b2;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
