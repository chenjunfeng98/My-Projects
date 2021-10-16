const SWIPER_BASEURL = 'https://api-hmugo-web.itheima.net/api/public/v1/';

const myRequest = (option) =>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url:SWIPER_BASEURL+option.url,
			method:option.method || "GET",
			data:option.data || {},
			success:(value)=>{resolve(value)},
			fail:(err)=>{reject(err)}
		})
	})
};

export {myRequest}