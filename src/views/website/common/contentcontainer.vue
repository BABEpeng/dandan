<template>
  <div class="contents">
    <el-row>
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <div class="content-sidebar">
          </div>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content bg-purple-light">
          <div class="content">
            <el-tabs
              v-if="$route.meta.isTab"
              v-model="mainTabsActiveName"
              :closable="true"
              @tab-click="selectedTabHandle"
              @tab-remove="removeTabHandle">
              <el-dropdown class="site-tabs__tools" :show-timeout="0">
                <i class="el-icon-arrow-down el-icon--right"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="tabsCloseCurrentHandle">关闭当前标签页</el-dropdown-item>
                  <el-dropdown-item @click.native="tabsCloseOtherHandle">关闭其它标签页</el-dropdown-item>
                  <el-dropdown-item @click.native="tabsCloseAllHandle">关闭全部标签页</el-dropdown-item>
                  <el-dropdown-item @click.native="refresh()">刷新当前标签页</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-tab-pane
                v-for="item in mainTabs"
                :key="item.name"
                :label="item.title"
                :name="item.name">
                <el-card :body-style="siteContentViewHeight">
                  <iframe
                    v-if="item.type === 'iframe'"
                    :src="item.iframeUrl"
                    width="100%" height="100%" frameborder="0" scrolling="yes">
                  </iframe>
                  <keep-alive v-else>
                    <router-view v-if="item.name === mainTabsActiveName" />
                  </keep-alive>
                </el-card>
              </el-tab-pane>
            </el-tabs>
            <!-- 主入口标签页 e -->
            <el-card v-else :body-style="siteContentViewHeight">
              <keep-alive>
                <router-view />
              </keep-alive>
            </el-card>
          </div>
        </div>
      </el-col>
    </el-row>

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

  .contents{
    width:1200px;
    position:relative;
    margin: 0 auto;
    text-align:left;
  }
  .content{
    width: 100%;
    height: auto !important;
    min-height: 700px;
    position: relative;
    margin: 0 auto;
    background: #252e46;;
    text-align: left;
  }
  .content-sidebar {
    width: 100%;
    height: auto !important;
    min-height: 700px;
    position: relative;
    margin: 0 auto;
    padding-bottom: 1px;
    background: #252e46;;
    text-align: left;
    border-right:1px solid #ddd;
  }

  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

</style>
