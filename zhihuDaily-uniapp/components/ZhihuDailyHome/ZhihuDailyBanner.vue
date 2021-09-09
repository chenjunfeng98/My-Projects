<template>
	<view>
		<swiper :autoplay="true" indicator-dots>
			<swiper-item v-for="(item,index) in zhihuTopData" :key="index" @click="jump(item)">
				<image :src="item.image" mode="widthFix"></image>
				<view class="zhihuBannerTitle">
					<view>{{item.title}}</view>
					<view>{{item.hint}}</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		props:{
			zhihuTopData:{
				type:Array
			}
		},
		methods:{
			jump(item){
				uni.navigateTo({
					url:`../zhihuDailyDetail/zhihuDailyContent?storyid=${item.id}`
				})
			}
		}
	}
</script>

<style>
	swiper{
		width: 100%;
		height:700rpx;
		
	}
	image{
		width: 100%;
	}
	.zhihuBannerTitle{
		position: fixed;
		top: 70%;
/* 		font-weight: 600; */
		margin: 0 23.4375rpx 20rpx;
		color: #fff
	}
	.zhihuBannerTitle view:first-of-type{
		padding-bottom: 20rpx;
		font-size: 45rpx;
	}
	.zhihuBannerTitle view:last-of-type{
		font-weight:400;
		font-size: 26rpx;
		margin-bottom: 20rpx;
	}
</style>
