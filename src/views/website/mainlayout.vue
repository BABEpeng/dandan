<template>
  <div>
    <el-container class= 'layout'>
      <el-header>
        <header-container class = 'header-wrap'></header-container>
      </el-header>
<!--      <el-main :style="{ height }">-->
       <el-main>
         <content-container class = 'content-wrap'></content-container>
      </el-main>
      <el-footer>
        <footer-container class="footer-wrap"></footer-container>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  import HeaderContainer from '../../views/website/common/headercontainer'
  import ContentContainer from '../../views/website/common/contentcontainer'
  import FooterContainer from '../../views/website/common/footercontainer'
  export default {
    data () {
      return {
      }
    },
    props: {
      height: {
        type: String,
        default: '70px'
      }
    },
    components: {HeaderContainer, ContentContainer, FooterContainer}
  }
</script>
<style lang="scss" scoped >

  body{
    width:100%;
    height:100%;
    position:relative;
    color:#666;
    -webkit-text-size-adjust:none;
    text-align:center;
  }
  .layout{
    /*min-width: 1200px;*/
    background: #22325E;
    font-family: 'PingFangSC-Regular, sans-serif';
  }
  .el-header{
    padding: 0;
  }
  .header-wrap{
    height: 88px;
    width:100%;
    position:relative;
    padding: 0;
    border-bottom:1px solid #ddd;
    background: #22325E;
    z-index:9;
  }
  .el-main{
    padding: 3px;
  }

  .content-wrap {
    width: 100%;
    height: auto !important;
    position: relative;
    margin: 0 auto;
    text-align: left;
  }

  .el-footer{
    padding: 0;
  }
  .footer-wrap{
    height: 60px;
    width:100%;
    padding: 0;
    background:#22325E;
    text-align:center;
  }

</style>
