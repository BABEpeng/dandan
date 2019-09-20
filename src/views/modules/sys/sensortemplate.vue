<template>
  <div class="mod-device">
    <div class="top_title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>网关管理</el-breadcrumb-item>
        <el-breadcrumb-item>点位模版</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="top_content">
      <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
        <el-form-item>
          <el-input v-model="dataForm.paramKey" placeholder="模版名称" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="getDataList()">查询</el-button>
        </el-form-item>
        <el-form-item class="lay-dev">
          <el-button type="primary" @click="addOrUpdateHandle()">新增点位模版</el-button>
          <el-button type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="dataList"
      border
      :header-cell-style="{color:'#333',fontFamily:'MicrosoftYaHeiUI',fontSize:'12px',fontWeight:900}"
      :row-style="{fontSize:'12px',color:'#666',fontFamily:'MicrosoftYaHeiUI'}"
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
        prop="id"
        header-align="center"
        align="center"
        label="编号">
      </el-table-column>
      <el-table-column
        prop="name"
        header-align="center"
        align="center"
        label="点位模版名称">
      </el-table-column>
<!--      <el-table-column-->
<!--        prop="pos"-->
<!--        header-align="center"-->
<!--        align="center"-->
<!--        label="数据点数">-->
<!--      </el-table-column>-->
      <el-table-column
        prop="name"
        header-align="center"
        align="center"
        label="操作者">
      </el-table-column>
      <el-table-column
        prop="addTimestamp"
        header-align="center"
        align="center"
        :formatter="formatDate"
        label="最后更新时间">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <div class="fl">
            <el-button type="primary" size="small" :disabled= true @click="addOrUpdateHandles(scope.row.id)">编辑</el-button>
            <el-button type="primary" size="small" :disabled= true @click="deleteHandle(scope.row.id)">删除</el-button>
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
    <net-wizard-add v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshSensorData="getDataList"></net-wizard-add>
<!--    <net-wizard-update v-if="addOrUpdateVisible" ref="NetWizardUpdate" @refreshData="getDataList"></net-wizard-update>-->

  </div>
</template>

<script>
  import NetWizardAdd from './sensortemplate-add-update'
  import NetWizardUpdate from './netwizardbase'
  import moment from 'moment'
  // import Vuex from 'vuex'
  // let { mapState, mapMutations, mapActions } = Vuex
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
      NetWizardAdd,
      NetWizardUpdate
    },
    activated () {
      this.getDataList()
    },
    mounted () {
      this.programId = JSON.parse(sessionStorage.getItem('projectId'))
    },
    computed: {
      // ...mapState({
      //   dataList: state => state.sensorTemplateData.data,
      //   programId: state => state.projectData.item.id
      // })
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
          url: this.$http.adornUrl('/device/query/program/template'),
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
      // 编辑
      addOrUpdateHandles (id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.NetWizardUpdate.init(id)
        })
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
            url: this.$http.adornUrl('/sys/net/delete'),
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
      }
      // ...mapMutations(['saveSensorTemplate']),
      // ...mapActions(['sensorTemplateFuc'])
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
    margin-right: -20px;
    vertical-align: top;
  }
</style>
