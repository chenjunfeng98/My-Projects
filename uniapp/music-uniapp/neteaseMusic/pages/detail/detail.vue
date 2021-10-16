<template>
	<view class='detail'>
		<!-- 头部导航栏 -->
		<music-head :title="title" :icon="true" titleColor="white"></music-head>
		<!-- 背景 -->
		<view class="background" :style="{'background-image':`url(${songData.songs[0].al.picUrl})`}"></view>
		<!-- 内容 -->
		<view class="container">
			<scroll-view scroll-y="true">
				<view class="detail-play" @tap="handleToPlay">
					<image :src="songData.songs[0].al.picUrl" :class="{'detail-play-state':isPlayRotate}" mode=""></image>
					<text class="iconfont " :class="iconPlay"></text>
					<view></view>
				</view>
				<!-- 歌词 -->
				<view class="detail-lyric">
					<!-- 歌词容器 -->
					<view class="detail-lyric-wrap" :style="{'tranform':`translateY(${lyricIndex*82}rpx)`}">
						<view class="detail-lyric-item" :class="{'detail-lyric-item-active':lyricIndex === index}" v-for="(item,index) in songLyric" :key='index'>{{item.lyric}}</view>
					</view>
				</view>
				<!-- 其他歌曲模块 -->
				<view class="detail-like">
					<view class="detail-like-title">喜欢这首歌的人也听</view>
					<view class="detail-like-item" v-for="item in simiSongData.songs" :key="item.id" @tap="handleToSimi(item.id)">
						<!-- 歌曲图片 -->
						<view class="detail-like-item-img">
							<image :src="item.album.blurPicUrl" mode=""></image>
						</view>
						<!-- 歌曲 -->
						<view class="detail-like-item-song">
							<view>{{item.album.name}}</view>
							<view>{{item.album.name}} - {{item.album.artists[0].name}}</view>
						</view>
						<!-- 播放图标 -->
						<text class="iconfont icon-bofang"></text>
					</view>

				</view>
				<!-- 评论模块 -->
				<view class="detail-comment">
					<view class="detail-comment-title">精彩评论</view>
					<view class="detail-comment-item" v-for="item in songComment.hotComments" :key='item.commentId'>
						<!-- 用户头像 -->
						<view class="detail-comment-item-img">
							<image :src="item.user.avatarUrl" mode=""></image>
						</view>
						<!-- 评论内容 -->
						<view class="detail-comment-item-content">
							<view class="detail-comment-item-head">
								<view class="detail-comment-item-content-info">
									<view>{{item.user.nickname}}</view>
									<view>{{item.time | formatDate}}</view>
								</view>
								<view class="detail-comment-item-content-dianzan">
									{{item.likedCount | formatNumber}}
									<text class="iconfont icon-dianzan"></text>
								</view>
							</view>
							<!-- 评论内容 -->
							<view class="detail-comment-item-content-text">{{item.content}}</view>
						</view>

					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>




<script>
	import MusicHead from '../../components/MusicHead/MusicHead.vue';
	import '../../common/iconfont.css';
	export default {
		components:{
			MusicHead
		},
		data() {
			return {
				title:'',
				songData:'',
				simiSongData:'',
				songComment:'',
				songLyric:'',
				lyricIndex:0,
				iconPlay:'icon-bofang',
				isPlayRotate: true
				
			}
		},

		 onLoad(id) {
			uni.showLoading({
				title:'加载中...'
			});
			let songId = id.title;
			this.getSong(songId)
		},
		onUnload(){
			this.cancelLyricIndex();
			// #ifdef H5
			this.bgAudioManager.destroy();
			// #endif

		},
		onHide(){
			this.cancelLyricIndex()
		},
		methods:{
			async getSong(id){
				// 歌曲ID
				try{
					//获取音乐内容
					const songdata = await this.$getSongDetail(id);
					if(songdata.data.code === 200){
					this.title = songdata.data.songs[0].name;
					this.songData = songdata.data;
					}
					//获取相似音乐
					const simisongData = await this.$getSimiSong(id);
					if(simisongData.data.code === 200){
					this.simiSongData = simisongData.data;
					}
				
					//获取音乐评论
					const songcomment = await this.$getSongComment(id);
					if(songcomment.data.code === 200){
					this.songComment = songcomment.data;
					}
					//获取歌词
					const songlyric = await this.$getSongLyric(id);
					if(songlyric.data.code === 200){
						let lyric = songlyric.data.lrc.lyric;
						let re = /\[([^\]]+)\]([^\[]+)/g;
						let result = [];
						lyric.replace(re,($0,$1,$2)=>{
							result.push({"time":this.formatToSec($1),"lyric":$2})
							});
						this.songLyric = result;
					};
					//获取歌曲url
					const songurl = await this.$getSongUrl(id);
					if(songurl.data.code === 200){
						// #ifdef MP-WEIXIN
						this.bgAudioManager = uni.getBackgroundAudioManager();
						this.bgAudioManager.title = this.title;
						// #endif
						
						// #ifdef H5
						if(!this.bgAudioManager){
							this.bgAudioManager = uni.createInnerAudioContext();
						}
						this.iconPlay = 'icon-bofang';
						this.isPlayRotate = false;
				
						
						// #endif
					this.bgAudioManager.src = songurl.data.data[0].url || '';
					this.listenLyricIndex();
					this.bgAudioManager.onPlay(()=>{
						this.iconPlay = 'icon-zanting';
						this.isPlayRotate = true;
						this.listenLyricIndex();
						
					});
					this.bgAudioManager.onPause(()=>{
						this.iconPlay = 'icon-bofang';
						this.isPlayRotate = false;
						this.cancelLyricIndex();
					})
					}
					uni.hideLoading()
				}catch(e){
					uni.showToast({
						error: (e) => {
							console.log(e)
						}
					})
				}
			},
			formatToSec(arr){
				let data = arr.split(':');
				return (Number(data[0])+Number(data[1])).toFixed(1)
			},
			handleToPlay(){
				if(this.bgAudioManager.paused){
					this.bgAudioManager.play();
					return
				}
				this.bgAudioManager.pause()
			},
			listenLyricIndex(){
				clearInterval(this.time);
				this.time = setInterval(()=>{
					for(let i = 0;i<this.songLyric.length;i++){
						if(this.bgAudioManager.currentTime > this.songLyric[this.songLyric.length-1]){
							this.lyricIndex = this.songLyric.length-1;
							break;
						}
						if(this.bgAudioManager.currentTime>this.songLyric[i].time && this.bgAudioManager.currentTime<this.songLyric[i+1].time){
							this.lyricIndex = i;
						}
					}
				},500);
				console.log(this.lyricIndex)
			},
			cancelLyricIndex(){
				clearInterval(this.timer)
			},
			handleToSimi(songId){
				this.getSong(songId)
			}
		}
	}
