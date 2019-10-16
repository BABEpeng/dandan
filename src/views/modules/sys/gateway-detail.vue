<template>
  <div class="mod-devicebase">
    <el-main>
      <div class="main">
        <div >
          <el-card :body-style="{ display: 'flex',padding: '0px',border: '0px' }">
                  <div>
                    <el-image
                      style="width: 100px; height: 100px"
                      :src= "dataForm.icon">
                    </el-image>
                  </div>
                  <div style="display: inline-block; margin-left: 15px;">
                    <p>{{'网关名称: ' + dataForm.name }}</p>
                    <p>{{'网关注册码: ' + dataForm.id }}</p>
                    <p>{{'网关运行状态: ' + dataForm.state }}</p>
                  </div>
          </el-card>
          <div>
              <el-tabs v-model="activeName"  @tab-click="tabClickHandle">
              <el-tab-pane label="基础信息" name="detail"  class ="netinfo">
                <div v-if="activeName==='detail'">
                  <span>{{'网关名称: ' + dataForm.name }}</span>
                  <el-divider></el-divider>
                  <span>{{'网关编号: ' + dataForm.no }}</span>
                  <el-divider></el-divider>
                  <span>{{'注册码: ' + dataForm.registerCode }}</span>
                  <el-divider></el-divider>
                  <span>{{'数据协议: ' + dataForm.protocolName }}</span>
                  <el-divider></el-divider>
                  <span>{{'网关状态: ' + dataForm.status }}</span>
                  <el-divider></el-divider>
                  <span>{{'网关位置: ' + dataForm.position }}</span>
                  <el-divider></el-divider>
                  <span>{{'图片: ' + dataForm.icon }}</span>
                  <el-divider></el-divider>
                  <span>{{'备注: ' + dataForm.description }}</span>
                  <el-divider></el-divider>
                </div>
              </el-tab-pane>
              <el-tab-pane label="传感器" name="sensor" class ="netinfo">
                  <div v-if="activeName==='sensor'">
                  <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
                    <el-form-item>
                      <el-input v-model="dataForm.paramKey" placeholder="输入传感器名称" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="getSensorList()">查询</el-button>
                    </el-form-item>
                    <el-form-item class="lay-dev">
                      <el-button type="primary" @click="sensorManageHandle(gatewayId)">新增传感器</el-button>
                      <!--<el-button type="primary" @click="addOrUpdateHandle()">新增</el-button>-->
                      <el-button type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
                    </el-form-item>
                  </el-form>
                  <el-table
                    :data="sensorList"
                    border
                    v-loading="sensorListLoading"
                    :header-cell-style="{color:'#333',fontFamily:'MicrosoftYaHeiUI',fontSize:'12px',fontWeight:900}"
                    :row-style="{fontSize:'12px',color:'#666',fontFamily:'MicrosoftYaHeiUI'}"
                    @selection-change="selectionChangeHandle"
                    style="width: 100%;">
                    <el-table-column
                      type="selection"
                      header-align="center"
                      align="center"
                      width="50">
                    </el-table-column>
                    <el-table-column
                      prop="slaveId"
                      align="center"
                      width="160"
                      label="从机ID">
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      align="center"
                      label="名称">
                    </el-table-column>
                    <el-table-column
                      prop="no"
                      align="center"
                      label="编号">
                    </el-table-column>
                    <el-table-column
                      prop="templateName"
                      align="center"
                      label="点位模版">
                    </el-table-column>
                    <el-table-column
                      prop="position"
                      align="center"
                      label="位置">
                    </el-table-column>
                    <el-table-column
                      prop="description"
                      align="center"
                      label="备注">
                    </el-table-column>
                    <el-table-column
                      prop="isOnline"
                      align="center"
                      width="160"
                      label="在线/离线">
                      <template slot-scope="scope">
                        <el-tag v-if="scope.row.isOnline === true" size="small">在线</el-tag>
                        <el-tag v-else size="small" type="danger">离线</el-tag>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="isStart"
                      align="center"
                      width="160"
                      label="状态">
                      <template slot-scope="scope">
                        <el-tag v-if="scope.row.isStart === true" size="small">启用</el-tag>
                        <el-tag v-else size="small" type="danger">暂停</el-tag>
                      </template>
                    </el-table-column>
                    <el-table-column
                      fixed="right"
                      align="center"
                      width="145"
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
    <!-- 新增传感器 -->
    <sensor-add v-if="sensorAddVisible" ref="sensorAdd" @refreshData="getSensorList"></sensor-add>
    <sensor-update v-if="sensorUpdateVisible" ref="sensorUpdate" @refreshData="getSensorList"></sensor-update>
  </div>
