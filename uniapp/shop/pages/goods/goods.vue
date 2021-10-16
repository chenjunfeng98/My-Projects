<template>
	<view>
		<shop-hot-sale :hotSaleData="hotSaleData"></shop-hot-sale>
	</view>
</template>

<script>
	import ShopHotSale from '../../components/ShopHotSale.vue';
	
	export default {
		components:{
			ShopHotSale
		},
		data() {
			return {
				hotSaleData:[],
				pageindex:1
			}
		},
		methods:{
			async getData(callBack){
				const res = await this.$myRequest({
				url:`goods/search?pagenum=${this.pageindex}`
				});
				this.hotSaleData.push(...res.data.message.goods);
				callback && callBack()
			}
		},
		onReachBottom() {
			this.pageindex++;
			this.getData()
		},
		onLoad() {
			this.getData()
		},
		onPullDownRefresh(){
			this.pageindex = 1;
			this.hotSaleData = [];
			setTimeout(()=>{
				this.getData(()=>{
					uni.stopPullDownRefresh()
				})
			},1000);
			
		}
	}
</script>

<style>

</style>
