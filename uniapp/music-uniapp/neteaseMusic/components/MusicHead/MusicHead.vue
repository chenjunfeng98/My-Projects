<template>
	<view class="music-head" >
		<view class="music-head-icon" v-if="icon" :class="{iconStyle:iconColor}">
			<text class="iconfont icon-zuojiantou" @tap="handleToBack" ></text> 
			 <text>|</text>
			<text class="iconfont icon-shouye" @tap="handleToHome"></text>
		</view>
		<view class="music-head-text" :style="{'color':titleColor}">{{title}}</view>
	</view>
</template>

<script>
	export default {
		name:"MusicHead",
		props:{
			title:{
				type:String
			},
			icon:{
				type:Boolean
			},
			titleColor:{
				type:String
			},
			iconColor:{
				type:Boolean
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			handleToBack(){
				uni.navigateBack()
			},
			handleToHome(){
				uni.navigateTo({
					url:'../../pages/index/index'
				})
			}
			
		}
	}
</script>

<style scoped>
.music-head{
	height: 75px;
	font-size: 16px;
	position: relative;
	
}
.music-head-text{
	height: 75px;
	text-align: center;
	line-height: 75px;
}
.music-head-icon{
	width: 90px;
	height: 30px;
	background: rgba(0,0,0,0.4);
	border-radius: 16px;
	color: #fff;
	margin-left:8px;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	position: absolute;
	top: 40rpx;
	left: 10px;
	
}
.iconStyle{
	color: black;
	border: 1px solid #eaeaea;
	background-color: #fff;
}
</style>
