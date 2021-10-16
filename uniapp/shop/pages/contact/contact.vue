<template>
	<view class="contact">
		<image src="../../static/logo.png" mode="scaleToFill"></image>
		<view class="info">
			<view @click="phone">联系电话:XXX(点击拨打)</view>
			<view>地址:XXX</view>
		</view>
		<map :longitude="longitude" :latitude="latitude"></map>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				longitude:116.7727274447846,
				latitude:23.445425604329216
			}
		},
		methods: {
			phone(){
				uni.makePhoneCall({
					phoneNumber:XXX
				})
			}
		}
	}
</script>

<style>
	image{
		width: 100%;
		height: 320rpx;
	}
	.info{
		padding: 20rpx ;
	}
	.info view{
		line-height: 100rpx;
		border-bottom: 3rpx solid #eee;
	}
	map{
		width: 100%;
		height: 750rpx;
	}
</style>
