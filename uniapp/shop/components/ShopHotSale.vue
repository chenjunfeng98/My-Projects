<template>
	<view class="main">
		<view class="goodsList">
		<view v-for="item in hotSaleData" :key="item.goods_id" class="goodsItem">
			<image src="../static/logo.png" ></image>
			<view class='goodsPrice'>
				<text>￥{{item.goods_price}}</text>
				<text>￥{{item.goods_price-10}}</text>
			</view>
			<view class="goodsName">
				{{item.goods_name}}
			</view>
		</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:["hotSaleData"]
	}
</script>

<style>
	.main{
		background-color: #eee;
		overflow: hidden;
		padding-top: 20rpx;
	}
	
	.goodsList{
		padding: 0 15rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.goodsItem{
		width: 355rpx;
		background-color: #fff; 
		margin: 10rpx 0;
		padding: 15rpx;
		box-sizing: border-box;
	}
	.goodsItem image{
		width: 90%;
		height: 300rpx;
		margin-left: 16rpx;
	}
	.goodsPrice text:first-of-type{
		font-weight: 600;
		color:#b50e03;
		font-size: 36rpx;
	}
	.goodsPrice text:last-of-type{
		color:#ccc;
		font-size: 28rpx;
		margin-left: 14rpx;
		text-decoration: line-through;
	}
	.goodsName{
		font-size: 28rpx;
		line-height: 50rpx;
		padding-bottom: 15rpx;
	}
</style>
