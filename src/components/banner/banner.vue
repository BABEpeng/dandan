<template>
  <div class="banner">
    <div class="banner-con bg-img">
      <div class="banner-avatar bg-img">
        <div class="bg-img border-box" :style="{backgroundImage: 'url('+authorInfo.avatar+')'}"></div>
        <img class="plat-icon" :src="platIcon[authorInfo.platform]" />
      </div>
      <div class="star-name">
        <span class="f-15 f-bold c-white">{{authorInfo.nickname}}</span>
        <img v-if="isVip" class="vip" :src="vip_url" />
      </div>
      <p class="c-white banner-desc" style="margin-top:8px;">{{authorInfo.description}}</p>
      <p class="c-white" style="margin: 13px 0 18px 0">Followers {{authorInfo.followers}}</p>
      <div class="inline-block overflow">
        <a @click="handleDownload" href=""><div class="border-box banner-follow c-white l">+ follow</div></a>
        <div @click="recommendSwitch" :class="[recommendShow ? 'arrow-open' : '', 'banner-arrow', 'r']"></div>
      </div>
    </div>
    <ul v-show="recommendShow" class="recommend-list">
      <li v-for="item in recommendList" class="overflow border-box">
        <div class="feeds-avatar l bg-img">
          <div class="bg-img" :style="{backgroundImage: 'url('+item.avatar+')'}"></div>
          <img class="plat-icon" :src="platIcon[item.platform]" />
        </div>
        <div class="l text-area overflow">
          <p class="f-15 f-bold" style="margin:8px 0 4px 0;">{{item.nickName}}</p>
          <p class="c-9b">{{item.description}}</p>
        </div>
        <a @click="handleDownload" href="tanqu://home/test?p=12&d=1"><div class="r btn-follow">+关注</div></a>
      </li>
    </ul>
    <div v-if="isVip" class="banner-menu overflow f-15 f-bold c-9b">
      <div @click="changeMenu('feeds')" :class="['l', menuType == 'feeds' ? 'c-02': '']">FEEDS</div>
      <div @click="changeMenu('profile')" :class="['r', menuType == 'profile' ? 'c-02': '']">PROFILE</div>
      <div class="line"></div>
    </div>
  </div>
</template>
<script>
import Vuex from 'vuex'
import vip from '../../assets/images/vip.png'
let { mapState, mapMutations, mapActions } = Vuex

export default {
  'data' () {
    return {
      vip_url: vip
    }
  },
  'computed': {
    ...mapState({
      'isVip': true,
      'params': 'params',
      'platIcon': 'platIcon',
      'menuType': 'menuType',
      'authorInfo': state => state.banner.authorInfo,
      'recommendShow': state => state.banner.recommendShow,
      'recommendList': state => state.banner.recommendList
    })
  },
  'methods': {
    ...mapMutations(['changeMenu', 'recommendSwitch']),
    ...mapActions(['bannerServer', 'handleDownload'])
  },
  created () {
    let params = this.params
    this.$http({
      'url': this.$http.adornUrl('/sys/test'),
      'method': 'get',
      'params': this.$http.adornParams(params)
    }).then(({data}) => {
      if (data && data.code === 0) {
        this.bannerServer(data.content)
      }
    })

    this.$http({
      'url': this.$http.adornUrl('/sys/recommend'),
      'method': 'get',
      'params': this.$http.adornParams(params)
    }).then(({data}) => {
      if (data && data.code === 0) {
        this.bannerServer(data.content)
      }
    })
  }
}
</script>
<style lang="scss">
  .banner {
    width: 100%;
    position: relative;
  }

  .banner-con {
    width: 100%;
    height: 275px;
    background-image: url(/static/images/banner.jpg);
    text-align: center;
    overflow: hidden;
  }

  .banner-avatar {
    width: 70px;
    height: 70px;
    border-radius: 35px;
    margin: 30px auto 4px auto;
    position: relative;
    background-image: url(data:image/png;base64,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);
  }

  .banner-avatar div {
    width: 100%;
    height: 100%;
    border-radius: 35px;
    border: 1px solid #fff;
  }

  .star-name {
    display: inline-block;
    position: relative;
  }

  .star-name .vip {
    width: 12px;
    position: absolute;
    top: 3px;
    right: -16px;
  }

  .banner-desc {
    width: 60%;
    max-height: 43px;
    margin: 0 auto;
    word-wrap: break-word;
    overflow: hidden;
  }

  .banner-follow {
    width: 90px;
    height: 27px;
    border: 1px solid #fff;
    border-radius: 27px;
    text-align: center;
    line-height: 27px;
  }

  .banner-arrow {
    margin-left: 10px;
    width: 27px;
    height: 27px;
    background-color: #fff;
    border-radius: 27px;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAMCAYAAABm+U3GAAAAAXNSR0IArs4c6QAAALhJREFUOBGlkcEJwlAMhiuioEeHcAXFi1uIB6Fz6DpenEFn0IMXZxBBJ1D7BftXKc/4ng18JCTNV8jLslcMSUaTaLM8hb4kE4pHyVLNxDzg+z084ajdedmwprHSIDKb9ADav1B3bLcLO9AgRV6X3vEsoIoeVV3+6ywhaV4ZP4oUebRU/hh5stST60H/lnryDcMT6JHtoYI3leRbDp2lsVQ/M/kaJLR8gxm40XKn7+GIcgxX2MIZ3CgAGLNPef78ZSEAAAAASUVORK5CYII=);
    background-repeat: no-repeat;
    background-size: 9px;
    background-position: center;
    -webkit-transition: all linear 0.3s;
    transition: all linear 0.3s;
  }

  .arrow-open {
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    transform: rotate(180deg);
  }

  .banner-menu {
    width: 100%;
    height: 50px;
    background-color: #fff;
    margin-bottom: 12px;
    position: relative;
  }

  .banner-menu div {
    width: 50%;
    height: 100%;
    text-align: center;
    line-height: 50px;
  }

  .banner-menu .line {
    width: 1px;
    height: 30px;
    background-color: #979797;
    position: absolute;
    top: 10px;
    left: 50%;
  }

  .recommend-list {
    width: 100%;
    background-color: #efefef;
  }

  .recommend-list li {
    width: 100%;
    padding: 15px 14px;
    border-top: 1px solid #e8e8e8;
  }

  .recommend-list li:first-child {
    border: none;
  }

  .recommend-list .text-area {
    width: 50%;
  }

  .btn-follow {
    width: 64px;
    height: 22px;
    background-color: #1b1b1b;
    border-radius: 11px;
    text-align: center;
    line-height: 22px;
    color: #fff;
    margin-top: 14px;
  }


</style>
