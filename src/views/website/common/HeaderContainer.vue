<template>
  <div class="header">
    <div class="logoBox">
      <router-link to="/page">
<!--        <img src="~@/assets/iamge/logo.png" />-->
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
      }
    }
  }
</script>
<style lang="scss" scoped>
  .header{
    width:1200px;
    height:60px;
    position:relative;
    margin: 0 auto;
    text-align:left;
  }
  .logoBox{
    width: 146px;
    height: 68px;
    float: left;
  }
  .logoBox:hover{
    background: #8794BA;
  }
  .logoBox img {
    /*width: 146px;*/
  }
</style>
