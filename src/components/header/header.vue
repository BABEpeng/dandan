<template>
  <div class="header overflow">
    <img class="logo l" :src="logo_url" />
    <img class="logo-text l" :src="logoText_url" />
    <a @click="handleDownload" href=""><div class="download-btn r">前往</div></a>
  </div>
</template>
<script>
import Vuex from 'vuex'
import logo from '../../assets/images/logo.png'
import logoText from '../../assets/images/logoText.png'

let { mapActions } = Vuex

export default {
  data () {
    return {
      logo_url: logo,
      logoText_url: logoText
    }
  },
  methods: {
    // eslint-disable-next-line no-undef
    ...mapActions([
      'handleDownload'
    ])
  }
}
</script>
<style lang="scss">
  .header {
    width: 100%;
    height: 60px;
    background-color: #eee;
  }

  .download-btn {
    width: 100px;
    height: 27px;
    background-color: #1a1a1a;
    color: #fff;
    border-radius: 27px;
    text-align: center;
    line-height: 27px;
    margin: 17px 11px 0 0;
  }

  .logo {
    width: 40px;
    height: 40px;
    margin: 10px 14px 0 14px;
  }

  .logo-text {
    width: auto;
    height: 30px;
    margin-top: 16px;
  }
</style>
