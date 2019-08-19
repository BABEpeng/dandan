<template>
  <div>
    <el-container>
      <el-header height="60px">
        <header-container></header-container>
      </el-header>
      <el-main :style="{ height }">

      </el-main>
      <el-footer>
        <footer-container></footer-container>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  import HeaderContainer from '../../views/website/common/headercontainer'
  import FooterContainer from '../../views/website/common/footercontainer'
  export default {
    data () {
      return {
      }
    },
    props: {
      height: {
        type: String,
        default: '600px'
      }
    },
    components: {HeaderContainer, FooterContainer}
  }
</script>
<style lang="scss" scoped>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  .el-container {
    margin-bottom: 40px;
  }

</style>
