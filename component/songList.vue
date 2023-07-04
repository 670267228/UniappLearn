<template>
	<view class="song-list-comp">
		<view class="tit-bar">
			{{title}}
			<navigator :url="link" class="more fr">歌单广场</navigator>
		</view>
		<view class="clearfix">
			<view class="item" v-for="(item,index) in list" :key="index">
				<image :src="item.picUrl + $imgSuffix" class="img"></image>
				<view class="desc">
					{{item.name}}
				</view>
				<view class="count">
					{{item.playCount}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		// 父组件传值用props
		props: {
			title: {
				type: String,
				default: ''
			},
			link: {
				type: String,
				default: ''
			},
			list: {
				type: Array,
				default () {
					return []
				}
			},
		},
		data() {
			return {

			}
		},
		methods: {

		},
	}
</script>

<style lang="scss" scoped>
	.song-list-comp {
		padding-left: 32rpx;
		margin-top: 10rpx;

		.tit-bar {
			font-size: 34rpx;
			font-weight: 600;
			line-height: 110rpx;
		}
	}
</style>