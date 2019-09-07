<template>
  <div class="add-dialog">
    <el-dialog
      :title="!dataForm.id ? '点位模版名称' : '测试模版名称'"
      :close-on-click-modal="false"
      :visible.sync="visible"
    >
      <div class="add-ortensia">
        <el-button type="primary" @click="addOrUpdateHandle()">新增</el-button>
      </div>
      <el-form :model="dataForm" ref="dataForm" @keyup.enter.native="dataFormSubmit()">
        <el-table
          :data="dataList"
          border
          v-loading="dataListLoading"
          @selection-change="selectionChangeHandle"
          style="width: 100%;">
          <el-table-column
            type="selection"
            header-align="center"
            align="center"
            width="50">
          </el-table-column>
          <!--      <el-table-column-->
          <!--        prop="img"-->
          <!--        header-align="center"-->
          <!--        align="center"-->
          <!--        width="80"-->
          <!--        label="图标">-->
          <!--        <template   slot-scope="scope">-->
          <!--          <img :src="scope.row.img"  min-width="70" height="70" />-->
          <!--        </template>-->
          <!--      </el-table-column>-->
          <el-table-column
            prop="id"
            header-align="center"
            align="center"
            width="110"
            label="从机ID">
            <template slot-scope="scope">
              <el-form-item label-width="10px" label="" prop="paramKey">
                <el-input  size="mini" v-model="dataForm.paramKey" placeholder="1"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            header-align="center"
            align="center"
            width="110"
            label="名称">
            <template slot-scope="scope">
              <el-form-item label-width="10px" label="" prop="paramKey1">
                <el-input size="mini" v-model="dataForm.paramKey1" placeholder="传感器名称"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            prop="number"
            header-align="center"
            align="center"
            width="110"
            label="传感器编号">
            <template slot-scope="scope">
              <el-form-item label-width="10px" label="" prop="paramKey2">
                <el-input size="mini" v-model="dataForm.paramKey2" placeholder="键入编号"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            prop="pos"
            header-align="center"
            align="center"
            width="110"
            label="位置">
            <template slot-scope="scope">
              <el-form-item label-width="10px" label="" prop="paramKey3">
                <el-input size="mini" v-model="dataForm.paramKey3" placeholder="位置信息"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            header-align="center"
            align="center"
            label="备注">
            <template slot-scope="scope">
              <el-form-item label-width="10px" label="" prop="paramKey4">
                <el-input size="mini" v-model="dataForm.paramKey4" placeholder="备注信息"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            header-align="center"
            align="center"
            width="200px"
            label="点位模版">
            <template slot-scope="scope">
              <el-form-item label-width="30px" label="" prop="state">
                <el-autocomplete
                  popper-class="my-autocomplete"
                  v-model="dataForm.state"
                  :fetch-suggestions="querySearch"
                  placeholder="点位模版选择"
                  @select="handleSelect">
                  <!--                <i-->
                  <!--                  class="el-icon-edit el-input__icon"-->
                  <!--                  slot="suffix"-->
                  <!--                  @click="handleIconClick">-->
                  <!--                </i>-->
                  <template slot-scope="{ item }">
                    <div class="name">{{ item.value }}</div>
                  </template>
                </el-autocomplete>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            prop="state"
            header-align="center"
            align="center"
            label="状态">
            <template slot-scope="scope">
              <el-form-item label-width="10px" label="" prop="states"
              >
                <el-switch
                  v-model="dataForm.states"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            prop="state"
            header-align="center"
            align="center"
            label="在线/离线">
          </el-table-column>
          <el-table-column
            prop="numb"
            header-align="center"
            align="center"
            label="轮询时间">
          </el-table-column>
          <el-table-column
            fixed="right"
            header-align="center"
            align="center"
            label="操作">
            <template slot-scope="scope">
              <div class="fl">
                <el-button type="primary" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <span slot="footer" class="dialog-footer">
       <el-button @click="visible = false">取消</el-button>
       <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          id: 0,
          paramKey: '',
          paramValue: '',
          remark: '',
          restaurants: [],
          state: '',
          states: 'false'
        },
        dataRule: {
          paramKey: [
            { required: true, message: '网管名称不能为空', trigger: 'blur' }
          ],
          paramValue: [
            { required: true, message: '', trigger: 'blur' }
          ]
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
      }
    }
  }
</script>
<style lang="scss">

  .add-dialog .el-dialog {
    width: 70%;
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
