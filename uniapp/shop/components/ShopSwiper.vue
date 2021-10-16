<template>
	<view>
		<swiper autoplay indicator-dots>
			<swiper-item v-for="(item) in swiperData" :key="item.goods_id">
				<image :src="item.image_src" ></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperData:'',
			}
		},
		async created() {
			const res = await this.$myRequest({
				url:"home/swiperdata"
			});
			this.swiperData = res.data.message
		}
	}
</script>

<style>
	swiper{
		height: 340rpx;
	}
	image{
		width: 100%;
		height: 100%;
	}
</style>
