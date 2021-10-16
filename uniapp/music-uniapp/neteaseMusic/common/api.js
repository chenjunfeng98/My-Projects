
 // 相似歌曲
// /simi/song?id=

//歌曲详情
// /song/detail?ids= 

//热门评论
// /comment/music?id=

//歌词
// /lyric?id=

//歌曲url
// /song/url?id=

import {BASEURL} from './config.js';

export function topList(){
	return new Promise((resolve,reject)=>{
		uni.request({
			url:`${BASEURL}/toplist/detail`,
			success: res => {
				let topList = res.data.list;
				topList.length = 4;
				resolve(topList)
			},
			fail:err=>{
				reject(err)
			}
		})
	})
}

export function ListContent(id){
	return new Promise((resolve,reject)=>{
		uni.request({
			url:`${BASEURL}/playlist/detail?id=${id}`,
			success:res=>{
				resolve(res)
			},
			fail:err=>{
				reject(err)
			}
		})
	})
	
}

export function getSongDetail(id){
	return new Promise((resolve,reject)=>{
		uni.request({
			url:`${BASEURL}/song/detail?ids=${id}`,
			success:res=>{
				resolve(res)
			},
			fail:err=>{
				reject(err)
			}
		})
	})
	
}


export function getSimiSong(id){
	return new Promise((resolve,reject)=>{
		uni.request({
			url:`${BASEURL}/simi/song?id=${id}`,
			success:res=>{
				resolve(res)
			},
			fail:err=>{
				reject(err)
			}
		})
	})
}

export function getSongComment(id){
	return new Promise((resolve,reject)=>{
		uni.request({
			url:`${BASEURL}/comment/music?id=${id}&limit=1`,
			success:res=>{
				resolve(res)
			},
			fail:err=>{
				reject(err)
			}
		})
	})
}

export function getSongLyric(id){
	return new Promise((resolve,reject)=>{
		uni.request({
			url:`${BASEURL}/lyric?id=${id}`,
			success:res=>{
				resolve(res)
			},
			fail:err=>{
				reject(err)
			}
		})
	})
}

export function getSongUrl(id){
	return new Promise((resolve,reject)=>{
		uni.request({
			url:`${BASEURL}/song/url?id=${id}`,
			success:res=>{
				resolve(res)
			},
			fail:err=>{
				reject(err)
			}
		})
	})
}

