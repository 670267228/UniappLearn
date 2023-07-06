import req from "../untils/request";

export function apiGetBanner(data) {
	return req.request({
		url: "/banner",
		method: "GET",
		data: data,
		authType: "None",
	});
}

// 获取推荐歌单
export function apiGetRecommendSongs(data) {
	return req.request({
		url: "/personalized",
		method: "GET",
		data,
		authType: 'None'
	})

}



// 获取新碟
export function apiGetTopAlbum(data) {
	return req.request({
		url: "/album/newest",
		method: "GET",
		data,
		authType: "None"
	})
}