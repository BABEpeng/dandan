<template>
  <div class="header">
    <el-row>
      <el-col :span="4">
        <div class="grid-content">
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
            <el-menu-item index="home" @click="$router.push({ name: 'demo-echart' })">
              <span slot="title">项目管理</span>
            </el-menu-item>
<!--            <el-menu-item index="2" @click="$router.push({ name: '' })">-->
<!--              <span slot="title">楼宇全息</span>-->
<!--            </el-menu-item>-->
            <el-submenu index="3">
              <template slot="title">
                综合报表
              </template>
              <el-menu-item index="3-1" @click="$router.push({ name: '' })">
                <span slot="title">能源报表</span>
              </el-menu-item>
              <el-menu-item index="3-2" @click="$router.push({ name: '' })">
                <span slot="title">设备视图</span>
              </el-menu-item>
              <el-menu-item index="3-3" @click="$router.push({ name: '' })">
                <span slot="title">工单视图</span>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                触发器管理
              </template>
              <el-menu-item index="4-1" @click="$router.push({ name: '' })">
                <span slot="title">触发器列表</span>
              </el-menu-item>
              <el-menu-item index="4-2" @click="$router.push({ name: '' })">
                <span slot="title">触发器添加</span>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title">
                设备管理
              </template>
              <el-menu-item index="5-1" @click="$router.push({ name: '' })">
                <span slot="title">设备列表</span>
              </el-menu-item>
              <el-menu-item index="5-2" @click="$router.push({ name: '' })">
                <span slot="title">触设备添加</span>
              </el-menu-item>
            </el-submenu>
<!--            <el-submenu index="6">-->
<!--              <template slot="title">-->
<!--                网管管理-->
<!--              </template>-->
<!--              <el-menu-item index="6-1" @click="$router.push({ name: 'demo-echart' })">-->
<!--                <span slot="title">网管列表</span>-->
<!--              </el-menu-item>-->
<!--              <el-menu-item index="6-2" @click="$router.push({ name: '' })">-->
<!--                <span slot="title">网管添加</span>-->
<!--              </el-menu-item>-->
<!--            </el-submenu>-->
<!--            <el-submenu index="7">-->
<!--              <template slot="title">-->
<!--                权限管理-->
<!--              </template>-->
<!--              <el-menu-item index="7-1" @click="$router.push({ name: '' })">-->
<!--                <span slot="title">人员管理<</span>-->
<!--              </el-menu-item>-->
<!--              <el-menu-item index="7-2" @click="$router.push({ name: '' })">-->
<!--                <span slot="title">角色添加<</span>-->
<!--              </el-menu-item>-->
<!--            </el-submenu>-->
            <sub-menu
              v-for="menu in menuList"
              :key="menu.menuId"
              :menu="menu"
              :dynamicMenuRoutes="dynamicMenuRoutes">
            </sub-menu>
          </el-menu>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content">
          <el-menu
            class="site-navbar__menu site-navbar__menu--right"
            mode="horizontal">
            <el-menu-item class="site-navbar__avatar" index="3">
              <el-dropdown :show-timeout="0" placement="bottom">
            <span class="el-dropdown-link">
              <img src="~@/assets/img/avatar.png" :alt="userName">{{ userName }}
            </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="updatePasswordHandle()">修改密码</el-dropdown-item>
                  <el-dropdown-item @click.native="logoutHandle()">退出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-menu-item>
          </el-menu>
        </div>
      </el-col>
      <!-- 弹窗, 修改密码 -->
      <update-password v-if="updatePassowrdVisible" ref="updatePassowrd"></update-password>
    </el-row>
  </div>
</template>s

<script>
  import SubMenu from '../../main-sidebar-sub-menu'
  import { isURL } from '../../../utils/validate'
  import UpdatePassword from '../../main-navbar-update-password'
  import { clearLoginInfo } from '../../../utils'
  export default {
    data () {
      return {
        updatePassowrdVisible: false,
        activeIndex: 'home',
        dynamicMenuRoutes: []
      }
    },
    components: {
      SubMenu,
      UpdatePassword
    },
    computed: {
      navbarLayoutType: {
        get () { return this.$store.state.common.navbarLayoutType }
      },
      sidebarFold: {
        get () { return this.$store.state.common.sidebarFold },
        set (val) { this.$store.commit('common/updateSidebarFold', val) }
      },
      mainTabs: {
        get () { return this.$store.state.common.mainTabs },
        set (val) { this.$store.commit('common/updateMainTabs', val) }
      },
      userName: {
        get () { return this.$store.state.user.name }
      },
      sidebarLayoutSkin: {
        get () { return this.$store.state.common.sidebarLayoutSkin }
      },
      // sidebarFold: {
      //   get () { return this.$store.state.common.sidebarFold }
      // },
      menuList: {
        get () { return this.$store.state.common.menuList },
        set (val) { this.$store.commit('common/updateMenuList', val) }
      },
      menuActiveName: {
        get () { return this.$store.state.common.menuActiveName },
        set (val) { this.$store.commit('common/updateMenuActiveName', val) }
      },
      // mainTabs: {
      //   get () { return this.$store.state.common.mainTabs },
      //   set (val) { this.$store.commit('common/updateMainTabs', val) }
      // },
      mainTabsActiveName: {
        get () { return this.$store.state.common.mainTabsActiveName },
        set (val) { this.$store.commit('common/updateMainTabsActiveName', val) }
      }
    },
    created () {
      this.menuList = JSON.parse(sessionStorage.getItem('menuList') || '[]')
      this.dynamicMenuRoutes = JSON.parse(sessionStorage.getItem('dynamicMenuRoutes') || '[]')
      this.routeHandle(this.$route)
    },
    methods: {
      // 修改密码
      updatePasswordHandle () {
        this.updatePassowrdVisible = true
        this.$nextTick(() => {
          this.$refs.updatePassowrd.init()
        })
      },
      // 退出
      logoutHandle () {
        this.$confirm(`确定进行[退出]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/sys/logout'),
            method: 'post',
            data: this.$http.adornData()
          }).then(({data}) => {
            if (data && data.code === 0) {
              clearLoginInfo()
              this.$router.push({ name: 'login' })
            }
          })
        }).catch(() => {})
      },
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
      },
      // 路由操作
      routeHandle (route) {
        if (route.meta.isTab) {
          // tab选中, 不存在先添加
          var tab = this.mainTabs.filter(item => item.name === route.name)[0]
          if (!tab) {
            if (route.meta.isDynamic) {
              route = this.dynamicMenuRoutes.filter(item => item.name === route.name)[0]
              if (!route) {
                return console.error('未能找到可用标签页!')
              }
            }
            tab = {
              menuId: route.meta.menuId || route.name,
              name: route.name,
              title: route.meta.title,
              type: isURL(route.meta.iframeUrl) ? 'iframe' : 'module',
              iframeUrl: route.meta.iframeUrl || '',
              params: route.params,
              query: route.query
            }
            this.mainTabs = this.mainTabs.concat(tab)
          }
          this.menuActiveName = tab.menuId + ''
          this.mainTabsActiveName = tab.name
        }
      }
    }
  }
</script>
<style lang="scss">

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
  .el-menu.el-menu--horizontal {
    border-bottom: solid 0px #e6e6e6;
  }

</style>
