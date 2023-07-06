<template>
	<view>
		<view class="banner">
			<swiper class="swiper" :autoplay="true" :indicator-dots="true" indicator-active-color="#ff372b"
				indicator-color='rgba(255,255,255, .5)' duration="500" :circular="true">
				<swiper-item v-for="(item, index) in swiper" :key="index">
					<view class="item">
						<image :src="item.imageUrl" class="img"></image>
						<view class="tag">{{ item.typeTitle }}</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 主入口模块 -->
		<view class="main-bar flex-box">
			<view class="flex-item" v-for="(item, index) in contentBar" :key="index">
				<image :src="'/static/image/index/t_' + (index + 1) + '.png'" class="img"></image>
				<view>{{ item.name }}</view>
				<view class="date" v-if="index == 0">{{ curDate }}</view>
			</view>
		</view>
		<!-- 推荐歌单组件 -->
		<view>
			<song-list title="推荐歌单" link="test?id=123" :list="recommendSongs"></song-list>
		</view>
		<!-- 歌单分类块 -->
		<view class="song-list">
			<view class="switch-line flex-box">
				<view class="flex-box">
					<view class="switch-item" :class="{on:newType == 1}" @click="switchTab(1)">新碟</view>
					<view class="switch-item" :class="{on:newType == 2}" @click="switchTab(2)">新歌</view>
				</view>
				<template v-if="newType==1">
					<view class="more">
						更多新碟
					</view>
				</template>
				<template v-if="newType==2">
					<view class="more">
						新歌推荐
					</view>
				</template>
			</view>
			<scroll-view class="scroll-view" scroll-x="true">
				<view v-for="(item,index) in lastestAlubm" :key="index">
					<image :src="item.picUrl + $imgSuffix" class="img"></image>
					<view class="desc ellipsis">
						{{item.name}}
					</view>
					<view class="desc ellipsis c9">
						{{item.artist.name}}
					</view>
				</view>
			</scroll-view>
		</view>
		<!--  -->
	</view>
</template>

<script>
	import {
		apiGetBanner,
		apiGetRecommendSongs,
		apiGetTopAlbum,
	} from "@/apis/index";
	import songList from "../../component/songList.vue";

	export default {
		components: {
			songList
		},
		data() {
			return {
				swiper: [],
				loading: false,
				contentBar: [{
						name: "每日推荐"
					},
					{
						name: "歌单"
					},
					{
						name: "排行榜"
					},
					{
						name: "电台"
					},
					{
						name: "直播"
					},
				],
				curDate: '',
				recommendSongs: [],
				newType: 1, //新歌新碟
				lastestAlubm: [],
				lastestTempAlbum: [],
			};
		},

		onLoad() {
			this.getBanner(),
			this.getRecommendSongs(),
			this.getLastestAlbum(),	
			this.curDate = new Date().getDate()
		},
		methods: {
			// 获取轮播图

			getBanner() {
				// 加载状态

				this.loading = true
				/* 	uni.request({
					url: 'http://localhost:3000/banner',
					method: 'GET',
					data: {},
					success: res => {
						this.swiper = res.data.banners
					},
					complete: () => {
						// 加载完成状态
	
						this.loading = false
					}
				}); */
				apiGetBanner().then(res => {
					console.log(res)
					this.swiper = res.banners
				})

			},
			// 获取推荐歌单
			getRecommendSongs() {
				apiGetRecommendSongs().then(res => {
					console.log("RecommendSongs", res)
					this.recommendSongs = res.result
				})
			},
			// 切换新碟新歌
			switchTab(type) {
				this.newType = type
				let temp = {
					s: type == 1 ? 0 : 3,
					e: type == 1 ? 3 : 6
				}
				this.lastestAlubm = this.lastestTempAlbum.slice(temp.s, temp.e)
			},

			// 获取新碟
			getLastestAlbum() {
				apiGetTopAlbum().then(res => {
					this.lastestTempAlbum = res.albums;
					console.log(res)
					this.lastestAlubm = res.albums.slice(0, 3);
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		color: #1a1a1a;
		font-size: 24rpx;
	}

	.banner {
		width: 100%;
		height: 268rpx;
		margin: 30rpx auto 44rpx;

		.swiper {
			height: 268rpx;
		}

		.item {
			position: relative;
			display: block;
			width: 686rpx;
			height: 268rpx;
			margin: 0 auto;
			border-radius: 14rpx;
			overflow: hidden;
		}

		.img {
			display: block;
			width: 100%;
			height: 100%;
		}

		.tag {
			position: absolute;
			bottom: 0;
			right: 0;
			height: 34rpx;
			padding: 0 14rpx;
			line-height: 34rpx;
			color: #fff;
			background: #43a5f0;
			z-index: 10;
			border-top-left-radius: 14rpx;
		}
	}

	.main-bar {
		padding-bottom: 22rpx;
		text-align: center;
		line-height: 70rpx;
		color: #666;
		border-bottom: 1rpx solid #e6e6e6;

		.img {
			display: block;
			width: 92rpx;
			height: 92rpx;
			margin: 0 auto;
		}

		.flex-item {
			position: relative;

			.date {
				position: absolute;
				left: 60rpx;
				top: 40rpx;
				line-height: 1;
				font-size: 24rpx;
				color: #ff392d;
				transform: scale(0.8);
			}
		}
	}
</style>