</script>

<style scoped>
	/* 碟片样式 */
	.detail-play{
		width: 580rpx;
		height: 580rpx;
		background: url(~@/static/disc.png);
		background-size: cover;
		margin: 214rpx auto 0;
		position: relative;
	}
	/* 碟片内容样式 */
	.detail-play image{
		width: 370rpx;
		height: 370rpx;
		border-radius: 50%;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		animation: 10s linear move infinite;
		animation-play-state: paused;
	}
	.detail-play .detail-play-state{
		animation-play-state: running;
	}
	@keyframes move{
		from{ transform: rotate(0deg);}
		to{ transform: rotate(360deg);}
	}
	/* 播放按钮样式 */
	.detail-play text{
		width: 100rpx;
		height: 100rpx;
		font-size: 100rpx;
		color: #fff;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
	}
	/* 杆子样式 */
	.detail-play view{
		width: 230rpx;
		height: 360rpx;
		background: url(../../static/needle.png);
		background-size: cover;
		position: absolute;
		left: 80rpx;
		right: 0;
		top: -220rpx;
		margin: auto;
	}
	/* 歌词模块样式 */
	.detail-lyric{
		/* height:144rpx; */
		font-size: 32rpx;
		line-height: 82rpx;
		height: 246rpx;
		text-align: center;
		color:#6f6e73;
		overflow: hidden;
	}
	.detail-lyric-wrap{
		transition: .5s;
	}
	/* 歌词样式 */
	.detail-lyric-item{
		height: 82rpx;
		
	}
	/* 歌词选中样式 */
	.detail-lyric-item-active{
		color: #fff;
	}
	
	/* 其他歌曲模块 */
	.detail-like{
		margin: 0 30rpx;
	}
	.detail-like-title{
		font-size: 36rpx;
		color: #fff;
		margin: 50rpx 0;
	}
	.detail-like-item{
		display: flex;
		align-items: center;
		margin-bottom: 28rpx;
	}
	.detail-like-item text{
		font-size: 50rpx;
		color: #b2b2b2;
	}
	.detail-like-item-img{
		width: 82rpx;
		height: 82rpx;
		border-radius:20rpx;
		overflow: hidden;
		margin-right: 20rpx;
	}
	.detail-like-item-img image{
		width: 100%;
		height: 100%;
	}
	.detail-like-item-song{
		flex: 1;
	}
	.detail-like-item-song view:nth-child(1){
		font-size: 28rpx;
		color: #fff;
		margin-bottom: 12rpx;
	}
	.detail-like-item-song view:nth-child(2){
		font-size: 22rpx;
		color: #b2b2b2;
	}
	/* 评论模块 */
	.detail-comment{
		margin: 0 30rpx;
	}
	.detail-comment-title{
		font-size: 36rpx;
		color: #fff;
		margin: 50rpx 0;
	}
	.detail-comment-item{
		display: flex;
		margin-bottom: 28rpx;
	}
	/* 头像 */
	.detail-comment-item-img{
		width: 64rpx;
		height: 64rpx;
		border-radius: 50%;
		overflow: hidden;
		margin-right: 18rpx;
	}
	.detail-comment-item-img image{
		width: 100%;
		height: 100%;
		
	}
	.detail-comment-item-content{
		
		flex: 1;
	}
	.detail-comment-item-head{
		display: flex;
		justify-content: space-between;
		color: #cbcacf;
	}
	/* 日期 */
	.detail-comment-item-content-info{
		/* color: #cbcacf; */
	}
	.detail-comment-item-content-info view:nth-child(1){
		font-size: 26rpx;

	}
	.detail-comment-item-content-info view:nth-child(2){
		font-size: 20rpx;
	}
	.detail-comment-item-content-dianzan{
		font-size: 28rpx;
		
	}
	.detail-comment-item-content-text{
		font-size: 28rpx;
		line-height: 40rpx;
		color: #fff;
		margin-top: 20rpx;
		border-bottom: 1px solid #e0e0e0;
		padding-bottom: 40rpx;
	}
</style>
