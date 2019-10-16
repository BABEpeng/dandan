<template>
  <div class="add-dialog">
    <el-dialog
      :title="!dataForm.id ? '新增设备>绑定传感器' : '修改传感器'"
      :close-on-click-modal="false"
      :visible.sync="visible">
     <el-form :model="dataForm" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
       <el-form-item label="网关选择:">
         <template>
           <el-select v-model="value" placeholder="请选择" @change="getGateOrtenInfo(value)">
             <el-option
               v-for="item in this.gatewayId"
               :key="item.id"
               :label="item.name"
               :value="item.id">
             </el-option>
           </el-select>
         </template>
       </el-form-item>
     </el-form>
     <el-form :model="dataForm" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
       <el-table
         :data="dataList"
         size="mini"
         v-loading="dataListLoading"
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
         <el-table-column  align="center" label="从机ID">
           <template slot-scope="scope">
             <el-form-item label-width="10px" label="" prop="">
               {{cope.row.slaveId}}
             </el-form-item>
           </template>
         </el-table-column>
         <el-table-column prop="name" align="center" label="名称">
           <template slot-scope="scope">
             <el-form-item label-width="10px" label="" prop="">
               {{scope.row.name}}
             </el-form-item>
           </template>
         </el-table-column>
         <el-table-column align="center" label="传感器编号">
           <template slot-scope="scope">
             <el-form-item label-width="10px" label="" prop="">
               {{scope.row.no}}
             </el-form-item>
           </template>
         </el-table-column>
         <el-table-column align="center" label="位置">
           <template slot-scope="scope">
             <el-form-item label-width="10px" label="" prop="">
               {{scope.row.position}}
             </el-form-item>
           </template>
         </el-table-column>
         <el-table-column align="center" label="备注">
           <template slot-scope="scope">
             <el-form-item label-width="10px" label="" prop="">
               {{scope.row.description}}
             </el-form-item>
           </template>
         </el-table-column>
         <el-table-column align="center" width="110" label="点位模版">
           <template slot-scope="scope">
             <el-form-item  label-width="10px" prop="">
               {{scope.row.templateName}}
             </el-form-item>
           </template>
         </el-table-column>
         <el-table-column align="center" label="状态">
           <template slot-scope="scope">
             <el-form-item label-width="10px" label="" prop="">
               <el-switch
                 v-model="scope.row.delivery"
                 active-color="#13ce66"
                 inactive-color="#ff4949">
               </el-switch>
             </el-form-item>
           </template>
         </el-table-column>
         <el-table-column align="center" label="在线/离线">
           <template slot-scope="scope">
             <el-form-item label-width="10px" label="" prop="">
               <el-tag v-if="scope.row.IsOnline === true" size="small">在线</el-tag>
               <el-tag v-else size="small" type="danger">离线</el-tag>
             </el-form-item>
           </template>
         </el-table-column>
         <el-table-column align="center" width="100" label="轮询时间" :formatter="formatDate">
           <template slot-scope="scope">
             {{ scope.row.addTimestamp }}
           </template>
         </el-table-column>
         <el-table-column align="center" label="绑定状态">
           <template slot-scope="scope">
              <el-form-item label-width="10px" label="" prop="">
               <el-tag v-if="scope.row.IsOnline === true" size="small">已绑定</el-tag>
               <el-tag v-else size="small" type="danger">未绑定</el-tag>
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
  import Vuex from 'vuex'
  let { mapState } = Vuex
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          id: 0,
          delivery: false,
          IsOnline: null,
          state: ''
        },
        dataRule: {
          rules: {
            sensorName: [
              { required: true, message: '路由器名称不能为空', trigger: 'blur' }
            ]
          }
        },
        dataListLoading: false,
        dataListSelections: [],
        dataList: [],
        value: '',
        GateOrtenInfo: []
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
    computed: {
      ...mapState({
        gatewayId: state => state.gatewayData.data,
        programId: state => state.projectData.item.id
      })
    },
    methods: {
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
      formatDate (value) {
        this.value1 = new Date(value.wheelLoop)
        let dateValue = moment(this.value1).format('YYYY-MM-DD HH:mm:ss')
        return dateValue
      },
      getGateOrtenInfo (value) {
        if (!this.GateOrtenInfo.length) {
          this.dataListLoading = true
          this.$http({
            url: this.$http.adornUrl('/device/list/gateway'),
            method: 'post',
            data: this.$http.adornData({
              // 页码，每页条数
              'programId': this.programId,
              'gatewayId': value,
              'page': this.pageIndex,
              'pageSize': this.pageSize,
              'isBind': false
            })
          }).then(({data}) => {
            console.log(data)
            if (data && data.code === 200) {
              this.totalPage = data.pageTotal
            } else {
              this.totalPage = 0
            }
            this.dataListLoading = false
          })
        }
      }
    }
  }
</script>
<style lang="scss">

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


</style>
