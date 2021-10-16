<template>
	<view class='search'>
		<music-head :title="title" :icon="true" titleColor="black" iconColor='true'></music-head>
		<view class="container">
			<scroll-view scroll-y="true" >
				<view class="search-search" >
					<text class="iconfont icon-fangdajing"></text>
					<input type="text" placeholder="搜索歌曲"/>
					<text class='iconfont icon-guanbi'></text>
				</view>
				<view class="search-history">
					<view class="search-history-head">
						<text>历史记录</text>
						<text class="iconfont icon-lajitong"></text>
					</view>
					<view class="search-history-content">
						<view>少年</view>
						<view>少年</view>
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
				title:'搜索'
			}
		},
		components:{MusicHead},
		methods: {
			
		}
	}
</script>

<style scoped>
	.search-search{
		height: 70rpx;
		background-color: #f7f7f7;
		margin: 70rpx 30rpx 30rpx;
		border-radius: 50rpx;
		display: flex;
		align-items: center;
	}
	.search-search text{
		font-size: 34rpx;
		margin:0 20rpx;
	}

	.search-search input{
		flex:1
	}
	.search-history{
		margin: 0 30rpx;
		font-size: 26rpx;
	}
	.search-history-head{
		display: flex;
		justify-content:space-between;
		margin-bottom: 36rpx;
	}
	.search-history-content{
		display: flex;
		flex-wrap: wrap;
	}
	.search-history-content view{
		padding: 16rpx 28rpx;
		border-radius: 40rpx;
		margin: 0 0 30rpx 30rpx;
		background: #f7f7f7;
		display:grid;
		justify-content: center;
		align-items: center;
		
	}
</style>
