<template>
  <div class="header">
    <div class="logoBox">
      <h1>
        <router-link to="/page">
           <img src="~@/assets/img/logo.svg" />
        </router-link>
      </h1>
    </div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">处理中心</el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3" disabled>消息中心</el-menu-item>
      <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      }
    },
    methods: {
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
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
  .header h1 {
    margin: 0;
    float: left;
    font-size: 32px;
    font-weight: 400;
  }
  .header h1 a {
    color: #333;
    text-decoration: none;
    display: block;
  }
  .logoBox{
    width: 146px;
    height: 38px;
    position: absolute;
    top: 8px;
    float: left;
  }
  .logoBox:hover{
    background: #8794BA;
  }
  .logoBox img {
    width: 146px;
  }
</style>
