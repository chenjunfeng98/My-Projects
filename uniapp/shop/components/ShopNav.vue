<template>
	<view>
		<!-- 导航区域 -->
		<view class="nav">
			<view class="nav_item" v-for="(item,index) in nav_data" :key="index" @click="jump(item)">
				<view :class="item.class"></view>
				<text>{{item.title}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nav_data:[
					{
						class:"iconfont icon-ziyuan",
						title:"小程序超市",
						path:"../../pages/goods/goods"
					},
					{
						class:"iconfont icon-guanyuwomen",
						title:"联系我们",
						path:"../../pages/contact/contact"
					},
					{
						class:"iconfont icon-tupian",
						title:"社区图片",
						path:"../../pages/img/img"
					},
					{
						class:"iconfont icon-shipin",
						title:"学习视频",
						path:"../../pages/video/video"
					}
				]
			}
		},
		methods:{
			jump(item){
				uni.navigateTo({
					url:`${item.path}`
				})
			}
		}
	}
</script>

<style>
	.nav{
		display:flex;
		/* justify-content: space-around; */
	}
	.nav_item{
		width: 25%;
		text-align: center;
	}
	.nav_item view{
		width: 120rpx;
		height: 120rpx;
		line-height: 120rpx;
		background-color: #b50e03;
		border-radius: 60rpx;
		color: #fff;
		margin: 10rpx auto;
		font-size: 50rpx;
	}
	.icon-tupian{
		font-size: 45rpx !important;
	}
	.nav_item text{
		font-size: 30rpx;
	}
</style>
