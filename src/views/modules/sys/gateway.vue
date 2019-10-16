<template>
  <div class="mod-device">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.paramKey" placeholder="网关名称 / 网关编号" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
      </el-form-item>
      <el-form-item class="lay-dev">
        <el-button type="primary" @click="gatewayAddOrUpdateHandle()">新增网关</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      :header-cell-style="{color:'#333',fontFamily:'MicrosoftYaHeiUI',fontSize:'14px',fontWeight:900}"
      :row-style="{fontSize:'12px',color:'#666',fontFamily:'MicrosoftYaHeiUI'}"
      style="width: 100%;">
      <el-table-column
        type="index"
        header-align="center"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        prop="no"
        header-align="center"
        align="center"
        width="150"
        label="网关编号">
      </el-table-column>
      <el-table-column
        prop="name"
        header-align="center"
        align="center"
        label="网关名称">
      </el-table-column>
      <el-table-column
        prop="registerCode"
        header-align="center"
        align="center"
        label="注册码">
      </el-table-column>
      <el-table-column
        prop="protocolName"
        header-align="center"
        align="center"
        label="数据协议">
      </el-table-column>
      <el-table-column
        prop="position"
        header-align="center"
        align="center"
        label="网关位置">
      </el-table-column>
      <el-table-column
        prop="isOnline"
        header-align="center"
        align="center"
        label="在线/离线"
        width="100">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.gatewayIsOnline === true" size="small">在线</el-tag>
          <el-tag v-else size="small" type="danger">离线</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="gatewayStatus"
        header-align="center"
        align="center"
        label="状态"
        width="100">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.gatewayStatus === null" size="small">启用</el-tag>
          <el-tag v-else size="small" type="danger">暂停</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="addTimestamp"
        header-align="center"
        align="center"
        :formatter="formatDate"
        width="160"
        label="最后上线时间">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="220"
        label="操作">
        <template slot-scope="scope">
          <div class="fl">
            <el-button type="primary" size="small" @click="gatewayAddOrUpdateHandle(scope.row.id)">编辑</el-button>
            <el-button type="primary" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
            <el-button type="primary" size="small" @click="$router.push({ name: 'gatewayDetail',params: {id: scope.row.id,option:'sensor'}})">传感器</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 绑定传感器 -->
    <gate-way-add-or-update v-if="addOrUpdateVisible" v-bind:gatewayData="gatewayData" ref="gatewayAddOrUpdate" @refreshData="getDataList"></gate-way-add-or-update>
  </div>
</template>

<script>
  import GateWayAddOrUpdate from './gateway-add-or-update'
  import AddOrUpdate from './gateway-ortensia-add'
  import moment from 'moment'
  export default {
    data () {
      return {
        dataForm: {
          paramKey: ''
        },
        dataList: [],
        pageIndex: 0,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
        gatewayData: '',
        programId: ''
      }
    },
    components: {
      GateWayAddOrUpdate,
      AddOrUpdate
    },
    activated () {
      this.programId = sessionStorage.getItem('projectId')
      this.getDataList()
    },
    methods: {
      formatDate (value) {
        this.value1 = new Date(value.addTimestamp)
        let dateValue = moment(this.value1).format('YYYY-MM-DD HH:mm:ss')
        return dateValue
      },
      // 获取网关数据列表
      getDataList (data) {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/equipment/gateway/list'),
          method: 'post',
          data: this.$http.adornData({
            // 页码，每页条数
            'programId': this.programId,
            'page': this.pageIndex,
            'pageSize': this.pageSize,
            'feature': this.dataForm.paramKey
          })
        }).then(({data}) => {
          if (data && data.code === 200) {
            this.dataList = data.data.data
            this.totalPage = data.data.total
            this.pageIndex = data.data.page
            this.gatewayData = data
          } else {
            this.totalPage = 0
            this.$message.error(data.message)
          }
          this.dataListLoading = false
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
      // 新增 / 修改
      gatewayAddOrUpdateHandle (id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.gatewayAddOrUpdate.getProtocolList()
          this.$refs.gatewayAddOrUpdate.init(id)
        })
      },
      // 删除
      deleteHandle (id) {
        this.$confirm(`确定进行[删除]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/equipment/gateway/delete'),
            method: 'post',
            data: this.$http.adornData(id, false)
          }).then(({data}) => {
            if (data && data.code === 200) {
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
      }
    }

  }
</script>
<style lang="scss">
  .lay-dev {
    position: absolute;
    right: 30px;
  }
  .fl{
    display: flex;
  }
  .top_title{
    position: relative;
    top: -11px;
    /*background: #f1f4f5;*/
  }
  .top_content {
    position: relative;
    background: #f1f4f5;
    padding: 18px 0px 0px;
    > .el-form--inline .el-form-item {
      display: inline-block;
      margin-right: 0px;
      vertical-align: top;
    }
  }

</style>
