<template>
  <aside class="site-sidebar" :class="'site-sidebar--' + sidebarLayoutSkin">
    <div class="site-sidebar__inner">
      <el-menu
        :default-active="menuActiveName || 'home'"
        :collapse="sidebarFold"
        :collapseTransition="false"
        class="site-sidebar__menu">
<!--        <el-menu-item index="home" @click="$router.push({ name: 'home' })">-->
<!--          <icon-svg name="shouye" class="site-sidebar__menu-icon"></icon-svg>-->
<!--          <span slot="title">首页</span>-->
<!--        </el-menu-item>-->
<!--        <el-submenu index="demo">-->
<!--          <template slot="title">-->
<!--            <icon-svg name="shoucang" class="site-sidebar__menu-icon"></icon-svg>-->
<!--            <span>demo</span>-->
<!--          </template>-->
<!--          <el-menu-item index="demo-echarts" @click="$router.push({ name: 'demo-echarts' })">-->
<!--            <icon-svg name="tubiao" class="site-sidebar__menu-icon"></icon-svg>-->
<!--            <span slot="title">echarts</span>-->
<!--          </el-menu-item>-->
<!--          <el-menu-item index="demo-ueditor" @click="$router.push({ name: 'demo-ueditor' })">-->
<!--            <icon-svg name="editor" class="site-sidebar__menu-icon"></icon-svg>-->
<!--            <span slot="title">ueditor</span>-->
<!--          </el-menu-item>-->
<!--        </el-submenu>-->
<!--        <el-menu-item index="manage" @click="$router.push({ name: 'home' })">-->
<!--          <icon-svg name="system" class="site-sidebar__menu-icon"></icon-svg>-->
<!--          <span slot="title">项目管理</span>-->
<!--        </el-menu-item>-->
<!--        <el-menu-item index="hologram" @click="$router.push({ name: '' })">-->
<!--          <icon-svg name="system" class="site-sidebar__menu-icon"></icon-svg>-->
<!--          <span slot="title">楼宇全息</span>-->
<!--        </el-menu-item>-->
        <sub-menu
          v-for="menu in menuList"
          :key="menu.menuId"
          :menu="menu"
          :default-active="$route.path"
          :dynamicMenuRoutes="dynamicMenuRoutes">
        </sub-menu>
      </el-menu>
    </div>
  </aside>
</template>

<script>
  import SubMenu from './main-sidebar-sub-menu'
  import { isURL } from '@/utils/validate'
  export default {
    data () {
      return {
        dynamicMenuRoutes: []
      }
    },
    components: {
      SubMenu
    },
    computed: {
      sidebarLayoutSkin: {
        get () { return this.$store.state.common.sidebarLayoutSkin }
      },
      sidebarFold: {
        get () { return this.$store.state.common.sidebarFold }
      },
      menuList: {
        get () { return this.$store.state.common.menuList },
        set (val) { this.$store.commit('common/updateMenuList', val) }
      },
      menuActiveName: {
        get () { return this.$store.state.common.menuActiveName },
        set (val) { this.$store.commit('common/updateMenuActiveName', val) }
      },
      mainTabs: {
        get () { return this.$store.state.common.mainTabs },
        set (val) { this.$store.commit('common/updateMainTabs', val) }
      },
      mainTabsActiveName: {
        get () { return this.$store.state.common.mainTabsActiveName },
        set (val) { this.$store.commit('common/updateMainTabsActiveName', val) }
      }
    },
    watch: {
      $route: 'routeHandle'
    },
    created () {
      this.menuList = JSON.parse(sessionStorage.getItem('menuList') || '[]')
      this.dynamicMenuRoutes = JSON.parse(sessionStorage.getItem('dynamicMenuRoutes') || '[]')
      this.routeHandle(this.$route)
    },
    methods: {
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
  /*.site-sidebar__menu li:hover {*/
  /*  background: #3795E8;*/
  /*}*/
  /*.site-sidebar__menu el-menu:hover {*/
  /*  background: #3795E8;*/

  /*}*/
  .site-sidebar {
    position: fixed;
    top: 50px;
    left: 0;
    bottom: 0;
    z-index: 1020;
    width: 177px;
    overflow: hidden;
  }
  .site-sidebar__inner {
    position: relative;
    z-index: 1;
    width: 177px;
    height: 100%;
    padding-bottom: 15px;
    overflow-y: scroll;
  }
  .site-sidebar__menu.el-menu {
    width: 177px;
    border-right: 0;
  }
  .site-content__wrapper {
    position: relative;
    padding-top: 50px;
    margin-left: 177px;
    min-height: 100%;
    /*background: #f1f4f5;*/
  }
  .site-navbar__body {
    position: relative;
    margin-left: 177px;
    padding-right: 15px;
    background-color: #061d36;
  }
  li {
    line-height: normal;
    padding: 0px;
  }
</style>
