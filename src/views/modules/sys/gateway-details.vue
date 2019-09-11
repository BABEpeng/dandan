<template>
  <div class="mod-devicebase">
    <div class="head">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>网关管理</el-breadcrumb-item>
        <el-breadcrumb-item>网关添加</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-main>
      <div class="main">
        <div >
          <el-card :body-style="{ display: 'flex',padding: '0px',border: '0px' }">
            <el-row :gutter="40">
              <el-col :span="8">
                <div class="grid-content">
                  <div class="block">
                    <el-image
                      style="width: 100px; height: 100px"
                      :src= dataList.img
                    ></el-image>
                  </div>
                </div>
              </el-col>
              <el-col :span="16">
                <div class="grid-content">
                  <div class = "info">
                    <p>{{'网关名称: ' + dataList.name }}</p>
                    <p>{{'网关注册码: ' + dataList.id + '复制'}}</p>
                    <p>{{'网关运行状态: ' + dataList.state }}</p>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-card>
          <div>
            <el-tabs v-model="activeName"  @tab-click="handleClick">
              <el-tab-pane label="基础信息" name="first"  class ="netinfo">
                <div v-if="isFirst">
                  <span>{{'设备名称: ' + dataList.name }}</span>
                  <el-divider></el-divider>
                  <span>{{'设备型号: ' + dataList.number }}</span>
                  <el-divider></el-divider>
                  <span>{{'出场日期: ' + dataList.data }}</span>
                  <el-divider></el-divider>
                  <span>{{'生产厂家: ' + dataList.prod }}</span>
                  <el-divider></el-divider>
                  <span>{{'出场编号: ' + dataList.got }}</span>
                  <el-divider></el-divider>
                  <span>{{'安装位置: ' + dataList.pos }}</span>
                  <el-divider></el-divider>
                  <span>{{'负责人: ' + dataList.fuz }}</span>
                  <el-divider></el-divider>
                  <span>{{'联系方式: ' + dataList.tel }}</span>
                  <el-divider></el-divider>
                </div>
              </el-tab-pane>
              <el-tab-pane label="传感器" name="second" class ="netinfo">
                <div v-if="isSecond">
                  <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
                    <el-form-item>
                      <el-input v-model="dataForm.paramKey" placeholder="传感器名称" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="getDataList()">查询</el-button>
                    </el-form-item>
                    <el-form-item class="lay-dev">
                      <el-button type="primary" @click="ortensiaHandle()">绑定传感器</el-button>
                      <!--                    <el-button type="primary" @click="addOrUpdateHandle()">新增</el-button>-->
                      <!--                    <el-button type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>-->
                    </el-form-item>
                  </el-form>
                  <el-table
                    :data="dataLists"
                    border
                    v-loading="dataListLoading"
                    @selection-change="selectionChangeHandle"
                    style="width: 100%;">
                    <el-table-column
                      type="selection"
                      header-align="center"
                      align="center"
                      width="50">
                    </el-table-column>
                    <el-table-column
                      prop="number"
                      header-align="center"
                      align="center"
                      label="从机ID">
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      header-align="center"
                      align="center"
                      label="传感器名称">
                    </el-table-column>
                    <el-table-column
                      prop="number"
                      header-align="center"
                      align="center"
                      label="设备编号">
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      header-align="center"
                      align="center"
                      label="点位模版">
                    </el-table-column>
                    <el-table-column
                      prop="numb"
                      header-align="center"
                      align="center"
                      label="点位数">
                    </el-table-column>
                    <el-table-column
                      prop="numType"
                      header-align="center"
                      align="center"
                      label="位置">
                    </el-table-column>
                    <el-table-column
                      prop="number"
                      header-align="center"
                      align="center"
                      label="备注">
                    </el-table-column>
                    <el-table-column
                      prop="numTypes"
                      header-align="center"
                      align="center"
                      label="在线/离线">
                    </el-table-column>
                    <el-table-column
                      prop="numb"
                      header-align="center"
                      align="center"
                      label="状态">
                    </el-table-column>
                    <el-table-column
                      fixed="right"
                      header-align="center"
                      align="center"
                      width="150"
                      label="操作">
                      <template slot-scope="scope">
                        <div class="fl">
                          <el-button type="primary" size="small" @click="editorHandle(scope.row.id)">编辑</el-button>
                          <el-button type="primary" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
    </el-main>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗,新增传感器 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrtensia" @refreshDataList="getDataList"></add-or-update>
    <!--    编辑-->
    <add-or-updatess v-if="addOrUpdateVisible" ref="addOrtensiass" @refreshDataList="getDataList"></add-or-updatess>
  </div>
