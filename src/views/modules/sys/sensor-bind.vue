<template>
  <el-dialog
    :title="'绑定'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    append-to-body>
    <el-input placeholder="请输入传感器名称" v-model="dataForm.key" class="query" width="200px">
      <el-select v-model="dataForm.gatewayId" slot="prepend" placeholder="请选择">
        <el-option
          v-for="item in gatewayList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <el-button slot="append" icon="el-icon-search" @click="getunBindSensorList()"></el-button>
    </el-input>
    <el-table
      :data="unBindSensorList"
      border
      v-loading="unBindSensorListLoading"
      highlight-current-row
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        prop="name"
        header-align="center"
        align="center"
        label="传感器名称">
      </el-table-column>
      <el-table-column
        prop="no"
        header-align="center"
        align="center"
        label="传感器编号">
      </el-table-column>
    </el-table>
    <div class="footer" align="right">
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="dataForm.pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="dataForm.pageSize"
      :total="dataForm.totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span> 
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        dataForm: {
          key: '',
          gatewayId: '',
          pageIndex: 1,
          pageSize: 20,
          totalPage: 0
        },
        visible: false,
        unBindSensorList: [],
        unBindSensorListLoading: false,
        sensorSelections: [],
        deviceId: '',
        projectId: '',
        gatewayList: []
      }
    },
    methods: {
      init (deviceId) {
        this.deviceId = deviceId
        console.log('deviceId:' + this.deviceId)
        this.projectId = sessionStorage.getItem('projectId')
        this.visible = true
        this.getGatewayList()
      },
      // 获取网关列表
      getGatewayList (data) {
        this.$http({
          url: this.$http.adornUrl('/equipment/gateway/list'),
          method: 'post',
          data: this.$http.adornData({
            // 页码，每页条数
            'programId': this.projectId,
            'page': 1,
            'pageSize': 100,
            'feature': ''
          })
        }).then(({data}) => {
          if (data && data.code === 200) {
            this.gatewayList = data.data.data
          }
        })
      },
       // 获取未绑定设备列表
      getunBindSensorList () {
        this.unBindSensorList = []
        this.unBindSensorListLoading = true
        if (this.unBindSensorList.length <= 0) {
          this.$http({
            url: this.$http.adornUrl('/equipment/sensor/querybygateway'),
            method: 'post',
            data: this.$http.adornData({
              'programId': this.projectId,
              'gatewayId': this.dataForm.gatewayId,
              'feature': this.dataForm.key,
              'page': this.dataForm.pageIndex,
              'pageSize': this.dataForm.pageSize,
              'isBind': false
            })
          }).then(({data}) => {
            if (data && data.code === 200) {
              this.unBindSensorList = data.data.data
              console.log(this.unBindSensorList)
            } else {
              this.unBindSensorList = []
              this.dataForm.totalPage = data.data.total
              this.$message.error(data.msg)
            }
            this.unBindSensorListLoading = false
          })
        }
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
        this.sensorSelections = val.map(item => { return item.id })
        console.log(this.sensorSelections)
      },
      dataFormSubmit () {
        this.visible = false
        this.$nextTick(() => {
          this.$http({
            url: this.$http.adornUrl(`/equipment/device/bindsensor`),
            method: 'post',
            data: this.$http.adornData({
              'deviceId': this.deviceId,
              'programId': this.projectId,
              'sensorIds': this.sensorSelections
            })
          }).then(({data}) => {
            if (data && data.code === 200) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.visible = false
                  this.$emit('refreshData', this.sensorSelections)
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        })
      }
    }
  }
</script>
<style>
  .el-select .el-input {
    width: 110px;
  }
  .query {
    margin-bottom: 15px;
  }
  .footer {
    margin-top: 15px;
  }
</style>
