const latestBaseUrl = 'http://news-at.zhihu.com/api/3/'
export const latestRequest = (options)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url:latestBaseUrl+options.url,
			method:options.method || 'GET',
			data:options.data || '{}',
			success:(value)=>{resolve(value)},
			fail:(err)=>{reject(err)}
		})
	})
};

const historyBaseUrl = 'http://news-at.zhihu.com/api/3/news/'

export const historyRequest = (options)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url:historyBaseUrl+options.url,
			method:options.method || 'GET',
			data:options.data || '{}',
			success:(value)=>{resolve(value)},
			fail:(err)=>{reject(err)}
		})
	})
}