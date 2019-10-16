<template>
  <div class="mod-demo-manger">
    <el-row :gutter="20">
      <div class="addButton">
        <el-form :inline="true" :model="dataForm">
          <el-form-item class="add">
            <el-button type="primary" @click="addOrUpdateHandle()">新增项目</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-col :span="6" v-for="(item, index) in dataList" :key="index">
        <div @click="saveProjectCli(item, index)">
          <el-card :body-style="{ padding: '0px' }">
            <h3>{{item.name}}</h3>
            <img src="~@/assets/img/bg_login.png" class="image">
            <div style="padding: 14px;">
              <div class="bottom clearfix">
                <!-- <p class="description">描述：{{item.description}}</p>-->
                <p>地址：{{item.positionName}}</p>
                <!--  <el-button type="text" class="button">进入</el-button>-->
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update-project v-if="addOrUpdateVisible" ref="AddOrUpdateProject" @refreshDataList="getDataList"></add-or-update-project>
  </div>
</template>

<script>
  import AddOrUpdateProject from './project-add-or-update'
  // import { treeDataTranslate } from '@/utils'
  // import Vuex from 'vuex'
  // let { mapState, mapMutations, mapActions } = Vuex
  export default {
    data () {
      return {
        dataForm: {},
        // dataList: [],
        dataListLoading: false,
        addOrUpdateVisible: false,
        dataList: []
      }
    },
    components: {
      AddOrUpdateProject
    },
    activated () {
      this.getDataList()
    },
    computed: {
      // projectData: {
      //   get () { return this.$store.state.common.mainTabs },
      //   set (val) { this.$store.commit('common/updateMainTabs', val) }
      // }
      // ...mapState({
      //   dataList: state => state.projectData.data
      // })
    },
    methods: {
      saveProjectCli (item, index) {
        // this.saveProjectItemFuc(item)
        // 本地存储当前项目
        sessionStorage.setItem('projectId', item.id)
        this.$router.push({name: 'survey', query: {id: index}})
      },
      // 获取项目列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('equipment/program/list'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data.code === 200) {
            if (data.data.length > 0) {
              let projectId = data.data[0].id
              sessionStorage.setItem('projectId', projectId)
            } else {
              sessionStorage.setItem('projectId', 0)
            }
            this.dataList = data.data
            this.dataListLoading = false
          } else {
            this.$message.error(data.msg)
          }
        })
      },
      // 新增 / 修改
      addOrUpdateHandle (id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.AddOrUpdateProject.init(id)
        })
      }
      // ...mapMutations(['saveProject']),
      // ...mapActions(['saveProjectFuc', 'saveProjectItemFuc'])
    }
  }
</script>

<style lang="scss">
  .mod-demo-manger {
    > .el-row {
      margin-top: -10px;
      margin-bottom: -10px;
      .el-col {
        padding-top: 10px;
        padding-bottom: 10px;
      }
    }
    .chart-box {
      min-height: 400px;
    }
    h3 {
      padding-left: 10px;
    }
  }

  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .addButton {
    height: 33px;
  }
  .add {
    display: block;
    position: absolute;
    right: 0px;
  }
  .description {
    width: 210px;
    overflow-x: hidden;
  }
</style>
