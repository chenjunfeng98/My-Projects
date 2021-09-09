<template>
	<view>
		<view class="contentFooter">
			<uni-icons type="back" size="30"></uni-icons>
			<uni-icons type="chatbubble" size="30"></uni-icons>
			<uni-icons type="hand-thumbsup" size="30"></uni-icons>
			<uni-icons type="star" size="30"></uni-icons>
		</view>
	</view>
</template>

<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	
	export default {
		components:{
			uniIcons
		}
	}
</script>

<style>
.contentFooter{
	display:flex;
	justify-content: space-around;
/* 	position: fixed;
	bottom: 0%; */
	background-color: #fff;
}
</style>
