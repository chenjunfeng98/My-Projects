<template>
	<view class="header">
		<view class="zhihuDay">
			<text>{{zhihuDay.getDate()}}</text>
			<view>{{month}}月</view>
		</view>
		<view class="zhihuGreet">
			{{zhihuGreet}}
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			zhihuDate:{
				type:String
			}
		},
		data() {
			return {
				zhihuMonth:['一','二','三','四','五','六','七','八','九','十','十一','十二'],
				zhihuDay:new Date(),
				zhihuGreet:'知乎日报'
			}
		},
		computed:{
			month(){
			  return this.zhihuMonth[new Date().getMonth()]
			      }
		}
	}
</script>

<style>
	.header{
		display: flex;
		align-items: center;
		
	}
	.zhihuDay{
		text-align: center;
		padding:0 30rpx;
		margin: 10rpx 0;
		border-right: 5rpx solid #C0C0C0;
	}
	.zhihuDay text{
		font-size: 40rpx;
		font-weight: 600;
	}
	.zhihuGreet{
		font-size: 50rpx;
		font-weight: 600;
		margin-left: 30rpx;
	}
	
</style>
