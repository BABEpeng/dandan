<template>
  <el-dialog
    :title="!dataForm.id ? '绑定传感器' : ''"
    :close-on-click-modal="false"
    :visible.sync="visible"
    center>
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="网管选择" prop="paramKey">
        <el-input v-model="dataForm.paramKey" placeholder="网管名称"></el-input>
      </el-form-item>
    </el-form>
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
      <el-table-column
        prop="img"
        header-align="center"
        align="center"
        width="80"
        label="图标">
        <template   slot-scope="scope">
          <img :src="scope.row.img"  min-width="70" height="70" />
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        header-align="center"
        align="center"
        label="传感器名称">
      </el-table-column>
      <el-table-column
        prop="id"
        header-align="center"
        align="center"
        label="传感器ID">
      </el-table-column>
      <el-table-column
        prop="type"
        header-align="center"
        align="center"
        label="传感器类型">
      </el-table-column>
    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dataFormSubmit()">完成设备添加</el-button>
    </span>
  </el-dialog>
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
          remark: ''
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
      }
    }
  }
</script>