</template>

<script>
  import AddOrUpdate from './ortensia-add-or-update'
  import AddOrUpdates from './ortensias-add-or-update'
  import AddOrUpdatess from './ortensiass-add-or-update'

  export default {
    data () {
      return {
        dataForm: {
          paramKey: ''
        },
        dataList: [],
        dataLists: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        activeName: '',
        isFirst: true,
        isSecond: false,
        isThird: false,
        isFour: false,
        isFive: false
      }
    },
    components: {
      AddOrUpdate,
      AddOrUpdates,
      AddOrUpdatess
    },
    activated () {
      this.computedTest()
      this.getDataList()
    },
    methods: {
      computedTest () {
        this.activeName = this.$route.params.option
        return this.activeName
      },
      // 获取设备基础信息 模拟统一接口拿数据，后期分接口拿
      getDataList () {
        this.dataListLoading = true
        this.$nextTick(() => {
          this.$http({
            url: this.$http.adornUrl('/sys/device/info'),
            method: 'get',
            params: this.$http.adornParams({
              'page': this.pageIndex,
              'limit': this.pageSize,
              'paramKey': this.dataForm.paramKey,
              'id': this.$route.params
            })
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.dataList = data.config
              // this.totalPage = data.totalCount
              this.dataLists = data.info
            } else {
              this.dataList = []
              this.dataLists = []
              // this.totalPage = 0
            }
            this.dataListLoading = false
          })
        })
      },
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getDataList()
      },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 删除
      deleteHandle (id) {
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.id
        })
        this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/sys/ortensia/delete'),
            method: 'post',
            data: this.$http.adornData(ids, false)
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        }).catch(() => {})
      },
      handleClick (tab, event) {
        if (tab.name === 'first') {
          this.isFirst = true
          this.isSecond = false
          // 接口数据模拟
          // setTimeout(() => {
          //   this.getDataList()
          // }, 1)
        } else if (tab.name === 'second') {
          this.isFirst = false
          this.isSecond = true
          this.$nextTick(() => {
            // 接口数据模拟
            this.getDataList()
          })
        }
      },
      // 传感器绑定
      ortensiaHandle (id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrtensia.init(id)
        })
      },
      // 传感器编辑
      editorHandle (id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrtensiass.init(id)
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .head{
    padding-left: 19px;
    padding-top: 10px;
  }
  .header {
    height:14px;
  }
  .lay-dev {
    position: absolute;
    right: 30px;
  }
  .fl{
    display: flex;
  }
  .text {
    font-size: 14px;
  }

  .item {
    /*padding: 1px 0;*/
  }


  .box-card {
    display: flex;
  }
  .el-divider--horizontal {
    margin: 13px 0;
  }
  .el-table {
    font-size: 12px;
  }
  .el-card__body {
    padding: 0px;
  }
  .el-card.is-always-shadow {
    -webkit-box-shadow: 0 0px 0px 0;
    box-shadow: 0 0 0px 0;
  }
  .el-card {
    border: 0px solid #646464;
  }
  .netinfo {
    overflow: hidden;
    position: relative;
    top: 17px;
  }
</style>
