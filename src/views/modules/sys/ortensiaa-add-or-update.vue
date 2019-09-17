<template>
  <div class="add-dialog">
    <el-dialog
      :title="!dataForm.id ? '添加传感器' : '修改传感器'"
      :close-on-click-modal="false"
      :visible.sync="visible"
    >
      <div class="add-ortensia">
        <el-button type="primary" @click="addOrUpdateHandle()">新增</el-button>
      </div>
      <el-form :model="dataForm" ref="dataForm" @keyup.enter.native="dataFormSubmit()">
        <el-table :data="dataForm.tableData" border v-loading="dataListLoading" style="width: 100%;"
                  :header-cell-style="{color:'#333',fontFamily:'MicrosoftYaHeiUI',fontSize:'12px',fontWeight:900}"
                  :row-style="{fontSize:'12px',color:'#666',fontFamily:'MicrosoftYaHeiUI'}"
                  @selection-change="selectionChangeHandle">
          <el-table-column
            type="selection"
            header-align="center"
            align="center"
            width="50">
          </el-table-column>
          <el-table-column  align="center" label="从机ID">
            <template slot-scope="scope">
              <el-form-item :prop=" 'tableData.' + scope.$index + '.slaveId' " :rules="dataRule.rules.slaveId">
                <el-input v-model="scope.row.slaveId" placeholder="ID"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column  align="center" label="名称">
            <template slot-scope="scope">
              <el-form-item :prop=" 'tableData.' + scope.$index + '.name' " :rules="dataRule.rules.name">
                <el-input v-model="scope.row.name" placeholder="名称"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column  align="center" label="传感器编号">
            <template slot-scope="scope">
              <el-form-item :prop=" 'tableData.' + scope.$index + '.no' " :rules="dataRule.rules.no">
                <el-input v-model="scope.row.no" placeholder="编号"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column  align="center" label="位置">
            <template slot-scope="scope">
              <el-form-item :prop=" 'tableData.' + scope.$index + '.position' " :rules="dataRule.rules.position">
                <el-input v-model="scope.row.position" placeholder="位置"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column  align="center" label="备注">
            <template slot-scope="scope">
              <el-form-item :prop=" 'tableData.' + scope.$index + '.description' " :rules="dataRule.rules.description">
                <el-input v-model="scope.row.description" placeholder="备注"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column  width="180" align="center" label="点位模版">
            <template slot-scope="scope">
              <el-form-item :prop=" 'tableData.' + scope.$index + '.templateName' " :rules="dataRule.rules.templateName">
                <el-select v-model="scope.row.templateName" placeholder="请选择">
                  <el-option v-for="item in valueControlOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column align="center"  label="轮询时间" :formatter="formatDate">
            <template slot-scope="scope">
              <el-form-item :prop=" 'tableData.' + scope.$index + '.wheelLoop' " :rules="dataRule.rules.wheelLoop">
                <el-input v-model="scope.row.wheelLoop" placeholder="轮询时间"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column fixed="right" align="center" size="mini" label="操作">
            <template slot-scope="scope">
              <el-form-item label-width="10px" label="" prop="">
                <div class="fl">
                  <el-button type="primary" size="small" @click="del(scope.row.id)">删除</el-button>
                </div>
              </el-form-item>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">完成设备添加</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import moment from 'moment'
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          tableData: [],
          id: 0,
          state: ''
        },
        valueControlOptions: [
          {
            value: 0,
            label: '大气压力点位模版'
          },
          {
            value: 1,
            label: 'PM2.5点位模版'
          },
          {
            value: 2,
            label: '电流点位模版'
          }
        ],
        dataRule: {
          rules: {
            slaveId: [{ required: true, message: '从机ID不能为空', trigger: 'blur' }],
            name: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
            no: [{ required: true, message: '编号不能为空', trigger: 'blur' }],
            position: [{ required: true, message: '位置不能为空', trigger: 'blur' }],
            description: [{ required: true, message: '备注不能为空', trigger: 'blur' }],
            // templateName: [{ required: true, message: '模版不能为空', trigger: 'blur' }],
            wheelLoop: [{ required: true, message: '轮询不能为空', trigger: 'blur' }]
          }
        },
        dataListLoading: false,
        dataListSelections: [],
        dataList: []
      }
    },
    created () {
      this.getDataList()
    },
    mounted () {
      this.restaurants = this.loadAll()
    },
    // 获取传感器列表
    getDataList () {
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/sys/ortensia/list'),
        method: 'get',
        params: this.$http.adornParams()
      }).then(({data}) => {
        console.log(data)
        if (data && data.code === 0) {
          this.dataList = data.page.list
        } else {
          this.dataList = []
          this.totalPage = 0
        }
        this.dataListLoading = false
      })
    },
    methods: {
      addOrUpdateHandle () {
        this.dataForm.tableData.push({
          slaveId: '',
          name: '',
          no: '',
          position: '',
          description: '',
          templateName: '',
          wheelLoop: ''
        })
      },
      formatDate (value) {
        this.value1 = new Date(value.wheelLoop)
        let dateValue = moment(this.value1).format('YYYY-MM-DD HH:mm:ss')
        return dateValue
      },
      init (id) {
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/sys/ortensia/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.paramKey = data.config.paramKey
                this.dataForm.paramValue = data.config.paramValue
                this.dataForm.remark = data.config.remark
              }
            })
          }
        })
      },
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/sys/ortensia/list'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.page.list
            // this.totalPage = data.page.totalCount
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            console.log(this.dataForm.tableData)
            this.$http({
              url: this.$http.adornUrl(`/sys/ortensia/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'paramKey': this.dataForm.paramKey,
                'paramValue': this.dataForm.paramValue,
                'remark': this.dataForm.remark
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshOrtensiaData')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
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
      querySearch (queryString, cb) {
        var restaurants = this.restaurants
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
        // 调用 callback 返回建议列表的数据
        cb(results)
      },
      createFilter (queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
        }
      },
      loadAll () {
        return [
          // eslint-disable-next-line standard/object-curly-even-spacing
          { 'value': '大气压力_点位模版'},
          { 'value': 'PM2.5_点位模版' },
          { 'value': '电流_点位模版' }
        ]
      },
      handleSelect (item) {
        console.log(item)
      },
      handleIconClick (ev) {
        console.log(ev)
      },
      del (index) {
        this.dataForm.tableData.splice(index, 1)
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
  .add-dialog .add-ortensia {
    top: 10px;
    right: 13px;
    position: absolute;
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
  /*table样式处理*/

  .my-autocomplete {
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
  }
</style>
