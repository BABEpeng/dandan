<template>
  <div class="add-dialog">
    <el-dialog
      :title="!dataForm.id ? '添加传感器' : '修改传感器'"
      :close-on-click-modal="false"
      :visible.sync="visible"
    >
      <div class="add-sensor" align="right">
        <el-button type="primary" @click="addOrUpdateHandle()">新增</el-button>
      </div>
      <el-form :model="dataForm" ref="dataForm" @keyup.enter.native="dataFormSubmit()">
        <el-table 
        :data="sensorList" 
        border 
        v-loading="dataListLoading" 
        style="width: 100%;"
        :header-cell-style="{color:'#333',fontFamily:'MicrosoftYaHeiUI',fontSize:'14px',fontWeight:900}"
        :row-style="{fontSize:'12px',color:'#666',fontFamily:'MicrosoftYaHeiUI'}">
          <el-table-column
            prop="slaveId"
            header-align="center"
            align="center"
            width="150"
            label="从机ID">
            <template slot-scope="scope">
              <el-form-item prop="slaveId">
                <el-input size="mini" placeholder="请输入从机ID" v-model="scope.row.slaveId"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            header-align="center"
            align="center"
            label="名称">
            <template slot-scope="scope">
              <el-form-item prop="name">
                <el-input size="mini" placeholder="请输入名称" v-model="scope.row.name"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            width="150"
            label="编号">
            <template slot-scope="scope">
              <el-form-item>
                <el-input size="mini" placeholder="请输入编号" v-model="scope.row.no"></el-input>
              </el-form-item> 
            </template>
          </el-table-column>
          <el-table-column
            prop="position"
            header-align="center"
            align="center"
            label="位置">
            <template slot-scope="scope">
              <el-form-item prop="position">
                <el-input size="mini" placeholder="请输入位置" v-model="scope.row.position"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            prop="description"
            header-align="center"
            align="center"
            label="备注">
            <template slot-scope="scope">
              <el-form-item prop="description">
                <el-input size="mini" placeholder="请输入备注" v-model="scope.row.description"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            prop="templateName"
            header-align="center"
            align="center"
            label="点位模板">
            <template slot-scope="scope">
              <el-form-item prop="templateName">
                <el-select v-model="scope.row.templateId" placeholder="点位模板" clearable style="width:155px;">
                  <el-option
                    v-for="item in templateList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            prop="wheelLoop"
            header-align="center"
            align="center"
            width="150"
            label="轮询时间">
            <template slot-scope="scope">
                <el-form-item prop="wheelLoop">
                  <el-input size="mini" placeholder="请输入轮询时间" v-model="scope.row.wheelLoop"></el-input>
                </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="deleteHandle(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">完成</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        dataListLoading: false,
        dataForm: {
          slaveId: '',
          name: '',
          no: '',
          position: '',
          description: '',
          wheelLoop: '',
          templateId: '',
          gatewayId: this.gatewayId
        },
        dataRule: {
          slaveId: [
            { required: true, trigger: 'blur', validator: this.validateSlaveId }
          ],
          name: [
            { required: true, message: '巡检项不能为空', trigger: 'change' }
          ],
          no: [{ required: true, message: '编号不能为空', trigger: 'change' }],
          position: [{ required: true, message: '位置不能为空', trigger: 'blur' }],
          description: [{ required: true, message: '备注不能为空', trigger: 'blur' }],
          templateName: [{ required: true, message: '模版不能为空', trigger: 'blur' }],
          wheelLoop: [{ required: true, message: '轮询不能为空', trigger: 'blur' }]
        },
        pageIndex: 0,
        pageSize: 10,
        totalPage: 0,
        sensorListLoading: false,
        sensorListSelections: [],
        templateList: [],
        sensorList: []
      }
    },
    methods: {
      validateSlaveId (rule, value, callback) {
        console.log('从机ID不能为空')
        return callback()
      },
      // 获取数据列表
      init (gatewayId) {
        this.visible = true
        this.gatewayId = gatewayId
        this.projectId = sessionStorage.getItem('projectId')
        let row = {
          slaveId: '',
          name: '',
          no: '',
          position: '',
          description: '',
          wheelLoop: '',
          templateId: '',
          gatewayId: this.gatewayId,
          programId: this.projectId
        }
        this.sensorList = []
        this.sensorList.push(row)
        this.getTemplateList()
      },
      getTemplateList () {
        this.$http({
          url: this.$http.adornUrl('/equipment/template/list'),
          method: 'post',
          data: this.$http.adornData({
            'programId': this.projectId,
            'page': this.pageIndex,
            'pageSize': this.pageSize,
            'feature': ''
          })
        }).then(({data}) => {
          if (data && data.code === 200) {
            this.templateList = data.data.data
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$nextTick(() => {
              this.$http({
                url: this.$http.adornUrl(`/equipment/sensor/save`),
                method: 'post',
                data: JSON.stringify(this.sensorList)
              }).then(({data}) => {
                if (data && data.code === 200) {
                  this.$message({
                    message: '操作成功',
                    type: 'success',
                    duration: 1500,
                    onClose: () => {
                      this.visible = false
                      this.$emit('refreshData')
                    }
                  })
                } else {
                  this.$message.error(data.msg)
                }
              })
            })
          }
        })
      },
      // 删除
      deleteHandle (index) {
        this.sensorList.splice(index, 1)
      },
      addOrUpdateHandle () {
        let row = {
          isSet: false,
          slaveId: 0,
          name: '',
          no: '',
          position: '',
          description: '',
          wheelLoop: 0,
          templateId: '',
          gatewayId: this.gatewayId,
          programId: this.projectId
        }
        this.sensorList.push(row)
      }
    }
  }
</script>
<style lang="scss" >

  .add-dialog .el-dialog__footer {
    text-align: center;
  }
  .add-dialog .el-form-item__content{
    margin-left: 0px;
  }
  .add-dialog .el-dialog {
    width: 80%;
  }
  .add-dialog .add-sensor {
    margin-bottom: 20px;
    right: 13px;
  }
  .el-icon-close:before {
    content: "关闭";
  }

  /*点位模版*/
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
</style>