</template>

<script>
  import SensorAdd from './sensor-add'
  import SensorUpdate from './sensor-update'

  export default {
    data () {
      return {
        dataForm: {
          id: '',
          programId: '',
          name: '',
          no: '',
          protocolList: [],
          position: '',
          icon: '路径/ddd/ddd',
          protocol: 1,
          description: '',
          registerCode: '',
          status: 0,
          paramKey: '',
          currentGatewayId: ''
        },
        sensorList: [],
        pageIndex: 0,
        pageSize: 100,
        totalPage: 0,
        sensorListLoading: false,
        sensorAddVisible: false,
        sensorUpdateVisible: false,
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        activeName: this.$route.params.option,
        programId: '',
        gatewayId: this.$route.params.id,
        dataListSelections: []
      }
    },
    components: {
      SensorAdd,
      SensorUpdate
    },
    activated () {
      this.programId = sessionStorage.getItem('projectId')
      this.activeName = this.$route.params.option
      this.init(this.$route.params.id)
      this.getSensorList()
    },
    methods: {
      // 初始化头部信息
      init (id) {
        this.dataForm.id = id
        this.$http({
          url: this.$http.adornUrl(`/equipment/gateway/detail/${this.dataForm.id}`),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.code === 200) {
            this.dataForm.id = data.data.id
            this.dataForm.programId = data.data.programId
            this.dataForm.no = data.data.no
            this.dataForm.name = data.data.name
            this.dataForm.icon = data.data.icon
            this.dataForm.protocol = data.data.protocol
            this.dataForm.protocolName = data.data.protocolName
            this.dataForm.position = data.data.position
            this.dataForm.description = data.data.description
            this.dataForm.registerCode = data.data.registerCode
          }
        })
      },
      // 网关ID查询传感器列表信息
      getSensorList () {
        this.sensorListLoading = true
        this.$nextTick(() => {
          this.$http({
            url: this.$http.adornUrl('/equipment/sensor/list'),
            method: 'post',
            data: this.$http.adornData({
              'programId': this.programId,
              'gatewayId': this.gatewayId,
              'page': this.pageIndex,
              'pageSize': this.pageSize,
              'isBind': false
            })
          }).then(({data}) => {
            console.log(data)
            if (data && data.code === 200) {
              this.sensorList = data.data.data
              this.totalPage = data.data.total
              this.pageIndex = data.data.page
            } else {
              this.sensorList = []
              this.totalPage = 0
            }
            this.sensorListLoading = false
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
        console.log(this.dataListSelections)
      },
      // 删除
      deleteHandle (id) {
        console.log(this.dataListSelections)
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.id
        })
        this.$confirm(`确定进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/equipment/sensor/delete'),
            method: 'post',
            data: this.$http.adornData(ids, false)
          }).then(({data}) => {
            if (data && data.code === 200) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getSensorList()
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        }).catch(() => {})
      },
      tabClickHandle (tab, event) {
        this.activeName = tab.name
      },
      // 新增加传感器
      sensorManageHandle (id) {
        this.sensorAddVisible = true
        this.$nextTick(() => {
          this.$refs.sensorAdd.init(id)
        })
      },
      // 传感器编辑
      editorHandle (id) {
        this.sensorUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.sensorUpdate.init(id)
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
    margin-top: 17px;
  }
</style>
