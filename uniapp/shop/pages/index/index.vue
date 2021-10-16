<template>
	<view >
		<shop-swiper></shop-swiper>
		<shop-nav></shop-nav>
		<view class="title">
			推荐商品
		</view>
		<show-hot-sale :hotSaleData="hotSaleData"></show-hot-sale>
	</view>
</template>

<script>
	import ShopNav from '../../components/ShopNav.vue';
	import ShopSwiper from '../../components/ShopSwiper.vue'
	import ShowHotSale from '../../components/ShopHotSale.vue'
	
	export default {
		components:{
			ShopNav,
			ShopSwiper,
			ShowHotSale
		},
		data() {
			return {
				hotSaleData:''
			}
		},
		async onLoad() {
			const res = await this.$myRequest({
				url:"goods/search"
			});
			this.hotSaleData = res.data.message.goods
		}
		}
</script>

<style>
	.title{
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		color: #b50e03;
		letter-spacing: 20rpx;
		background-color: #fff;
		/* padding: 7rpx 0; */
		border-top:14rpx solid #eee;
		border-buttom: 1rpx solid #eee;
		
	}
</style>
