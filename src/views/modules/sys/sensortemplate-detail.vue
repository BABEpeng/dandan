<template>
  <div class="mod-devicebase">
    <el-main>
      <div class="main">
          <el-card :body-style="{ display: 'flex',padding: '0px',border: '0px' }">
                  <div>
                    <el-image
                      style="width: 100px; height: 100px"
                      :src= "dataForm.icon">
                    </el-image>
                  </div>
                  <div style="display: inline-block; margin-left: 15px;">
                    <p>{{'模板名称: ' + dataForm.name }}</p>
                    <p>{{'模板编号: ' + dataForm.no }}</p>
                    <p>{{'模板备注: ' + dataForm.description }}</p>
                  </div>
          </el-card>
          <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDotList()">
            <el-form-item>
              <el-input v-model="dataForm.Key" placeholder="点位名称" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getDotList()">查询</el-button>
            </el-form-item>
            <el-form-item class="lay-dev">
              <el-button type="primary" @click="dotAddHandle(templateId)">新增点位</el-button>
            </el-form-item>
          </el-form>
          <el-table
            :data="dotList"
            border
            v-loading="dotListLoading"
            :header-cell-style="{color:'#333',fontFamily:'MicrosoftYaHeiUI',fontSize:'12px',fontWeight:900}"
            :row-style="{fontSize:'12px',color:'#666',fontFamily:'MicrosoftYaHeiUI'}"
            @selection-change="selectionChangeHandle"
            style="width: 100%;">
            <el-table-column
              type="index"
              header-align="center"
              align="center"
              width="50">
            </el-table-column>
            <el-table-column
              prop="name"
              align="center"
              label="名称">
            </el-table-column>
            <el-table-column
              prop="dataName"
              align="center"
              label="数据类型">
            </el-table-column>
            <el-table-column
              prop="registerAddress"
              align="center"
              label="寄存器">
            </el-table-column>
            <el-table-column
              prop="dataDescription"
              align="center"
              label="数值类型">
            </el-table-column>
            <el-table-column
              prop="digitNumber"
              align="center"
              label="小数位数">
            </el-table-column>
            <el-table-column
              prop="operationName"
              align="center"
              label="读写">
            </el-table-column>
            <el-table-column
              prop="unit"
              align="center"
              width="160"
              label="单位">
            </el-table-column>
            <el-table-column
              prop="expression"
              align="center"
              width="160"
              label="公式">
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
    </el-main>
    <!-- 新增传感器 -->
    <dot-add v-if="sensorAddVisible" ref="dotAdd" @refreshData="getDotList"></dot-add>
    <dot-update v-if="sensorUpdateVisible" ref="dotUpdate" @refreshData="getDotList"></dot-update>
  </div>
</template>

<script>
  import DotAdd from './dot-add'
  import DotUpdate from './dot-update'

  export default {
    data () {
      return {
        dataForm: {
          id: '',
          name: '',
          no: '',
          description: '',
          key: ''
        },
        dotList: [],
        dotListLoading: false,
        sensorAddVisible: false,
        sensorUpdateVisible: false,
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        activeName: this.$route.params.option,
        projectId: '',
        templateId: this.$route.params.id,
        dataListSelections: []
      }
    },
    components: {
      DotAdd,
      DotUpdate
    },
    activated () {
      this.projectId = sessionStorage.getItem('projectId')
      this.activeName = this.$route.params.option
      this.init(this.$route.params.id)
      this.getDotList()
      console.log(this.$route.params.id)
    },
    methods: {
      // 初始化头部信息
      init (id) {
        console.log(id)
        this.dataForm.id = id
        this.templateId = id
        this.$http({
          url: this.$http.adornUrl(`/equipment/template/detail/${this.dataForm.id}`),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.code === 200) {
            this.dataForm.id = data.data.id
            this.projectId = data.data.programId
            this.dataForm.no = data.data.no
            this.dataForm.name = data.data.name
            this.dataForm.description = data.data.description
          }
        })
      },
      // 点位模板id查询列表信息
      getDotList () {
        this.dotListLoading = true
        this.$nextTick(() => {
          this.$http({
            url: this.$http.adornUrl('/equipment/templatedata/querybytemplate'),
            method: 'post',
            data: this.$http.adornData({
              'programId': this.projectId,
              'templateId': this.templateId,
              'feature': this.dataForm.key
            })
          }).then(({data}) => {
            console.log(data)
            if (data && data.code === 200) {
              this.dotList = data.data
            } else {
              this.dotList = []
            }
            this.dotListLoading = false
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
        this.$confirm(`确定进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/equipment/templatedata/delete'),
            method: 'post',
            data: this.$http.adornData(id, false)
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getTemplateDataList()
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
      // 新增点位
      dotAddHandle (id) {
        this.sensorAddVisible = true
        this.$nextTick(() => {
          this.$refs.dotAdd.init(id)
        })
      },
      // 传感器编辑
      editorHandle (id) {
        this.sensorUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.dotUpdate.getDataTypeList()
          this.$refs.dotUpdate.getOperationList()
          this.$refs.dotUpdate.init(id)
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
