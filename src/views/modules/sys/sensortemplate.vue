<template>
  <div class="mod-device">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.paramKey" placeholder="模版名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
      </el-form-item>
      <el-form-item class="lay-dev">
        <el-button type="primary" @click="addOrUpdateHandle()">新增点位模版</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      :header-cell-style="{color:'#333',fontFamily:'MicrosoftYaHeiUI',fontSize:'14px',fontWeight:900}"
      :row-style="{fontSize:'12px',color:'#666',fontFamily:'MicrosoftYaHeiUI'}"
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
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
        label="编号">
      </el-table-column>
      <el-table-column
        prop="name"
        header-align="center"
        align="center"
        label="点位模版名称">
      </el-table-column>
      <el-table-column
        prop="description"
        header-align="center"
        align="center"
        label="备注">
      </el-table-column>
<!--      <el-table-column-->
<!--        prop="pos"-->
<!--        header-align="center"-->
<!--        align="center"-->
<!--        label="数据点数">-->
<!--      </el-table-column>-->
      <el-table-column
        prop="addTimestamp"
        header-align="center"
        align="center"
        :formatter="formatDate"
        width="160"
        label="最后更新时间">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="230"
        label="操作">
        <template slot-scope="scope">
          <div class="fl">
            <el-button type="primary" size="small" @click="addOrUpdateHandle(scope.row.id)">编辑</el-button>
            <el-button type="primary" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
            <el-button type="primary" size="small" @click="$router.push({ name: 'templateDetail',params: {id: scope.row.id,option:'sensor'}})">点位管理</el-button>
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
    <!-- 弹窗, 新增点位模版 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshSensorData="getDataList"></add-or-update>
  </div>
</template>

<script>
  import AddOrUpdate from './sensortemplate-add-update'
  import NetWizardUpdate from './netwizardbase'
  import moment from 'moment'
  export default {
    data () {
      return {
        dataForm: {
          paramKey: ''
        },
        pageIndex: 0,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
        programId: '',
        dataList: []
      }
    },
    components: {
      AddOrUpdate,
      NetWizardUpdate
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
      // 获取点位模版数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/equipment/template/list'),
          method: 'post',
          data: this.$http.adornData({
            // 页码，每页条数
            'programId': this.programId,
            'page': this.pageIndex,
            'pageSize': this.pageSize,
            'feature': this.dataForm.paramKey
          })
        }).then(({data}) => {
          console.log(data)
          if (data && data.code === 200) {
            // this.sensorTemplateFuc(data.data.data)
            this.dataList = data.data.data
            this.totalPage = data.data.total
            this.pageIndex = data.data.page
          } else {
            // this.sensorTemplateFuc([])
            this.totalPage = 0
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
      // 新增
      addOrUpdateHandle (id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
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
            url: this.$http.adornUrl('/equipment/template/delete'),
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
  }
  .el-form--inline .el-form-item {
    display: inline-block;
    margin-right: 0px;
    vertical-align: top;
  }
</style>
