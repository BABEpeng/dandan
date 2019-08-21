<template>
  <div class="header">
    <el-row>
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <div class="logoBox">
            <h1>
              <router-link to="/page">
                <img src="~@/assets/img/logo.svg" />
              </router-link>
            </h1>
          </div>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content bg-purple-light">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#22325E"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item index="1">项目管理</el-menu-item>
            <el-menu-item index="2" disabled>楼宇全息</el-menu-item>
            <el-submenu index="3">
              <template slot="title">综合报表</template>
              <el-menu-item index="3-1"><router-link to=''>能源报表</router-link></el-menu-item>
              <el-menu-item index="3-2"><router-link to=''>设备视图</router-link></el-menu-item>
              <el-menu-item index="3-3"><router-link to=''>工单视图</router-link></el-menu-item>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">触发器管理</template>
              <el-menu-item index="4-1"><router-link to=''>触发器列表</router-link></el-menu-item>
              <el-menu-item index="4-2"><router-link to=''>触发器添加</router-link></el-menu-item>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title">设备管理</template>
              <el-menu-item index="5-1"><router-link to=''>设备列表</router-link></el-menu-item>
              <el-menu-item index="5-2"><router-link to=''>设备添加</router-link></el-menu-item>
            </el-submenu>
            <el-submenu index="6">
              <template slot="title">网管管理</template>
              <el-menu-item index="6-1"><router-link to=''>网管管理</router-link></el-menu-item>
              <el-menu-item index="6-2"><router-link to=''>网管添加</router-link></el-menu-item>
            </el-submenu>
            <el-submenu index="7">
              <template slot="title">权限管理</template>
              <el-menu-item index="7-1"><router-link to=''>人员管理</router-link></el-menu-item>
              <el-menu-item index="7-2"><router-link to=''>角色添加</router-link></el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple">

        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        activeIndex: '1'
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
    height:61px;
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
    padding-top: 8px;
  }
  .logoBox:hover{
    background: #8794BA;
  }
  .logoBox img {
    width: 146px;
  }
  .el-submenu >.el-menu-item {
    width:200px;
  }
</style>
