<template>
  <div class="add-dialog">
    <el-dialog
      :title="!dataForm.id ? '添加点位' : '修改点位'"
      :close-on-click-modal="false"
      :visible.sync="visible"
    >
      <div class="add-dot" align="right">
        <el-button type="primary" @click="addOrUpdateHandle()">新增</el-button>
      </div>
      <el-form :model="dataForm" ref="dataForm" @keyup.enter.native="dataFormSubmit()">
        <el-table 
        :data="dotList" 
        border 
        v-loading="dotListLoading" 
        style="width: 100%;"
        :header-cell-style="{color:'#333',fontFamily:'MicrosoftYaHeiUI',fontSize:'14px',fontWeight:900}"
        :row-style="{fontSize:'12px',color:'#666',fontFamily:'MicrosoftYaHeiUI'}">
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
              prop="dataType"
              header-align="center"
              align="center"
              label="数据类型">
              <template slot-scope="scope">
                <el-form-item prop="dataType">
                  <el-select size="mini"
                  @change="dataTypeChange(scope.$index,scope.row)"
                  v-model="scope.row.dataType" placeholder="数据类型" clearable>
                    <el-option
                      v-for="item in dataTypeList"
                      :key="item.key"
                      :label="item.name"
                      :value="item.key">
                    </el-option>
                  </el-select>
                </el-form-item>
              </template>
          </el-table-column>
          <el-table-column
              prop="valueType"
              header-align="center"
              align="center"
              label="数值类型">
              <template slot-scope="scope">
                <el-form-item prop="valueType">
                  <el-select v-model="scope.row.valueType" size="mini" placeholder="数值类型" clearable>
                    <el-option
                      v-for="items in valueTypeList"
                      :key="items.value"
                      :label="items.description"
                      :value="items.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </template>
          </el-table-column>
          <el-table-column
              prop="registerAddress"
              header-align="center"
              align="center"
              width="150"
              label="寄存器地址">
              <template slot-scope="scope">
                <el-form-item prop="registerAddress">
                  <el-input size="mini" placeholder="请输入位置" v-model="scope.row.registerAddress"></el-input>
                </el-form-item>
              </template>
          </el-table-column>
          <el-table-column
              prop="digitNumber"
              header-align="center"
              align="center"
              width="150"
              label="小数位数">
              <template slot-scope="scope">
                <el-form-item prop="digitNumber">
                  <el-input size="mini" placeholder="请输入小数位数" v-model="scope.row.digitNumber"></el-input>
                </el-form-item>
              </template>
          </el-table-column>
          <el-table-column
              prop="operation"
              header-align="center"
              align="center"
              width="150"
              label="读写模式">
              <template slot-scope="scope">
                <el-form-item prop="operation">
                  <el-select v-model="scope.row.operation" size="mini" placeholder="读写模式" clearable >
                    <el-option
                      v-for="item in operationList"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </template>
          </el-table-column>
          <el-table-column
              prop="unit"
              header-align="center"
              align="center"
              width="150"
              label="单位">
              <template slot-scope="scope">
                <el-form-item prop="unit">
                  <el-input size="mini" placeholder="请输入单位" v-model="scope.row.unit"></el-input>
                </el-form-item>
              </template>
          </el-table-column>
          <el-table-column
              prop="expression"
              header-align="center"
              align="center"
              label="公式">
              <template slot-scope="scope">
                <el-form-item prop="expression">
                  <el-input size="mini" placeholder="请输入公式" v-model="scope.row.expression"></el-input>
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
        indexNum:0,
        dotList: [],
        dataTypeList: [],
        valueTypeList: [],
        operationList: [],
        dotListLoading: false,
        dataForm: {
        },
        validators: {
          slaveId ({ slaveId }, next) {
            if (!slaveId) {
              next('从机ID不能为空')
            } else {
              next('')
            }
          },
          name ({ name }, next) {
            if (!name) {
              next('名称不能为空')
            } else {
              next('')
            }
          },
          no ({ no }, next) {
            if (!no) {
              next('编号不能为空')
            } else {
              next('')
            }
          },
          position ({ position }, next) {
            if (!position) {
              next('位置不能为空')
            } else {
              next('')
            }
          },
          description ({ description }, next) {
            if (!description) {
              next('备注不能为空')
            } else {
              next('')
            }
          },
          templateId ({ templateId }, next) {
            if (!templateId) {
              next('模版不能为空')
            } else {
              next('')
            }
          },
          wheelLoop ({ wheelLoop }, next) {
            if (!wheelLoop) {
              next('轮询不能为空')
            } else {
              next('')
            }
          }
        },
        dataRule: {
          slaveId: [
            { required: true, message: '从机ID不能为空', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '巡检项不能为空', trigger: 'change' }
          ],
          no: [{ required: true, message: '编号不能为空', trigger: 'blur' }],
          position: [{ required: true, message: '位置不能为空', trigger: 'blur' }],
          description: [{ required: true, message: '备注不能为空', trigger: 'blur' }],
          templateName: [{ required: true, message: '模版不能为空', trigger: 'blur' }],
          wheelLoop: [{ required: true, message: '轮询不能为空', trigger: 'blur' }]
        },
        pageIndex: 0,
        pageSize: 10,
        totalPage: 0,
        templateId: '',
        projectId: ''
      }
    },
    methods: {
      // 获取数据列表
      init (templateId) {
        this.visible = true
        this.templateId = templateId
        this.projectId = sessionStorage.getItem('projectId')
        this.getDataTypeList()
        this.getOperationList()
      },
      dataTypeChange (index,row) {
        // console.log(this.dataTypeList,'======>',row)
        for (let i in this.dataTypeList) {
          // console.log(this.dotList[index].dataType)
          // console.log(this.dataTypeList[i].key)
          // console.log(this.dataTypeList[i].name)
          // console.log(this.dataTypeList[i].option[0].description)

          if (this.dataTypeList[i].key === this.dotList[index].dataType) {
            // this.dotList[index].valueTypeList = this.dataTypeList[i].option
            this.indexNum = i
            console.log(this.indexNum)
          }
        }
        this.valueTypeList = this.dataTypeList[this.indexNum].option
        console.log(this.valueTypeList)
        
      },
      getDataTypeList () {
        this.$http({
          url: this.$http.adornUrl('/equipment/datavalue/list'),
          method: 'get',
          data: this.$http.adornData()
        }).then(({data}) => {
          if (data && data.code === 200) {
            // console.log(data.data)
            this.dataTypeList = data.data
            let row = {
              name: '',
              dataType: '',
              dataTypeList: this.dataTypeList,
              registerAddress: '',
              digitNumber: '',
              valueType: '',
              valueTypeList: [],
              operation: '',
              unit: '',
              expression: '',
              templateId: this.templateId,
              programId: this.projectId
            }
            this.dotList = []
            this.dotList.push(row)
          }
        })
      },
      getOperationList () {
        this.$http({
          url: this.$http.adornUrl('/equipment/function/list'),
          method: 'get',
          data: this.$http.adornData()
        }).then(({data}) => {
          if (data && data.code === 200) {
            this.operationList = data.data
            // console.log(this.operationList)
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$nextTick(() => {
              this.$http({
                url: this.$http.adornUrl(`/equipment/templatedata/save`),
                method: 'post',
                data: JSON.stringify(this.dotList)
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
        this.dotList.splice(index, 1)
      },
      addOrUpdateHandle () {
        let row = {
          name: '',
          dataType: '',
          dataTypeList: this.dataTypeList,
          registerAddress: '',
          digitNumber: '',
          valueType: '',
          valueTypeList: [],
          operation: '',
          unit: '',
          expression: '',
          templateId: this.templateId,
          programId: this.projectId
        }
        this.dotList.push(row)
      }
    },
    watch: {
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
  .add-dialog .add-dot {
    margin-bottom: 20px;
    right: 13px;
  }
  .add-dialog .el-icon-close:before {
    content: "";
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
