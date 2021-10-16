import App from './App'
import {topList,ListContent,getSongDetail,getSimiSong,getSongComment,getSongLyric,getSongUrl} from 'common/api.js';

Vue.prototype.$topList = topList;
Vue.prototype.$ListContent = ListContent;
Vue.prototype.$getSongDetail = getSongDetail;
Vue.prototype.$getSimiSong = getSimiSong;
Vue.prototype.$getSongComment = getSongComment;
Vue.prototype.$getSongLyric = getSongLyric;
Vue.prototype.$getSongUrl = getSongUrl;
Vue.filter('formatNumber',(Val)=>{
	if(Val >=10000 && Val<=100000000){
		let value = Val/1000
		return `${value.toFixed(1)}万`
	}else if(Val>100000000){
		let value = Val/100000000
		return `${value.toFixed(1)}亿`
	}else{
		return Val
	}
})
Vue.filter('formatDate',(Val)=>{
	const date = new Date(Val);
	return `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日`
})
// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif