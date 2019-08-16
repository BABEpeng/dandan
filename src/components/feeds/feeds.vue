<template>
  <div class="feeds">
    <div class="feeds-item" v-for="item in feedsList">
      <div class="feeds-author overflow">
        <div class="feeds-avatar l bg-img">
          <div class="bg-img" :style="{backgroundImage: 'url('+item.author.avatar+')'}"></div>
        <img class="plat-icon" :src= "platIcon[item.author.platform]" />
    </div>
    <div class="l">
      <p class="f-15 f-bold" style="margin:8px 0 2px 0;">{{item.author.nickname}}</p>
      <p class="c-9b">{{formatTime(item.publishTime)}}</p>
    </div>
  </div>
  <div class="feeds-media">
    <div v-if="item.postType=='image'" v-for="item0 in item.feedsMatrix" class="feeds-media-row overflow">
      <div v-for="item1 in item0"
      :class="[item.images.length > 2 ? 'media-item-3' : (item0.length == 1 ? 'media-item-1' : 'media-item-2'), 'feeds-media-item', 'bg-img', 'l']"
      :style="{backgroundImage: 'url('+item1.imageSpec[1].url+')'}"
    >
    </div>
  </div>
  <div @click="handlePlay(item.postId, $event)" v-if="item.postType=='video'" class="feeds-media-row overflow">
  <div v-show="currentPlayer!=item.postId" class="feeds-media-item media-item-1 bg-img"
  :style="{backgroundImage: 'url('+item.video.coverUrl+')'}"
>
  <img class="play-icon" :src = "play_url" />
</div>
<video v-show="currentPlayer==item.postId" controls="controls" preload="preload" :src="item.video.videoUrl"></video>
</div>
</div>
<p class="f-15 c-47 lh-130" style="margin-bottom: 18px;">{{item.content}}</p>
<div class="overflow feeds-contral">
  <img class="l" :src = "like_url" />
  <span class="c-47 f-bold l" style="margin-right: 23px;">{{item.likeCount}}</span>
  <img class="l" :src = "comment_url" />
  <span class="c-47 f-bold l">{{item.commentCount}}</span>
</div>
<div class="comment-list" v-if="item.hotComments.length > 0">
  <ul>
    <li class="overflow" v-for="item0 in item.hotComments">
      <div class="comment-avatar l bg-img">
        <div class="bg-img" :style="{backgroundImage: 'url('+item0.author.avatar+')'}"></div>
</div>
<p style="width: 70%;" class="l f-14 c-47 text-overflow"><span class="f-1b f-bold">{{item0.author.name}}：</span>{{item0.text}}</p>
</li>
</ul>
<a @click="handleDownload" href="tanqu://home/test?p=12&d=1"><p v-if="Number(item.commentCount) > 3" class="c-47" style="margin-top:2px;">查看所有{{item.commentCount}}条评论 &gt;</p></a>
</div>
</div>
</div>
</template>
<script>
import Vuex from 'vuex'
// eslint-disable-next-line no-unused-vars
import play from '../../assets/images/play.png'
import like from '../../assets/images/like.png'
import comment from '../../assets/images/comment.png'

let { mapState, mapMutations, mapActions } = Vuex

export default {
  data () {
    return {
      play_url: play,
      like_url: like,
      comment_url: comment
    }
  },
  computed: {
    ...mapState({
      params: 'params',
      platIcon: 'platIcon',
      feedsList: state => state.feeds.feedsList,
      prevPlayer: state => state.feeds.prevPlayer,
      currentPlayer: state => state.feeds.currentPlayer
    })
  },
  methods: {
    handlePlay (postId, e) {
      let data = {
        postId: postId,
        videoTarget: e.currentTarget.querySelector('video')
      }
      this.handlePlayState(data)
    },
    formatTime (ms) {
      // eslint-disable-next-line one-var
      let date = new Date(ms),
        str = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} / ${date.getHours()}:${date.getMinutes()}`
      // console.log(str);
      return str
    },
    ...mapMutations(['createMatrix', 'testCallback', 'handlePlayState']),
    ...mapActions(['server', 'handleDownload'])
  },
  created () {
    let params = this.params
    if (params) {
      // eslint-disable-next-line no-undef
      this.$http({
        url: this.$http.adornUrl('/sys/feeds'),
        method: 'get',
        params: this.$http.adornParams(params)
      }).then(({data}) => {
        console.log(data)
        if (data && data.code === 0) {
          this.createMatrix(data.content)
        }
      })
    }
  }
}
</script>
<style lang="scss">
  .feeds {

  }

  .feeds-item {
    background-color: #fff;
    padding: 16px 14px 21px 14px;
    margin-bottom: 12px;
  }

  .feeds-author {
    padding-bottom: 16px;
  }

  .feeds-avatar {
    width: 50px;
    height: 50px;
    border-radius: 25px;
    background-image: url(../../assets/images/default.png);
    margin-right: 12px;
    position: relative;
  }

  .feeds-avatar div {
    width: 100%;
    height: 100%;
    border-radius: 25px;
    /*background-color: red;*/
  }

  .feeds-media {
    margin-bottom: 9px;
  }

  .feeds-media-row {
    margin-top: 2%;
  }

  .feeds-media-row video {
    width: 100%;
  }

  .feeds-media-row:first-child {
    margin: 0;
  }

  .feeds-media-row .feeds-media-item:first-child {
    margin: 0 !important;
  }

  .feeds-media-item {
    background-color: #e5e5e5;
    position: relative;
  }

  .media-item-1 {
    width: 100%;
    height: 0;
    padding-bottom: 100%;
  }

  .media-item-2 {
    width: 49%;
    height: 0;
    padding-bottom: 49%;
    margin-left: 2%;
  }

  .media-item-3 {
    width: 32%;
    height: 0;
    padding-bottom: 32%;
    margin-left: 2%;
  }

  .play-icon {
    position: absolute;
    width: 50px;
    left: 50%;
    margin-left: -25px;
    top: 50%;
    margin-top: -25px;
  }

  .feeds-contral {
    line-height: 18px;
  }

  .feeds-contral img {
    width: 18px;
    margin-right: 8px;
  }

  .comment-list {
    margin-top: 14px;
    border-top: 1px solid #bababa;
    padding-top: 12px;
  }

  .comment-list li {
    line-height: 28px;
    margin-bottom: 8px;
  }

  .comment-avatar {
    width: 27px;
    height: 27px;
    border-radius: 27px;
    background-image: url(../../assets/images/default.png);
    margin-right: 12px;
    position: relative;
  }

  .comment-avatar div {
    width: 100%;
    height: 100%;
    border-radius: 27px;
    /*background-color: red;*/
  }
</style>
