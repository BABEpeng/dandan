<template>
  <nav class="site-navbar" :class="'site-navbar--' + navbarLayoutType">
    <div class="site-navbar__header">
      <h1 class="site-navbar__brand" @click="$router.push({ name: 'home' })">
        <a class="site-navbar__brand-lg" href="javascript:;">LOGO</a>
        <a class="site-navbar__brand-mini" href="javascript:;">金捷利</a>
      </h1>
    </div>
    <div class="site-navbar__body clearfix">
      <el-menu
        class="site-navbar__menu"
        mode="horizontal">
        <el-menu-item class="site-navbar__switch" index="0" @click="sidebarFold = !sidebarFold">
          <icon-svg name="zhedie"></icon-svg>
        </el-menu-item>
      </el-menu>
      <div class="project">
<!--        <el-select size="mini" v-model="value" placeholder="请选择">-->
<!--          <el-option-->
<!--            v-for="item in options"-->
<!--            :key="item.value"-->
<!--            :label="item.label"-->
<!--            :value="item.value">-->
<!--          </el-option>-->
<!--        </el-select>-->
      </div>
      <el-menu
        class="site-navbar__menu site-navbar__menu--right"
        mode="horizontal">
<!--        <el-menu-item index="1" @click="$router.push({ name: 'theme' })">-->
<!--          <template slot="title">-->
<!--            <el-badge value="new">-->
<!--              <icon-svg name="shezhi" class="el-icon-setting"></icon-svg>-->
<!--            </el-badge>-->
<!--          </template>-->
<!--        </el-menu-item>-->
<!--        <el-menu-item index="2">-->
<!--          <el-badge value="hot">-->
<!--            <a href="//www.renren.io/" target="_blank">官方社区</a>-->
<!--          </el-badge>-->
<!--        </el-menu-item>-->
<!--        <el-submenu index="3">-->
<!--          <template slot="title">Git源码</template>-->
<!--          <el-menu-item index="2-1"><a href="//github.com/daxiongYang/renren-fast-vue" target="_blank">前端</a></el-menu-item>-->
<!--          <el-menu-item index="2-2"><a href="//git.oschina.net/renrenio/renren-fast" target="_blank">后台</a></el-menu-item>-->
<!--          <el-menu-item index="2-3"><a href="//git.oschina.net/renrenio/renren-generator" target="_blank">代码生成器</a></el-menu-item>-->
<!--        </el-submenu>-->
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
    <!-- 弹窗, 修改密码 -->
    <update-password v-if="updatePassowrdVisible" ref="updatePassowrd"></update-password>
  </nav>
</template>

<script>
  import UpdatePassword from './main-navbar-update-password'
  import { clearLoginInfo } from '@/utils'
  export default {
    data () {
      return {
        updatePassowrdVisible: false
          // options: [{
          //     value: '项目一',
          //     label: '金捷利项目一'
          // }, {
          //     value: '项目二',
          //     label: '金捷利项目二'
          // }, {
          //     value: '项目三',
          //     label: '金捷利项目三'
          // }],
          // value: '项目一'
      }
    },
    components: {
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
      }
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
      }
    }
  }
</script>
<style lang="scss">
  .site-navbar__body {
    background-color: #061d36;
  }
  .el-menu.el-menu--horizontal {
    border-bottom: solid 0px #e6e6e6;
  }
  .site-content > .el-tabs > .el-tabs__header {
    position: static;
    top: 0px;
    left: 0px;
    right: 0;
    z-index: 0;
    padding: 0;
    -webkit-box-shadow: 0;
    box-shadow: 0;
    background-color: #fff;
  }
  .site-navbar__header {
    position: relative;
    float: left;
    width: 117px;
    height: 50px;
    overflow: hidden;
  }
  .site-navbar__body {
    position: relative;
    margin-left: 117px;
    padding-right: 15px;
    background-color: #fff;
  }

  /*.el-input__inner {*/
  /*  background-color: #061d36;*/
  /*  border: 1px solid #061d36;*/
  /*}*/
  .project{
    height: 50px;
    line-height: 50px;
    float: left;
  }
</style>
